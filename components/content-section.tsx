"use client"

import * as React from "react"
import { Content } from "@/types"
import { ContentCard } from "./content-card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ContentSectionProps {
  title: string
  items: Content[]
  href?: string
}

export function ContentSection({ title, items, href }: ContentSectionProps) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    const scroller = scrollerRef.current
    if (!scroller) return
    scroller.scrollBy({ left: direction === "right" ? scroller.clientWidth * 0.82 : -scroller.clientWidth * 0.82, behavior: "smooth" })
  }

  return (
    <section className="group/section relative space-y-3 py-5 md:py-7">
      {title && (
        <div className="w-full px-5 sm:px-8 md:px-12 lg:px-16">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
            <span className="h-6 w-1.5 rounded-full bg-primary" />
            {title}
          </h2>
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          aria-label={`Scroll ${title} left`}
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 z-20 hidden h-[calc(100%-16px)] w-12 items-center justify-center bg-gradient-to-r from-black to-transparent text-white opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover/section:flex md:w-16"
        >
          <ChevronLeft className="h-8 w-8 drop-shadow-lg" />
        </button>

        <div
          ref={scrollerRef}
          className="hide-scrollbar flex w-full gap-3 overflow-x-auto px-5 pb-4 sm:gap-4 sm:px-8 md:px-12 lg:px-16"
        >
          {items.map((item) => (
            <div key={item.id} className="w-[150px] shrink-0 sm:w-[180px] md:w-[210px] lg:w-[230px] xl:w-[250px]">
              <ContentCard content={item} />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label={`Scroll ${title} right`}
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 z-20 flex h-[calc(100%-16px)] w-12 items-center justify-center bg-gradient-to-l from-black to-transparent text-white opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover/section:opacity-100 md:w-16"
        >
          <ChevronRight className="h-8 w-8 drop-shadow-lg" />
        </button>
      </div>
    </section>
  )
}
