import React from 'react';
import { MessageSquare, User } from 'lucide-react';

interface Message {
  type: 'user' | 'ai';
  text: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-5 py-4 ${
        message.type === 'user'
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
          : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
      }`}>
        {message.type === 'user' ? (
          <div className="flex items-center gap-2 mb-2 text-sm opacity-90">
            <User className="w-3 h-3" />
            <span>Tú</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-2 text-sm text-purple-600 font-medium">
            <MessageSquare className="w-3 h-3" />
            <span>Asistente IA</span>
          </div>
        )}
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;