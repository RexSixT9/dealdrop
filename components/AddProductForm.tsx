"use client";

import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { AuthModal } from "./AuthModal";
import { addProduct } from "@/app/auth/actions";
import { toast } from "sonner";

const AddProductForm = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedUrl = url.trim();

    if (!normalizedUrl) {
      toast.error("Please enter a valid product URL.");
      return;
    }

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("url", normalizedUrl);
      const result = await addProduct(formData);

      if (result.success) {
        toast.success("Product added successfully!");
        setUrl("");
      } else {
        toast.error(
          result.message || "Failed to add product. Please try again.",
        );
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to add product. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="mx-auto w-full max-w-2xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="url"
            placeholder="Enter product URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
            className="h-12 border-border/80 bg-card/70 text-base shadow-xs sm:flex-1"
          />
          <Button
            type="submit"
            disabled={loading || !url.trim()}
            className="h-11 w-full bg-orange-500 px-6 text-white shadow-xs hover:bg-orange-600 sm:h-12 sm:w-auto sm:px-8"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Tracking...
              </>
            ) : (
              "Track Price"
            )}
          </Button>
        </div>
      </form>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default AddProductForm;
