"use client"

import * as React from "react"
import Link from "next/link"
import { X, Home, Film, Tv, Play, Bookmark, User, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Movies", href: "/movies", icon: Film },
  { name: "TV Series", href: "/series", icon: Tv },
  { name: "Anime", href: "/anime", icon: Play },
  { name: "My List", href: "/watchlist", icon: Bookmark },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { data: session, status } = useSession()
  const pathname = usePathname()

  React.useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(82vw,320px)] flex-col overflow-y-auto border-l border-white/10 bg-zinc-950/95 p-5 pb-[max(20px,env(safe-area-inset-bottom))] shadow-[-20px_0_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <Link href="/" onClick={onClose} className="flex items-center">
                <img src="/OrangeBoys-Logo-removebg.png" alt="OrangeBoys" className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15" />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-4 rounded-xl px-4 py-3 text-base font-bold transition-all ${
                      isActive
                        ? "bg-primary text-white shadow-[0_8px_24px_rgba(255,106,0,0.18)]"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-5 border-t border-white/10 pt-5 space-y-2">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-4 rounded-xl px-4 py-3 text-base font-bold text-white/65 transition-all hover:bg-white/5 hover:text-white"
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-base font-bold text-white/65 transition-all hover:bg-white/5 hover:text-white"
                >
                  <Settings className="h-5 w-5" />
                  Admin Panel
                </Link>
              )}
            </div>

            <div className="mt-auto pt-4">
              {status === "authenticated" ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500/15 py-4 font-bold text-red-400"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 bg-primary py-4 rounded-2xl font-bold text-white orange-glow"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
