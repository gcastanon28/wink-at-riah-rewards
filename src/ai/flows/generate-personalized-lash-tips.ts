'use server';
/**
 * @fileOverview A Genkit flow for generating personalized lash care tips and product recommendations.
 *
 * - generatePersonalizedLashTips - A function that handles the generation of personalized lash tips and recommendations.
 * - GeneratePersonalizedLashTipsInput - The input type for the generatePersonalizedLashTips function.
 * - GeneratePersonalizedLashTipsOutput - The return type for the generatePersonalizedLashTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedLashTipsInputSchema = z.object({
  serviceHistory: z
    .array(
      z.object({
        serviceName: z.string().describe('The name of the lash service.'),
        date: z
          .string()
          .describe('The date the service was performed (e.g., "YYYY-MM-DD").'),
        notes: z
          .string()
          .optional()
          .describe('Any specific notes or details from the service.'),
      })
    )
    .describe('A list of the client\'s past lash service appointments.'),
  accumulatedPoints: z
    .number()
    .describe('The client\'s current accumulated reward points.'),
});
export type GeneratePersonalizedLashTipsInput = z.infer<
  typeof GeneratePersonalizedLashTipsInputSchema
>;

const GeneratePersonalizedLashTipsOutputSchema = z.object({
  lashCareTips: z
    .array(z.string())
    .describe('A list of personalized lash care tips.'),
  productRecommendations: z
    .array(
      z.object({
        productName: z.string().describe('The name of the recommended product.'),
        reason: z
          .string()
          .describe('The reason for the product recommendation.'),
      })
    )
    .describe('A list of personalized product recommendations.'),
});
export type GeneratePersonalizedLashTipsOutput = z.infer<
  typeof GeneratePersonalizedLashTipsOutputSchema
>;

export async function generatePersonalizedLashTips(
  input: GeneratePersonalizedLashTipsInput
): Promise<GeneratePersonalizedLashTipsOutput> {
  return generatePersonalizedLashTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedLashTipsPrompt',
  input: {schema: GeneratePersonalizedLashTipsInputSchema},
  output: {schema: GeneratePersonalizedLashTipsOutputSchema},
  prompt: `You are an expert lash technician and beauty advisor for "Wink At Riah", a luxury lash business. Your goal is to provide personalized, sophisticated lash care tips and product recommendations to a valued client.

Consider the client's service history and accumulated points to tailor your advice and recommendations. Emphasize maintaining lash health and enhancing their beauty routine. Ensure your tone is luxurious and refined.

Client's Service History:
{{#if serviceHistory}}
  {{#each serviceHistory}}
    - Service: {{{serviceName}}} on {{{date}}}
    {{#if notes}}
      (Notes: {{{notes}}})
    {{/if}}
  {{/each}}
{{else}}
  No service history provided.
{{/if}}

Client's Accumulated Points: {{{accumulatedPoints}}}

Based on this information, provide a list of personalized lash care tips and relevant product recommendations.
`,
});

const generatePersonalizedLashTipsFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedLashTipsFlow',
    inputSchema: GeneratePersonalizedLashTipsInputSchema,
    outputSchema: GeneratePersonalizedLashTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
