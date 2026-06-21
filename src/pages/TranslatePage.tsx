import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhrases } from '../hooks/usePhrases';
import { useUserStats } from '../hooks/useUserStats';
import SearchBar from '../components/SearchBar';
import PhraseCard from '../components/PhraseCard';
import { PlusCircle, Search as SearchIcon } from 'lucide-react';

const TranslatePage: React.FC = () => {
  const [input, setInput] = useState('');
  const { allPhrases } = usePhrases();
  const { incrementSearch, incrementTranslate } = useUserStats();
  const navigate = useNavigate();

  const results = input.trim() ? allPhrases.filter(p => 
    p.english.toLowerCase().includes(input.toLowerCase()) ||
    p.cantonese.toLowerCase().includes(input.toLowerCase())
  ).slice(0, 5) : [];

  // Track search effectiveness
  useEffect(() => {
    if (!input.trim()) return;
    
    const timer = setTimeout(() => {
      if (results.length > 0) {
        incrementSearch();
      } else {
        incrementTranslate();
      }
    }, 1000); // Track after 1s of typing

    return () => clearTimeout(timer);
  }, [input, results.length > 0]);

  const handleAddCustom = () => {
    navigate(`/add?english=${encodeURIComponent(input)}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-accent/10 space-y-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <SearchIcon size={20} />
          Find or Add
        </h2>
        <SearchBar value={input} onChange={setInput} />
      </div>

      <div className="space-y-4">
        {results.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest ml-1">Matching Phrases</h3>
            {results.map(phrase => (
              <PhraseCard key={phrase.id} phrase={phrase} />
            ))}
          </div>
        ) : input.trim() ? (
          <div className="text-center py-12 bg-white/50 rounded-3xl border border-dashed border-accent/20 px-6 space-y-4">
            <p className="text-stone-500 font-medium">No exact matches found for "{input}"</p>
            <button 
              onClick={handleAddCustom}
              className="w-full bg-primary/5 text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:bg-primary/10 transition-colors"
            >
              <PlusCircle size={20} />
              Add as a new phrase?
            </button>
          </div>
        ) : (
          <div className="text-center py-20 text-stone-300">
            <SearchIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">Type to search the phrasebook</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatePage;
