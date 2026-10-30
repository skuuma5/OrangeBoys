"use client"

import Link from "next/link"
import { useState } from "react"

const providers = [
  { id: "8", name: "Netflix", logo: "/providers/netflix.svg" },
  { id: "9", name: "Prime Video", logo: "/providers/prime.svg" },
  { id: "337", name: "Disney+", logo: "/providers/disney.svg" },
  { id: "1899", name: "HBO Max", logo: "/providers/hbo.svg" },
  { id: "350", name: "Apple TV+", logo: "/providers/apple.svg" },
  { id: "15", name: "Hulu", logo: "/providers/hulu.svg" },
  { id: "289", name: "Crunchyroll", logo: "/providers/crunchyroll.svg" },
  { id: "192", name: "YouTube", logo: "/providers/youtube.svg" },
]

function ProviderLogo({ name, logo }: { name: string; logo: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className="text-sm font-bold text-white">{name}</span>
  }

  return (
    <img
      src={logo}
      alt={name}
      className="max-h-full max-w-full object-contain transition-all group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  )
}

export function ProviderSection() {
  return (
    <div className="w-full px-5 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-white">
        <span className="h-6 w-1.5 rounded-full bg-primary" />
        Browse by Provider
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {providers.map((provider) => (
          <Link
            key={provider.id}
            href={`/provider/${provider.id}?name=${encodeURIComponent(provider.name)}`}
            aria-label={`Browse ${provider.name}`}
            className="group flex aspect-[16/10] items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-zinc-800"
          >
            <ProviderLogo name={provider.name} logo={provider.logo} />
          </Link>
        ))}
      </div>
    </div>
  )
}
