import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorState } from '@/types';

interface ErrorMessageProps {
  error: ErrorState;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="mx-auto max-w-md animate-slide-in">
      <div className="bg-destructive/20 border border-destructive/30 rounded-xl p-4">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-destructive-foreground flex-shrink-0" />
          <p className="text-destructive-foreground text-sm">{error.message}</p>
        </div>
      </div>
    </div>
  );
}