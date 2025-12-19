import React from 'react';
import { CheckCircle, AlertTriangle, Accessibility } from 'lucide-react';

interface AccessibilitySettingsProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  accessibilityOptions: any[];
  contrastOptions: any[];
  spacingOptions: any[];
}

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({
  formData,
  onInputChange,
  accessibilityOptions,
  contrastOptions,
  spacingOptions
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Accessibility className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">Accesibilidad Cognitiva</h3>
      </div>
      
      <div className="space-y-8">
        {/* Tamaño de Texto */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Tamaño de texto</h4>
              <p className="text-sm text-gray-500">Ajusta el tamaño para mejor legibilidad</p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Recomendado: Medio
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {accessibilityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onInputChange('fontSize', option.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.fontSize === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Contraste */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Contraste visual</h4>
              <p className="text-sm text-gray-500">Mejora la visibilidad del contenido</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Recomendado: Alto
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contrastOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onInputChange('contrast', option.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.contrast === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Espaciado */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Espaciado</h4>
              <p className="text-sm text-gray-500">Ajusta el espacio entre elementos</p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Recomendado: Normal
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {spacingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onInputChange('spacing', option.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.spacing === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Modo Sensorial Reducido */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Modo sensorial reducido</h4>
              <p className="text-sm text-gray-500">Reduce estímulos visuales y auditivos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.reducedMotion}
                onChange={(e) => onInputChange('reducedMotion', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          {formData.reducedMotion && (
            <div className="mt-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-700">
                    Modo sensorial reducido activado:
                    <ul className="list-disc list-inside mt-1 text-xs text-gray-600">
                      <li>Animaciones y transiciones minimizadas</li>
                      <li>Sonidos y notificaciones visuales reducidos</li>
                      <li>Colores menos saturados y contrastes suaves</li>
                      <li>Interfaz más simple y predecible</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Optimización para Lectores de Pantalla */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Optimización para lectores de pantalla</h4>
              <p className="text-sm text-gray-500">Mejora la compatibilidad con tecnologías de asistencia</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.screenReaderOptimization}
                onChange={(e) => onInputChange('screenReaderOptimization', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">
                  Esta configuración optimiza la aplicación para:
                  <ul className="list-disc list-inside mt-1 text-xs text-gray-600">
                    <li>Estructura semántica HTML mejorada</li>
                    <li>Etiquetas ARIA completas para todos los componentes</li>
                    <li>Navegación por teclado optimizada</li>
                    <li>Descripciones alternativas para todos los elementos visuales</li>
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilitySettings;