"use client";

import { motion } from "motion/react";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type MotionPageProps = PropsWithChildren<{
  className?: string;
}>;

export default function MotionPage({ children, className }: MotionPageProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
