import React, { useState } from 'react';
import { 
  Settings, Brain, Sun, Moon, Palette, Volume2, 
  Accessibility, Shield, Bell, CheckCircle, AlertTriangle, 
  ChevronRight, Save, RefreshCw, Eye, EyeOff, Zap 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AccessibilitySettings from '../settings/AccessibilitySettings';
import PrivacySettings from '../settings/PrivacySettings';
import NotificationSettings from '../settings/NotificationSettings';
const SettingsPage: React.FC = () => {
  const { setAiPanelOpen } = useAppContext();
  const [activeSection, setActiveSection] = useState('accessibility');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState({
    fontSize: 'medium',
    contrast: 'normal',
    spacing: 'normal',
    reducedMotion: false,
    highContrastMode: false,
    screenReaderOptimization: false,
    textToSpeech: true,
    notifications: true,
    aiSuggestions: true,
    darkMode: 'system',
    privacyLevel: 'balanced'
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const accessibilityOptions = [
    { value: 'small', label: 'Pequeño', description: 'Texto más compacto' },
    { value: 'medium', label: 'Medio', description: 'Tamaño estándar', recommended: true },
    { value: 'large', label: 'Grande', description: 'Mejor legibilidad' }
  ];

  const contrastOptions = [
    { value: 'normal', label: 'Normal', description: 'Contraste estándar' },
    { value: 'high', label: 'Alto', description: 'Mejor visibilidad', recommended: true }
  ];

  const spacingOptions = [
    { value: 'compact', label: 'Compacto', description: 'Más contenido visible' },
    { value: 'normal', label: 'Normal', description: 'Espaciado equilibrado', recommended: true },
    { value: 'relaxed', label: 'Relajado', description: 'Mejor para lectura prolongada' }
  ];

  const themeOptions = [
    { value: 'system', label: 'Sistema', description: 'Usa la configuración de tu dispositivo' },
    { value: 'light', label: 'Claro', description: 'Fondo blanco, texto oscuro' },
    { value: 'dark', label: 'Oscuro', description: 'Fondo oscuro, texto claro' }
  ];

  const privacyLevels = [
    { 
      value: 'minimal', 
      label: 'Mínima', 
      description: 'Solo datos esenciales para funcionamiento' 
    },
    { 
      value: 'balanced', 
      label: 'Balanceada', 
      description: 'Funcionalidad completa con privacidad razonable',
      recommended: true
    },
    { 
      value: 'maximum', 
      label: 'Máxima', 
      description: 'Privacidad extrema, algunas funciones limitadas' 
    }
  ];

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Configuración Neuro-Inclusiva
          </h2>
          <p className="text-gray-600">Personaliza tu experiencia para optimizar tu aprendizaje y productividad</p>
        </div>
        <button
          onClick={() => setAiPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
          aria-label="Obtener recomendaciones de configuración"
        >
          <Brain className="w-4 h-4" />
          Recomendaciones AI
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar de Navegación */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Categorías</h3>
              <p className="text-xs text-gray-500">Personaliza tu experiencia</p>
            </div>
            
            <div className="p-2">
              {[
                { id: 'accessibility', icon: Accessibility, label: 'Accesibilidad', description: 'Ajustes para neurodiversidad' },
                { id: 'privacy', icon: Shield, label: 'Privacidad', description: 'Control de tus datos' },
                { id: 'notifications', icon: Bell, label: 'Notificaciones', description: 'Alertas y recordatorios' },
                { id: 'appearance', icon: Palette, label: 'Apariencia', description: 'Tema y visual' },
                { id: 'ai', icon: Brain, label: 'Asistente IA', description: 'Preferencias de IA' }
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl mb-2 text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <section.icon 
                    className={`w-5 h-5 ${
                      activeSection === section.id ? 'text-white' : 'text-purple-600'
                    }`} 
                  />
                  <div>
                    <div className="font-medium">{section.label}</div>
                    <div className="text-xs opacity-80">{section.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-5 border border-purple-100">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-800 mb-1">¿Necesitas ayuda?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Tu asistente IA puede recomendarte configuraciones basadas en tus necesidades específicas.
                </p>
                <button
                  onClick={() => setAiPanelOpen(true)}
                  className="text-xs font-medium text-purple-600 hover:text-purple-800 flex items-center gap-1"
                >
                  Obtener recomendaciones personalizadas
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-2">
          {activeSection === 'accessibility' && (
            <AccessibilitySettings 
              formData={formData} 
              onInputChange={handleInputChange}
              accessibilityOptions={accessibilityOptions}
              contrastOptions={contrastOptions}
              spacingOptions={spacingOptions}
            />
          )}

          {activeSection === 'privacy' && (
            <PrivacySettings
              formData={formData}
              onInputChange={handleInputChange}
              privacyLevels={privacyLevels}
            />
          )}

          {activeSection === 'notifications' && (
            <NotificationSettings
              formData={formData}
              onInputChange={handleInputChange}
            />
          )}

          {activeSection === 'appearance' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">Apariencia</h3>
              </div>
              
              <div className="space-y-6">
                {/* Tema */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">Tema de la aplicación</h4>
                      <p className="text-sm text-gray-500">Elige entre modo claro, oscuro o automático</p>
                    </div>
                    <div className="flex gap-2">
                      {formData.darkMode === 'system' && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Sistema
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {themeOptions.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => handleInputChange('darkMode', theme.value)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.darkMode === theme.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{theme.label}</span>
                          {formData.darkMode === theme.value && (
                            <CheckCircle className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{theme.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colores */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Paleta de colores</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['purple', 'blue', 'green', 'amber'].map((color) => (
                      <button
                        key={color}
                        className={`h-16 rounded-xl border-2 transition-all ${
                          color === 'purple'
                            ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-blue-500'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    La paleta por defecto está optimizada para accesibilidad cognitiva
                  </p>
                </div>

                {/* Animaciones */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">Animaciones</h4>
                      <p className="text-sm text-gray-500">Controla los efectos visuales y transiciones</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.reducedMotion}
                        onChange={(e) => handleInputChange('reducedMotion', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  {formData.reducedMotion && (
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Modo de movimiento reducido activado
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'ai' && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">Preferencias de Asistente IA</h3>
              </div>
              
              <div className="space-y-6">
                {/* Nivel de intervención */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Nivel de intervención</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { 
                        value: 'minimal', 
                        label: 'Mínima', 
                        description: 'Solo cuando solicitas ayuda explícitamente',
                        icon: AlertTriangle 
                      },
                      { 
                        value: 'balanced', 
                        label: 'Balanceada', 
                        description: 'Ayuda contextual en momentos clave',
                        icon: Brain,
                        recommended: true 
                      },
                      { 
                        value: 'proactive', 
                        label: 'Proactiva', 
                        description: 'Sugerencias constantes y recordatorios',
                        icon: Zap 
                      }
                    ].map((level) => (
                      <button
                        key={level.value}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          level.recommended
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <level.icon className={`w-5 h-5 ${
                            level.recommended ? 'text-purple-600' : 'text-gray-500'
                          }`} />
                          <span className="font-medium">{level.label}</span>
                          {level.recommended && (
                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full ml-auto">
                              Recomendado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{level.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sugerencias */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">Sugerencias contextuales</h4>
                      <p className="text-sm text-gray-500">Recibe ayuda proactiva basada en tu actividad</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.aiSuggestions}
                        onChange={(e) => handleInputChange('aiSuggestions', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>

                {/* Voz */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">Respuestas de voz</h4>
                      <p className="text-sm text-gray-500">Escucha las respuestas del asistente</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.textToSpeech}
                        onChange={(e) => handleInputChange('textToSpeech', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                    {['femenina', 'masculina', 'neutra', 'robot'].map((voice) => (
                      <button
                        key={voice}
                        className={`p-3 rounded-lg border text-sm ${
                          voice === 'neutra'
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {voice.charAt(0).toUpperCase() + voice.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Datos de entrenamiento */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Privacidad con IA</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Tus conversaciones con la IA se utilizan para mejorar el servicio. Puedes optar por no participar en el entrenamiento del modelo.
                      </p>
                      <button className="mt-2 text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1">
                        Configurar privacidad de IA
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Acciones de Guardado */}
          <div className="mt-8 flex justify-end gap-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showAdvanced ? 'Ocultar' : 'Mostrar'} avanzado
            </button>
            <button
              onClick={() => {/* Reset logic */}}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Restablecer
            </button>
            <button
              onClick={() => {/* Save logic */}}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;