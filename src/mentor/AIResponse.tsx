import React from 'react';
import { Brain, CheckCircle, Zap, Lightbulb, Target } from 'lucide-react';

interface AIResponseProps {
  responseText: string;
  type?: 'analysis' | 'plan' | 'concept' | 'suggestion' | 'code';
}

const AIResponse: React.FC<AIResponseProps> = ({ 
  responseText, 
  type = 'analysis' 
}) => {
  const getIcon = () => {
    switch(type) {
      case 'plan':
        return <Target className="w-6 h-6 text-purple-600" />;
      case 'concept':
        return <Lightbulb className="w-6 h-6 text-yellow-500" />;
      case 'suggestion':
        return <Zap className="w-6 h-6 text-orange-500" />;
      case 'code':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      default:
        return <Brain className="w-6 h-6 text-purple-600" />;
    }
  };

  const getBorderColor = () => {
    switch(type) {
      case 'plan':
        return 'border-purple-200';
      case 'concept':
        return 'border-yellow-200';
      case 'suggestion':
        return 'border-orange-200';
      case 'code':
        return 'border-green-200';
      default:
        return 'border-purple-200';
    }
  };

  const getBackgroundColor = () => {
    switch(type) {
      case 'plan':
        return 'bg-purple-50';
      case 'concept':
        return 'bg-yellow-50';
      case 'suggestion':
        return 'bg-orange-50';
      case 'code':
        return 'bg-green-50';
      default:
        return 'bg-purple-50';
    }
  };

  return (
    <div className={`rounded-2xl border ${getBorderColor()} ${getBackgroundColor()} p-5 mb-6`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <div className="font-medium text-gray-800 mb-1">
            {type === 'analysis' && 'Análisis Cognitivo'}
            {type === 'plan' && 'Plan de Acción'}
            {type === 'concept' && 'Explicación Conceptual'}
            {type === 'suggestion' && 'Sugerencia Práctica'}
            {type === 'code' && 'Revisión de Código'}
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{responseText}</p>
        </div>
      </div>
    </div>
  );
};

export default AIResponse;