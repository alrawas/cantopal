import React, { useState } from 'react';
import { usePhrases } from '../hooks/usePhrases';
import PhraseCard from '../components/PhraseCard';
import SearchBar from '../components/SearchBar';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BrowsePage: React.FC = () => {
  const { allPhrases, loading } = usePhrases();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const navigate = useNavigate();

  const sections = ['all', ...Array.from(new Set(allPhrases.map(p => p.section)))];

  const filteredPhrases = allPhrases.filter(p => {
    const matchesSearch = p.cantonese.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.english.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === 'all' || p.section === selectedSection;
    return matchesSearch && matchesSection;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {sections.map(section => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedSection === section 
                  ? 'bg-primary text-white border-primary shadow-sm' 
                  : 'bg-white text-stone-500 border-accent/10 active:bg-stone-50'
              }`}
            >
              {section === 'all' ? 'All Sections' : section.replace('section-', '').replace(/-/g, ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center px-1">
        <h2 className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">
          {filteredPhrases.length} PHRASES FOUND
        </h2>
        <button 
          onClick={() => navigate('/add')}
          className="text-primary text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
        >
          <Plus size={14} /> NEW PHRASE
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-400 text-sm font-medium">Loading collection...</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredPhrases.map(phrase => (
            <PhraseCard key={phrase.id} phrase={phrase} />
          ))}
          {filteredPhrases.length === 0 && (
            <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-accent/20">
              <p className="text-stone-400 font-medium">No phrases found here.</p>
              <button 
                onClick={() => navigate('/add')}
                className="mt-2 text-primary font-bold text-sm"
              >
                Add one yourself?
              </button>
            </div>
          )}
        </div>
      )}

      {/* FAB */}
      <button 
        onClick={() => navigate('/add')}
        className="fixed bottom-24 right-6 bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20 z-30 active:scale-90 transition-transform md:hidden"
        aria-label="Add Phrase"
      >
        <Plus size={28} strokeWidth={3} />
      </button>
    </div>
  );
};

export default BrowsePage;
