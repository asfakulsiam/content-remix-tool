import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container py-6 md:py-8 px-4 md:px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">About Content Remix Tool</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>What is Content Remix Tool?</CardTitle>
            <CardDescription>Transform your content into multiple formats</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Content Remix Tool is an AI-powered web application that helps content creators, marketers, and writers
              transform their long-form content into various formats optimized for different platforms.
            </p>
            <p>
              Whether you need to repurpose a blog post into a tweet thread, create engaging LinkedIn posts from your
              articles, or generate YouTube script outlines from your written content, Content Remix Tool makes the
              process quick and easy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Simple, fast, and powered by AI</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Paste your original content in the input area</li>
              <li>Select your desired output format</li>
              <li>Click "Remix Now" to generate your transformed content</li>
              <li>Copy the result and use it on your preferred platform</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Built with modern web technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Frontend:</strong> Next.js, TailwindCSS, shadcn/ui components
              </li>
              <li>
                <strong>Animation:</strong> Framer Motion for smooth transitions
              </li>
              <li>
                <strong>AI:</strong> Powered by OpenAI's GPT models
              </li>
              <li>
                <strong>Storage:</strong> Local browser storage for saving your content
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Your content stays private</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Content Remix Tool does not store your content on any servers. Your original and remixed content is only
              saved in your browser's local storage for convenience. We respect your privacy and do not track or analyze
              the content you remix.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
