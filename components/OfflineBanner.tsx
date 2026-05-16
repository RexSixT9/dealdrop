"use client";

import { useEffect, useState } from "react";
import { WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateStatus = () => setIsOffline(!navigator.onLine);

    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:bottom-6">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-2 rounded-2xl border border-border/70 bg-card/95 px-4 py-3 text-center text-sm text-foreground shadow-lg sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-primary/10 text-primary">
            <WifiOff className="h-4 w-4" />
          </span>
          <span>
            You are offline. Some features may be unavailable until you reconnect.
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    </div>
  );
}
