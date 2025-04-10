"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { RemixProvider } from "@/context/remix-context"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RemixProvider>
        {children}
        <Toaster />
      </RemixProvider>
    </ThemeProvider>
  )
}
