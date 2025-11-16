
import React, { useState } from 'react';
import { Header } from './components/Header';
import { MatchupAnalyzer } from './components/MatchupAnalyzer';
import { TeamStats } from './components/TeamStats';
import { BettingGuide } from './components/BettingGuide';
import { TrophyIcon, ChartBarIcon, BookOpenIcon } from './components/Icons';

type Tab = 'analyzer' | 'stats' | 'guide';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('analyzer');

  const renderContent = () => {
    switch (activeTab) {
      case 'analyzer':
        return <MatchupAnalyzer />;
      case 'stats':
        return <TeamStats />;
      case 'guide':
        return <BettingGuide />;
      default:
        return <MatchupAnalyzer />;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; label: string; icon: React.ReactNode }> = ({ tabName, label, icon }) => {
    const isActive = activeTab === tabName;
    return (
      <button
        onClick={() => setActiveTab(tabName)}
        className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-t-lg transition-all duration-300 border-b-2 ${
          isActive
            ? 'text-green-400 border-green-400 bg-gray-800/50'
            : 'text-gray-400 border-transparent hover:bg-gray-800/30 hover:text-gray-200'
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
         <div className="max-w-3xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-700/50 mb-6">
                <TabButton tabName="analyzer" label="Matchup Analyzer" icon={<TrophyIcon className="w-5 h-5"/>} />
                <TabButton tabName="stats" label="Team Stats" icon={<ChartBarIcon className="w-5 h-5"/>} />
                <TabButton tabName="guide" label="Betting Guide" icon={<BookOpenIcon className="w-5 h-5"/>} />
            </div>

            {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
