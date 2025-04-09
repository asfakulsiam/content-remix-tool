"use client"

import { useRemix } from "@/context/remix-context"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function InputArea() {
  const { originalContent, setOriginalContent } = useRemix()

  // Load from localStorage if available
  useEffect(() => {
    const savedContent = localStorage.getItem("originalContent")
    if (savedContent) {
      setOriginalContent(savedContent)
    }
  }, [setOriginalContent])

  // Save to localStorage when content changes
  useEffect(() => {
    if (originalContent) {
      localStorage.setItem("originalContent", originalContent)
    }
  }, [originalContent])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Content</h2>
        <Button variant="outline" size="sm" onClick={() => setOriginalContent("")} disabled={!originalContent}>
          Clear
        </Button>
      </div>
      <Textarea
        placeholder="Paste or write your content here..."
        className="min-h-[200px]"
        value={originalContent}
        onChange={(e) => setOriginalContent(e.target.value)}
      />
      <div className="text-xs text-muted-foreground">
        Tip: The more detailed your content, the better the AI can remix it.
      </div>
    </div>
  )
}
