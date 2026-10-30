"use client"

import * as React from "react"
import Link from "next/link"
import { Search, User, Menu, Settings, Home, Film, Tv, Bookmark } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./mobile-menu"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Shows", href: "/series" },
  { name: "My List", href: "/watchlist" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full bg-transparent py-5 transition-all duration-500"
      >
        <div className="mx-auto flex h-12 w-full items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link href="/" aria-label="OrangeBoys home" className="group flex shrink-0 items-center">
            <img
              src="/OrangeBoys-Logo-removebg.png"
              alt="OrangeBoys"
              className="h-12 w-12 object-cover transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
            />
          </Link>

          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/35 p-1.5 backdrop-blur-xl md:flex">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition-all lg:px-5",
                    isActive
                      ? "bg-white text-black shadow-lg"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:h-11 sm:w-11"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/profile"
              aria-label="Settings"
              className="hidden h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white sm:flex sm:h-11 sm:w-11"
            >
              <Settings className="h-5 w-5" />
            </Link>
            <Link
              href="/profile"
              aria-label="Profile"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition-all hover:border-white/30 hover:bg-white/15 sm:h-11 sm:w-11"
            >
              <User className="h-5 w-5 text-white" />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/10 md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      <nav
        aria-label="Mobile navigation"
        className="fixed bottom-4 left-1/2 z-50 flex h-16 w-[calc(100%-32px)] max-w-md -translate-x-1/2 items-center justify-around rounded-full border border-white/10 bg-black/80 px-2 shadow-2xl backdrop-blur-2xl md:hidden"
      >
        <Link href="/" aria-label="Home" className="flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
          <Home className="h-5 w-5" />
        </Link>
        <Link href="/movies" aria-label="Movies" className="flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
          <Film className="h-5 w-5" />
        </Link>
        <Link href="/search" aria-label="Search" className="flex h-12 w-12 -translate-y-2 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_24px_rgba(255,106,0,0.45)] ring-4 ring-black/70 transition-transform hover:scale-105">
          <Search className="h-5 w-5" />
        </Link>
        <Link href="/series" aria-label="Shows" className="flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
          <Tv className="h-5 w-5" />
        </Link>
        <Link href="/watchlist" aria-label="My List" className="flex h-12 w-12 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
          <Bookmark className="h-5 w-5" />
        </Link>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}
