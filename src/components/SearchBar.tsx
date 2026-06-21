import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search phrases, Jyutping, English..."
        className="w-full pl-12 pr-4 py-4 bg-white border border-accent/10 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-stone-800 placeholder:text-stone-400 font-medium"
      />
    </div>
  );
};

export default SearchBar;
