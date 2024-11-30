import React from 'react';

export function LoadingBubble() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-secondary text-secondary-foreground rounded-2xl p-4 border border-border">
        <div className="flex items-center space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}