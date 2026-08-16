import { generateContent, geminiConfigured } from '../config/gemini';

export interface AIAssistPayload {
  field: string;
  context?: string;
  userInput?: string;
}

function formatFieldName(field: string) {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .trim()
    .toLowerCase();
}

function buildFallbackSuggestion(field: string, userInput?: string, context?: string) {
  const label = formatFieldName(field);
  if (userInput && userInput.trim()) {
    return `Use "${userInput.trim()}" for ${label} if it matches your official records.${context ? ` Context noted: ${context.trim()}.` : ''}`;
  }

  return `Provide your ${label} exactly as it appears on official documents.${context ? ` Context noted: ${context.trim()}.` : ''}`;
}

export async function getFieldAssistance(payload: AIAssistPayload) {
  const prompt = [
    'You are assisting a user completing a delivery app onboarding form.',
    `Field: ${payload.field}`,
    `Context: ${payload.context || 'No extra context provided.'}`,
    `Current value: ${payload.userInput || 'No value provided.'}`,
    'Return short, practical guidance in 1-2 sentences.',
  ].join('\n');

  const aiSuggestion = await generateContent(prompt);
  const suggestion = aiSuggestion?.trim() || buildFallbackSuggestion(payload.field, payload.userInput, payload.context);

  return {
    suggestion,
    confidence: geminiConfigured ? 0.88 : 0.48,
    alternatives: [
      'Double-check the value against your official records before submitting.',
      'Avoid abbreviations unless they appear on the source document.',
    ],
  };
}
