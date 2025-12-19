import React from 'react';
import { Award, Crown, Star, CheckCircle, Bitcoin, Zap } from 'lucide-react';
import type { Badge } from '../../types';

interface BadgeCardProps {
  badge: Badge;
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badge }) => {
  const getBadgeStyle = () => {
    switch(badge.title) {
      case 'Early Adopter':
        return 'from-purple-500 to-pink-600';
      case 'Lightning Fast':
        return 'from-yellow-400 to-orange-600';
      case 'Perfect Score':
        return 'from-blue-500 to-indigo-600';
      case 'Top Earner':
        return 'from-green-500 to-emerald-600';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getBadgeIcon = () => {
    switch(badge.title) {
      case 'Early Adopter':
        return <Crown className="w-8 h-8" />;
      case 'Lightning Fast':
        return <Zap className="w-8 h-8" />;
      case 'Perfect Score':
        return <Star className="w-8 h-8 fill-current" />;
      case 'Top Earner':
        return <Bitcoin className="w-8 h-8" />;
      default:
        return <Award className="w-8 h-8" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getBadgeStyle()} flex items-center justify-center mb-3 mx-auto`}>
        {getBadgeIcon()}
      </div>
      
      <div className="text-center mb-2">
        <div className="font-bold text-gray-800">{badge.title}</div>
        <div className="text-xs text-gray-500 mt-1">{badge.desc}</div>
      </div>
      
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle className="w-3 h-3" />
          <span>Verificada</span>
        </div>
      </div>
      
      <button className="mt-3 w-full text-purple-600 hover:text-purple-800 font-medium text-xs flex items-center justify-center gap-1 py-1.5 hover:bg-purple-50 rounded-lg transition-all">
        Mostrar en mi perfil público
      </button>
    </div>
  );
};

export default BadgeCard;