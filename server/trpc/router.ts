import { initTRPC } from '@trpc/server';
import type { Context } from './context';
import { openaiRouter } from './openaiRouter';

const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  chat: openaiRouter, // LLM procedures
});

export type AppRouter = typeof appRouter;
