"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const shouldReduceMotion = useReducedMotion();
  const revealProps = shouldReduceMotion
    ? { initial: false as const, animate: "show" as const }
    : animateOnLoad
      ? { initial: "hidden" as const, animate: "show" as const }
      : {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once, amount: 0.25 },
        };

  return (
    <motion.div
      className={cn(className)}
      {...revealProps}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0 },
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease, delay }}
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
  const shouldReduceMotion = useReducedMotion();
  const staggerProps = shouldReduceMotion
    ? { initial: false as const, animate: "show" as const }
    : animateOnLoad
      ? { initial: "hidden" as const, animate: "show" as const }
      : {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once, amount: 0.25 },
        };

  return (
    <motion.div
      className={cn(className)}
      {...staggerProps}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : stagger,
            delayChildren: shouldReduceMotion ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className }: MotionItemProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={
        shouldReduceMotion
          ? {
              hidden: { opacity: 1, y: 0 },
              show: { opacity: 1, y: 0 },
            }
          : {
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }
      }
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease }}
    >
      {children}
    </motion.div>
  );
}
