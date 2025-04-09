"use client"

import { useRemix } from "@/context/remix-context"
import { Button } from "@/components/ui/button"
import { Twitter, Smile, Linkedin, Youtube, HelpCircle } from "lucide-react"

const formats = [
  { id: "tweet", label: "Tweet", icon: Twitter },
  { id: "meme", label: "Meme Caption", icon: Smile },
  { id: "linkedin", label: "LinkedIn Post", icon: Linkedin },
  { id: "youtube", label: "YouTube Script", icon: Youtube },
  { id: "faq", label: "FAQ Summary", icon: HelpCircle },
]

export default function FormatSelector() {
  const { selectedFormat, setSelectedFormat } = useRemix()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Choose Output Format</h2>
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => {
          const Icon = format.icon
          return (
            <Button
              key={format.id}
              variant={selectedFormat === format.id ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={() => setSelectedFormat(format.id as any)}
            >
              <Icon className="h-4 w-4" />
              {format.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
