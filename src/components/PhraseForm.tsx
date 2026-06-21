import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface PhraseFormProps {
  initialValues?: {
    cantonese: string;
    english: string;
    arabicHint: string;
    section: string;
  };
  onSubmit: (values: {
    cantonese: string;
    english: string;
    arabicHint: string;
    section: string;
  }) => void;
  sections: string[];
}

const PhraseForm: React.FC<PhraseFormProps> = ({ initialValues, onSubmit, sections }) => {
  const [form, setForm] = useState(initialValues || {
    cantonese: '',
    english: '',
    arabicHint: '',
    section: 'Custom Phrases'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Cantonese (Jyutping) *</label>
        <input
          required
          type="text"
          value={form.cantonese}
          onChange={e => setForm({ ...form, cantonese: e.target.value })}
          placeholder="e.g. nei5 hou2"
          className="w-full px-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">English Translation *</label>
        <input
          required
          type="text"
          value={form.english}
          onChange={e => setForm({ ...form, english: e.target.value })}
          placeholder="e.g. Hello"
          className="w-full px-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Arabic Hint (Optional)</label>
        <input
          type="text"
          value={form.arabicHint}
          onChange={e => setForm({ ...form, arabicHint: e.target.value })}
          placeholder="Arabic pronunciation"
          dir="rtl"
          className="w-full px-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-arabic text-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-stone-400 uppercase tracking-wider ml-1">Section Tag</label>
        <select
          value={form.section}
          onChange={e => setForm({ ...form, section: e.target.value })}
          className="w-full px-4 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium appearance-none"
        >
          {sections.map(s => (
            <option key={s} value={s}>{s.replace('section-', '').replace(/-/g, ' ')}</option>
          ))}
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
      >
        <Save size={20} />
        Save Phrase
      </button>
    </form>
  );
};

export default PhraseForm;
