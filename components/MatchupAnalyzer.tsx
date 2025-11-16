import React, { useState, useCallback, useEffect } from 'react';
import { AnalysisResultDisplay } from './AnalysisResultDisplay.tsx';
import { LoadingSpinner } from './LoadingSpinner.tsx';
import { TodaysGames } from './TodaysGames.tsx';
import { SportSelector } from './SportSelector.tsx';
import { UnderdogDisplay } from './UnderdogDisplay.tsx';
import { analyzeMatchup, fetchTodaysGames, fetchUnderdogOfTheDay } from '../services/geminiService.ts';
import { type Game, type Analysis, type Source, type Underdog } from '../types.ts';
import { TrophyIcon, ExclamationTriangleIcon, CalendarIcon, TrendingUpIcon } from './Icons.tsx';

type AnalysisResult = { analysis: Analysis; sources: Source[] } | null;

export const MatchupAnalyzer: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('All');

  // State for Matchup Analysis
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  
  // State for Today's Games
  const [todaysGames, setTodaysGames] = useState<Game[]>([]);
  const [isGamesLoading, setIsGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);

  // State for Underdog of the Day
  const [underdog, setUnderdog] = useState<Underdog | null>(null);
  const [isUnderdogLoading, setIsUnderdogLoading] = useState(false);
  const [underdogError, setUnderdogError] = useState<string | null>(null);
  const [underdogFetched, setUnderdogFetched] = useState(false); // Track if the fetch has been attempted

  // Fetch games
  useEffect(() => {
    const loadGames = async () => {
      setIsGamesLoading(true);
      setGamesError(null);
      try {
        const games = await fetchTodaysGames(selectedSport);
        setTodaysGames(games);
      } catch (e) {
        setGamesError(e instanceof Error ? e.message : 'An unknown error occurred.');
      } finally {
        setIsGamesLoading(false);
      }
    };
    loadGames();
  }, [selectedSport]);

  const handleFetchUnderdog = useCallback(async () => {
    setIsUnderdogLoading(true);
    setUnderdogError(null);
    setUnderdogFetched(true);
    try {
        const result = await fetchUnderdogOfTheDay();
        setUnderdog(result);
        if (!result) {
          // If the API returns null (e.g., no underdogs found), show a gentle message
          setUnderdogError("Could not find a suitable Underdog of the Day at this time.");
        }
    } catch (e) {
        console.error("Failed to fetch underdog of the day:", e);
        setUnderdogError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
        setIsUnderdogLoading(false);
    }
  }, []);

  const handleAnalysisExecution = useCallback(async (matchup: string) => {
    if (!matchup.trim()) return;
    
    document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsAnalysisLoading(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeMatchup(matchup);
      setAnalysisResult(result);
    } catch (e) {
      setAnalysisError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsAnalysisLoading(false);
    }
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAnalysisExecution(query);
  };
  
  const handleGameSelect = useCallback((game: Game) => {
    const matchup = `${game.teamA} vs ${game.teamB}`;
    setQuery(matchup);
    handleAnalysisExecution(matchup);
  }, [handleAnalysisExecution]);

  const handleUnderdogAnalysis = useCallback((matchup: string) => {
    setQuery(matchup);
    handleAnalysisExecution(matchup);
  }, [handleAnalysisExecution]);

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          Matchup Analyzer
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Enter two teams or select from today's games below.
        </p>
        <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Golden State Warriors vs Boston Celtics"
            className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 ease-in-out text-lg placeholder-gray-500"
            disabled={isAnalysisLoading}
          />
          <button
            type="submit"
            className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            disabled={isAnalysisLoading}
          >
            <TrophyIcon className="w-5 h-5 mr-2"/>
            {isAnalysisLoading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
      </div>

      <div className="mt-8">
        {!underdogFetched ? (
            <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-2xl shadow-2xl border border-dashed border-gray-700/50 text-center">
                 <h3 className="flex items-center justify-center text-xl font-bold text-gray-200 mb-3">
                    <TrendingUpIcon className="w-6 h-6 mr-3 text-purple-400" />
                    Find a Value Bet
                </h3>
                <p className="text-gray-400 mb-4">Discover the day's biggest moneyline underdog.</p>
                <button
                    onClick={handleFetchUnderdog}
                    disabled={isUnderdogLoading}
                    className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isUnderdogLoading ? 'Searching...' : 'Find Underdog of the Day'}
                </button>
            </div>
        ) : (
            <UnderdogDisplay
              underdog={underdog}
              isLoading={isUnderdogLoading}
              error={underdogError}
              onAnalyze={handleUnderdogAnalysis}
            />
        )}
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50 mt-8">
        <h3 className="flex items-center text-xl font-bold text-gray-200 mb-4">
          <CalendarIcon className="w-6 h-6 mr-3 text-blue-400" />
          Today's Key Matchups
        </h3>
        <SportSelector selectedSport={selectedSport} onSelectSport={setSelectedSport} />
        <TodaysGames 
          games={todaysGames}
          isLoading={isGamesLoading}
          error={gamesError}
          onGameSelect={handleGameSelect}
        />
      </div>

      <div id="results-section" className="mt-8">
        {isAnalysisLoading && <LoadingSpinner />}
        {analysisError && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg flex items-center" role="alert">
              <ExclamationTriangleIcon className="w-6 h-6 mr-3"/>
              <div>
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{analysisError}</span>
              </div>
          </div>
        )}
        {analysisResult?.analysis && <AnalysisResultDisplay analysis={analysisResult.analysis} sources={analysisResult.sources} />}
        {!isAnalysisLoading && !analysisError && !analysisResult && (
          <div className="text-center py-10 px-6 bg-gray-800/30 rounded-2xl border border-dashed border-gray-700">
            <TrophyIcon className="w-16 h-16 mx-auto text-gray-600 mb-4"/>
            <h3 className="text-xl font-semibold text-gray-400">Ready for the Analysis</h3>
            <p className="text-gray-500 mt-2">Your matchup prediction will appear here.</p>
          </div>
        )}
      </div>
    </>
  );
};