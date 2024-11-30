export const getEnvVar = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  GEMINI_API_KEY: getEnvVar('VITE_GEMINI_API_KEY'),
} as const;