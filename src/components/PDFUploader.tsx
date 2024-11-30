import React, { useRef } from 'react';
import { FileType } from 'lucide-react';

interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

export function PDFUploader({ onFileUpload, isLoading }: PDFUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      return;
    }

    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    onFileUpload(file);
  };

  return (
    <div className="w-full max-w-md animate-scale">
      <label 
        className={`group flex flex-col items-center px-8 py-12 bg-card text-card-foreground rounded-xl border-2 border-dashed border-border cursor-pointer transition-all hover:shadow-xl ${
          isLoading 
            ? 'opacity-75 cursor-not-allowed' 
            : 'hover:border-primary hover:bg-primary/5'
        }`}
      >
        {isLoading ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-50"></div>
              <div className="relative w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
            <span className="mt-6 text-xl font-semibold text-card-foreground">Processing PDF...</span>
            <span className="mt-2 text-sm text-card-foreground/70">This may take a moment</span>
          </>
        ) : (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <FileType className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              </div>
            </div>
            <span className="mt-6 text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
              Upload PDF
            </span>
            <span className="mt-2 text-sm text-card-foreground/70 group-hover:text-primary/80 transition-colors">
              Click or drag and drop
            </span>
            <span className="mt-2 text-xs text-card-foreground/60">Maximum file size: 10MB</span>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isLoading}
        />
      </label>
    </div>
  );
}