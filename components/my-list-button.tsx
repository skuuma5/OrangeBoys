"use client"

import { Check, Plus } from "lucide-react"
import { useEffect, useState } from "react"

interface MyListButtonProps {
  tmdbId: string
  type: "movie" | "series" | "anime"
  title: string
  description?: string
  releaseDate?: string
  rating?: number
  duration?: string
  backdropUrl?: string
  posterUrl?: string
}

export function MyListButton(props: MyListButtonProps) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch("/api/watchlist")
      .then((response) => response.json())
      .then((data) => setSaved((data.items || []).some((item: any) => item.tmdbId === props.tmdbId && item.type === props.type)))
      .catch(() => {})
  }, [props.tmdbId, props.type])

  async function toggle() {
    setLoading(true)
    try {
      const response = await fetch(saved ? `/api/watchlist?tmdbId=${props.tmdbId}&type=${props.type}` : "/api/watchlist", {
        method: saved ? "DELETE" : "POST",
        headers: saved ? undefined : { "Content-Type": "application/json" },
        body: saved ? undefined : JSON.stringify(props),
      })
      if (response.status === 401) {
        window.location.href = `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
        return
      }
      if (response.ok) setSaved(!saved)
    } finally {
      setLoading(false)
    }
  }

  return <button onClick={toggle} disabled={loading} aria-label={saved ? "Remove from My List" : "Add to My List"} className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition disabled:opacity-60 ${saved ? "bg-primary text-white" : "bg-white/10 text-white hover:bg-white/20"}`}>{saved ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}</button>
}
