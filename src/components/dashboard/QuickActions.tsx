import React from 'react';
import { Brain, BookOpen, Briefcase, Zap, ArrowRight } from 'lucide-react';

interface QuickActionsProps {
  setCurrentPage: (page: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ setCurrentPage }) => {
  const actions = [
    {
      icon: <BookOpen className="w-6 h-6 text-purple-600" />,
      title: 'Aprender',
      desc: 'Comenzar módulo de Python',
      action: () => setCurrentPage('learning')
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      title: 'Trabajar',
      desc: 'Ver oportunidades disponibles',
      action: () => setCurrentPage('marketplace')
    },
    {
      icon: <Brain className="w-6 h-6 text-green-600" />,
      title: 'Mentor IA',
      desc: 'Obtener ayuda personalizada',
      action: () => setCurrentPage('mentor')
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: 'Tarea Rápida',
      desc: 'Micro-tarea de 15 minutos',
      action: () => alert('¡Empezando tarea rápida!')
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Acciones Rápidas</h3>
          <p className="text-sm text-gray-500">Continúa tu progreso hoy</p>
        </div>
        <Brain className="w-8 h-8 text-purple-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <h4 className="font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
              {action.title}
            </h4>
            <p className="text-sm text-gray-500 mb-3">{action.desc}</p>
            <div className="flex items-center gap-2 text-purple-600 group-hover:gap-3 transition-all">
              <span className="text-sm font-medium">Empezar ahora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;