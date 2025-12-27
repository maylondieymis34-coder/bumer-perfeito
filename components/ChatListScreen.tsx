
import React from 'react';
import { Chat } from '../types';

interface Props {
  chats: Chat[];
  onChatClick: (chatId: string) => void;
}

const ChatListScreen: React.FC<Props> = ({ chats, onChatClick }) => {
  if (chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
        <div className="text-6xl grayscale opacity-50">💬</div>
        <h3 className="text-xl font-bold text-gray-700">Nenhuma conversa</h3>
        <p className="text-gray-400">Volte ao radar e lance um bumerangue para começar a conversar!</p>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-2">
      {chats.map((chat) => (
        <div 
          key={chat.id}
          className="flex items-center p-4 bg-white rounded-3xl space-x-4 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
          onClick={() => onChatClick(chat.id)}
        >
          <div className="relative">
            <img 
              src={chat.user.image} 
              alt={chat.user.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-100"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-gray-800">{chat.user.name}</h4>
              <span className="text-[10px] font-bold text-gray-300 uppercase">Agora</span>
            </div>
            <p className="text-sm text-gray-500 truncate mt-0.5">
              {chat.lastMessage || 'Clique para abrir um quebra-gelo...'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListScreen;
