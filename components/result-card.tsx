"use client"

import { useRemix } from "@/context/remix-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ResultCard() {
  const { remixedContent, selectedFormat, isLoading } = useRemix()
  const { toast } = useToast()

  const formatTitles = {
    tweet: "Tweet",
    meme: "Meme Caption",
    linkedin: "LinkedIn Post",
    youtube: "YouTube Script",
    faq: "FAQ Summary",
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(remixedContent)
    toast({
      title: "Copied to clipboard",
      description: "Your remixed content has been copied to clipboard.",
    })
  }

  if (!remixedContent && !isLoading) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Remixed {formatTitles[selectedFormat]}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="whitespace-pre-line">{remixedContent}</div>
        )}
      </CardContent>
      {!isLoading && remixedContent && (
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
