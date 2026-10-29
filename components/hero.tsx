import { Play, Plus, Info, Star } from "lucide-react"
import { Content } from "@/types"
import Link from "next/link"

interface HeroProps {
  content: Content
}

export function Hero({ content }: HeroProps) {
  return (
    <div className="relative h-[72svh] min-h-[620px] w-full overflow-hidden sm:h-[82svh] lg:h-[82svh] lg:min-h-[680px]">
      {/* Backdrop Image */}
      <div className="absolute inset-0">
        <img
          src={content.backdropUrl}
          alt={content.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
      </div>

      {/* Content Info */}
      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-end px-5 pb-20 pt-24 sm:px-8 md:px-12 md:pb-24 lg:px-16">
        <div className="max-w-xl space-y-4 md:max-w-2xl md:space-y-5">
          <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {content.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/90 md:text-base">
            <span className="flex items-center gap-1 font-bold text-white">
              <Star className="h-4 w-4 fill-white" />
              {content.rating}/10
            </span>
            <span>{content.releaseDate}</span>
            <span>•</span>
            <span>{content.genres.join(" • ")}</span>
          </div>

          <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
            {content.description}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Link href={`/${content.type}/${content.id}?play=1#player`} className="flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-base font-bold text-black transition-transform hover:scale-[1.03] sm:px-7">
              <Play className="h-5 w-5 fill-black" />
              Play
            </Link>
            <button aria-label="Add to my list" className="flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/20">
              <Plus className="h-5 w-5" />
            </button>
            <Link href={`/${content.type}/${content.id}`} aria-label="More information" className="flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/20">
              <Info className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 right-8 z-10 hidden items-center gap-2 md:flex lg:right-12">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`h-1 rounded-full transition-all ${i === 0 ? "w-8 bg-white" : "w-2 bg-white/40"}`} />
        ))}
      </div>
    </div>
  )
}
