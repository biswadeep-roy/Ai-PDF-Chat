export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ErrorState {
  message: string;
  code?: string;
}

export type LoadingState = {
  pdf: boolean;
  chat: boolean;
}