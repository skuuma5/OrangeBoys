import { Play } from "lucide-react"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function ContinueWatching() {
  const session = await getServerSession(authOptions)
  const history = session?.user?.id ? await prisma.history.findMany({
    where: { userId: session.user.id }, include: { content: true }, orderBy: { updatedAt: "desc" }, take: 10,
  }) : []
  const items = history.map((item: any) => ({
    id: item.id,
    title: item.content.title,
    info: item.season ? `S${item.season}:E${item.episode || 1}` : "Movie",
    progress: item.progress,
    image: item.content.backdropUrl || item.content.posterUrl,
    href: item.season ? `/${item.content.type}/${item.content.tmdbId}?season=${item.season}&episode=${item.episode || 1}#player` : `/movie/${item.content.tmdbId}#player`,
  }))

  if (items.length === 0) return null

  return (
    <div className="w-full px-5 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-8">
      <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-6">
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        Continue Watching
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
        {items.map((item) => (
          <Link href={item.href} key={item.id} className="group relative w-[280px] shrink-0 sm:w-[360px] lg:w-[400px]">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-900 border border-white/10 transition-all hover:border-primary/50">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="h-12 w-12 rounded-full bg-primary/90 text-white flex items-center justify-center scale-0 transition-transform group-hover:scale-100 orange-glow">
                  <Play className="h-6 w-6 fill-current ml-1" />
                </span>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                <div
                  className="h-full bg-primary shadow-[0_0_10px_rgba(255,106,0,0.8)]"
                  style={{ width: `${item.progress}%` }}
                />
              </div>

              {/* Info Overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="glassmorphism px-3 py-1.5 rounded-lg">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-[10px] text-gray-300">{item.info}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
