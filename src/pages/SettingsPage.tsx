import React from 'react';
import { usePhrases } from '../hooks/usePhrases';
import { useUserStats } from '../hooks/useUserStats';
import { Trash2, Shield, Settings, Info, CreditCard, Award, Flame } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { customPhrases, deleteCustomPhrase } = usePhrases();
  const { stats, resetStats } = useUserStats();

  const resetAllProgress = () => {
    if (confirm('Are you sure? This will delete all custom phrases and reset your learning progress.')) {
      resetStats();
      localStorage.removeItem('custom_phrases');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <Shield size={20} />
          My Progress
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-3xl border border-accent/10 shadow-sm flex flex-col items-center text-center">
            <Flame className="text-orange-500 mb-2" size={24} />
            <span className="text-2xl font-black text-stone-800">{stats.streak}</span>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Day Streak</span>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-accent/10 shadow-sm flex flex-col items-center text-center">
            <Award className="text-primary mb-2" size={24} />
            <span className="text-2xl font-black text-stone-800">{stats.masteredPhrases.length}</span>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Mastered</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-accent/10 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide">Usage Stats</h3>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-400">Search-to-Translate Ratio</span>
            <span className="text-stone-800 font-bold">
              {stats.searchCount}:{stats.translateCount}
            </span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${(stats.searchCount / (stats.searchCount + stats.translateCount || 1)) * 100}%` }}
            />
            <div 
              className="h-full bg-accent" 
              style={{ width: `${(stats.translateCount / (stats.searchCount + stats.translateCount || 1)) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-stone-400 leading-tight italic">
            Shows how often you find existing phrases (Green) vs. when you need new translations (Gold).
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-accent/10 overflow-hidden">
          <div className="p-6 border-b border-stone-50 flex items-center justify-between">
            <span className="font-medium text-stone-700">Custom Phrases</span>
            <span className="bg-accent text-primary px-3 py-1 rounded-full text-xs font-bold">
              {customPhrases.length} Added
            </span>
          </div>
          <button 
            onClick={resetAllProgress}
            className="w-full p-6 text-left text-red-500 font-bold flex items-center gap-3 active:bg-red-50 transition-colors"
          >
            <Trash2 size={20} />
            Reset All Progress
          </button>
        </div>
      </div>

      {customPhrases.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <CreditCard size={20} />
            My Custom Phrases
          </h2>
          <div className="space-y-2">
            {customPhrases.map(p => (
              <div key={p.id} className="bg-white p-4 rounded-2xl border border-stone-100 flex justify-between items-center shadow-sm">
                <div>
                  <p className="font-bold text-primary">{p.cantonese}</p>
                  <p className="text-xs text-stone-500">{p.english}</p>
                </div>
                <button 
                  onClick={() => deleteCustomPhrase(p.id)}
                  className="p-3 text-stone-300 active:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <Info size={20} />
          About
        </h2>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-accent/10 text-sm text-stone-500 leading-relaxed">
          <p>CantoPal is a mobile-first Cantonese learning tool designed for on-the-go practice.</p>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-stone-300">Version 1.2.0-enhanced</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
