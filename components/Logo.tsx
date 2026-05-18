"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const MotionLink = motion.create(Link);

type LogoVariant = "compact" | "full";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

const logoSources = {
  compact: {
    dark: "/logo-navbar-dark-compact.svg",
    light: "/logo-navbar-light-compact.svg",
  },
  full: {
    dark: "/logo-navbar-dark.svg",
    light: "/logo-navbar-light.svg",
  },
};

export default function Logo({ variant = "compact", className }: LogoProps) {
  const { dark, light } = logoSources[variant];
  const linkClassName = ["inline-flex items-center", className].filter(Boolean).join(" ");

  return (
    <MotionLink
      href="/"
      aria-label="DealDrop home"
      className={linkClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        loading="eager"
        className="hidden h-8 w-auto dark:block sm:h-10"
        src={dark}
        alt="DealDrop logo"
        width={600}
        height={600}
      />
      <Image
        loading="eager"
        className="block h-8 w-auto dark:hidden sm:h-10"
        src={light}
        alt="DealDrop logo"
        width={600}
        height={600}
      />
    </MotionLink>
  );
}
