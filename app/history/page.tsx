import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Clock, Play } from "lucide-react"
import Link from "next/link"

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return (
      <div className="mx-auto max-w-4xl px-5 pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold">Watch History</h1>
        <p className="mt-3 text-gray-400">Sign in to view and resume what you watched.</p>
        <Link href="/login" className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-bold text-white">Sign in</Link>
      </div>
    )
  }

  const items = await prisma.history.findMany({
    where: { userId: session.user.id },
    include: { content: true },
    orderBy: { updatedAt: "desc" },
    take: 50,
  })

  return (
    <div className="mx-auto min-h-screen w-full px-5 pt-32 pb-20 sm:px-8 md:px-12 lg:px-16">
      <div className="mb-8">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary"><Clock className="h-4 w-4" /> Activity</p>
        <h1 className="text-4xl font-black">Watch History</h1>
      </div>

      {items.length === 0 ? (
        <div className="py-32 text-center">
          <Clock className="mx-auto mb-5 h-12 w-12 text-gray-600" />
          <h2 className="text-xl font-bold">Nothing watched yet</h2>
          <p className="mt-2 text-gray-400">Titles you open in the player will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((item: any) => {
            const route = item.content.type === "series" || item.content.type === "anime" ? item.content.type : "movie"
            const resume = route === "movie"
              ? `/movie/${item.content.tmdbId}#player`
              : `/${route}/${item.content.tmdbId}?season=${item.season || 1}&episode=${item.episode || 1}#player`
            return (
              <Link href={resume} key={item.id} className="group overflow-hidden rounded-xl border border-white/10 bg-zinc-950 transition hover:border-primary/50">
                <div className="relative aspect-video bg-zinc-900">
                  <img src={item.content.backdropUrl || item.content.posterUrl} alt={item.content.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary"><Play className="h-5 w-5 fill-white" /></span>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: `${item.progress}%` }} />
                </div>
                <div className="p-4">
                  <h2 className="truncate font-bold">{item.content.title}</h2>
                  <p className="mt-1 text-xs text-gray-500">{item.season ? `Season ${item.season} • Episode ${item.episode || 1}` : `${item.progress}% watched`}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
