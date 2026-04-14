import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

/**
 * Initializes the Genkit AI framework with Google AI plugin.
 * Uses the Gemini 2.0 Flash model for text generation.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});