"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function VersionCheck() {
  const { toast } = useToast();

  useEffect(() => {
    const currentVersion = "1.0.MokhlesUr";
    const lastVersion = localStorage.getItem("app_version");

    if (!lastVersion || lastVersion !== currentVersion) {
      // Delay the toast so the system has time to mount
      const timeout = setTimeout(() => {
        toast({
          title: `Updated to version ${currentVersion}! 🎉`,
          description:
            "hello mokhlesur its your buddy siam,, how was the surprise",
          duration: 5000,
        });

        localStorage.setItem("app_version", currentVersion);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return null;
}
