"use client"

import Link from "next/link"
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  const [failed, setFailed] = React.useState(false)

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
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)

  const updateScrollButtons = React.useCallback(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    setCanScrollLeft(scroller.scrollLeft > 2)
    setCanScrollRight(
      scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2
    )
  }, [])

  React.useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    updateScrollButtons()
    scroller.addEventListener("scroll", updateScrollButtons, { passive: true })
    window.addEventListener("resize", updateScrollButtons)

    return () => {
      scroller.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", updateScrollButtons)
    }
  }, [updateScrollButtons])

  const scroll = (direction: "left" | "right") => {
    const scroller = scrollerRef.current
    if (!scroller) return

    scroller.scrollBy({
      left: direction === "right"
        ? scroller.clientWidth * 0.82
        : -scroller.clientWidth * 0.82,
      behavior: "smooth",
    })
  }

  return (
    <section className="group/provider relative w-full py-6 lg:py-8">
      <h2 className="mb-6 flex items-center gap-2 px-5 text-xl font-bold tracking-tight text-white sm:px-8 md:px-12 lg:px-16">
        <span className="h-6 w-1.5 rounded-full bg-primary" />
        Browse by Provider
      </h2>
      <div className="relative">
        {canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll providers left"
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 z-20 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-black to-transparent text-white opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover/provider:flex md:w-16"
          >
            <ChevronLeft className="h-8 w-8 drop-shadow-lg" />
          </button>
        )}

        <div
          ref={scrollerRef}
          className="hide-scrollbar flex gap-3 overflow-x-auto px-5 pb-1 sm:gap-4 sm:px-8 md:px-12 lg:px-16"
        >
          {providers.map((provider) => (
            <Link
              key={provider.id}
              href={`/provider/${provider.id}?name=${encodeURIComponent(provider.name)}`}
              aria-label={`Browse ${provider.name}`}
              className="group flex aspect-[16/10] w-[150px] shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-zinc-800 sm:w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px]"
            >
              <ProviderLogo name={provider.name} logo={provider.logo} />
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            type="button"
            aria-label="Scroll providers right"
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 z-20 flex h-full w-12 items-center justify-center bg-gradient-to-l from-black to-transparent text-white opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover/provider:opacity-100 md:w-16"
          >
            <ChevronRight className="h-8 w-8 drop-shadow-lg" />
          </button>
        )}
      </div>
    </section>
  )
}
