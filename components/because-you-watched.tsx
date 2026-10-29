import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getMovieRecommendations, getTVRecommendations } from "@/lib/tmdb"
import { ContentSection } from "./content-section"
import { ChevronDown } from "lucide-react"

export async function BecauseYouWatched() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return null

  const latest = await prisma.history.findFirst({
    where: { userId: session.user.id },
    include: { content: true },
    orderBy: { updatedAt: "desc" },
  })
  if (!latest?.content?.tmdbId) return null

  const items = latest.content.type === "series" || latest.content.type === "anime"
    ? await getTVRecommendations(latest.content.tmdbId)
    : await getMovieRecommendations(latest.content.tmdbId)

  if (items.length === 0) return null

  return (
    <div className="group/based">
      <div className="w-full px-5 pt-5 sm:px-8 md:px-12 lg:px-16">
        <button className="flex items-center gap-2 text-2xl font-bold text-white" type="button">
          <span>Because you watched</span>
          <span className="max-w-[260px] truncate text-2xl text-white">{latest.content.title}</span>
          <ChevronDown className="h-5 w-5 text-gray-400 transition group-hover/based:rotate-180" />
        </button>
      </div>
      <ContentSection title="" items={items.slice(0, 12)} />
    </div>
  )
}
