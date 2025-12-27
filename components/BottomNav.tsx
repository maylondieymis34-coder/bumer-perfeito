
import React from 'react';

interface Props {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const BottomNav: React.FC<Props> = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t h-20 flex justify-around items-center px-4 z-30 shadow-up pb-2">
      <button 
        onClick={() => onNavigate('radar')}
        className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${activeScreen === 'radar' ? 'text-pink-500 scale-110' : 'text-gray-300'}`}
      >
        <span className="text-2xl">🧭</span>
        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Radar</span>
      </button>
      
      <button 
        onClick={() => onNavigate('chats')}
        className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${activeScreen === 'chats' ? 'text-pink-500 scale-110' : 'text-gray-300'}`}
      >
        <span className="text-2xl">💬</span>
        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Chats</span>
      </button>
      
      <button 
        onClick={() => onNavigate('vault')}
        className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${activeScreen === 'vault' ? 'text-pink-500 scale-110' : 'text-gray-300'}`}
      >
        <span className="text-2xl">📦</span>
        <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Baú</span>
      </button>
      <style>{`
        .shadow-up {
          box-shadow: 0 -4px 12px rgba(0,0,0,0.03);
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
