import React from 'react';
import { Brain, Bitcoin, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ModuleCard from '../components/learning/ModuleCard';

const learningModules = [
  { title: 'Fundamentos Python', progress: 75, reward: 500, time: 10, done: false },
  { title: 'Bitcoin y Blockchain', progress: 100, reward: 750, time: 20, done: true },
  { title: 'Análisis de Datos', progress: 30, reward: 1000, time: 25, done: false },
  { title: 'Lightning Network', progress: 0, reward: 1500, time: 30, done: false }
];

const Learning: React.FC = () => {
  const { setAiPanelOpen } = useAppContext();

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Aprendizaje Just-In-Time</h2>
          <p className="text-gray-600">Cada módulo te paga en satoshis</p>
        </div>
        <button
          onClick={() => setAiPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
        >
          <Brain className="w-4 h-4" />
          ¿Qué debería aprender primero?
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {learningModules.map((module, index) => (
          <ModuleCard key={index} module={module} />
        ))}
      </div>
    </>
  );
};

export default Learning;