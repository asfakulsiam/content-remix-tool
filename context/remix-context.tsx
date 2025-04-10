"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Format = "tweet" | "meme" | "linkedin" | "youtube" | "faq"

interface RemixItem {
  id: string
  title: string
  content: string
  format: Format
  timestamp: number // Unix timestamp
}

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
  recentRemixes: RemixItem[]
  addToRecentRemixes: (title: string) => void
  getRemixById: (id: string) => RemixItem | undefined
  deleteRemixById: (id: string) => void
  clearAll: () => void
}

const RemixContext = createContext<RemixContextType | undefined>(undefined)

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9)

// Helper to get a title from content
const generateTitle = (content: string): string => {
  // Get first 30 characters of content or first line
  const firstLine = content.split("\n")[0].trim()
  return firstLine.length > 30 ? firstLine.substring(0, 30) + "..." : firstLine
}

// 7 days in milliseconds
const EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000

export function RemixProvider({ children }: { children: ReactNode }) {
  const [originalContent, setOriginalContent] = useState("")
  const [selectedFormat, setSelectedFormat] = useState<Format>("tweet")
  const [remixedContent, setRemixedContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recentRemixes, setRecentRemixes] = useState<RemixItem[]>([])

  // Load recent remixes from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedRemixes = localStorage.getItem("recent_remixes")
        if (storedRemixes) {
          const parsedRemixes = JSON.parse(storedRemixes) as RemixItem[]

          // Filter out expired remixes (older than 7 days)
          const now = Date.now()
          const validRemixes = parsedRemixes.filter((remix) => now - remix.timestamp < EXPIRATION_TIME)

          setRecentRemixes(validRemixes)

          // If we filtered some out, update localStorage
          if (validRemixes.length !== parsedRemixes.length) {
            localStorage.setItem("recent_remixes", JSON.stringify(validRemixes))
          }
        }
      } catch (error) {
        console.error("Error loading recent remixes:", error)
        // If there's an error, reset the storage
        localStorage.removeItem("recent_remixes")
      }
    }
  }, [])

  // Add a new remix to recent remixes
  const addToRecentRemixes = (title: string) => {
    if (!remixedContent) return

    const newRemix: RemixItem = {
      id: generateId(),
      title: title || generateTitle(remixedContent),
      content: remixedContent,
      format: selectedFormat,
      timestamp: Date.now(),
    }

    const updatedRemixes = [newRemix, ...recentRemixes.slice(0, 9)] // Keep only 10 most recent
    setRecentRemixes(updatedRemixes)

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("recent_remixes", JSON.stringify(updatedRemixes))
    }
  }

  // Get a remix by ID
  const getRemixById = (id: string) => {
    return recentRemixes.find((remix) => remix.id === id)
  }

  // Delete a remix by ID
  const deleteRemixById = (id: string) => {
    const updatedRemixes = recentRemixes.filter((remix) => remix.id !== id)
    setRecentRemixes(updatedRemixes)

    // Update localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("recent_remixes", JSON.stringify(updatedRemixes))
    }
  }

  // Clear all inputs and results
  const clearAll = () => {
    setOriginalContent("")
    setRemixedContent("")
    setError(null)
  }

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
        recentRemixes,
        addToRecentRemixes,
        getRemixById,
        deleteRemixById,
        clearAll,
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
