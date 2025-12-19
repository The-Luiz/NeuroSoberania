import React from 'react';
import { Briefcase, Star, Bitcoin, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import type { PortfolioItem as PortfolioItemType } from '../../types';

interface PortfolioItemProps {
  item: PortfolioItemType;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg text-gray-800">{item.title}</span>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
              <CheckCircle className="w-3 h-3" />
              <span>Completado</span>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span>{item.client}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{item.rating}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full">
          <Bitcoin className="w-4 h-4" />
          <span className="font-bold">{item.sats.toLocaleString()} sats</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-purple-50 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-100"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Completado hace 2 días</span>
        </div>
        <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium text-sm">
          Ver detalles
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PortfolioItem;