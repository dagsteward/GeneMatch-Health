"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

// Animates a number (with optional non-numeric suffix, e.g. "250,000" or
// "98%") from 0 up to its target once scrolled into view. Falls back to a
// static render for prefers-reduced-motion or values with no digits.
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  const numericMatch = value.match(/[\d,]+/);
  const numericValue = numericMatch ? Number(numericMatch[0].replace(/,/g, "")) : null;

  useEffect(() => {
    if (!inView || numericValue === null || prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const prefix = value.slice(0, numericMatch!.index);
    const suffix = value.slice((numericMatch!.index ?? 0) + numericMatch![0].length);
    const start = performance.now();

    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numericValue * eased);
      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, numericValue, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
