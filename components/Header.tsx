
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-4 border-b border-gray-700/50 shadow-lg bg-gray-900/60 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
          Sports Bet <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Analyzer AI</span>
        </h1>
      </div>
    </header>
  );
};
