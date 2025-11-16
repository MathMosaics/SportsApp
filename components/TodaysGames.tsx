import React from 'react';
import { type Game } from '../types.ts';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { ExclamationTriangleIcon, SportIcon } from './Icons.tsx';

interface TodaysGamesProps {
  games: Game[];
  isLoading: boolean;
  error: string | null;
  onGameSelect: (game: Game) => void;
}

// Helper function to format ISO date string to Central Time
const formatToCentralTime = (isoString: string): string => {
    try {
        const date = new Date(isoString);
        const formattedTime = date.toLocaleTimeString('en-US', {
            timeZone: 'America/Chicago',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
        return `${formattedTime} CT`;
    } catch (e) {
        console.error("Failed to format date:", isoString, e);
        return "Invalid Time";
    }
};

export const TodaysGames: React.FC<TodaysGamesProps> = ({ games, isLoading, error, onGameSelect }) => {
  return (
    <div className="mt-4">
      {isLoading && <LoadingSpinner />}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center" role="alert">
          <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}
      {!isLoading && !error && games.length === 0 && (
        <p className="text-gray-500 text-center py-4">No major upcoming games found for today.</p>
      )}
      {!isLoading && !error && games.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {games.map((game, index) => (
            <button
              key={index}
              onClick={() => onGameSelect(game)}
              className="text-left p-4 bg-gray-900/70 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-100">{game.teamA}</p>
                  <p className="font-bold text-gray-100">vs {game.teamB}</p>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-sm text-gray-400">{game.sport}</span>
                    <span className="text-xs font-semibold text-blue-300 bg-blue-900/50 px-2 py-0.5 rounded">{formatToCentralTime(game.dateTime)}</span>
                  </div>
                </div>
                <SportIcon sport={game.sport} />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};