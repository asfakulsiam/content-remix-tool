"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function VersionCheck() {
  const { toast } = useToast();

  useEffect(() => {
    try {
      const currentVersion = "0.0.1.1-beta"; // Set your current version here
      const lastVersion = localStorage.getItem("app_version");

      // If there's no previous version or if it's different from the current version
      if (!lastVersion || lastVersion !== currentVersion) {
        toast({
          title: `Updated to version ${currentVersion}! 🎉`,
          description:
            "YouTube remix fixed! 🎬 Now you can save your remixes, revisit them anytime from 'Recent Remixes', and delete the ones you don't need. Remixes are stored locally for 7 days. Enjoy the upgrade! 🚀",
          duration: 5000,
        });

        // Store the new version in localStorage after the toast
        localStorage.setItem("app_version", currentVersion);
      }
    } catch (error) {
      console.log("Version check error (ignored):", error);
    }
  }, [toast]);

  return null;
}
