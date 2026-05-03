"use client";

import { useEffect } from "react";

export default function PwaProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration failures should not block app usage.
    });
  }, []);

  return null;
}
