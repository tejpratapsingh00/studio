'use server';

/**
 * @fileOverview Identifies the type of waste from an image.
 *
 * - identifyWasteType - A function that takes an image of waste and identifies its type.
 * - IdentifyWasteTypeInput - The input type for the identifyWasteType function.
 * - IdentifyWasteTypeOutput - The return type for the identifyWasteType function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyWasteTypeInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the waste, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // prettier-ignore
    ),
});
export type IdentifyWasteTypeInput = z.infer<typeof IdentifyWasteTypeInputSchema>;

const IdentifyWasteTypeOutputSchema = z.object({
  wasteType: z
    .string()
    .describe(
      'The identified type of waste (e.g., plastic, metal, paper, organic, e-waste).' // prettier-ignore
    ),
  recyclingRecommendations: z
    .string()
    .describe(
      'Recommendations for recycling the identified waste type.' // prettier-ignore
    ),
});
export type IdentifyWasteTypeOutput = z.infer<typeof IdentifyWasteTypeOutputSchema>;

export async function identifyWasteType(
  input: IdentifyWasteTypeInput
): Promise<IdentifyWasteTypeOutput> {
  return identifyWasteTypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyWasteTypePrompt',
  input: {schema: IdentifyWasteTypeInputSchema},
  output: {schema: IdentifyWasteTypeOutputSchema},
  prompt: `You are an AI assistant specialized in waste identification and recycling recommendations.
  Given an image of waste, identify the type of waste and provide recycling recommendations.

  Image: {{media url=photoDataUri}}

  Respond with JSON format, including the wasteType and recyclingRecommendations fields.
  `,
});

const identifyWasteTypeFlow = ai.defineFlow(
  {
    name: 'identifyWasteTypeFlow',
    inputSchema: IdentifyWasteTypeInputSchema,
    outputSchema: IdentifyWasteTypeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
