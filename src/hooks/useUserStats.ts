import { useLocalStorage } from './useLocalStorage';
import type { UserStats } from '../types';

export function useUserStats() {
  const [stats, setStats] = useLocalStorage<UserStats>('user_stats', {
    masteredPhrases: [],
    streak: 0,
    lastPracticeDate: null,
    searchCount: 0,
    translateCount: 0
  });

  const incrementSearch = () => {
    setStats(s => ({ ...s, searchCount: s.searchCount + 1 }));
  };

  const incrementTranslate = () => {
    setStats(s => ({ ...s, translateCount: s.translateCount + 1 }));
  };

  const markAsMastered = (phraseId: string) => {
    if (!stats.masteredPhrases.includes(phraseId)) {
      setStats({
        ...stats,
        masteredPhrases: [...stats.masteredPhrases, phraseId]
      });
    }
  };

  const unmarkAsMastered = (phraseId: string) => {
    setStats({
      ...stats,
      masteredPhrases: stats.masteredPhrases.filter(id => id !== phraseId)
    });
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastPracticeDate === today) return;

    let newStreak = stats.streak;
    const lastDate = stats.lastPracticeDate ? new Date(stats.lastPracticeDate) : null;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (stats.lastPracticeDate === yesterdayStr) {
      newStreak += 1;
    } else if (!stats.lastPracticeDate) {
      newStreak = 1;
    } else {
      newStreak = 1; // Reset streak if missed a day
    }

    setStats({
      ...stats,
      streak: newStreak,
      lastPracticeDate: today
    });
  };

  const resetStats = () => {
    setStats({
      masteredPhrases: [],
      streak: 0,
      lastPracticeDate: null
    });
  };

  return {
    stats,
    markAsMastered,
    unmarkAsMastered,
    updateStreak,
    resetStats,
    incrementSearch,
    incrementTranslate
  };
}
