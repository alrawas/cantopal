import React from 'react';
import type { Phrase } from '../types/index';
import { CheckCircle2, Trash2 } from 'lucide-react';
import { usePhrases } from '../hooks/usePhrases';
import { useUserStats } from '../hooks/useUserStats';
import clsx from 'clsx';

interface PhraseCardProps {
  phrase: Phrase;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase }) => {
  const { deleteCustomPhrase } = usePhrases();
  const { stats, markAsMastered, unmarkAsMastered } = useUserStats();

  const isMastered = stats.masteredPhrases.includes(phrase.id);

  const toggleMastered = () => {
    if (isMastered) {
      unmarkAsMastered(phrase.id);
    } else {
      markAsMastered(phrase.id);
    }
  };

  return (
    <div className={clsx(
      "bg-white p-4 rounded-2xl border shadow-sm relative group transition-all",
      isMastered ? "border-green-100 bg-green-50/30" : "border-accent/10 active:bg-stone-50"
    )}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-primary font-bold text-lg leading-tight">{phrase.cantonese}</p>
            {phrase.chinese && (
              <span className="text-lg text-stone-400 font-light">{phrase.chinese}</span>
            )}
            {isMastered && <CheckCircle2 size={16} className="text-green-500 shrink-0" />}
          </div>
          <p className="text-stone-600 text-sm font-medium">{phrase.english}</p>
          {phrase.arabicHint && (
            <p className="text-accent-dark font-arabic mt-2 text-right" dir="rtl">{phrase.arabicHint}</p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              {phrase.section.replace('section-', '').replace(/-/g, ' ')}
            </span>
            {phrase.isCustom && (
              <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Custom
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2 items-start">
          <button 
            onClick={toggleMastered}
            className={clsx(
              "p-3 rounded-xl transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center",
              isMastered ? "bg-green-500 text-white shadow-lg shadow-green-200" : "bg-stone-50 text-stone-300 active:text-green-500"
            )}
            aria-label={isMastered ? "Unmark as learned" : "Mark as learned"}
          >
            <CheckCircle2 size={20} />
          </button>

          {phrase.isCustom && (
            <button 
              onClick={() => deleteCustomPhrase(phrase.id)}
              className="p-3 bg-red-50 text-red-500 rounded-xl active:bg-red-100 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Delete phrase"
            >
              <Trash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhraseCard;