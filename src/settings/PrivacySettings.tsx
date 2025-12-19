import React from 'react';
import { Shield, CheckCircle, AlertTriangle, Lock, Eye, Trash2, ChevronRight } from 'lucide-react';

interface PrivacySettingsProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  privacyLevels: Array<{
    value: string;
    label: string;
    description: string;
    recommended?: boolean;
  }>;
}

const PrivacySettings: React.FC<PrivacySettingsProps> = ({
  formData,
  onInputChange,
  privacyLevels
}) => {
  const dataRetentionOptions = [
    { value: '3months', label: '3 meses', description: 'Eliminación automática después de 3 meses' },
    { value: '6months', label: '6 meses', description: 'Eliminación automática después de 6 meses' },
    { value: '1year', label: '1 año', description: 'Eliminación automática después de 1 año', recommended: true },
    { value: 'never', label: 'Nunca', description: 'Mantén mis datos indefinidamente' }
  ];

  const dataSharingOptions = [
    { 
      value: 'none', 
      label: 'Ninguno', 
      description: 'No compartir mis datos con terceros',
      icon: <Lock className="w-5 h-5 text-red-500" />
    },
    { 
      value: 'essential', 
      label: 'Esencial', 
      description: 'Solo para funcionamiento básico de la app',
      icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      recommended: true
    },
    { 
      value: 'all', 
      label: 'Todos', 
      description: 'Compartir con todos los socios de la plataforma',
      icon: <Eye className="w-5 h-5 text-blue-500" />
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">Privacidad y Seguridad</h3>
      </div>
      
      <div className="space-y-8">
        {/* Nivel de Privacidad */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Nivel de privacidad</h4>
              <p className="text-sm text-gray-500">Controla qué información compartes y con quién</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Recomendado: Balanceada
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {privacyLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => onInputChange('privacyLevel', level.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.privacyLevel === level.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{level.label}</span>
                  {level.recommended && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{level.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Retención de Datos */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Retención de datos</h4>
              <p className="text-sm text-gray-500">Cuánto tiempo mantenemos tu información</p>
            </div>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              Recomendado: 1 año
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dataRetentionOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onInputChange('dataRetention', option.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.dataRetention === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{option.label}</span>
                  {option.recommended && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Compartir Datos */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Compartir datos con terceros</h4>
              <p className="text-sm text-gray-500">Qué información puede ser compartida</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dataSharingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onInputChange('dataSharing', option.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.dataSharing === option.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {option.icon}
                  <span className="font-medium">{option.label}</span>
                  {option.recommended && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-auto">
                      Recomendado
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Datos Sensibles */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Datos sensibles</h4>
              <p className="text-sm text-gray-500">Información que requiere protección especial</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-red-800">Historial de aprendizaje detallado</h5>
                  <p className="text-xs text-red-700 mt-1">
                    Tus patrones de aprendizaje, tiempos de estudio y áreas de dificultad
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.protectLearningHistory}
                  onChange={(e) => onInputChange('protectLearningHistory', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-yellow-800">Habilidades y progreso</h5>
                  <p className="text-xs text-yellow-700 mt-1">
                    Tu nivel en diferentes habilidades y tu evolución profesional
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.protectSkillsProgress}
                  onChange={(e) => onInputChange('protectSkillsProgress', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Eliminación de Cuenta */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <Trash2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Eliminar cuenta permanentemente</h4>
              <p className="text-sm text-gray-600 mb-3">
                Si decides eliminar tu cuenta, toda tu información será eliminada permanentemente, incluyendo tu historial de aprendizaje, habilidades verificadas y transacciones. Esta acción no se puede deshacer.
              </p>
              <button className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1">
                Solicitar eliminación de cuenta
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;