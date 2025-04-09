import Link from "next/link"
import { RefreshCw } from "lucide-react"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="bg-primary p-1 rounded-md">
        <RefreshCw className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-bold text-xl">Content Remix</span>
    </Link>
  )
}
