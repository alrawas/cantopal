import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, label }) => {
  const percentage = total > 0 ? Math.min(Math.round((current / total) * 100), 100) : 0;

  return (
    <div className="w-full space-y-2">
      {(label || total > 0) && (
        <div className="flex justify-between items-end px-1">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{label || 'Progress'}</span>
          <span className="text-sm font-bold text-primary">{percentage}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-50">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out rounded-full shadow-[0_0_8px_rgba(45,106,79,0.3)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
