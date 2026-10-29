"use client"

import { Content } from "@/types"
import { Play, Star, Plus, Info } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface ContentCardProps {
  content: Content
}

export function ContentCard({ content }: ContentCardProps) {
  const router = useRouter()
  const detailsUrl = `/${content.type}/${content.id}`

  return (
    <motion.div
      onClick={() => router.push(detailsUrl)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") router.push(detailsUrl)
      }}
      role="link"
      tabIndex={0}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="group relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-zinc-900 shadow-lg cursor-pointer"
    >
      <img
        src={content.posterUrl}
        alt={content.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Overlay on Hover */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white line-clamp-1">{content.title}</h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-medium text-gray-300">
              <span className="flex items-center gap-0.5 text-orange-400">
                <Star className="h-3 w-3 fill-current" />
                {content.rating}
              </span>
              <span>•</span>
              <span>{content.releaseDate}</span>
              <span>•</span>
              <span className="uppercase">{content.type}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link
              href={`${detailsUrl}?play=1#player`}
              onClick={(event) => event.stopPropagation()}
              aria-label={`Play ${content.title}`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-110"
            >
              <Play className="h-4 w-4 fill-current ml-0.5" />
            </Link>
            <button
              onClick={(event) => event.stopPropagation()}
              aria-label={`Add ${content.title} to my list`}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 hover:bg-white/30"
            >
              <Plus className="h-4 w-4" />
            </button>
            <Link
              href={detailsUrl}
              onClick={(event) => event.stopPropagation()}
              aria-label={`View ${content.title} details`}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-110 hover:bg-white/20"
            >
              <Info className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
        {content.rating > 8.5 && (
          <span className="bg-primary/90 px-1.5 py-0.5 text-[8px] font-bold text-white rounded backdrop-blur-sm">
            TOP RATED
          </span>
        )}
      </div>
    </motion.div>
  )
}
