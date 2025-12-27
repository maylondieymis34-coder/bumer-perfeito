
import React from 'react';

const VaultScreen: React.FC = () => {
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center space-y-8 animate-in zoom-in-95 duration-500">
      <div className="w-40 h-40 gradient-bg rounded-3xl flex items-center justify-center text-7xl shadow-2xl relative">
        📦
        <div className="absolute -top-4 -right-4 bg-yellow-400 text-black font-black px-4 py-1 rounded-full text-xs shadow-xl rotate-12">PRO</div>
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tighter italic">Seu Baú de Memórias</h2>
        <p className="text-gray-500 font-medium">Fotos e vídeos exclusivos que você recebeu e desbloqueou durante suas conversas.</p>
      </div>
      
      <div className="w-full bg-white p-6 rounded-3xl shadow-sm border border-pink-100 space-y-4">
        <h4 className="font-bold text-gray-700 uppercase text-xs tracking-widest flex items-center">
          <span className="mr-2">🔥</span> Conteúdo Recente
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center">
                <span className="text-xl">🔒</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full py-4 rounded-2xl gradient-bg text-white font-black uppercase tracking-widest text-sm shadow-xl hover:brightness-110 active:scale-95 transition-all">
          Desbloquear Tudo
        </button>
      </div>
    </div>
  );
};

export default VaultScreen;
