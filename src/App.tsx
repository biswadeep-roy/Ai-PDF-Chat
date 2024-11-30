import React, { useState } from 'react';
import { PDFUploader } from './components/PDFUploader';
import { ChatInterface } from './components/ChatInterface';
import { extractTextFromPDF } from './utils/pdfUtils';
import { getGeminiResponse } from './utils/geminiAI';
import { FileText, AlertCircle, MessageSquare, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [pdfText, setPdfText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPdfProcessing, setIsPdfProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    setError('');
    setPdfText('');
    setFileName('');
    
    try {
      setIsPdfProcessing(true);
      const text = await extractTextFromPDF(file);
      
      if (!text.trim()) {
        throw new Error('No readable text found in the PDF');
      }
      
      setPdfText(text);
      setFileName(file.name);
      setMessages([{
        role: 'assistant',
        content: "Hello! I'm ready to help you with any questions about the PDF content or general topics. What would you like to know?"
      }]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process PDF');
      setPdfText('');
      setFileName('');
    } finally {
      setIsPdfProcessing(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError('');
      setMessages(prev => [...prev, { role: 'user', content: query }]);
      
      const response = await getGeminiResponse(query, pdfText);
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to process query');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 -z-10" />
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-70 animate-glow"></div>
              <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl hover-lift">
                <MessageSquare className="w-16 h-16 text-primary-foreground animate-bounce-in" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 text-foreground animate-fade-in">
            AI Chat Assistant
          </h1>
          <div className="flex items-center justify-center gap-2 animate-slide-up">
            <Sparkles className="w-5 h-5 text-primary" />
            <p className="text-foreground text-lg">
              Upload a PDF for document-specific answers, or just chat about any topic
            </p>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>

        {error && (
          <div className="mx-auto max-w-md animate-slide-in">
            <div className="bg-destructive/20 border border-destructive/30 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-destructive-foreground flex-shrink-0" />
                <p className="text-destructive-foreground text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="transition-all duration-500">
          {!messages.length ? (
            <div className="flex justify-center animate-fade-in">
              <PDFUploader
                onFileUpload={handleFileUpload}
                isLoading={isPdfProcessing}
              />
            </div>
          ) : (
            <div className="space-y-6 animate-slide-up">
              {fileName && (
                <div className="bg-card text-card-foreground rounded-xl shadow-lg border border-border p-4 transition-all hover:shadow-xl hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <FileText className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <span className="font-medium text-card-foreground">{fileName}</span>
                    </div>
                    <button
                      onClick={() => {
                        setPdfText('');
                        setFileName('');
                        setMessages([]);
                        setError('');
                      }}
                      className="text-sm px-3 py-1 text-card-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                    >
                      Remove PDF
                    </button>
                  </div>
                </div>
              )}

              <ChatInterface
                messages={messages}
                onSendMessage={handleSearch}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;