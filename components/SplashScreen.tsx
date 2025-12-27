
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="gradient-bg w-full h-full flex flex-col items-center justify-center text-white animate-in fade-in duration-1000">
      <h1 className="text-6xl font-black tracking-widest animate-bounce">BUMER</h1>
      <p className="mt-4 text-lg font-medium opacity-90 tracking-wide">Conecte-se de um jeito novo</p>
      <div className="absolute bottom-10 animate-pulse">
        <div className="w-8 h-1 bg-white/30 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-white animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
