'use server';
/**
 * @fileOverview Provides code explanations, identifies potential issues, and suggests improvements for uploaded code snippets.
 *
 * - generateCodeExplanations - A function that handles the code explanation process.
 * - GenerateCodeExplanationsInput - The input type for the generateCodeExplanations function.
 * - GenerateCodeExplanationsOutput - The return type for the generateCodeExplanations function.
 */

import { z } from 'zod';
import { ai } from '@/ai/genkit';

const GenerateCodeExplanationsInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to be analyzed.'),
  programmingLanguage: z
    .string()
    .describe('The programming language of the code snippet.'),
});
export type GenerateCodeExplanationsInput = z.infer<
  typeof GenerateCodeExplanationsInputSchema
>;

const GenerateCodeExplanationsOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A detailed explanation of what the code does.'),
  potentialIssues: z
    .string()
    .describe(
      "A list of potential issues, such as bugs, security vulnerabilities, or performance problems. If none, say 'No significant issues found.'"
    ),
  suggestions: z
    .string()
    .describe(
      "A list of suggestions for improving the code's readability, maintainability, or performance. If none, say 'The code is well-written.'"
    ),
});
export type GenerateCodeExplanationsOutput = z.infer<
  typeof GenerateCodeExplanationsOutputSchema
>;

export async function generateCodeExplanations(
  input: GenerateCodeExplanationsInput
): Promise<GenerateCodeExplanationsOutput> {
  return generateCodeExplanationsFlow(input);
}

const generateCodeExplanationsFlow = ai.defineFlow(
  {
    name: 'generateCodeExplanationsFlow',
    inputSchema: GenerateCodeExplanationsInputSchema,
    outputSchema: GenerateCodeExplanationsOutputSchema,
  },
  async ({ codeSnippet, programmingLanguage }) => {
    const prompt = `You are a senior software engineer acting as an expert code reviewer. Your task is to analyze the provided code snippet and furnish a comprehensive review.

Your analysis must be structured and detailed, covering three distinct sections as specified in the output schema.

**Code to Analyze:**
Language: ${programmingLanguage}
\`\`\`${programmingLanguage}
${codeSnippet}
\`\`\`

**Output Requirements:**

You MUST provide your response in a valid JSON format that strictly adheres to the following structure. Do not add any text or formatting before or after the JSON object.

\`\`\`json
{
  "explanation": "Provide a clear, in-depth explanation of the code's purpose and functionality. Describe what it does, its inputs, and its expected outputs.",
  "potentialIssues": "Identify any potential issues. This includes, but is not limited to, bugs, security vulnerabilities (like injection attacks or data exposure), performance bottlenecks, and logical errors. If no issues are found, you must state 'No significant issues found.'",
  "suggestions": "Offer concrete suggestions for improvement. This could involve refactoring for better readability, recommending alternative approaches for performance gains, or suggesting best practices for maintainability. If the code is well-written and no improvements are necessary, you must state 'The code is well-written.'"
}
\`\`\`
`;

    const { output } = await ai.generate({
      prompt: prompt,
      model: 'googleai/gemini-2.0-flash',
      output: { schema: GenerateCodeExplanationsOutputSchema },
    });

    return output!;
  }
);
