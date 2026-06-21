export interface Phrase {
  id: string;
  section: string;
  cantonese: string;
  english: string;
  chinese?: string;
  arabicHint?: string;
  isCustom?: boolean;
}

export interface UserStats {
  masteredPhrases: string[];
  streak: number;
  lastPracticeDate: string | null;
  searchCount: number;
  translateCount: number;
}
