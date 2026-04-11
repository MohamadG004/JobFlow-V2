// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@/types';
import { authService } from '@/services/authService';
import { supabase } from '@/services/supabase';

interface AuthContextValue {
  user: User | null;
  guestMode: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  enterGuestMode: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const GUEST_USER: User = { id: 'guest', email: 'Guest' };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [guestMode, setGuestMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedGuest = sessionStorage.getItem('jobflow-guest') === 'true';
    if (savedGuest) {
      setUser(GUEST_USER);
      setGuestMode(true);
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? '' });
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? '' });
        setGuestMode(false);
        sessionStorage.removeItem('jobflow-guest');
      } else {
        setUser(null);
        setGuestMode(false);
        sessionStorage.removeItem('jobflow-guest');
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setGuestMode(false);
    sessionStorage.removeItem('jobflow-guest');
    await authService.signIn(email, password);
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    setGuestMode(false);
    sessionStorage.removeItem('jobflow-guest');
    await authService.signUp(email, password);
  }, []);

  const signOut = useCallback(async () => {
    if (guestMode) {
      setUser(null);
      setGuestMode(false);
      sessionStorage.removeItem('jobflow-guest');
      return;
    }
    await authService.signOut();
    setUser(null);
    setGuestMode(false);
    sessionStorage.removeItem('jobflow-guest');
  }, [guestMode]);

  const resetPassword = useCallback(async (email: string) => {
    await authService.resetPassword(email);
  }, []);

  const enterGuestMode = useCallback(() => {
    setUser(GUEST_USER);
    setGuestMode(true);
    sessionStorage.setItem('jobflow-guest', 'true');
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, guestMode, loading, signIn, signUp, signOut, resetPassword, enterGuestMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
