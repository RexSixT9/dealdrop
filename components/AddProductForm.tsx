"use client";

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { addProduct } from "@/app/auth/actions";
import { toast } from "sonner";

type AddProductFormProps = {
  isAuthenticated: boolean;
  currentCount: number;
  limit: number;
};

function getUrlError(value: string) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "Use a URL that starts with http or https.";
    }
  } catch {
    return "Please enter a valid product URL.";
  }

  return null;
}

const AddProductForm = ({
  isAuthenticated,
  currentCount,
  limit,
}: AddProductFormProps) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limitReached = isAuthenticated && currentCount >= limit;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedUrl = url.trim();

    if (limitReached) {
      const message = `Tracking limit reached (${limit}). Remove a product to add another.`;
      setError(message);
      toast.error(message);
      return;
    }

    if (!normalizedUrl) {
      const message = "Please enter a valid product URL.";
      setError(message);
      toast.error(message);
      return;
    }

    const urlError = getUrlError(normalizedUrl);
    if (urlError) {
      setError(urlError);
      toast.error(urlError);
      return;
    }

    if (!isAuthenticated) {
      setError(null);
      setShowAuthModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("url", normalizedUrl);
      const result = await addProduct(formData);

      if (result.success) {
        const action = result.action as string | undefined;
        const message = result.message || "Product added successfully!";

        if (action === "duplicate") {
          toast.info(message);
        } else if (action === "updated") {
          toast.success(message);
          setUrl("");
        } else {
          toast.success(message);
          setUrl("");
        }
        setError(null);
      } else {
        const message =
          result.message || "Failed to add product. Please try again.";
        setError(message);
        toast.error(message);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to add product. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="mx-auto w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
          <Input
            type="url"
            placeholder="Paste a product URL"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError(null);
            }}
            required
            disabled={loading || limitReached}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "add-product-error" : undefined}
            className="h-11 rounded-xl border-border/80 bg-card/70 text-sm shadow-xs sm:h-12 sm:flex-1 sm:text-base"
          />
          <Button
            type="submit"
            disabled={loading || !url.trim() || limitReached}
            className="h-11 w-full rounded-xl bg-primary px-5 text-sm text-primary-foreground shadow-xs hover:bg-primary/90 sm:h-12 sm:w-auto sm:px-8 sm:text-base"
          >
            {limitReached ? (
              "Limit reached"
            ) : loading ? (
              <>
                <Loader className="animate-spin w-4 h-4 mr-1.5" />
                Tracking...
              </>
            ) : (
              "Start Tracking"
            )}
          </Button>
        </div>
        {isAuthenticated && (
          <p className="mt-2 text-xs text-muted-foreground">
            {limitReached
              ? `Limit reached (${limit}). Remove a product to add another.`
              : `${currentCount}/${limit} tracked`}
          </p>
        )}
        {error && (
          <p
            id="add-product-error"
            role="alert"
            className="mt-2 text-xs text-destructive"
          >
            {error}
          </p>
        )}
      </form>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AddProductForm;
