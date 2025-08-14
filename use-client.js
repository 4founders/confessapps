const fs = require('fs');
const path = require('path');

const folder = './app/figma/components/ui'; // Cambia a la carpeta que quieras recorrer
function addUseClient(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      addUseClient(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf-8');

      // Evita agregar si ya existe "use client"
      if (!content.startsWith("'use client'") && !content.startsWith('"use client"')) {
        content = `'use client';\n\n${content}`;
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log(`✅ Añadido 'use client' en: ${fullPath}`);
      } else {
        console.log(`⏩ Ya tenía 'use client': ${fullPath}`);
      }
    }
  });
}

addUseClient(folder);
console.log('✨ Proceso completado.');