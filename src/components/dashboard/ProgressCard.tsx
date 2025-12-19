import React from 'react';
import { Target, Zap } from 'lucide-react';

interface ProgressCardProps {
  progress: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ progress }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-xl p-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-medium opacity-90">Progreso Soberanía</h3>
          <div className="text-3xl font-bold mt-1">{progress}%</div>
        </div>
        <Target className="w-10 h-10" />
      </div>
      
      <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mt-4 overflow-hidden">
        <div 
          className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-5">
        <div className="flex justify-between text-sm mb-3">
          <span className="opacity-80">Meta diaria</span>
          <span className="font-semibold">{progress >= 70 ? '✓ Completada' : '45% completada'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="opacity-80">Siguiente nivel</span>
          <span className="font-semibold">{100 - progress}% restante</span>
        </div>
      </div>
      
      <button className="mt-6 w-full bg-white bg-opacity-20 py-2 rounded-lg font-semibold text-sm hover:bg-opacity-30 transition-all flex items-center justify-center gap-2">
        <Zap className="w-4 h-4" />
        Acelerar progreso
      </button>
    </div>
  );
};

export default ProgressCard;