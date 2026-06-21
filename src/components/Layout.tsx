import React from 'react';
import { NavLink } from 'react-router-dom';
import { Book, Zap, Languages, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-warm flex flex-col items-center">
      <header className="w-full max-w-md bg-primary text-white p-4 shadow-md sticky top-0 z-20 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span className="bg-accent text-primary px-1.5 py-0.5 rounded text-sm">CP</span>
          CantoPal
        </h1>
      </header>

      <main className="w-full max-w-md flex-1 p-4 pb-24 overflow-y-auto">
        {children}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-accent/20 flex justify-around p-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all min-w-[72px] min-h-[48px] justify-center ${isActive ? 'text-primary bg-primary/5' : 'text-stone-400'}`}
        >
          <Book size={24} />
          <span className="text-[10px] font-medium mt-1">Browse</span>
        </NavLink>
        <NavLink 
          to="/practice" 
          className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all min-w-[72px] min-h-[48px] justify-center ${isActive ? 'text-primary bg-primary/5' : 'text-stone-400'}`}
        >
          <Zap size={24} />
          <span className="text-[10px] font-medium mt-1">Practice</span>
        </NavLink>
        <NavLink 
          to="/translate" 
          className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all min-w-[72px] min-h-[48px] justify-center ${isActive ? 'text-primary bg-primary/5' : 'text-stone-400'}`}
        >
          <Languages size={24} />
          <span className="text-[10px] font-medium mt-1">Translate</span>
        </NavLink>
        <NavLink 
          to="/settings" 
          className={({ isActive }) => `flex flex-col items-center p-2 rounded-xl transition-all min-w-[72px] min-h-[48px] justify-center ${isActive ? 'text-primary bg-primary/5' : 'text-stone-400'}`}
        >
          <Settings size={24} />
          <span className="text-[10px] font-medium mt-1">Settings</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Layout;
