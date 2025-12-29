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
 sobre teoría, mis respuestas deben ser cortas y claras.`;

// Prompt mejorado para validación (JSON)
const VALIDATOR_SYSTEM_PROMPT = `
Soy un validador de ejercicios especializado en estudiantes neurodivergentes: 
evalúo con claridad extrema y feedback constructivo, priorizo la lógica funcional sobre la sintaxis perfecta, 
marco "correct": true si el código cumple el objetivo aunque tenga errores que señalo específicamente, 
mi feedback es breve, alentador y señala exactamente qué corregir, 
siempre respondo con JSON puro { "correct": boolean, "feedback": "string" } 
para dar certeza matemática y reducir ansiedad ejecutiva.
`;

export const useGroqAI = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  
  // 1. Función para el chat (streaming)
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
        temperature: 0.9,
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

  // 2. Función para validar respuestas (JSON)
  const validateAnswer = async (
    questionContext: string, 
    userAnswer: string,      
    expectedSolution?: string 
  ): Promise<{ correct: boolean; feedback: string }> => {
    setIsValidating(true);
    try {
      const prompt = `
        CONTEXTO DEL PASO: ${questionContext}
        3. SOLUCIÓN DE REFERENCIA (NO ESTRICTA): "${expectedSolution || 'N/A'}"
        
        Respuesta del estudiante: "${userAnswer}"
        INSTRUCCIONES PARA TI:
        - Compara el código del estudiante con el CONTEXTO.
        - La solución de referencia es solo un ejemplo de cómo podría verse, NO fuerces a que sea idéntica.
        -Revisa la asignacion del operador '=' correctamente e ignora las comillas simples vs dobles ambas son correctas.
        Evalúa y devuelve SOLO el JSON.
      `;

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: VALIDATOR_SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7, 
        response_format: { type: "json_object" } 
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

  // 3. ✅ NUEVA FUNCIÓN: Generar Pistas
  const generateHint = async (
    taskContext: string,
    currentStep: string,
    userAttempt: string
  ): Promise<string> => {
    setIsStreaming(true); // Reusamos el estado de loading visual (o podrías crear uno isHinting)
    try {
      const prompt = `
        Contexto general: ${taskContext}
        Paso actual que intenta resolver: ${currentStep}
        Lo que el usuario ha escrito hasta ahora: "${userAttempt}"
        
        ACTÚA COMO UN TUTOR SOCRÁTICO AMABLE. 
        El usuario está atascado. NO le des la respuesta directa ni escribas el código por él.
        Dames una PISTA breve (máximo 1 frase) o una pregunta guía que le ayude a deducir la respuesta por sí mismo.
        Si el usuario escribió algo incorrecto, señala suavemente qué parte revisar sin regañar.
        Ademas proporciona un ejemplo simple relacionado con el concepto, pero que no resuelva el paso actual.
      `;
  
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: "Eres un tutor experto que da pistas sutiles y motivadoras." },
          { role: 'user', content: prompt }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 0.7,
      });
  
      return completion.choices[0]?.message?.content || "Revisa la sintaxis básica e intenta de nuevo.";
    } catch (error) {
      console.error("Error generando pista:", error);
      return "No pude generar una pista en este momento.";
    } finally {
      setIsStreaming(false);
    }
  };

  // ✅ IMPORTANTE: Aquí es donde faltaba exportar generateHint
  return { 
    isStreaming, 
    isValidating, 
    streamResponse, 
    validateAnswer, 
    generateHint 
  };
};