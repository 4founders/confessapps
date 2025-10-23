export function Privacidad() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Política de Privacidad
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Tu privacidad es fundamental para nosotros. Esta sección describe cómo recopilamos, usamos y protegemos tu información personal.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Información que Recopilamos
        </h3>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Información de registro: email, fecha de nacimiento, país e idioma</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Datos de uso: historial de conexiones, duración de llamadas y preferencias</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Información técnica: dirección IP, tipo de dispositivo y navegador</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Cómo Usamos tu Información
        </h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Utilizamos tu información para:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Facilitar conexiones entre usuarios compatibles</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Mejorar la seguridad y prevenir abusos</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Personalizar tu experiencia en la plataforma</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Comunicarnos contigo sobre cambios en el servicio</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Anonimato en las Conversaciones
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Las conversaciones de voz no son grabadas ni almacenadas. Solo mantenemos registros anónimos de métricas básicas como duración y tipo de conexión para mejorar el servicio.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Protección de Datos
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso no autorizado, pérdida o alteración.
        </p>
      </div>
    </div>
  );
}
