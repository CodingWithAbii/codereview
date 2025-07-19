'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { AuthSession } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<{ session: AuthSession | null | undefined }>({
  session: undefined,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // Simple refresh to sync server and client auth state
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
