"use client";

import { motion } from "motion/react";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type MotionRevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  animateOnLoad?: boolean;
}>;

type MotionStaggerProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  animateOnLoad?: boolean;
}>;

type MotionItemProps = PropsWithChildren<{
  className?: string;
}>;

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionReveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
  animateOnLoad = false,
}: MotionRevealProps) {
  const revealProps = animateOnLoad
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once, amount: 0.25 } };

  return (
    <motion.div
      className={cn(className)}
      {...revealProps}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MotionStagger({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  once = true,
  animateOnLoad = false,
}: MotionStaggerProps) {
  const staggerProps = animateOnLoad
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once, amount: 0.25 } };

  return (
    <motion.div
      className={cn(className)}
      {...staggerProps}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className }: MotionItemProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
