"use client"

import { Share2 } from "lucide-react"

export function ShareButton({ title }: { title: string }) {
  const handleShare = async () => {
    const shareData = {
      title,
      url: window.location.href,
    }

    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined)
      return
    }

    await navigator.clipboard?.writeText(window.location.href).catch(() => undefined)
  }

  return (
    <button
      type="button"
      aria-label={`Share ${title}`}
      onClick={handleShare}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-primary"
    >
      <Share2 className="h-5 w-5" />
    </button>
  )
}
