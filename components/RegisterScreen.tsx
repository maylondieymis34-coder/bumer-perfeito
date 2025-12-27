
import React, { useState } from 'react';

interface Props {
  onRegister: (name: string, age: number, image: string) => void;
}

const RegisterScreen: React.FC<Props> = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && age && image) {
      onRegister(name, parseInt(age), image);
    } else {
      alert("Por favor, preencha todos os campos e adicione uma foto.");
    }
  };

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center space-y-8 bg-white">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">Criar Conta</h2>
        <p className="text-gray-500 mt-2">Personalize sua experiência no Bumer</p>
      </div>

      <div 
        className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-pink-500 transition-all hover:scale-105 ${image ? 'border-solid' : 'bg-gray-100'}`}
        onClick={() => document.getElementById('photo-input')?.click()}
      >
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-400">
            <span className="text-2xl">📷</span>
            <p className="text-xs font-bold mt-1 uppercase">Foto</p>
          </div>
        )}
      </div>
      <input 
        type="file" 
        id="photo-input" 
        hidden 
        accept="image/*" 
        onChange={handleFileChange} 
      />

      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">Nome Completo</label>
          <input 
            type="text" 
            placeholder="Ex: Maria Silva"
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-500 transition-all outline-none text-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">Sua Idade</label>
          <input 
            type="number" 
            placeholder="Ex: 24"
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-pink-500 transition-all outline-none text-gray-700"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button 
          type="submit"
          className="w-full py-4 rounded-2xl gradient-bg text-white font-bold text-lg shadow-lg shadow-pink-200 hover:brightness-110 active:scale-[0.98] transition-all mt-4"
        >
          Entrar no Radar
        </button>
      </form>
      
      <p className="text-xs text-center text-gray-400">
        Ao continuar, você concorda com nossos <br/> <b>Termos de Uso</b> e <b>Privacidade</b>.
      </p>
    </div>
  );
};

export default RegisterScreen;
