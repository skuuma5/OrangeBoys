"use client"

import * as React from "react"
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipForward,
  ChevronLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
  title: string
  onClose?: () => void
  embedUrl?: string
  history?: {
    tmdbId: string
    type: "movie" | "series" | "anime"
    title: string
    description?: string
    releaseDate?: string
    rating?: number
    duration?: string
    backdropUrl?: string
    posterUrl?: string
    season?: number
    episode?: number
  }
}

export function VideoPlayer({ title, onClose, embedUrl, history }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [volume, setVolume] = React.useState(80)
  const [isMuted, setIsMuted] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  React.useEffect(() => {
    if (!embedUrl || !history) return
    fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...history, progress: history.season || history.episode ? 10 : 1 }),
    }).catch(() => {})
  }, [embedUrl, history])

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
  }

  if (embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden bg-black rounded-2xl shadow-2xl border border-white/5"
      onMouseMove={handleMouseMove}
    >
      {/* Video Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto border border-primary/50 animate-pulse">
            <Play className="h-10 w-10 text-primary fill-current" />
          </div>
          <p className="text-gray-400 text-sm font-medium">Click to Play Demo Content</p>
        </div>
      </div>

      {/* Overlay Controls */}
      <div
        className={cn(
          "absolute inset-0 z-20 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-black/60 p-6 transition-opacity duration-500",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onClose && (
              <button onClick={onClose} className="text-white hover:text-primary transition-colors">
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-white"><Settings className="h-5 w-5" /></button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="space-y-4">
          {/* Progress Slider */}
          <div className="px-2">
            <div className="relative h-1 w-full bg-white/20 rounded-full overflow-hidden group/progress cursor-pointer">
              <div
                className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_rgba(255,106,0,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-primary transition-colors transform hover:scale-110"
              >
                {isPlaying ? <Pause className="h-7 w-7 fill-current" /> : <Play className="h-7 w-7 fill-current" />}
              </button>

              <div className="flex items-center gap-4">
                <button className="text-white/70 hover:text-white"><RotateCcw className="h-5 w-5" /></button>
                <button className="text-white/70 hover:text-white"><RotateCw className="h-5 w-5" /></button>
                <button className="text-white/70 hover:text-white"><SkipForward className="h-5 w-5 fill-current" /></button>
              </div>

              <div className="flex items-center gap-3 ml-4">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white/70 hover:text-white"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white w-3/4" />
                </div>
              </div>

              <span className="text-sm font-medium text-white/70">
                12:45 / 02:15:00
              </span>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-sm font-bold text-white/70 hover:text-white bg-white/10 px-2 py-0.5 rounded border border-white/10">
                1080p
              </button>
              <button className="text-white/70 hover:text-white"><Maximize className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
