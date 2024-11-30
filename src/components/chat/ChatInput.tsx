import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-card">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="relative">
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            adjustTextareaHeight();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything! I can help with PDF content or general questions..."
          className="w-full px-4 py-3 pr-12 bg-background text-foreground border border-input rounded-xl focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none placeholder:text-muted-foreground transition-all"
          style={{ minHeight: '50px', maxHeight: '150px' }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}