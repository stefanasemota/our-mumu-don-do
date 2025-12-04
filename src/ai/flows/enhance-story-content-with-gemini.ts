'use server';

/**
 * @fileOverview Gemini-powered content suggestion flow for story pages.
 *
 * This file defines a Genkit flow that uses the Gemini API to provide content
 * suggestions for story pages based on a selected topic guideline category.
 *
 * @exports enhanceStoryContent - The main function to trigger the content enhancement flow.
 * @exports EnhanceStoryContentInput - The input type for the enhanceStoryContent function.
 * @exports EnhanceStoryContentOutput - The output type for the enhanceStoryContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceStoryContentInputSchema = z.object({
  guidelineCategory: z
    .string()
    .describe(
      'The guideline category for the story topic (e.g., Nigerian Solutions, Critical Thinking, Historical Context, Unity & Identity).'
    ),
});
export type EnhanceStoryContentInput = z.infer<typeof EnhanceStoryContentInputSchema>;

const EnhanceStoryContentOutputSchema = z.object({
  contentSuggestions: z
    .string()
    .describe('Content suggestions for the story pages based on the guideline category.'),
});
export type EnhanceStoryContentOutput = z.infer<typeof EnhanceStoryContentOutputSchema>;

export async function enhanceStoryContent(
  input: EnhanceStoryContentInput
): Promise<EnhanceStoryContentOutput> {
  return enhanceStoryContentFlow(input);
}

const enhanceStoryContentPrompt = ai.definePrompt({
  name: 'enhanceStoryContentPrompt',
  input: {schema: EnhanceStoryContentInputSchema},
  output: {schema: EnhanceStoryContentOutputSchema},
  prompt: `You are an AI assistant helping content creators generate educational story content for young children of Africa.

  Based on the guideline category provided, suggest engaging and relevant content for the story pages.

  Guideline Category: {{{guidelineCategory}}}

  Content Suggestions:`, // Ensure output is a string
});

const enhanceStoryContentFlow = ai.defineFlow(
  {
    name: 'enhanceStoryContentFlow',
    inputSchema: EnhanceStoryContentInputSchema,
    outputSchema: EnhanceStoryContentOutputSchema,
  },
  async input => {
    const {output} = await enhanceStoryContentPrompt(input);
    return output!;
  }
);
