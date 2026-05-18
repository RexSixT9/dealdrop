"use client";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function ModeToggle() {
  return (
    <AnimatedThemeToggler
      aria-label="Toggle theme"
      variant="circle"
      className="relative h-9 w-9 rounded-full border-border/70 bg-card/70 text-foreground hover:bg-card/90 max-[360px]:h-8 max-[360px]:w-8 sm:h-10 sm:w-10"
    />
  );
}