import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

export const openaiRouter = t.router({
  sendMessage: t.procedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      const apiKey = process.env.GEMINI_API_KEY!;
      const model = 'gemini-pro'; // Text model

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input.message }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${await response.text()}`);
      }

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply.';

      return { reply };
    }),

  generateImage: t.procedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ input }) => {
      const apiKey = process.env.GEMINI_API_KEY!;
      const model = 'imagen-3.0'; // Hypothetical image model

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateImage?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: input.prompt }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini Image API error: ${await response.text()}`);
      }

      const data = await response.json();
      return { imageUrl: data?.imageUrl || '' };
    }),
});
