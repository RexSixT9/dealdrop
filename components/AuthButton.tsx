"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { SignOut } from "@/app/auth/actions";

type AuthButtonProps = {
  user?: unknown;
};

export default function AuthButton({ user }: AuthButtonProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (user) {
    return (
      <form action={SignOut}>
        <Button
          variant="outline"
          size="default"
          type="submit"
          className="h-9 gap-2 rounded-full border-border/70 bg-card/70 px-3.5 text-sm text-foreground hover:bg-card/90 max-[360px]:px-3 max-[360px]:text-xs sm:h-10 sm:px-4 sm:text-base"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="outline"
        size="default"
        className="h-9 gap-2 rounded-full border-primary/30 bg-primary/10 px-3.5 text-sm text-primary hover:bg-primary/15 max-[360px]:px-3 max-[360px]:text-xs sm:h-10 sm:px-4 sm:text-base"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
