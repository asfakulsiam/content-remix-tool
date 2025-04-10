"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function VersionCheck() {
  const { toast } = useToast();

  useEffect(() => {
    const currentVersion = "0.02.3-beta";
    const lastVersion = localStorage.getItem("app_version");

    if (!lastVersion || lastVersion !== currentVersion) {
      // Delay the toast so the system has time to mount
      const timeout = setTimeout(() => {
        toast({
          title: `Updated to version ${currentVersion}! 🎉`,
          description:
            "YouTube remix fixed! 🎬 Now you can save your remixes, revisit them anytime from 'Recent Remixes', and delete the ones you don't need. Remixes are stored locally for 7 days. Enjoy the upgrade! 🚀",
          duration: 5000,
        });

        localStorage.setItem("app_version", currentVersion);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return null;
}
