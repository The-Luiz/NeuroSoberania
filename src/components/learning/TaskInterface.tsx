// src/components/learning/TaskInterface.tsx
import React, { useState } from 'react';
import { X, Lightbulb, Zap, Loader2, HelpCircle } from 'lucide-react'; // Añadí HelpCircle por si acaso
import { useAppContext } from '../../context/AppContext';
import type { Task } from '../../context/AppContext';

interface TaskInterfaceProps {
  task: Task;
  onClose: () => void;
  onCheckAnswer: (answer: string) => void;
  onGetHint?: (currentInput: string) => void; // ✅ Prop para pedir pista
  isValidating?: boolean;
}

const TaskInterface: React.FC<TaskInterfaceProps> = ({ 
  task, 
  onClose, 
  onCheckAnswer,
  onGetHint, // Destructuramos la nueva función
  isValidating = false 
}) => {
  const { 
    taskStep, 
    taskFeedback, 
    setTaskFeedback 
  } = useAppContext();
  
  const [userAnswer, setUserAnswer] = useState('');

  const handleVerifyAnswer = () => {
    if (!userAnswer.trim()) return;
    onCheckAnswer(userAnswer); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <p className="opacity-90 mt-1">Paso {taskStep + 1} de {task.steps.length}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
            aria-label="Cerrar tarea"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Contenido de la tarea (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-3">{task.description}</h3>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-800">Consejo Cognitivo:</p>
                  <p className="text-blue-700 mt-1">
                    Divide esta tarea en los pasos indicados. Enfócate solo en el paso actual.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Paso actual */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {taskStep + 1}
                  </span>
                  <h4 className="font-bold text-gray-800">Paso {taskStep + 1}:</h4>
                </div>
                <p className="text-gray-700 text-lg font-medium">{task.steps[taskStep]}</p>
              </div>
              
              {/* Área de respuesta */}
              <div className="mt-6">
                <textarea
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if (taskFeedback) setTaskFeedback(''); 
                  }}
                  disabled={isValidating}
                  className={`w-full p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[150px] resize-y transition-colors font-mono text-sm
                    ${isValidating ? 'bg-gray-50 text-gray-500' : 'bg-white border-gray-300'}
                  `}
                  placeholder="Escribe tu código o respuesta aquí..."
                  spellCheck={false}
                />
                
                {/* Feedback */}
                {taskFeedback && (
                  <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 ${
                    taskFeedback.includes('✅') ? 'bg-green-50 border border-green-200 text-green-800' : 
                    taskFeedback.includes('⚠️') ? 'bg-amber-50 border border-amber-200 text-amber-800' : 
                    'bg-blue-50 border border-blue-200 text-blue-800'
                  }`}>
                    <span className="text-xl mt-0.5">
                        {taskFeedback.includes('✅') ? '' : taskFeedback.includes('⚠️') ? '' : '🤖'}
                    </span>
                    <p className="font-medium leading-relaxed">{taskFeedback.replace(/✅|⚠️|🤖/g, '')}</p>
                  </div>
                )}
                
                {/* ✅ SECCIÓN DE BOTONES CORREGIDA */}
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  
                  {/* Botón Izquierdo: Salir */}
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-500 font-medium hover:bg-gray-100 hover:text-gray-700 rounded-lg transition-colors text-sm"
                  >
                    Salir temporalmente
                  </button>
                  
                  {/* Grupo Derecho: Pista y Verificar */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    
                    {/* Botón de Pista (Solo aparece si la prop onGetHint existe) */}
                    {onGetHint && (
                      <button
                        onClick={() => onGetHint(userAnswer)}
                        disabled={isValidating}
                        className="px-4 py-3 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-xl font-semibold transition-colors flex items-center gap-2"
                        title="Pedir una pista a la IA"
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span className="hidden sm:inline">Pedir Pista</span>
                      </button>
                    )}

                    {/* Botón Principal: Verificar */}
                    <button
                      onClick={handleVerifyAnswer}
                      disabled={!userAnswer.trim() || !!taskFeedback.includes('✅') || isValidating}
                      className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all transform active:scale-95 ${
                        userAnswer.trim() && !taskFeedback.includes('✅') && !isValidating
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:-translate-y-0.5' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isValidating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Analizando...
                        </>
                      ) : (
                        <>
                          <Zap className={`w-5 h-5 ${userAnswer.trim() ? 'fill-current' : ''}`} />
                          Verificar
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {/* Fin Sección Botones */}

              </div>
            </div>
          </div>
          
          {/* Barra de Progreso */}
          <div className="mt-8 pt-6 pb-2">
            <div className="flex justify-between items-center mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <span>Progreso de la tarea</span>
              <span className="text-purple-600">{Math.round(((taskStep) / task.steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-700 ease-out"
                style={{ width: `${((taskStep) / task.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInterface;