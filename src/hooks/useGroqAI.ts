// src/hooks/useGroqAI.ts
import { useState } from 'react';
import { Groq } from 'groq-sdk';

const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

// Prompt original para el chat de ayuda
const CHAT_SYSTEM_PROMPT = `Soy un lóbulo frontal sintético para estudiantes neurodivergentes:
 traduzco complejidad en pasos lineales, presento una sola decisión por vez, doy feedback
 visual inmediato, vinculo aprendizaje a aplicación práctica, uso lenguaje simple y
 analogías, divido tareas en micro-pasos, elimino ambigüedad y priorizo demostración
 sobre teoría.`;

// Nuevo Prompt específico para validación
const VALIDATOR_SYSTEM_PROMPT = `
Soy un validador de ejercicios especializado en estudiantes neurodivergentes: 
evalúo con claridad extrema y feedback constructivo, priorizo la lógica funcional sobre la sintaxis perfecta, 
marco "correct": true si el código cumple el objetivo aunque tenga errores menores que señalo específicamente, 
mi feedback es breve, alentador y señala exactamente qué corregir, 
siempre respondo con JSON puro { "correct": boolean, "feedback": "string" } 
para dar certeza matemática y reducir ansiedad ejecutiva.
`;

export const useGroqAI = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isValidating, setIsValidating] = useState(false); // Nuevo estado para carga
  
  // Tu función original de streaming (para el chat)
  const streamResponse = async (
    userMessage: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => {
    setIsStreaming(true);
    try {
      const stream = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: CHAT_SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
        max_completion_tokens: 1024,
        stream: true
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        onChunk(content);
      }
      onComplete();
    } catch (error) {
      console.error('AI Stream Error:', error);
      onChunk('\n❌ Error al conectar con el asistente.');
      onComplete();
    } finally {
      setIsStreaming(false);
    }
  };

  // ✅ NUEVA FUNCIÓN: Validar respuesta
  const validateAnswer = async (
    questionContext: string, // Descripción del paso
    userAnswer: string,      // Lo que escribió el usuario
    expectedSolution?: string // Solución ideal (opcional, ayuda a la IA)
  ): Promise<{ correct: boolean; feedback: string }> => {
    setIsValidating(true);
    try {
      const prompt = `
        Contexto del ejercicio: ${questionContext}
        Solución esperada (referencia): ${expectedSolution || 'No provista'}
        
        Respuesta del usuario a evaluar: "${userAnswer}"
        
        Evalúa si la respuesta cumple el objetivo. Responde SOLO con el JSON.
      `;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: VALIDATOR_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0, // Temperatura 0 para ser más determinista y lógico
        response_format: { type: "json_object" } // Forzamos modo JSON (soportado en Llama 3.1)
      });

      const responseContent = completion.choices[0]?.message?.content;
      
      if (!responseContent) throw new Error("Respuesta vacía de la IA");

      return JSON.parse(responseContent);

    } catch (error) {
      console.error("Error validando respuesta:", error);
      return { 
        correct: false, 
        feedback: "Hubo un error técnico validando tu respuesta. Intenta de nuevo." 
      };
    } finally {
      setIsValidating(false);
    }
  };

  return { isStreaming, isValidating, streamResponse, validateAnswer };
};