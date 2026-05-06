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
        <Button variant="outline" size="default" type="submit" className="gap-2 rounded-xl px-3 text-base">
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
        variant="default"
        size="default"
        className="gap-2 rounded-xl bg-[#FA5D19] px-3 text-base text-white hover:bg-[#FA5D19]/90"
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
