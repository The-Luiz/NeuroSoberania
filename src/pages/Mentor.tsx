// src/pages/Mentor.tsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Brain, MessageCircle, FileText, Target, BookOpen, 
  Send, Mic, Video, ChevronRight, CheckCircle, Zap 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ChatMessage from '../mentor/ChatMessage';
import { useGroqAI } from '../hooks/useGroqAI';

const Mentor: React.FC = () => {
  const { chat, setChat, setAiPanelOpen } = useAppContext();
  const { isStreaming, streamResponse } = useGroqAI();
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático al nuevo mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Manejar el envío del mensaje REAL con streaming
  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput === '') return;

    // Añadir mensaje del usuario
    const newChat = [...chat, { type: 'user' as const, text: trimmedInput }];
    setChat(newChat);
    setInput('');

    // Iniciar streaming de respuesta de IA
    let accumulatedResponse = '';
    streamResponse(
      trimmedInput,
      (chunk) => {
        accumulatedResponse += chunk;
        // Actualizar el último mensaje del chat con la respuesta acumulada
        setChat([...newChat, { type: 'ai' as const, text: accumulatedResponse }]);
      },
      () => {
        // onComplete: ya no necesitas hacer nada adicional
      }
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInput('Explícame cómo funciona Lightning Network');
    }, 3000);
  };

  const getContextualHelp = () => {
    return [
      { icon: <BookOpen size={18} />, text: "Crear plan de estudio", action: "plan estudio" },
      { icon: <Target size={18} />, text: "Explicar concepto complejo", action: "explicar concepto" },
      { icon: <FileText size={18} />, text: "Revisar mi código", action: "revisar código" },
      { icon: <Zap size={18} />, text: "Consejos para entrevistas", action: "consejos entrevista" }
    ];
  };

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mentor IA Cognitivo
          </h2>
          <p className="text-gray-600">Tu asistente personal para el crecimiento profesional y cognitivo</p>
        </div>
        <button
          onClick={() => setAiPanelOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold text-sm"
          aria-label="Obtener ayuda contextual"
        >
          <Brain className="w-4 h-4" />
          Ayuda contextual
        </button>
      </div>

      {/* Chat Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Asistente Cognitivo</h3>
                <div className="flex items-center gap-2 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>{isStreaming ? 'Escribiendo...' : 'Siempre disponible'}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center hover:bg-opacity-30 transition-all">
                <Video size={16} />
              </button>
              <button 
                onClick={startRecording}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
                aria-label={isRecording ? "Detener grabación" : "Iniciar grabación de voz"}
              >
                <Mic size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[600px] overflow-y-auto p-6 space-y-6" id="chat-messages">
          {chat.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          
          {isStreaming && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-5 py-3 max-w-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-100 p-4 bg-gray-50">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje... (Presiona Enter para enviar, Shift+Enter para nueva línea)"
                className="w-full p-4 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all min-h-[56px] max-h-[120px] overflow-y-auto"
                rows={1}
                aria-label="Mensaje para el mentor IA"
                disabled={isStreaming}
              />
              <button
                onClick={handleSend}
                disabled={input.trim() === '' || isStreaming}
                className={`absolute right-3 bottom-3 p-1.5 rounded-full ${
                  input.trim() === '' || isStreaming
                    ? 'text-gray-400'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                } transition-all`}
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap justify-between items-center gap-2">
            <div className="flex gap-2 text-xs text-gray-500">
              <span>•</span>
              <span>Presiona Enter para enviar</span>
              <span>•</span>
              <span>Shift+Enter para nueva línea</span>
            </div>
            <div className="flex gap-3">
              {getContextualHelp().map((help, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(help.text);
                    setTimeout(handleSend, 100);
                  }}
                  className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition-all"
                  disabled={isStreaming}
                >
                  {help.icon}
                  <span>{help.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: <BookOpen className="w-6 h-6" />,
            title: "Plan de Estudio",
            description: "Crea un plan personalizado",
            color: "bg-purple-50 text-purple-700"
          },
          {
            icon: <Target className="w-6 h-6" />,
            title: "Explicar Concepto",
            description: "Ayuda con temas complejos",
            color: "bg-blue-50 text-blue-700"
          },
          {
            icon: <FileText className="w-6 h-6" />,
            title: "Revisión de Código",
            description: "Feedback técnico detallado",
            color: "bg-green-50 text-green-700"
          },
          {
            icon: <Zap className="w-6 h-6" />,
            title: "Consejos Profesionales",
            description: "Preparación para oportunidades",
            color: "bg-yellow-50 text-yellow-700"
          }
        ].map((action, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(action.title);
              setTimeout(handleSend, 100);
            }}
            className={`rounded-2xl p-5 text-left border-2 border-dashed hover:border-solid transition-all ${
              action.color
            }`}
            disabled={isStreaming}
          >
            <div className="mb-3">{action.icon}</div>
            <h4 className="font-bold mb-1">{action.title}</h4>
            <p className="text-sm opacity-80">{action.description}</p>
          </button>
        ))}
      </div>

      {/* AI Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-start gap-4">
          <Brain className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Consejos para interactuar con tu Mentor IA
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>Sé específico:</strong> "Explícame Lightning Network para principiantes" es mejor que "Háblame de Bitcoin"
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>Pide ejemplos prácticos:</strong> "Muéstrame un ejemplo de código Python para esto"
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                <span>
                  <strong>Itera en tus preguntas:</strong> "Ahora explícame eso mismo pero para un nivel avanzado"
                </span>
              </li>
            </ul>
            <button
              onClick={() => setAiPanelOpen(true)}
              className="mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
            >
              Ver más consejos de interacción
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentor;