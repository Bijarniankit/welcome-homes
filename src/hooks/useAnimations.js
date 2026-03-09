import { useRef } from 'react';
import { useInView, useScroll, useTransform } from 'motion/react';

/* Fade-in when element scrolls into view */
export function useFadeIn(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
    ...options,
  });
  return { ref, isInView };
}

/* Parallax scroll effect */
export function useParallax(distance = 100) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y };
}

/* Scale on scroll */
export function useScrollScale() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return { ref, scale, opacity };
}

/* Horizontal scroll progress */
export function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  return scrollYProgress;
}
