import React from 'react';
import { ChatMessage } from '@/types';
import { cn } from '@/utils/cn';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-2xl p-4 animate-scale hover-lift',
          isUser
            ? 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg'
            : 'bg-secondary text-secondary-foreground border border-border'
        )}
      >
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
}