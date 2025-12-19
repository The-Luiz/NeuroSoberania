import React from 'react';
import { CheckCircle, Brain, Zap } from 'lucide-react';
import type { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-emerald-600';
    if (level >= 70) return 'from-blue-400 to-indigo-600';
    return 'from-purple-400 to-pink-600';
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-gray-800">{skill.name}</span>
          {skill.verified && (
            <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verificado
            </div>
          )}
        </div>
        <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          {skill.level}%
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className={`h-3 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)}`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 text-center text-sm">
        <div className="bg-purple-50 p-2 rounded-lg">
          <div className="font-bold text-purple-700">{skill.projects}</div>
          <div className="text-xs text-gray-500">Proyectos</div>
        </div>
        <div className="bg-blue-50 p-2 rounded-lg">
          <div className="font-bold text-blue-700">{skill.earnings.toLocaleString()} sats</div>
          <div className="text-xs text-gray-500">Ganados</div>
        </div>
        <div className="bg-green-50 p-2 rounded-lg">
          <div className="font-bold text-green-700">{Math.round(skill.level / 10)}</div>
          <div className="text-xs text-gray-500">Nivel</div>
        </div>
      </div>
      
      <button className="mt-4 w-full text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center justify-center gap-1 py-2 hover:bg-purple-50 rounded-lg transition-all">
        {skill.verified ? 'Mejorar habilidad' : 'Verificar habilidad'}
        <Zap className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SkillCard;