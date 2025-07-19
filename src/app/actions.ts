'use server';

import {
  generateCodeExplanations,
  type GenerateCodeExplanationsInput,
  type GenerateCodeExplanationsOutput,
} from '@/ai/flows/generate-code-explanations';

export async function runCodeAnalysis(
  input: GenerateCodeExplanationsInput
): Promise<GenerateCodeExplanationsOutput> {
  try {
    const result = await generateCodeExplanations(input);
    return result;
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw new Error('Failed to get analysis from the AI service.');
  }
}