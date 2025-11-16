import React, { useState, useCallback } from 'react';
import { fetchTeamStats } from '../services/geminiService.ts';
import { type TeamStatsData } from '../types.ts';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { ChartBarIcon, ExclamationTriangleIcon, UserGroupIcon, ClipboardDocumentListIcon } from './Icons.tsx';

export const TeamStats: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [stats, setStats] = useState<TeamStatsData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setStats(null);
        
        try {
            const result = await fetchTeamStats(query);
            setStats(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
                    Team Statistics
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Enter a major US pro or college team to get detailed stats.
                </p>
                <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Boston Celtics"
                        className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out text-lg placeholder-gray-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                        disabled={isLoading}
                    >
                        <ChartBarIcon className="w-5 h-5 mr-2"/>
                        {isLoading ? 'Searching...' : 'Get Stats'}
                    </button>
                </form>
            </div>

            <div className="mt-8">
                {isLoading && <LoadingSpinner />}
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center" role="alert">
                        <ExclamationTriangleIcon className="w-6 h-6 mr-3"/>
                        <div>
                            <strong className="font-bold">Error: </strong>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    </div>
                )}
                {stats && <StatsDisplay stats={stats} />}
                {!isLoading && !error && !stats && (
                    <div className="text-center py-10 px-6 bg-gray-800/30 rounded-2xl border border-dashed border-gray-700">
                        <ChartBarIcon className="w-16 h-16 mx-auto text-gray-600 mb-4"/>
                        <h3 className="text-xl font-semibold text-gray-400">Ready for Deep Dive</h3>
                        <p className="text-gray-500 mt-2">Your team stats report will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const StatsDisplay: React.FC<{ stats: TeamStatsData }> = ({ stats }) => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50 animate-fade-in space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">{stats.teamName}</h2>

            {/* Season Stats */}
            <div>
                <h3 className="text-xl font-bold text-gray-200 mb-4 text-center">Season Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SeasonCard seasonStats={stats.currentSeason} />
                    <SeasonCard seasonStats={stats.lastSeason} />
                </div>
            </div>

            {/* Player Information */}
            <div>
                 <h3 className="flex items-center justify-center text-xl font-bold text-gray-200 mb-4">
                    <UserGroupIcon className="w-6 h-6 mr-2 text-blue-400"/>
                    Player Information
                </h3>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <PlayerList title="A-Team / Starters" players={stats.aTeamLineup} />
                    <InjuryList injuries={stats.injuryReport} />
                    <div className="lg:col-span-2">
                        <PlayerList title="Full Roster" players={stats.fullRoster} />
                    </div>
                 </div>
            </div>

            {/* Recent Games */}
            <div>
                <h3 className="text-xl font-bold text-gray-200 mb-4 text-center">Recent Games</h3>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <ul className="divide-y divide-gray-700">
                        {stats.recentGames.map((game, index) => (
                            <li key={index} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-gray-400">vs {game.opponent}</p>
                                    <p className="font-mono text-sm text-gray-300">{game.score}</p>
                                </div>
                                <span className={`font-bold text-lg ${game.result === 'W' ? 'text-green-400' : 'text-red-400'}`}>
                                    {game.result}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const SeasonCard: React.FC<{ seasonStats: TeamStatsData['currentSeason']}> = ({ seasonStats }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h4 className="font-bold text-lg text-center text-gray-300">{seasonStats.season}</h4>
        <p className="text-center text-2xl font-bold text-white my-2">
            {seasonStats.wins} - {seasonStats.losses}
        </p>
        <div className="mt-3 border-t border-gray-700 pt-3 space-y-1">
            {Object.entries(seasonStats.keyStats).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-400">{key}:</span>
                    <span className="font-semibold text-gray-200">{value}</span>
                </div>
            ))}
        </div>
    </div>
);

const PlayerList: React.FC<{ title: string, players: TeamStatsData['fullRoster'] }> = ({ title, players }) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 h-full">
        <h4 className="font-bold text-lg text-center mb-3 text-gray-300">{title}</h4>
        <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {players.map((player, index) => (
                <li key={index} className="flex justify-between text-sm p-1 rounded bg-gray-800/50">
                    <span className="font-medium text-gray-200">{player.name}</span>
                    <span className="text-gray-400">{player.position}</span>
                </li>
            ))}
        </ul>
    </div>
);

const InjuryList: React.FC<{ injuries: TeamStatsData['injuryReport'] }> = ({ injuries }) => (
     <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 h-full">
        <h4 className="flex items-center justify-center font-bold text-lg text-center mb-3 text-gray-300">
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2 text-orange-400" />
            Injury Report
        </h4>
        {injuries.length > 0 ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {injuries.map((injury, index) => (
                    <li key={index} className="p-1 rounded bg-gray-800/50">
                        <p className="font-medium text-gray-200">{injury.playerName} - <span className="font-semibold text-orange-400">{injury.status}</span></p>
                        <p className="text-xs text-gray-400 pl-1">{injury.details}</p>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-center text-gray-500 pt-4">No injuries reported.</p>
        )}
    </div>
);