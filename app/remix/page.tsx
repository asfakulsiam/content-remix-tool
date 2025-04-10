"use client";

import { useEffect } from "react";
import { useRemix } from "@/context/remix-context";
import { Button } from "@/components/ui/button";
import InputArea from "@/components/input-area";
import FormatSelector from "@/components/format-selector";
import ResultCard from "@/components/result-card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function RemixPage() {
  const {
    originalContent,
    selectedFormat,
    setRemixedContent,
    isLoading,
    setIsLoading,
    setError,
    remixedContent,
  } = useRemix();
  const { toast } = useToast();

  const handleRemix = async () => {
    if (!originalContent.trim()) {
      toast({
        title: "Content required",
        description: "Please enter some content to remix.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/remix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: originalContent,
          format: selectedFormat,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remix content");
      }

      const data = await response.json();
      setRemixedContent(data.result);

      // Save to localStorage
      localStorage.setItem("remixedContent", data.result);
      localStorage.setItem("lastFormat", selectedFormat);
    } catch (error) {
      console.error("Error remixing content:", error);
      setError("Failed to remix content. Please try again.");
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to remix content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load remixed content from localStorage if available
  useEffect(() => {
    const savedContent = localStorage.getItem("remixedContent");
    const savedFormat = localStorage.getItem("lastFormat");

    if (savedContent && savedFormat === selectedFormat) {
      setRemixedContent(savedContent);
    } else {
      setRemixedContent("");
    }
  }, [selectedFormat, setRemixedContent]);

  return (
    <div className="container py-6 md:py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 text-center">
          Remix Your Content
        </h1>

        <div className="grid gap-8">
          <InputArea />
          <FormatSelector />

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleRemix}
              disabled={isLoading || !originalContent.trim()}
              className="px-8"
            >
              {isLoading ? "Remixing..." : "Remix Now"}
            </Button>
          </div>

          <ResultCard />
        </div>
      </motion.div>
    </div>
  );
}
