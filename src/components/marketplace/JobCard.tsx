// src/componentes/marketplace/JobCard.tsx
import React from 'react';
import { 
  Bitcoin, Clock, Star, CheckCircle, Award, Briefcase, 
  AlertTriangle, ArrowRight 
} from 'lucide-react';
import type { Job } from '../../types'; // CORREGIDO: importación correcta

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return 'bg-green-100 text-green-800';
      case 'Medio':
        return 'bg-yellow-100 text-yellow-800';
      case 'Difícil':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Medio':
        return <Award className="w-4 h-4 text-yellow-500" />;
      case 'Difícil':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Briefcase className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(job.difficulty)}`}>
              {getDifficultyIcon(job.difficulty)}
              <span className="ml-1">{job.difficulty}</span>
            </div>
            {job.verified && (
              <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                <CheckCircle className="w-3 h-3" />
                <span>Verificado</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full">
            <Bitcoin className="w-4 h-4" />
            <span className="font-bold">{job.reward.toLocaleString()} sats</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-600 transition-colors cursor-pointer">
          {job.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags.map((tag, index) => (
            <span 
              key={index} 
              className="bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{job.timeEstimate} horas estimadas</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700">{job.client.rating}</span>
              <span className="text-xs text-gray-500">({job.client.name})</span>
            </div>
          </div>
          <button
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all self-start sm:self-auto"
            aria-label={`Aplicar para ${job.title}`}
          >
            Aplicar ahora
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;