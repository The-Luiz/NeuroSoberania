// src/pages/Learning.tsx
import React, { useState } from 'react'; // Eliminado useEffect si no se usa
import { 
  Brain
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ModuleCard from '../components/learning/ModuleCard';
import TaskCard from '../components/dashboard/TaskCard';
import TaskInterface from '../components/learning/TaskInterface';
import { useGroqAI } from '../hooks/useGroqAI'; // ✅ Importamos el hook

// Definir la interfaz Task
export interface Task {
  id: string;
  title: string;
  description: string;
  steps: string[];
  solution: string;
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
    taskFeedback, 
    setCurrentTask,
    setTaskStep,
    setTaskCompleted,
    setTaskFeedback
  } = useAppContext();

  // ✅ Inicializamos el hook de IA
  const { validateAnswer, isValidating } = useGroqAI();
  
  // Datos de los módulos
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
        description: 'Aprende a declarar variables y trabajar con diferentes tipos de datos en Python',
        steps: [
          "Declara una variable 'edad' con tu edad",
          "Crea una variable 'nombre' con tu nombre",
          "Imprime ambos valores en la consola"
        ],
        solution: "edad = 30\nnombre = 'Juan'\nprint(f'Mi nombre es {nombre} y tengo {edad} años')",
        reward: 500,
        errorExamples: {
          "edad = '30'": "Error: Debes usar un número, no una cadena para la edad",
          "print('Mi edad es ' + edad)": "Error: No puedes concatenar cadenas con números sin convertirlos"
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
      title: 'Análisis de Datos', 
      progress: 30, 
      reward: 1000, 
      time: 25, 
      done: false,
      task: {
        id: 'data-1',
        title: 'Análisis de Datos Básico',
        description: 'Realiza un análisis simple de un conjunto de datos',
        steps: [
          "Importa la librería pandas",
          "Carga un archivo CSV de muestra",
          "Muestra las primeras 5 filas del dataset"
        ],
        solution: "import pandas as pd\ndf = pd.read_csv('datos.csv')\nprint(df.head())",
        reward: 1000,
        errorExamples: {
          "import pandas": "Error: Debes importar pandas como 'import pandas as pd'",
          "pd.read_csv('datos.csv')": "Error: Debes asignar el resultado a una variable"
        }
      }
    },
    { 
      title: 'Lightning Network',
      progress: 0, 
      reward: 1500, 
      time: 30, 
      done: false,
      task: {
        id: 'lightning-1',
        title: 'Pagos en Lightning',
        description: 'Realiza un pago simple en la red Lightning',
        steps: [
          "Abre tu billetera Lightning",
          "Copia la factura de pago",
          "Envía 100 sats al destinatario"
        ],
        solution: "1. Entra a tu billetera\n2. Busca 'Enviar'\n3. Pega la factura\n4. Ingresa 100 sats\n5. Confirma",
        reward: 1500,
        errorExamples: {
          "Envía 100 sats sin factura": "Error: Necesitas una factura válida para enviar"
        }
      }
    }
  ];

  // ✅ FUNCIÓN CORREGIDA CON IA
  const handleCheckAnswer = async (userAnswer: string) => {
    if (!currentTask) return;
    
    // 1. Feedback visual inmediato
    setTaskFeedback('🤖 Analizando tu respuesta...');

    try {
      // 2. Preparar contexto para la IA
      const currentStepDescription = currentTask.steps[taskStep];
      const taskContext = `Tarea: ${currentTask.title}. Objetivo del paso actual: ${currentStepDescription}`;

      // 3. Llamar a la IA para validar
      const result = await validateAnswer(
        taskContext,
        userAnswer,
        currentTask.solution // Pasamos la solución como referencia (opcional)
      );

      // 4. Procesar respuesta de la IA
      if (result.correct) {
        setTaskFeedback(`✅ ${result.feedback}`);
        
        // Si es el último paso
        if (taskStep === currentTask.steps.length - 1) {
          setTimeout(() => {
            setTaskCompleted(true);
            setTaskFeedback(`🎉 ¡Tarea completada! +${currentTask.reward || 500} sats han sido añadidos a tu billetera.`);
          }, 2000);
        } else {
          // Siguiente paso
          setTimeout(handleNextStep, 2000);
        }
      } else {
        // Respuesta incorrecta según la IA
        setTaskFeedback(`⚠️ ${result.feedback}`);
      }

    } catch (error) {
      console.error(error);
      setTaskFeedback('❌ Hubo un error al conectar con el tutor inteligente. Inténtalo de nuevo.');
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
          // @ts-ignore - Descomenta la siguiente línea si ya actualizaste TaskInterfaceProps
          isValidating={isValidating} 
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