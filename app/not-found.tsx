import Link from "next/link"
import { Play, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black px-6 text-center">
      {/* Background Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px]" />

      <div className="relative z-10 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-3xl border border-primary/20 rotate-12">
            <Play className="h-16 w-16 text-primary fill-current" />
          </div>
          <h1 className="text-9xl font-black tracking-tighter text-white opacity-20">404</h1>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white tracking-tight">Lost in Space?</h2>
          <p className="text-gray-400 max-w-md mx-auto text-lg">
            We couldn't find the page you're looking for. It might have been moved or the title was changed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all orange-glow w-full sm:w-auto"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link
            href="/search"
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            <Search className="h-5 w-5" />
            Search Movies
          </Link>
        </div>
      </div>
    </div>
  )
}
