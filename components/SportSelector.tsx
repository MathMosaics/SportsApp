import React from 'react';
import { SportIcon } from './Icons.tsx';

interface SportSelectorProps {
    selectedSport: string;
    onSelectSport: (sport: string) => void;
}

// Simplified sports list to align with new backend logic.
// "Basketball" now includes NBA, WNBA, and NCAA. "Football" includes NFL and NCAA.
const sports = ['All', 'Basketball', 'Football', 'Baseball', 'Hockey'];

export const SportSelector: React.FC<SportSelectorProps> = ({ selectedSport, onSelectSport }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {sports.map(sport => {
                const isSelected = selectedSport === sport;
                return (
                    <button
                        key={sport}
                        onClick={() => onSelectSport(sport)}
                        className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border ${
                            isSelected 
                            ? 'bg-green-500 border-green-400 text-white shadow-md' 
                            : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500'
                        }`}
                    >
                        <SportIcon sport={sport} className="text-lg" />
                        <span>{sport}</span>
                    </button>
                )
            })}
        </div>
    )
}