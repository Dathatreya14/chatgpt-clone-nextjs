import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSession } from '@auth0/nextjs-auth0';
import { createClient } from '@supabase/supabase-js';

export async function createContext(opts: CreateNextContextOptions) {
  // Auth0 session
  const session = await getSession(opts.req, opts.res);

  // Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  return {
    session,
    supabase,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
