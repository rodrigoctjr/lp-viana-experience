'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RsvpContextValue {
  count: number;
  bump: (by?: number) => void;
}

const RsvpContext = createContext<RsvpContextValue>({ count: 998, bump: () => {} });

export function RsvpProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(998);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) setCount(c => c + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const bump = (by = 1) => setCount(c => c + by);

  return <RsvpContext.Provider value={{ count, bump }}>{children}</RsvpContext.Provider>;
}

export function useRsvp() {
  return useContext(RsvpContext);
}
