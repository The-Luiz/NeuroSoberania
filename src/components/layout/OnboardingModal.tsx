import React from 'react';
import { Brain, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const OnboardingModal: React.FC = () => {
  const { 
    showOnboarding, 
    setShowOnboarding, 
    onboardingStep, 
    setOnboardingStep 
  } = useAppContext();

  const onboardingSteps = [
    {
      title: "¡Bienvenido a Neuro-Soberanía!",
      description: "Soy tu asistente de IA y te guiaré en cada paso. Estoy aquí para ayudarte a alcanzar tu independencia económica.",
      action: "Comenzar tour"
    },
    {
      title: "Tu Panel de Soberanía",
      description: "Aquí ves tu progreso en tiempo real: sats ganados, tareas completadas y habilidades desarrolladas.",
      highlight: "dashboard"
    },
    {
      title: "Aprende y Gana",
      description: "Cada módulo que completes te paga en satoshis instantáneamente. El aprendizaje es tu primera fuente de ingresos.",
      highlight: "learning"
    },
    {
      title: "De Empleado a Emprendedor",
      description: "Primero toma micro-tareas, luego proyectos completos, finalmente crea tu propio servicio. Yo te guío en cada fase.",
      highlight: "profile"
    },
    {
      title: "Siempre Estoy Aquí",
      description: "Haz clic en el botón flotante morado en cualquier momento. Te daré ayuda contextual según dónde estés.",
      highlight: "ai"
    }
  ];

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Tu Asistente IA</h3>
          </div>
          <p className="text-sm opacity-90">Paso {onboardingStep + 1} de {onboardingSteps.length}</p>
        </div>
        <div className="p-6">
          <h4 className="text-xl font-bold text-gray-800 mb-3">
            {onboardingSteps[onboardingStep].title}
          </h4>
          <p className="text-gray-600 mb-6">
            {onboardingSteps[onboardingStep].description}
          </p>
          <div className="flex gap-3">
            {onboardingStep > 0 && (
              <button
                onClick={() => setOnboardingStep(onboardingStep - 1)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
              >
                Anterior
              </button>
            )}
            {onboardingStep < onboardingSteps.length - 1 ? (
              <button
                onClick={() => setOnboardingStep(onboardingStep + 1)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={() => setShowOnboarding(false)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg"
              >
                ¡Comenzar!
              </button>
            )}
          </div>
          <button
            onClick={() => setShowOnboarding(false)}
            className="w-full mt-3 text-gray-500 text-sm hover:text-gray-700"
          >
            Saltar tutorial
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;