import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors animate-scale"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-500 animate-scale" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 animate-scale" />
      )}
    </button>
  );
}