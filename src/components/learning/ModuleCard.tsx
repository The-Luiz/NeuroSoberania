import React from 'react';
import { Clock, Bitcoin, CheckCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface Module {
  title: string;
  progress: number;
  reward: number;
  time: number;
  done: boolean;
}

interface ModuleCardProps {
  module: Module;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const { setAiPanelOpen } = useAppContext();

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex justify-between mb-3">
        <h3 className="font-bold text-gray-800">{module.title}</h3>
        {module.done && <CheckCircle className="w-6 h-6 text-green-500" />}
      </div>
      <div className="text-sm text-gray-600 mb-3">
        <Clock className="w-4 h-4 inline mr-1" />
        {module.time} min
      </div>
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-700">Progreso</span>
          <span className="font-bold text-gray-800">{module.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${module.progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-orange-500 font-bold flex items-center">
          <Bitcoin className="w-4 h-4 mr-1" />
          {module.reward.toLocaleString()} sats
        </span>
        <button 
          onClick={() => !module.done && setAiPanelOpen(true)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            module.done 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : module.progress > 0 
                ? 'bg-purple-500 text-white hover:bg-purple-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {module.done ? 'Revisar' : module.progress > 0 ? 'Continuar' : 'Comenzar'}
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;