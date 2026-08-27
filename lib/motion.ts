import type { Variants } from 'framer-motion';

/**
 * Shared motion vocabulary. Distances stay small on purpose — the site should
 * feel settled, not animated. `MotionConfig reducedMotion="user"` in the root
 * layout strips transforms for anyone who asks for reduced motion.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Standard viewport trigger: fires once, slightly before the element lands. */
export const viewportOnce = { once: true, margin: '-80px 0px -80px 0px' } as const;
