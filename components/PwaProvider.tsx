"use client";

import { useEffect } from "react";

export default function PwaProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    if (!document.querySelector("link[rel='manifest']")) {
      const link = document.createElement("link");
      link.rel = "manifest";
      link.href = "/manifest.webmanifest";
      document.head.appendChild(link);
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration failures should not block app usage.
    });
  }, []);

  return null;
}
