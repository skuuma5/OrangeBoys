"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10"
    >
      <LogOut className="h-5 w-5" />
      Sign Out
    </button>
  )
}
