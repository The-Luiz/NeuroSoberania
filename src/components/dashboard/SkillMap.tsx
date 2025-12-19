import React from 'react';
import { Brain, Zap, CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  verified: boolean;
}

interface SkillMapProps {
  skills: Skill[];
}

const SkillMap: React.FC<SkillMapProps> = ({ skills }) => {
  const getSkillColor = (level: number) => {
    if (level >= 90) return 'from-green-400 to-emerald-600';
    if (level >= 70) return 'from-blue-400 to-indigo-600';
    return 'from-purple-400 to-pink-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Mapa de Habilidades</h3>
          <p className="text-sm text-gray-500">Tus habilidades y progreso actual</p>
        </div>
        <Brain className="w-8 h-8 text-purple-600" />
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">{skill.name}</span>
                {skill.verified && (
                  <div className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verificado</span>
                  </div>
                )}
              </div>
              <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {skill.level}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${getSkillColor(skill.level)}`}
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
            
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Nivel {Math.floor(skill.level / 20) + 1} de 5</span>
              <span>{skill.level >= 80 ? 'Avanzado' : skill.level >= 50 ? 'Intermedio' : 'Básico'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              <strong>Consejo:</strong> Completa 3 módulos para desbloquear la verificación de habilidades y acceder a trabajos mejor pagados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMap;