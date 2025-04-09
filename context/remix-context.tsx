"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Format = "tweet" | "meme" | "linkedin" | "youtube" | "faq"

type RemixContextType = {
  originalContent: string
  setOriginalContent: (content: string) => void
  selectedFormat: Format
  setSelectedFormat: (format: Format) => void
  remixedContent: string
  setRemixedContent: (content: string) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

const RemixContext = createContext<RemixContextType | undefined>(undefined)

export function RemixProvider({ children }: { children: ReactNode }) {
  const [originalContent, setOriginalContent] = useState("")
  const [selectedFormat, setSelectedFormat] = useState<Format>("tweet")
  const [remixedContent, setRemixedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <RemixContext.Provider
      value={{
        originalContent,
        setOriginalContent,
        selectedFormat,
        setSelectedFormat,
        remixedContent,
        setRemixedContent,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </RemixContext.Provider>
  )
}

export function useRemix() {
  const context = useContext(RemixContext)
  if (context === undefined) {
    throw new Error("useRemix must be used within a RemixProvider")
  }
  return context
}
