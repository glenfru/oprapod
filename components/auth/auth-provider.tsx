'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { useAuth } from '@/hooks/use-auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isHydrated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isHydrated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure hydration is complete before rendering auth-dependent content
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};