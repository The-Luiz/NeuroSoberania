import React from 'react';
import { Brain, BookOpen, Briefcase, Bitcoin, Award, ChevronRight } from 'lucide-react';

const SovereigntyCycle: React.FC = () => {
  const cycleSteps = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: 'Aprender',
      desc: 'Módulos que te pagan mientras aprendes',
      highlight: 'Ganas +500 sats por módulo completado'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      title: 'Aplicar',
      desc: 'Micro-tareas y proyectos reales',
      highlight: 'Ganas entre 1,000-10,000 sats por tarea'
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: 'Verificar',
      desc: 'Certifica tus habilidades',
      highlight: 'Habilidades verificadas = +40% de ingresos'
    },
    {
      icon: <Bitcoin className="w-6 h-6 text-yellow-600" />,
      title: 'Crecer',
      desc: 'Inversiones y autonomía financiera',
      highlight: 'Reinvierte en tu educación y herramientas'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold">Ciclo de Soberanía Cognitiva</h3>
        </div>
        <p className="opacity-90">Tu camino hacia la autonomía económica y profesional</p>
      </div>
      
      <div className="p-6">
        <div className="relative">
          {/* Línea de conexión */}
          <div className="absolute top-6 left-8 right-8 h-0.5 bg-gradient-to-r from-purple-200 to-blue-200 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {cycleSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl opacity-20"></div>
                <div className="relative bg-white p-4 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{step.desc}</p>
                  <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-lg inline-block">
                    {step.highlight}
                  </div>
                </div>
                
                {index < cycleSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 w-8 -translate-y-1/2">
                    <ChevronRight className="w-6 h-6 text-purple-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
            <BookOpen className="w-5 h-5" />
            Comenzar mi viaje
            <ChevronRight className="w-4 h-4" />
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Completa el ciclo 3 veces para alcanzar la Soberanía Nivel 1
          </p>
        </div>
      </div>
    </div>
  );
};

export default SovereigntyCycle;