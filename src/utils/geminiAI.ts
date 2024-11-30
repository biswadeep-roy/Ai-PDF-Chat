import { GoogleGenerativeAI } from '@google/generative-ai';
import { ENV } from '../config/env';
import { ERROR_MESSAGES } from '../config/constants';

const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY);

export async function getGeminiResponse(prompt: string, context?: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const formattedPrompt = context 
      ? `Question: ${prompt}\n\nContext from PDF:\n${context.slice(0, 15000)}\n\nPlease provide a response. If the answer can be found in the PDF content, use that information. Otherwise, provide a general response.`
      : prompt;

    const result = await model.generateContent(formattedPrompt);
    
    if (!result.response.candidates || result.response.candidates.length === 0) {
      throw new Error(ERROR_MESSAGES.NO_RESPONSE);
    }

    const response = result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error(ERROR_MESSAGES.NO_RESPONSE);
    }

    return text;
  } catch (error: any) {
    console.error('Error getting Gemini response:', error);
    
    if (error.message?.includes('API key')) {
      throw new Error(ERROR_MESSAGES.API_KEY);
    } else if (error.message?.includes('quota')) {
      throw new Error(ERROR_MESSAGES.API_QUOTA);
    } else if (error.message?.includes('No valid response')) {
      throw new Error(ERROR_MESSAGES.NO_RESPONSE);
    }
    
    throw new Error(ERROR_MESSAGES.GENERIC);
  }
}