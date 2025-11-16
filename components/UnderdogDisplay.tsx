import React from 'react';
import { type Underdog } from '../types.ts';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { ExclamationTriangleIcon, TrendingUpIcon } from './Icons.tsx';

interface UnderdogDisplayProps {
  underdog: Underdog | null;
  isLoading: boolean;
  error: string | null;
  onAnalyze: (matchup: string) => void;
}

// Helper function to format ISO date string to Central Time
const formatToCentralTime = (isoString: string): string => {
    try {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', {
            timeZone: 'America/Chicago',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }) + ' CT';
    } catch (e) {
        console.error("Failed to format date:", isoString, e);
        return "Invalid Time";
    }
};

export const UnderdogDisplay: React.FC<UnderdogDisplayProps> = ({ underdog, isLoading, error, onAnalyze }) => {
    if (isLoading) {
        return (
            <div className="bg-gray-800/50 p-4 rounded-xl text-center">
                <p className="text-sm text-gray-400 mb-2">Finding today's best value bet...</p>
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
         return (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center" role="alert">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                <span>Failed to fetch Underdog of the Day.</span>
            </div>
        );
    }
    
    if (!underdog) {
        return null; // Don't render anything if there's no underdog and no error
    }

    return (
        <div className="bg-gradient-to-br from-purple-900/50 via-gray-800/50 to-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-purple-700/50 animate-fade-in">
             <h3 className="flex items-center text-xl font-bold text-gray-200 mb-4">
                <TrendingUpIcon className="w-6 h-6 mr-3 text-purple-400" />
                Underdog of the Day
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <p className="text-2xl font-bold text-white">{underdog.teamName}</p>
                    <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400 my-1">{underdog.moneyLine}</p>
                    <p className="text-sm text-gray-400">{formatToCentralTime(underdog.dateTime)} vs {underdog.matchup.replace(underdog.teamName, '').replace('vs', '').trim()}</p>
                </div>
                <button
                    onClick={() => onAnalyze(underdog.matchup)}
                    className="w-full sm:w-auto flex-shrink-0 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Analyze Matchup
                </button>
            </div>
        </div>
    );
};