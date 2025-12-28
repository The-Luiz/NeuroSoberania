// src/pages/Learning.tsx
import React from 'react';
import { Brain } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ModuleCard from '../components/learning/ModuleCard';
import TaskCard from '../components/dashboard/TaskCard';
import TaskInterface from '../components/learning/TaskInterface';
import { useGroqAI } from '../hooks/useGroqAI';

export interface Task {
  id: string;
  title: string;
  description: string;
  steps: string[];
  solution: string; // Referencia para la IA
  reward: number;
  errorExamples: Record<string, string>;
}

export interface Module {
  title: string;
  progress: number;
  reward: number;
  time: number;
  done: boolean;
  task?: Task;
}

const Learning: React.FC = () => {
  const { 
    setAiPanelOpen,
    currentTask, 
    taskStep, 
    setCurrentTask,
    setTaskStep,
    setTaskCompleted,
    setTaskFeedback
  } = useAppContext();

  // ✅ Traemos validateAnswer Y generateHint
  // Nota: Asegúrate de haber agregado generateHint a tu hook useGroqAI
  const { validateAnswer, generateHint, isValidating, isStreaming } = useGroqAI();
  
  // Datos de los módulos REFACTORIZADOS para ser más atómicos
  const learningModules: Module[] = [
    { 
      title: 'Fundamentos Python', 
      progress: 75, 
      reward: 500, 
      time: 10, 
      done: false,
      task: {
        id: 'python-1',
        title: 'Variables y Tipos de Datos',
        description: 'Aprende a declarar variables básicas.',
        steps: [
          "Declara una variable llamada 'edad' asignándole el valor 25",
          "Declara una variable 'nombre' con el texto 'Ana'",
          "Usa print() para mostrar la variable nombre"
        ],
        solution: "edad = 25\nnombre = 'Ana'\nprint(nombre)",
        reward: 500,
        errorExamples: {
          "edad = '25'": "Los números no llevan comillas.",
        }
      }
    },
    { 
      title: 'Bitcoin y Blockchain', 
      progress: 100, 
      reward: 750, 
      time: 20, 
      done: true,
      task: undefined
    },
    { 
      title: 'Intro a Datos (Listas)', 
      progress: 30, 
      reward: 1000, 
      time: 25, 
      done: false,
      task: {
        id: 'data-1',
        title: 'Estructuras de Datos Básicas',
        description: 'Antes de usar Pandas, aprendamos a manejar listas nativas.',
        steps: [
          "Crea una lista llamada 'precios' con los valores: 100, 200 y 300",
          "Calcula la suma de la lista usando sum(precios) y guárdala en 'total'",
          "Imprime el resultado de 'total'"
        ],
        solution: "precios = [100, 200, 300]\ntotal = sum(precios)\nprint(total)",
        reward: 1000,
        errorExamples: {
          "precios = (100, 200)": "Usa corchetes [] para listas, no paréntesis.",
          "sum = precios": "La función es sum(variable)."
        }
      }
    },
    { 
      title: 'Lightning CLI',
      progress: 0, 
      reward: 1500, 
      time: 30, 
      done: false,
      task: {
        id: 'lightning-1',
        title: 'Comandos de Nodo (Simulación)',
        description: 'Aprende los comandos básicos para controlar un nodo Lightning.',
        steps: [
          "Escribe el comando para ver la información del nodo (getinfo)",
          "Escribe el comando para crear una factura de 500 sats (addinvoice)",
          "Escribe el comando para pagar una factura (payinvoice <codigo>)"
        ],
        solution: "lncli getinfo\nlncli addinvoice 500\nlncli payinvoice lnbc1...",
        reward: 1500,
        errorExamples: {
          "getinfo": "Te falta el prefijo del programa: 'lncli getinfo'",
          "addinvoice": "Debes especificar el monto o usar argumentos."
        }
      }
    }
  ];

  // Lógica de Validación (Ya la tenías, se mantiene igual)
  const handleCheckAnswer = async (userAnswer: string) => {
    if (!currentTask) return;
    setTaskFeedback('🤖 Analizando tu respuesta...');

    try {
      const currentStepDescription = currentTask.steps[taskStep];
      const taskContext = `Tarea: ${currentTask.title}. Objetivo del paso actual: ${currentStepDescription}`;

      const result = await validateAnswer(
        taskContext,
        userAnswer,
        currentTask.solution
      );

      if (result.correct) {
        setTaskFeedback(`✅ ${result.feedback}`);
        if (taskStep === currentTask.steps.length - 1) {
          setTimeout(() => {
            setTaskCompleted(true);
            setTaskFeedback(`🎉 ¡Tarea completada! +${currentTask.reward} sats añadidos.`);
          }, 2000);
        } else {
          setTimeout(handleNextStep, 2000);
        }
      } else {
        setTaskFeedback(`⚠️ ${result.feedback}`);
      }
    } catch (error) {
      setTaskFeedback('❌ Error de conexión con el tutor.');
    }
  };

  // ✅ NUEVA LÓGICA: Botón de Ayuda
  const handleGetHint = async (currentUserInput: string) => {
    if (!currentTask) return;
    setTaskFeedback('🤔 Pensando una pista...');
    
    // Si no tienes generateHint en el hook aún, comenta esto y usa un string fijo temporalmente
    if (generateHint) {
        const hint = await generateHint(
            `Ejercicio: ${currentTask.title}`, 
            currentTask.steps[taskStep], 
            currentUserInput
        );
        setTaskFeedback(`💡 PISTA: ${hint}`);
    } else {
        setTaskFeedback("💡 Pista: Revisa los ejemplos de la documentación.");
    }
  };

  const handleNextStep = () => {
    if (currentTask && taskStep < currentTask.steps.length - 1) {
      setTaskStep(taskStep + 1);
      setTaskFeedback('');
    }
  };

  const handleStartTask = (task: Task) => {
    setCurrentTask(task);
    setTaskStep(0);
    setTaskCompleted(false);
    setTaskFeedback('');
  };

  return (
    <>
      {currentTask ? (
        <TaskInterface 
          task={currentTask} 
          onClose={() => setCurrentTask(null)}
          onCheckAnswer={handleCheckAnswer}
          // ✅ Pasamos la nueva función de ayuda
          // @ts-ignore (Agrega onGetHint a tu interfaz en TaskInterface)
          onGetHint={handleGetHint} 
          isValidating={isValidating || isStreaming} 
        />
      ) : (
        <>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Aprendizaje Just-In-Time
              </h2>
              <p className="text-gray-600">Cada módulo te paga en satoshis</p>
            </div>
            <button
              onClick={() => setAiPanelOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
            >
              <Brain className="w-4 h-4"/>
              ¿Qué debería aprender primero?
            </button>
          </div>

          <div className="mb-8">
            <TaskCard tasks={3} />
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {learningModules.map((module, index) => (
              <ModuleCard 
                key={index} 
                module={module} 
                onTaskStart={module.task ? () => handleStartTask(module.task!) : undefined}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Learning;