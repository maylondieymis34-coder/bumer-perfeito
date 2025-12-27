
import React from 'react';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-center sticky top-0 z-20 shadow-sm">
      <h1 className="gradient-text text-xl font-extrabold tracking-[0.2em]">{title}</h1>
      <div className="absolute right-4 text-xl">👤</div>
    </header>
  );
};

export default Header;
