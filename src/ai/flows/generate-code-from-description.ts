'use server';

/**
 * @fileOverview A code generation AI agent.
 *
 * - generateCodeFromDescription - A function that generates a code snippet from a description.
 * - GenerateCodeFromDescriptionInput - The input type for the generateCodeFromDescription function.
 * - GenerateCodeFromDescriptionOutput - The return type for the generateCodeFromDescription function.
 */

import { z } from 'zod';
import { ai } from '@/ai/genkit';

const GenerateCodeFromDescriptionInputSchema = z.object({
  description: z.string().describe('The description of the code to generate.'),
  language: z.string().describe('The programming language for the code snippet.'),
});
export type GenerateCodeFromDescriptionInput = z.infer<
  typeof GenerateCodeFromDescriptionInputSchema
>;

const GenerateCodeFromDescriptionOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
});
export type GenerateCodeFromDescriptionOutput = z.infer<
  typeof GenerateCodeFromDescriptionOutputSchema
>;

export async function generateCodeFromDescription(
  input: GenerateCodeFromDescriptionInput
): Promise<GenerateCodeFromDescriptionOutput> {
  return generateCodeFromDescriptionFlow(input);
}

const generateCodeFromDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCodeFromDescriptionFlow',
    inputSchema: GenerateCodeFromDescriptionInputSchema,
    outputSchema: GenerateCodeFromDescriptionOutputSchema,
  },
  async ({ description, language }) => {
    const prompt = ai.definePrompt({
      name: 'generateCodeFromDescriptionPrompt',
      output: { schema: GenerateCodeFromDescriptionOutputSchema },
      prompt: `You are an expert software engineer. Generate a code snippet based on the description and language provided.

Description: {{{description}}}
Language: {{{language}}}

Code: `,
    });

    const { output } = await prompt({ description, language });
    return output!;
  }
);