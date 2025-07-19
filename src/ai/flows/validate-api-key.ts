'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating code review comments.
 *
 * It takes code as input and returns a set of comments with suggestions for improvements.
 * - generateCodeReviewComments - The function that initiates the code review process.
 * - GenerateCodeReviewCommentsInput - The input type for the generateCodeReviewComments function.
 * - GenerateCodeReviewCommentsOutput - The return type for the generateCodeReviewComments function.
 */

import { z } from 'zod';
import { ai } from '@/ai/genkit';

const GenerateCodeReviewCommentsInputSchema = z.object({
  code: z.string().describe('The code to be reviewed.'),
  language: z.string().describe('The programming language of the code.'),
  codingStandards: z
    .string()
    .optional()
    .describe('The coding standards to be followed.'),
});

export type GenerateCodeReviewCommentsInput = z.infer<
  typeof GenerateCodeReviewCommentsInputSchema
>;

const GenerateCodeReviewCommentsOutputSchema = z.object({
  comments: z
    .array(z.string())
    .describe('An array of comments on the code.'),
});

export type GenerateCodeReviewCommentsOutput = z.infer<
  typeof GenerateCodeReviewCommentsOutputSchema
>;

export async function generateCodeReviewComments(
  input: GenerateCodeReviewCommentsInput
): Promise<GenerateCodeReviewCommentsOutput> {
  return generateCodeReviewCommentsFlow(input);
}

const generateCodeReviewCommentsFlow = ai.defineFlow(
  {
    name: 'generateCodeReviewCommentsFlow',
    inputSchema: GenerateCodeReviewCommentsInputSchema,
    outputSchema: GenerateCodeReviewCommentsOutputSchema,
  },
  async ({ code, language, codingStandards }) => {
    const prompt = ai.definePrompt({
      name: 'generateCodeReviewCommentsPrompt',
      output: { schema: GenerateCodeReviewCommentsOutputSchema },
      prompt: `You are a code review assistant that provides feedback on code.

      You will be given a code snippet and a set of coding standards.
      You must follow the coding standards and provide feedback on the code.
      The code is written in {{language}}.

      Coding Standards:
      {{#if codingStandards}}
        {{codingStandards}}
      {{else}}
        There are no specific coding standards. Follow industry best practices.
      {{/if}}

      Code:
      {{code}}

      Provide a list of comments on the code, each comment should start on a new line.
      `,
    });

    const { output } = await prompt({ code, language, codingStandards });
    return output!;
  }
);