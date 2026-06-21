import { useState, useEffect } from 'react';
import type { Phrase } from '../types/index';
import { useLocalStorage } from './useLocalStorage';

export function usePhrases() {
  const [builtInPhrases, setBuiltInPhrases] = useState<Phrase[]>([]);
  const [customPhrases, setCustomPhrases] = useLocalStorage<Phrase[]>('custom_phrases', []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load built-in phrases from public/data/phrases.json
    fetch(`${import.meta.env.BASE_URL}data/phrases.json`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setBuiltInPhrases(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback or handle error
        setLoading(false);
      });
  }, []);

  const allPhrases = [...builtInPhrases, ...customPhrases];

  const addCustomPhrase = (phrase: Omit<Phrase, 'id' | 'isCustom'>) => {
    const newPhrase: Phrase = {
      ...phrase,
      id: `custom_${Date.now()}`,
      isCustom: true
    };
    setCustomPhrases([...customPhrases, newPhrase]);
  };

  const updateCustomPhrase = (id: string, updated: Partial<Phrase>) => {
    setCustomPhrases(customPhrases.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteCustomPhrase = (id: string) => {
    setCustomPhrases(customPhrases.filter(p => p.id !== id));
  };

  return { 
    allPhrases, 
    builtInPhrases,
    customPhrases, 
    loading, 
    addCustomPhrase, 
    updateCustomPhrase,
    deleteCustomPhrase 
  };
}
