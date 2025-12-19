import React from 'react';
import { 
  Bell, CheckCircle, AlertTriangle, Clock, MessageSquare, Zap, 
  BookOpen, Brain, Bitcoin, Award, Settings, Briefcase, Mail 
} from 'lucide-react';

interface NotificationSettingsProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  formData,
  onInputChange
}) => {
  const notificationTypes = [
    {
      id: 'learningReminders',
      label: 'Recordatorios de aprendizaje',
      description: 'Notificaciones para continuar tus módulos incompletos',
      icon: <BookOpen className="w-5 h-5 text-purple-600" />
    },
    {
      id: 'newOpportunities',
      label: 'Nuevas oportunidades',
      description: 'Alertas cuando aparecen trabajos que coinciden con tus habilidades',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'aiSuggestions',
      label: 'Sugerencias de IA',
      description: 'Recomendaciones personalizadas de tu asistente cognitivo',
      icon: <Brain className="w-5 h-5 text-green-600" />
    },
    {
      id: 'payments',
      label: 'Pagos recibidos',
      description: 'Confirmación cuando recibes satoshis por tus tareas',
      icon: <Bitcoin className="w-5 h-5 text-yellow-600" />
    },
    {
      id: 'progressMilestones',
      label: 'Hitos de progreso',
      description: 'Celebraciones cuando alcanzas nuevos niveles en tus habilidades',
      icon: <Award className="w-5 h-5 text-amber-600" />
    },
    {
      id: 'systemUpdates',
      label: 'Actualizaciones del sistema',
      description: 'Noticias importantes y mejoras en la plataforma',
      icon: <Settings className="w-5 h-5 text-gray-600" />
    }
  ];

  const notificationChannels = [
    {
      id: 'push',
      label: 'Notificaciones push',
      description: 'Alertas en tu dispositivo móvil o escritorio',
      icon: <Bell className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'email',
      label: 'Correo electrónico',
      description: 'Resúmenes diarios y notificaciones importantes',
      icon: <Mail className="w-5 h-5 text-purple-600" />
    },
    {
      id: 'inApp',
      label: 'Dentro de la app',
      description: 'Notificaciones visibles solo cuando usas la aplicación',
      icon: <MessageSquare className="w-5 h-5 text-green-600" />
    }
  ];

  const notificationFrequency = [
    { value: 'realtime', label: 'En tiempo real', description: 'Recibir notificaciones inmediatamente' },
    { value: 'digest', label: 'Resumen diario', description: 'Recibir un resumen una vez al día', recommended: true },
    { value: 'weekly', label: 'Resumen semanal', description: 'Recibir un resumen una vez a la semana' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">Notificaciones</h3>
      </div>
      
      <div className="space-y-8">
        {/* Activar/Desactivar Notificaciones */}
        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-purple-600" />
            <div>
              <h4 className="font-medium text-gray-800">Notificaciones globales</h4>
              <p className="text-sm text-gray-600">Habilitar o deshabilitar todas las notificaciones</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notifications}
              onChange={(e) => onInputChange('notifications', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>

        {/* Tipos de Notificaciones */}
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Tipos de notificaciones</h4>
          <p className="text-sm text-gray-500 mb-4">Selecciona qué tipo de notificaciones quieres recibir</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {notificationTypes.map((type) => (
              <div
                key={type.id}
                className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-all bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {type.icon}
                    <div>
                      <h5 className="font-medium text-gray-800">{type.label}</h5>
                      <p className="text-xs text-gray-500 mt-1">{type.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[type.id] !== undefined ? formData[type.id] : true}
                      onChange={(e) => onInputChange(type.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Canales de Notificación */}
        <div className="pt-6 border-t border-gray-100">
          <h4 className="font-medium text-gray-800 mb-3">Canales de notificación</h4>
          <p className="text-sm text-gray-500 mb-4">Elige cómo quieres recibir tus notificaciones</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {notificationChannels.map((channel) => (
              <div
                key={channel.id}
                className="p-4 rounded-xl border border-gray-200 hover:border-purple-300 transition-all bg-white"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {channel.icon}
                    <div>
                      <h5 className="font-medium text-gray-800">{channel.label}</h5>
                      <p className="text-xs text-gray-500 mt-1">{channel.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[channel.id] !== undefined ? formData[channel.id] : true}
                      onChange={(e) => onInputChange(channel.id, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frecuencia de Notificaciones */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Frecuencia de notificaciones</h4>
              <p className="text-sm text-gray-500">Controla con qué frecuencia recibes las alertas</p>
            </div>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Recomendado: Resumen diario
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {notificationFrequency.map((freq) => (
              <button
                key={freq.value}
                onClick={() => onInputChange('notificationFrequency', freq.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  formData.notificationFrequency === freq.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{freq.label}</span>
                  {freq.recommended && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{freq.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Horarios de No Molestar */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-gray-800">Modo "No molestar"</h4>
              <p className="text-sm text-gray-500">Establece horarios cuando no quieres recibir notificaciones</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.dndMode}
                onChange={(e) => onInputChange('dndMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
          
          {formData.dndMode && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                <input
                  type="time"
                  value={formData.dndStart || '22:00'}
                  onChange={(e) => onInputChange('dndStart', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                <input
                  type="time"
                  value={formData.dndEnd || '08:00'}
                  onChange={(e) => onInputChange('dndEnd', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="md:col-span-2 mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-700">
                    Durante el modo "No molestar", solo recibirás notificaciones críticas como pagos recibidos o problemas de seguridad.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notificaciones de IA Contextual */}
        <div className="pt-6 border-t border-gray-100">
          <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200">
            <Brain className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Notificaciones contextuales de IA</h4>
              <p className="text-sm text-gray-600 mb-3">
                Tu asistente IA puede enviarte notificaciones proactivas basadas en tu actividad y progreso. Por ejemplo: "¿Necesitas ayuda con ese módulo de Python?" o "Hay una nueva oportunidad que coincide con tus habilidades".
              </p>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aiContextualNotifications}
                    onChange={(e) => onInputChange('aiContextualNotifications', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <span className="text-sm text-gray-700">
                  {formData.aiContextualNotifications ? 'Activado' : 'Desactivado'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;