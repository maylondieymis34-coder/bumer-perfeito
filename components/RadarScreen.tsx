
import React from 'react';
import { MOCK_PROFILES } from '../constants';
import { UserProfile } from '../types';

interface Props {
  onProfileClick: (profile: UserProfile) => void;
}

const RadarScreen: React.FC<Props> = ({ onProfileClick }) => {
  return (
    <div className="p-4 grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-500">
      {MOCK_PROFILES.map((profile) => (
        <div 
          key={profile.id}
          className="relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all active:scale-[0.97] cursor-pointer group"
          onClick={() => onProfileClick(profile)}
        >
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src={profile.image} 
              alt={profile.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-lg leading-tight">{profile.name}, {profile.age}</h3>
            <p className="text-[10px] uppercase tracking-widest font-semibold opacity-80">Ver perfil</p>
          </div>

          <div className="absolute top-2 right-2 w-10 h-10 rounded-full gradient-bg border-4 border-white flex items-center justify-center text-xl shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
            🪃
          </div>
        </div>
      ))}
      <div className="col-span-2 py-8 text-center text-gray-400 italic text-sm">
        Ninguém mais por perto... Tente mais tarde!
      </div>
    </div>
  );
};

export default RadarScreen;
