import React, { useState, useEffect, useMemo } from 'react';
import { usePhrases } from '../hooks/usePhrases';
import { useUserStats } from '../hooks/useUserStats';
import type { Phrase } from '../types';
import { ChevronRight, RotateCcw, CheckCircle2, XCircle, Info } from 'lucide-react';
import clsx from 'clsx';

const PracticePage: React.FC = () => {
  const { allPhrases, loading } = usePhrases();
  const { stats, markAsMastered, updateStreak } = useUserStats();
  
  const [sessionPhrases, setSessionPhrases] = useState<Phrase[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Initialize session
  useEffect(() => {
    if (!loading && allPhrases.length > 0 && sessionPhrases.length === 0) {
      // Pick 10 random phrases, prioritizing those not mastered
      const unmastered = allPhrases.filter(p => !stats.masteredPhrases.includes(p.id));
      const mastered = allPhrases.filter(p => stats.masteredPhrases.includes(p.id));
      
      const combined = [...unmastered.sort(() => Math.random() - 0.5), ...mastered.sort(() => Math.random() - 0.5)];
      setSessionPhrases(combined.slice(0, 10));
    }
  }, [loading, allPhrases, stats.masteredPhrases, sessionPhrases.length]);

  const currentPhrase = sessionPhrases[currentIndex];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(s => ({ ...s, correct: s.correct + 1, total: s.total + 1 }));
      markAsMastered(currentPhrase.id);
    } else {
      setScore(s => ({ ...s, total: s.total + 1 }));
    }

    if (currentIndex < sessionPhrases.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      setSessionComplete(true);
      updateStreak();
    }
  };

  const restartSession = () => {
    setSessionPhrases([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionComplete(false);
    setScore({ correct: 0, total: 0 });
  };


  if (loading || (allPhrases.length > 0 && sessionPhrases.length === 0)) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (allPhrases.length === 0) {
    return (
      <div className="text-center py-20 space-y-4">
        <p className="text-stone-500">No phrases available to practice.</p>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="space-y-2">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-primary">Session Complete!</h2>
          <p className="text-stone-500">You got {score.correct} out of {score.total} phrases right.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-accent/10 shadow-sm w-full max-w-xs space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-400 font-medium">Daily Streak</span>
            <span className="text-accent font-bold">{stats.streak} Days</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-stone-400 font-medium">Mastered</span>
            <span className="text-primary font-bold">{stats.masteredPhrases.length} Total</span>
          </div>
        </div>

        <button 
          onClick={restartSession}
          className="bg-primary text-white w-full max-w-xs py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <RotateCcw size={20} /> Practice More
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
            {currentIndex + 1}
          </div>
          <div className="text-xs text-stone-400 font-bold uppercase tracking-widest">
            Phrase {currentIndex + 1} of {sessionPhrases.length}
          </div>
        </div>
        <div className="h-1.5 w-24 bg-stone-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500" 
            style={{ width: `${((currentIndex) / sessionPhrases.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative h-[300px] w-full perspective-1000">
        <div 
          className={clsx(
            "relative w-full h-full transition-all duration-500 preserve-3d cursor-pointer",
            isFlipped && "rotate-y-180"
          )}
          onClick={handleFlip}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white border border-accent/10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">English</span>
            <h3 className="text-2xl font-bold text-stone-800 leading-tight">
              {currentPhrase.english}
            </h3>
            <div className="absolute bottom-8 text-stone-300 text-xs font-medium flex items-center gap-1">
              <Info size={14} /> Tap to reveal Cantonese
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-primary rotate-y-180 border border-primary rounded-[2.5rem] shadow-xl shadow-primary/20 flex flex-col items-center justify-center p-8 text-center text-white">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Cantonese</span>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold leading-tight">
                {currentPhrase.cantonese}
              </h3>
              {currentPhrase.arabicHint && (
                <p className="text-lg opacity-90 font-medium dir-rtl" lang="ar">
                  {currentPhrase.arabicHint}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isFlipped ? (
        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => handleAnswer(false)}
            className="flex flex-col items-center gap-2 bg-white border border-red-100 p-6 rounded-3xl text-red-500 font-bold active:bg-red-50 transition-colors shadow-sm"
          >
            <XCircle size={32} />
            Try Again
          </button>
          <button 
            onClick={() => handleAnswer(true)}
            className="flex flex-col items-center gap-2 bg-white border border-green-100 p-6 rounded-3xl text-green-500 font-bold active:bg-green-50 transition-colors shadow-sm"
          >
            <CheckCircle2 size={32} />
            Got It!
          </button>
        </div>
      ) : (
        <button 
          onClick={handleFlip}
          className="w-full bg-stone-800 text-white py-5 rounded-3xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
        >
          Check Answer <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default PracticePage;
