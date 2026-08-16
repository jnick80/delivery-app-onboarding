import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = process.env.GEMINI_API_KEY;
const genAI = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;
export const geminiConfigured = Boolean(geminiApiKey);

/**
 * Get the Gemini Pro model for text generation
 */
export function getModel() {
  return genAI?.getGenerativeModel({ model: 'gemini-pro' }) ?? null;
}

/**
 * Generate content using Gemini API
 */
export async function generateContent(prompt: string): Promise<string | null> {
  const model = getModel();
  if (!model) {
    return null;
  }

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export { genAI };
