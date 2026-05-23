"use client";

import { useEffect, useState } from "react";
import { EVENT_TARGET } from "@/lib/constants";

interface CountdownValues {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  isLive: boolean;
}

function computeCountdown(target: Date): CountdownValues {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      isLive: true,
    };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const months = Math.floor(totalDays / 30);
  const days = totalDays % 30;

  return {
    months,
    days,
    hours: totalHours % 24,
    minutes: totalMinutes % 60,
    seconds: totalSeconds % 60,
    isPast: false,
    isLive: totalHours < 24,
  };
}

export function useCountdown(target: Date = EVENT_TARGET) {
  const [values, setValues] = useState<CountdownValues>(() => computeCountdown(target));

  useEffect(() => {
    setValues(computeCountdown(target));
    const interval = setInterval(() => {
      setValues(computeCountdown(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return values;
}
