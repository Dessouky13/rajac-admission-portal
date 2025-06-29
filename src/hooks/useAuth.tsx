
import { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type AuthContextProps = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear session when page is closed/refreshed
    const handleBeforeUnload = () => {
      // Clear all auth data from localStorage
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('sb-amswxkulhgtrmowocmtu-auth-token');
      // Sign out from Supabase
      supabase.auth.signOut();
    };

    // Listen for page unload events
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    // Auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check session - but only from sessionStorage, not localStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Only restore session if it exists in sessionStorage (not localStorage)
      const sessionData = sessionStorage.getItem('sb-amswxkulhgtrmowocmtu-auth-token');
      if (sessionData && session) {
        setSession(session);
        setUser(session?.user ?? null);
      } else {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // Clear all stored auth data
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('sb-amswxkulhgtrmowocmtu-auth-token');
    sessionStorage.removeItem('sb-amswxkulhgtrmowocmtu-auth-token');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
