export const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] as const },
};

export const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-100px" },
};

export const staggerChild = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] as const },
};
