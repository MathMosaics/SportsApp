import React from 'react';
import { type Analysis, type Source, type Odds } from '../types.ts';
import { TrophyIcon, DocumentTextIcon, LinkIcon, MoneyLineIcon, SpreadIcon, OverUnderIcon, TeamTotalsIcon } from './Icons.tsx';

interface AnalysisResultDisplayProps {
  analysis: Analysis;
  sources: Source[];
}

const OddsDisplay: React.FC<{ odds: Odds; teamA: string; teamB: string; oddsSources: string[] }> = ({ odds, teamA, teamB, oddsSources }) => {
  return (
    <div className="mt-8">
      <h4 className="text-xl font-bold text-gray-200 mb-2 text-center">
        Average Market Odds
      </h4>
      <p className="text-xs text-gray-500 text-center mb-4">
        Averaged from: {oddsSources.join(', ')}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Spread Card */}
        {odds.spread?.teamA && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h5 className="flex items-center justify-center font-bold text-gray-300 mb-3 text-center">
              <SpreadIcon className="w-5 h-5 mr-2 text-blue-400" />
              Point Spread
            </h5>
            <div className="flex justify-between items-start text-center">
              <div className="w-1/2 px-1">
                <p className="font-semibold text-white truncate">{teamA}</p>
                <p className="text-lg font-bold text-green-400">{odds.spread.teamA.value}</p>
                <p className="text-sm text-gray-400">{odds.spread.teamA.odds}</p>
              </div>
              <div className="w-1/2 px-1">
                <p className="font-semibold text-white truncate">{teamB}</p>
                <p className="text-lg font-bold text-green-400">{odds.spread.teamB.value}</p>
                <p className="text-sm text-gray-400">{odds.spread.teamB.odds}</p>
              </div>
            </div>
          </div>
        )}

        {/* MoneyLine Card */}
        {odds.moneyLine?.teamA && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h5 className="flex items-center justify-center font-bold text-gray-300 mb-3">
              <MoneyLineIcon className="w-5 h-5 mr-2 text-green-400" />
              MoneyLine
            </h5>
            <div className="flex justify-between items-start text-center">
               <div className="w-1/2 px-1">
                <p className="font-semibold text-white truncate">{teamA}</p>
                <p className="text-lg font-bold text-green-400">{odds.moneyLine.teamA.value}</p>
              </div>
               <div className="w-1/2 px-1">
                <p className="font-semibold text-white truncate">{teamB}</p>
                <p className="text-lg font-bold text-green-400">{odds.moneyLine.teamB.value}</p>
              </div>
            </div>
          </div>
        )}

        {/* Over/Under Card */}
        {odds.overUnder?.prediction && (
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-center">
            <h5 className="flex items-center justify-center font-bold text-gray-300 mb-3">
              <OverUnderIcon className="w-5 h-5 mr-2 text-yellow-400" />
              Game Total Prediction
            </h5>
            <p className="text-2xl font-bold text-green-400">
              {odds.overUnder.prediction} {odds.overUnder.value}
            </p>
            <p className="text-lg text-gray-400">{odds.overUnder.odds}</p>
          </div>
        )}
        
        {/* Team Totals Card */}
        {odds.teamTotals?.teamA && (
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <h5 className="flex items-center justify-center font-bold text-gray-300 mb-3 text-center">
                    <TeamTotalsIcon className="w-5 h-5 mr-2 text-purple-400" />
                    Team Total Predictions
                </h5>
                <div className="flex justify-between items-start text-center">
                    <div className="w-1/2 px-1">
                        <p className="font-semibold text-white truncate">{teamA}</p>
                        <p className="text-lg font-bold text-green-400">
                          {odds.teamTotals.teamA.prediction} {odds.teamTotals.teamA.value}
                        </p>
                        <p className="text-sm text-gray-400">{odds.teamTotals.teamA.odds}</p>
                    </div>
                    <div className="w-1/2 px-1">
                        <p className="font-semibold text-white truncate">{teamB}</p>
                        <p className="text-lg font-bold text-green-400">
                           {odds.teamTotals.teamB.prediction} {odds.teamTotals.teamB.value}
                        </p>
                        <p className="text-sm text-gray-400">{odds.teamTotals.teamB.odds}</p>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}


export const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ analysis, sources }) => {
  
  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high':
        return 'text-green-400 border-green-400';
      case 'medium':
        return 'text-yellow-400 border-yellow-400';
      case 'low':
        return 'text-orange-400 border-orange-400';
      default:
        return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-400">Predicted Winner</h3>
        <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 my-2 flex items-center justify-center gap-3">
          <TrophyIcon className="w-8 h-8"/>
          {analysis.predictedWinner}
        </p>
        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${getConfidenceColor(analysis.confidence)}`}>
          {analysis.confidence} Confidence
        </span>
      </div>

      <div className="mb-6">
        <h4 className="flex items-center text-xl font-bold text-gray-200 mb-3">
          <DocumentTextIcon className="w-6 h-6 mr-2 text-blue-400" />
          Detailed Analysis
        </h4>
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 prose prose-invert prose-p:text-gray-300 max-w-none">
           <p className="whitespace-pre-wrap">{analysis.analysis}</p>
        </div>
      </div>
      
      {analysis.odds && analysis.teamA && analysis.teamB && analysis.oddsSources && (
        <OddsDisplay odds={analysis.odds} teamA={analysis.teamA} teamB={analysis.teamB} oddsSources={analysis.oddsSources} />
      )}

      {sources.length > 0 && (
        <div className="mt-8">
          <h4 className="flex items-center text-xl font-bold text-gray-200 mb-3">
            <LinkIcon className="w-6 h-6 mr-2 text-green-400" />
            Sources
          </h4>
          <ul className="space-y-2">
            {sources.map((source, index) => (
              <li key={index} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 font-medium break-all"
                >
                  {source.title || source.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};