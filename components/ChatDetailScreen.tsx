
import React, { useState, useRef, useEffect } from 'react';
import { Chat, Message } from '../types';
import { gemini } from '../services/geminiService';

interface Props {
  chat: Chat;
  currentUserName: string;
  onBack: () => void;
  onNewMessage: (msg: Message) => void;
}

const ChatDetailScreen: React.FC<Props> = ({ chat, currentUserName, onBack, onNewMessage }) => {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages, isTyping]);

  const handleSend = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      text: text,
      timestamp: new Date()
    };

    onNewMessage(userMsg);
    setInputText('');
    
    // Simulate thinking and response
    setIsTyping(true);
    const responseText = await gemini.simulateResponse(chat.user, text);
    
    setIsTyping(false);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      senderId: chat.user.id,
      text: responseText,
      timestamp: new Date()
    };
    onNewMessage(botMsg);
  };

  const generateIcebreaker = async () => {
    setIsTyping(true);
    const icebreaker = await gemini.generateIcebreaker(chat.user, currentUserName);
    setIsTyping(false);
    setInputText(icebreaker);
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F9FC]">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm z-10 sticky top-0">
        <button onClick={onBack} className="text-2xl mr-4 text-pink-500">←</button>
        <img src={chat.user.image} className="w-10 h-10 rounded-full object-cover mr-3 border border-pink-100" alt={chat.user.name} />
        <div>
          <h4 className="font-bold text-gray-800">{chat.user.name}</h4>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-tighter">Online agora</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 hide-scrollbar">
        {chat.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full opacity-60 text-center px-8">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-3xl mb-4">✨</div>
            <p className="text-sm font-medium text-gray-500">
              Inicie a conversa com algo especial! Que tal usar o nosso Quebra-Gelo IA?
            </p>
            <button 
              onClick={generateIcebreaker}
              className="mt-4 px-6 py-2 rounded-full gradient-bg text-white font-bold text-sm shadow-md"
            >
              Gerar Quebra-Gelo
            </button>
          </div>
        )}

        {chat.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium shadow-sm ${
              msg.senderId === 'current-user' 
                ? 'bg-pink-500 text-white rounded-br-none' 
                : 'bg-white text-gray-700 rounded-bl-none border border-gray-100'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1 border border-gray-100">
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
              <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-pink-400 transition-all">
          <input 
            type="text" 
            placeholder="Mensagem..." 
            className="flex-1 bg-transparent py-3 outline-none text-gray-700 font-medium"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={() => handleSend()}
            className="ml-2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold shadow-lg"
          >
            ➜
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailScreen;
