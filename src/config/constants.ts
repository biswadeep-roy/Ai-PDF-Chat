export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPE = 'application/pdf';

export const ERROR_MESSAGES = {
  FILE_TYPE: 'Please upload a valid PDF file',
  FILE_SIZE: 'File size must be less than 10MB',
  NO_TEXT: 'No readable text found in the PDF',
  GENERIC: 'An unexpected error occurred',
  API_KEY: 'Invalid API key. Please check your configuration.',
  API_QUOTA: 'API quota exceeded. Please try again later.',
  NO_RESPONSE: 'Could not generate a relevant response. Please try rephrasing your question.'
} as const;

export const ANIMATION_VARIANTS = {
  FADE_IN: 'animate-fade-in',
  SLIDE_UP: 'animate-slide-up',
  SLIDE_IN: 'animate-slide-in',
  SCALE: 'animate-scale',
  BOUNCE_IN: 'animate-bounce-in',
  GLOW: 'animate-glow'
} as const;