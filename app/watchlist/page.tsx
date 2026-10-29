import { ContentGrid } from "@/components/content-grid"
import { PageHeader } from "@/components/page-header"
import { getPopularMovies } from "@/lib/tmdb"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Bookmark } from "lucide-react"
import Link from "next/link"

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions)
  const user = session?.user?.id ? await prisma.user.findUnique({ where: { id: session.user.id }, include: { watchlist: true } }) : null
  const watchlist = (user?.watchlist || []).map((item: any) => ({ ...item, id: item.tmdbId }))
  const recommendations = await getPopularMovies()

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 md:px-8">
      <PageHeader
        title="My List"
        description="Your personal collection of movies, series, and anime you want to watch."
      />

      {watchlist.length > 0 ? (
        <div className="mt-8">
          <ContentGrid items={watchlist} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="h-24 w-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <Bookmark className="h-10 w-10 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">Your list is empty</h2>
          <p className="text-gray-400 max-w-sm mt-2 mb-8">
            Add movies and shows to your list to keep track of what you want to watch next.
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all orange-glow"
          >
            Browse Trending
          </Link>
        </div>
      )}

      {/* Recommendations based on list */}
      {watchlist.length > 0 && (
        <div className="mt-24 space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold">Recommended for You</h2>
          </div>
          <ContentGrid items={recommendations.slice(0, 5)} />
        </div>
      )}
    </div>
  )
}
