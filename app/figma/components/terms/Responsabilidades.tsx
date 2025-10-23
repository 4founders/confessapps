export function Responsabilidades() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Responsabilidades y Limitaciones
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Es importante comprender las responsabilidades mutuas y las limitaciones de nuestra plataforma.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Responsabilidad del Usuario
        </h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          Como usuario de ConfessApps, eres responsable de:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Mantener la confidencialidad de tu cuenta y contraseña</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Todo el contenido y actividad que ocurra bajo tu cuenta</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Tus propias decisiones y acciones basadas en conversaciones en la plataforma</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Buscar ayuda profesional cuando sea necesario</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Limitaciones de ConfessApps
        </h3>
        <p className="text-gray-300 leading-relaxed mb-4">
          ConfessApps proporciona una plataforma de conexión, pero no:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Ofrece servicios profesionales de salud mental, médicos o legales</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Verifica la identidad o credenciales de los usuarios</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Garantiza resultados específicos de las conversaciones</span>
          </li>
          <li className="flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>Supervisa activamente todas las conversaciones en tiempo real</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Exclusión de Garantías
        </h3>
        <p className="text-gray-300 leading-relaxed">
          El servicio se proporciona "tal cual" y "según disponibilidad". No garantizamos que el servicio será ininterrumpido, seguro o libre de errores.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Limitación de Responsabilidad
        </h3>
        <p className="text-gray-300 leading-relaxed">
          En la máxima medida permitida por la ley, ConfessApps no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso o incapacidad de usar el servicio.
        </p>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
        <p className="text-red-200 text-sm">
          <span className="font-semibold">Emergencias:</span> Si estás en crisis o peligro inmediato, contacta inmediatamente a servicios de emergencia locales (911, 112, etc.) o líneas de ayuda especializadas. ConfessApps no es un servicio de emergencia.
        </p>
      </div>
    </div>
  );
}
