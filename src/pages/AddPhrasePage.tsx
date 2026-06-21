import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePhrases } from '../hooks/usePhrases';
import { ArrowLeft } from 'lucide-react';
import PhraseForm from '../components/PhraseForm';

const AddPhrasePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addCustomPhrase, allPhrases } = usePhrases();
  
  const queryParams = new URLSearchParams(location.search);
  const initialEnglish = queryParams.get('english') || '';

  const initialValues = {
    cantonese: '',
    english: initialEnglish,
    arabicHint: '',
    section: 'Custom Phrases'
  };

  const sections = ['Custom Phrases', ...Array.from(new Set(allPhrases.map(p => p.section)))];

  const handleSubmit = (values: any) => {
    addCustomPhrase(values);
    navigate(-1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-stone-400 active:text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-primary">Add New Phrase</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-accent/10">
        <PhraseForm 
          initialValues={initialValues} 
          onSubmit={handleSubmit} 
          sections={sections} 
        />
      </div>
    </div>
  );
};

export default AddPhrasePage;
