// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// --- NUEVO: Dependencias de Redis ---
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
// ---------------------------------

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// --- Configuración de MongoDB (Sin cambios) ---
const mongoUrl = 'mongodb://confessapps:12345678@localhost:27017/confessapps?authSource=admin';
const dbName = 'confessapps';
let waitingUsers;
async function connectToMongo() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log('MongoDB conectado exitosamente');
    const db = client.db(dbName);
    waitingUsers = db.collection('waitingUsers');
    await waitingUsers.deleteMany({});
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    process.exit(1);
  }
}
// --- Fin de MongoDB ---

// --- Lógica de Socket.IO (Con una modificación) ---
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // 1. Lógica de Matchmaking
  socket.on('findMatch', async (data) => {
    try {
      // Extraemos todos los datos enviados por el cliente
      const { nickname, country, language, role: userRole } = data;
      console.log(`Buscando match para: ${nickname} (${socket.id})`);

      const match = await waitingUsers.findOneAndDelete({
        socketId: { $ne: socket.id },
      });

      if (match) {
        // ¡MATCH ENCONTRADO!
        console.log(`Match encontrado: ${socket.id} con ${match.socketId}`);
        const callId = `${socket.id}#${match.socketId}`;

        // Une al socket LOCAL a la sala
        socket.join(callId);

        // --- MODIFICACIÓN: Unir al socket REMOTO ---
        // Ya no podemos usar io.sockets.sockets.get()
        // 1. Verificamos si el socket existe en CUALQUIER servidor del clúster
        const remoteSockets = await io.sockets.adapter.sockets(new Set([match.socketId]));

        if (remoteSockets.size > 0) {
          // 2. Si existe, le pedimos al clúster que lo una a la sala
          io.in(match.socketId).socketsJoin(callId);
          console.log(`Pidiendo al socket remoto ${match.socketId} que se una a la sala ${callId}`);
        } else {
          // 3. Si no existe (se desconectó), volvemos a poner a este usuario en la cola
          console.log(`Match ${match.socketId} no encontrado (desconectado). Devolviendo a ${socket.id} a la cola.`);
          await waitingUsers.insertOne({ socketId: socket.id, username });
          return;
        }
        // --- FIN DE LA MODIFICACIÓN ---

        // Notifica a AMBOS usuarios
        // (Esto ahora funciona gracias al adaptador de Redis)
        // El usuario actual (caller) recibe los datos de su oponente (match)
        socket.emit('matchFound', {
          callId,
          opponent: {
            nickname: match.nickname,
            country: match.country,
            language: match.language,
            role: match.role,
            avatar: match.avatar,
          },
          role: 'caller',
        });

        // io.to() ahora envía el mensaje por Redis al servidor correcto
        // El oponente (answerer) recibe los datos del usuario actual
        io.to(match.socketId).emit('matchFound', {
          callId,
          opponent: { nickname, country, language, role: userRole },
          role: 'answerer',
        });

      } else {
        // NO HAY MATCH: Añadir a este usuario a la cola
        // Guardamos todos los datos del usuario
        const waitingUser = { socketId: socket.id, ...data, timestamp: new Date() };
        delete waitingUser.auth; // No guardamos el token en la BD por seguridad
        await waitingUsers.insertOne(waitingUser);
        console.log(`Usuario ${socket.id} añadido a la cola de espera.`);
      }
    } catch (err) {
      console.error('Error en findMatch:', err);
    }
  });

  // 2. Retransmitir la Oferta (Sin cambios, el adaptador se encarga)
  socket.on('webrtcOffer', (data) => {
    const { callId, offer } = data;
    socket.to(callId).emit('webrtcOffer', { offer });
  });

  // 3. Retransmitir la Respuesta (Sin cambios)
  socket.on('webrtcAnswer', (data) => {
    const { callId, answer } = data;
    socket.to(callId).emit('webrtcAnswer', { answer });
  });

  // 4. Retransmitir Candidatos ICE (Sin cambios)
  socket.on('iceCandidate', (data) => {
    const { callId, candidate } = data;
    socket.to(callId).emit('iceCandidate', { candidate });
  });

  // 5. Manejar la colgada (Sin cambios)
  socket.on('hangup', (data) => {
    const { callId } = data;
    socket.to(callId).emit('hangup');
  });

  // 6. Manejar Desconexión (Sin cambios)
  socket.on('disconnect', async () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    await waitingUsers.deleteMany({ socketId: socket.id });
    socket.rooms.forEach(room => {
      if (room !== socket.id) {
        socket.to(room).emit('hangup');
      }
    });
  });
});
// --- Fin de Socket.IO ---

// --- NUEVO: Función de inicio asíncrona ---
async function startServer() {
  try {
    // 1. Crear y conectar clientes Redis
    console.log('Conectando a Redis...');
    const pubClient = createClient({ url: 'redis://:12345678@localhost:6379' }); // Asume que Redis corre en el puerto por defecto
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
    console.log('Clientes Redis conectados exitosamente');

    // 2. Configurar el adaptador de Socket.IO
    io.adapter(createAdapter(pubClient, subClient));
    console.log('Adaptador de Socket.IO (Redis) configurado');

    // 3. Conectar a MongoDB
    await connectToMongo();

    // 4. Iniciar el servidor HTTP
    const PORT = 3002;
    server.listen(PORT, () => {
      console.log(`Servidor de señalización (escalable con Redis) corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar el servidor:', err);
    process.exit(1);
  }
}

// Llama a la nueva función de inicio
startServer();
// --- FIN DEL NUEVO BLOQUE DE INICIO ---