import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Get the Gemini Pro model for text generation
 */
export function getModel() {
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
}

/**
 * Generate content using Gemini API
 */
export async function generateContent(prompt: string): Promise<string> {
  const model = getModel();
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export { genAI };
