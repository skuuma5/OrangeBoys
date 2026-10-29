"use client"

import * as React from "react"
import Link from "next/link"
import { X, Home, Film, Tv, Play, Bookmark, User, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { signOut, useSession } from "next-auth/react"

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
  const { status } = useSession()

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
            className="fixed inset-y-0 right-0 z-[70] w-full max-w-xs bg-zinc-950 p-6 shadow-2xl border-l border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/" onClick={onClose} className="flex items-center">
                <img src="/OrangeBoys-Logo-removebg.png" alt="OrangeBoys" className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15" />
              </Link>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-white/5 hover:text-primary transition-all"
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10 space-y-2">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all"
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-all"
              >
                <Settings className="h-5 w-5" />
                Admin Panel
              </Link>
            </div>

            <div className="absolute bottom-8 left-6 right-6">
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
