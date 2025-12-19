import React from 'react';
import { 
  X, Brain, Target, Zap, TrendingUp, BookOpen, Briefcase, 
  Bitcoin, Award, MessageCircle, Settings, CheckCircle 
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import type { AIHelpOption } from '../../types';

const AIAssistantPanel: React.FC = () => {
  const { 
    aiPanelOpen, 
    setAiPanelOpen, 
    currentPage, 
    setChat,
    chat
  } = useAppContext();

  const getAIContextualHelp = (): AIHelpOption[] => {
    const contexts = {
      dashboard: [
        { icon: Target, text: "Explícame mi progreso", action: "analizar progreso" },
        { icon: Zap, text: "¿Qué debería hacer ahora?", action: "sugerir acción" },
        { icon: TrendingUp, text: "¿Cómo puedo mejorar?", action: "plan mejora" }
      ],
      learning: [
        { icon: BookOpen, text: "Simplifica este concepto", action: "simplificar" },
        { icon: Brain, text: "Crea un plan de estudio", action: "plan estudio" },
        { icon: Target, text: "¿Qué aprender primero?", action: "priorizar" }
      ],
      marketplace: [
        { icon: Briefcase, text: "¿Cuál trabajo me conviene?", action: "recomendar trabajo" },
        { icon: Bitcoin, text: "¿Es justo este pago?", action: "analizar tarifa" },
        { icon: Award, text: "¿Estoy listo para esto?", action: "evaluar capacidad" }
      ],
      profile: [
        { icon: Briefcase, text: "Crea mi servicio independiente", action: "microempresario" },
        { icon: TrendingUp, text: "¿Qué tarifa cobrar?", action: "calcular tarifa" },
        { icon: Target, text: "Mejora mi descripción", action: "optimizar perfil" }
      ],
      wallet: [
        { icon: Bitcoin, text: "Explícame Lightning", action: "explicar lightning" },
        { icon: Target, text: "Plan de ahorro", action: "plan ahorro" }
      ],
      mentor: [
        { icon: MessageCircle, text: "Ayuda con concepto", action: "ayudar concepto" },
        { icon: Brain, text: "Explica como funciona esto", action: "explicar funcionamiento" }
      ],
      settings: [
        { icon: Settings, text: "Configuración recomendada", action: "recomendar config" },
        { icon: Brain, text: "Ayuda con accesibilidad", action: "ayuda accesibilidad" }
      ]
    };
    
    return contexts[currentPage as keyof typeof contexts] || contexts.dashboard;
  };

  const getContextualMessage = () => {
    const messages = {
      dashboard: 'Estás en tu Panel. ¿En qué puedo ayudarte?',
      learning: 'Estás aprendiendo. ¿Necesitas ayuda?',
      marketplace: 'Buscando oportunidades. Te ayudo a elegir.',
      profile: 'Tu perfil profesional. ¿Listo para ser independiente?',
      wallet: 'Tu wallet Lightning. ¿Dudas sobre Bitcoin?',
      mentor: 'Ya estoy aquí para ayudarte.',
      settings: 'Configurando tu experiencia.'
    };
    
    return messages[currentPage as keyof typeof messages] || messages.dashboard;
  };

  const handleHelpClick = (help: AIHelpOption) => {
    setChat([...chat, 
      { type: 'user', text: help.text },
      { type: 'ai', text: `Entiendo que quieres ${help.action}. Déjame ayudarte con eso...` }
    ]);
    setAiPanelOpen(false);
  };

  if (!aiPanelOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden border-2 border-purple-200">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          <span className="font-bold">Asistente Cognitivo</span>
        </div>
        <button 
          onClick={() => setAiPanelOpen(false)} 
          className="hover:bg-white hover:bg-opacity-20 p-1 rounded"
          aria-label="Cerrar panel de IA"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 bg-purple-50 border-b">
        <p className="text-sm text-gray-700 font-semibold mb-3">
          {getContextualMessage()}
        </p>
        <div className="space-y-2">
          {getAIContextualHelp().map((help, i) => (
            <button
              key={i}
              onClick={() => handleHelpClick(help)}
              className="w-full flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-purple-100 transition-all text-left border border-gray-200"
            >
              <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                <help.icon size={18} />
              </div>
              <span className="text-sm font-medium text-gray-800">{help.text}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={() => {
            setAiPanelOpen(false);
          }}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          aria-label="Abrir chat completo con el mentor IA"
        >
          Abrir Chat Completo →
        </button>
      </div>
    </div>
  );
};

export default AIAssistantPanel;