import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getGeminiResponse(
  prompt: string,
  context: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Create a more focused prompt
    const fullPrompt = `Based on the following PDF content, please answer this question: "${prompt}"

PDF Content:
${context.slice(0, 30000)} // Truncate to avoid token limits

Please provide a clear and concise answer based solely on the PDF content above. If the information isn't found in the PDF, please say so.`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Error getting Gemini response:', error);
    throw new Error(error.message || 'Failed to get response from AI');
  }
}