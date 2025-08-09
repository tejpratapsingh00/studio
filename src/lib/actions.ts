'use server'

import { identifyWasteType } from '@/ai/flows/identify-waste-type';

export async function getWastePrediction(photoDataUri: string) {
  if (!photoDataUri || !photoDataUri.startsWith('data:image/')) {
    throw new Error('Invalid image data URI. Please upload a valid image.');
  }
  
  try {
    const result = await identifyWasteType({ photoDataUri });
    return result;
  } catch (error) {
    console.error('AI prediction failed:', error);
    throw new Error('Could not identify waste from the image. Please try again or select a category manually.');
  }
}
