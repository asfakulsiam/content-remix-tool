"use client"

import { useState } from "react"
import { useRemix } from "@/context/remix-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"

export default function RecentRemixes() {
  const { recentRemixes, deleteRemixById } = useRemix()
  const { toast } = useToast()
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  // No remixes to show
  if (recentRemixes.length === 0) {
    return null
  }

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "The remixed content has been copied to your clipboard.",
    })
  }

  const handleDelete = (id: string) => {
    deleteRemixById(id)
    toast({
      title: "Remix deleted",
      description: "The remix has been removed from your history.",
    })
  }

  const formatTimestamp = (timestamp: number) => {
    return formatDistanceToNow(timestamp, { addSuffix: true })
  }

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-bold">Recent Remixes</h2>
      <div className="space-y-3">
        {recentRemixes.map((remix) => (
          <Card key={remix.id} className="overflow-hidden">
            <div>
              <CardHeader className="p-4 cursor-pointer hover:bg-muted/50" onClick={() => toggleItem(remix.id)}>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-base">{remix.title}</CardTitle>
                    <CardDescription>
                      {remix.format.charAt(0).toUpperCase() + remix.format.slice(1)} •{" "}
                      {formatTimestamp(remix.timestamp)}
                    </CardDescription>
                  </div>
                  {openItems[remix.id] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </CardHeader>

              {openItems[remix.id] && (
                <>
                  <CardContent className="p-4 pt-0 border-t">
                    <div className="whitespace-pre-line">{remix.content}</div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleCopy(remix.content)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(remix.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </CardFooter>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
