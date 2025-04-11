"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function VersionCheck() {
  const { toast } = useToast();

  useEffect(() => {
    const currentVersion = "1.0-sI4m";
    const lastVersion = localStorage.getItem("app_version");

    if (!lastVersion || lastVersion !== currentVersion) {
      const timeout = setTimeout(() => {
        toast({
          title: `Updated to version ${currentVersion}! 🎉`,
          description: "Updated Server and AI Managements.",
          duration: 5000,
        });

        localStorage.setItem("app_version", currentVersion);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return null;
}
