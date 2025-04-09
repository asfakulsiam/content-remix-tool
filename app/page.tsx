"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  const [currentFormat, setCurrentFormat] = useState(0)
  const formats = ["tweets", "meme captions", "LinkedIn posts", "YouTube scripts", "FAQ summaries"]

  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFormat((prev) => (prev + 1) % formats.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [formats.length])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Transform Your Content Into
            <div className="h-16 md:h-20 overflow-hidden mt-2">
              <motion.div
                animate={{ y: -currentFormat * (isMobile ? 64 : 80) }}
                transition={{ ease: "easeInOut", duration: 0.5 }}
              >
                {formats.map((format, index) => (
                  <div key={index} className="h-16 md:h-20 flex items-center justify-center px-2">
                    <span className="text-primary whitespace-nowrap">{format}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Paste your content and let AI transform it into multiple engaging formats tailored for different platforms.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/remix">
            <Button size="lg" className="text-lg px-8">
              Get Started
            </Button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl"
        >
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold mb-2">Paste Content</h3>
            <p className="text-muted-foreground text-center">Simply paste your blog, article, or any text content</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-2">Choose Format</h3>
            <p className="text-muted-foreground text-center">
              Select from multiple output formats for different platforms
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-card rounded-lg border shadow-sm">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold mb-2">Get Results</h3>
            <p className="text-muted-foreground text-center">
              Instantly receive AI-generated remixed content ready to use
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
