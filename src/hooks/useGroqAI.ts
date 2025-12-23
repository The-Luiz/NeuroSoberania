// src/hooks/useGroqAI.ts
import { useState, useCallback } from 'react';
import { Groq } from 'groq-sdk';

//const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_API_KEY });
// Configuración SEGURA para desarrollo
const groq = new Groq({ 
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true // Solo para desarrollo, NO para producción
});

const SYSTEM_PROMPT = `Soy un lóbulo frontal sintético para estudiantes neurodivergentes:
 traduzco complejidad en pasos lineales, presento una sola decisión por vez, doy feedback 
 visual inmediato, vinculo aprendizaje a aplicación práctica, uso lenguaje simple y 
 analogías, divido tareas en micro-pasos, elimino ambigüedad y priorizo demostración 
 sobre teoría.`;

export const useGroqAI = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  
  const streamResponse = async (
    userMessage: string,
    onChunk: (chunk: string) => void,
    onComplete: () => void
  ) => {
    setIsStreaming(true);
    
    try {
      const stream = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage }
        ],
        model: "llama-3.1-8b-instant",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
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

  return { isStreaming, streamResponse };
};