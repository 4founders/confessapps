export function Contacto() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Información de Contacto
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Si tienes preguntas, inquietudes o necesitas asistencia relacionada con estos Términos y Condiciones, estamos aquí para ayudarte.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Canales de Contacto
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-white font-semibold mb-2">Email General</p>
            <p className="text-gray-300">
              <a href="mailto:contacto@confessapps.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                contacto@confessapps.com
              </a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Para consultas generales, sugerencias o soporte técnico
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-white font-semibold mb-2">Asuntos Legales</p>
            <p className="text-gray-300">
              <a href="mailto:legal@confessapps.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                legal@confessapps.com
              </a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Para cuestiones legales, privacidad y términos de servicio
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-white font-semibold mb-2">Soporte de Seguridad</p>
            <p className="text-gray-300">
              <a href="mailto:seguridad@confessapps.com" className="text-orange-400 hover:text-orange-300 transition-colors">
                seguridad@confessapps.com
              </a>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Para reportar problemas de seguridad o conductas inapropiadas
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Tiempo de Respuesta
        </h3>
        <p className="text-gray-300 leading-relaxed">
          Nos esforzamos por responder a todas las consultas en un plazo de 48 horas laborables. Los asuntos urgentes de seguridad se priorizan y se atienden lo antes posible.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-3">
          Información de la Empresa
        </h3>
        <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
          <p className="text-gray-300">
            <span className="font-semibold text-white">Nombre Legal:</span> ConfessApps Inc.
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">País:</span> Chile
          </p>
          <p className="text-gray-300">
            <span className="font-semibold text-white">Sitio Web:</span>{" "}
            <a href="https://confessapps.com" className="text-orange-400 hover:text-orange-300 transition-colors">
              www.confessapps.com
            </a>
          </p>
        </div>
      </div>

      <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
        <p className="text-orange-200 text-sm">
          <span className="font-semibold">Nota:</span> Para emergencias de salud mental, por favor contacta directamente a servicios de emergencia locales o líneas de ayuda especializadas. Nuestro equipo de soporte no está capacitado para atender crisis de salud mental.
        </p>
      </div>
    </div>
  );
}
