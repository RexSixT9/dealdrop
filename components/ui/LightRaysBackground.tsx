"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const LightRays = dynamic(() => import("@/components/ui/LightRays"), {
  ssr: false,
  loading: () => null,
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function prefersSavingData() {
  const connection = navigator as Navigator & {
    connection?: { saveData?: boolean };
  };

  return Boolean(connection.connection?.saveData);
}

function hasCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export default function LightRaysBackground() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMobileLike, setIsMobileLike] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || resolvedTheme !== "dark") {
      setIsReady(false);
      return;
    }

    if (prefersReducedMotion() || prefersSavingData()) {
      setIsReady(false);
      return;
    }

    const updateViewportProfile = () => {
      setIsMobileLike(window.innerWidth < 768 || hasCoarsePointer());
    };

    const start = () => {
      updateViewportProfile();
      setIsReady(true);
    };

    const requestIdle = window.requestIdleCallback;
    const cancelIdle = window.cancelIdleCallback;
    let idleCallback: number | undefined;
    let timeoutId: number | undefined;

    if (typeof requestIdle === "function") {
      idleCallback = requestIdle(start, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(start, 250);
    }

    window.addEventListener("resize", updateViewportProfile);

    return () => {
      window.removeEventListener("resize", updateViewportProfile);

      if (idleCallback !== undefined && typeof cancelIdle === "function") {
        cancelIdle(idleCallback);
      }

      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isMounted, resolvedTheme]);

  if (!isMounted || resolvedTheme !== "dark" || !isReady) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[155px] overflow-hidden sm:h-[192px] md:h-[230px] lg:h-[230px] xl:h-[270px] 2xl:h-[320px]">
      <LightRays
        raysOrigin="top-center"
        raysColor="#F97316"
        raysSpeed={isMobileLike ? 0.46 : 0.72}
        lightSpread={isMobileLike ? 0.72 : 0.62}
        rayLength={isMobileLike ? 2.05 : 2.75}
        pulsating={false}
        fadeDistance={isMobileLike ? 0.68 : 0.82}
        saturation={isMobileLike ? 0.72 : 0.85}
        followMouse={!isMobileLike}
        mouseInfluence={isMobileLike ? 0 : 0.06}
        noiseAmount={isMobileLike ? 0 : 0.015}
        distortion={isMobileLike ? 0.018 : 0.035}
        maxDpr={isMobileLike ? 1 : 1.5}
        targetFps={isMobileLike ? 24 : 45}
        className="opacity-[0.42] mix-blend-screen sm:opacity-[0.5] lg:opacity-[0.58]"
      />
    </div>
  );
}
