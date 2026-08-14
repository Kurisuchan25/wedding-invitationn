import { useEffect, useState } from 'react';

function getTimeLeft(targetISO) {
  const total = new Date(targetISO).getTime() - Date.now();
  const clamped = Math.max(total, 0);
  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

/**
 * Ticks down to the given ISO date string every second.
 * Returns { days, hours, minutes, seconds, total, isPast }.
 */
export default function useCountdown(targetISO) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetISO));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetISO));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetISO]);

  return { ...timeLeft, isPast: timeLeft.total <= 0 };
}
