import React from 'react';
import { BookOpenIcon } from './Icons.tsx';

export const BettingGuide: React.FC = () => {
    return (
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-700/50 animate-fade-in space-y-8">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2 flex items-center justify-center gap-3">
                    <BookOpenIcon className="w-8 h-8"/>
                    Beginner's Guide to Sports Betting
                </h2>
                <p className="text-center text-gray-400">
                    Understanding the basics in simple terms.
                </p>
            </div>

            <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-headings:text-gray-100 prose-strong:text-green-400">
                <section>
                    <h3 className="text-xl font-bold text-gray-200">Common Bet Types Explained</h3>
                    <p>Here are the three most common types of bets you'll encounter:</p>
                    
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-green-400">1. Moneyline</h4>
                        <p>This is the simplest bet: you're just picking which team will win the game outright. Odds are shown with a plus (+) for the underdog and a minus (-) for the favorite.</p>
                        <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 my-2 text-sm">
                            <p><strong>Example:</strong> Team A (-150) vs. Team B (+130)</p>
                            <ul>
                                <li><strong>-150 Favorite:</strong> You need to bet $150 to win $100.</li>
                                <li><strong>+130 Underdog:</strong> A $100 bet wins you $130.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-green-400">2. Point Spread</h4>
                        <p>This bet is about *how much* a team wins or loses by. The favorite is given a handicap (a negative number) and the underdog gets a head start (a positive number).</p>
                        <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 my-2 text-sm">
                            <p><strong>Example:</strong> Team A (-7.5) vs. Team B (+7.5)</p>
                             <ul>
                                <li>To win a bet on <strong>Team A</strong>, they must win the game by 8 points or more.</li>
                                <li>To win a bet on <strong>Team B</strong>, they must either win the game outright or lose by 7 points or fewer.</li>
                            </ul>
                        </div>
                    </div>

                     <div className="mt-4">
                        <h4 className="text-lg font-semibold text-green-400">3. Over/Under (Totals)</h4>
                        <p>Instead of betting on a winner, you're betting on the total number of points scored in the game by both teams combined. The sportsbook sets a total, and you bet on whether the final score will be over or under that number.</p>
                         <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 my-2 text-sm">
                            <p><strong>Example:</strong> Over/Under 210.5 points</p>
                             <ul>
                                <li>If you bet <strong>Over</strong>, you win if the combined score is 211 or more (e.g., 110-101).</li>
                                <li>If you bet <strong>Under</strong>, you win if the combined score is 210 or less (e.g., 105-100).</li>
                            </ul>
                        </div>
                    </div>
                </section>
                
                <section className="mt-8">
                     <h3 className="text-xl font-bold text-gray-200">Key Things for Beginners</h3>
                     <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li><strong>Manage Your Bankroll:</strong> Only bet what you can comfortably afford to lose. Never chase your losses. Set a budget and stick to it.</li>
                        <li><strong>Do Your Research:</strong> Don't just bet on your favorite team. Use the tools in this app to look at stats, injuries, and recent performance before making a decision.</li>
                        <li><strong>Bet With Your Head, Not Your Heart:</strong> It's easy to be biased. Try to look at the data objectively and make informed choices rather than emotional ones.</li>
                        <li><strong>Understand the Odds:</strong> The odds don't just tell you the payout; they also represent the implied probability of an outcome. Understanding this is key to finding value.</li>
                     </ul>
                </section>

                <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
                    <p className="font-bold text-lg text-orange-400 mb-2">Responsible Gambling Disclaimer</p>
                    <p>Sports betting should be a fun form of entertainment. If you or someone you know has a gambling problem, help is available. Please do not hesitate to seek assistance.</p>
                    <p className="mt-3">
                        Call the National Problem Gambling Helpline at:
                        <a href="tel:1-800-522-4700" className="block text-lg font-bold text-white hover:text-green-400 transition-colors mt-1">
                            1-800-522-4700
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};