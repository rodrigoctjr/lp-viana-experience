'use client';
import { useState, useEffect } from 'react';

const EVENT_DATE = new Date('2026-11-14T08:00:00-03:00');

export interface CountdownValue {
  days: number;
  hours: number;
  mins: number;
  secs: number;
  ended: boolean;
  text: string;
  mounted: boolean;
}

const PLACEHOLDER: CountdownValue = {
  days: 0, hours: 0, mins: 0, secs: 0,
  ended: false, text: '— : — : —', mounted: false,
};

function calc(diff: number): CountdownValue {
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, ended: true, text: 'AGORA!', mounted: true };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return { days, hours, mins, secs, ended: false, text: `${pad(days)} : ${pad(hours)} : ${pad(mins)} : ${pad(secs)}`, mounted: true };
}

export function useCountdown(): CountdownValue {
  const [value, setValue] = useState<CountdownValue>(PLACEHOLDER);

  useEffect(() => {
    // Só roda no cliente, evitando mismatch de hydration
    setValue(calc(EVENT_DATE.getTime() - Date.now()));
    const interval = setInterval(() => {
      setValue(calc(EVENT_DATE.getTime() - Date.now()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return value;
}
