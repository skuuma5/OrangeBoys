"use client"

import { User, Shield, CreditCard, Bell, Clock, LogOut, ChevronRight } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ProfilePage() {
  const { data: session, status, update } = useSession()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "")
      setEmail(session.user.email || "")
    }
  }, [session])

  async function saveProfile() {
    setSaving(true)
    setMessage("")
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
    const data = await response.json()
    if (!response.ok) {
      setMessage(data.error || "Could not save changes")
    } else {
      await update()
      setEditing(false)
      setMessage("Profile updated successfully")
    }
    setSaving(false)
  }

  if (status === "loading") {
    return <div className="container mx-auto px-4 pt-32 pb-20 md:px-8 max-w-4xl"><p className="text-gray-400">Loading profile…</p></div>
  }

  if (status === "unauthenticated") {
    if (typeof window !== "undefined") window.location.href = "/login"
    return null
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-20 md:px-8 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <ProfileNavItem icon={User} label="Account Details" active />
          <ProfileNavItem icon={Shield} label="Security" />
          <ProfileNavItem icon={CreditCard} label="Subscription" />
          <ProfileNavItem icon={Bell} label="Notifications" />
          <Link href="/history" className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-gray-400 transition-all hover:bg-white/5 hover:text-white"><div className="flex items-center gap-3"><Clock className="h-5 w-5" />Watch History</div><ChevronRight className="h-4 w-4 opacity-0" /></Link>
          <div className="pt-4 mt-4 border-t border-white/10">
            <button onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-medium">
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-6 pb-8 border-b border-white/10">
            <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-1">
              <div className="h-full w-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <User className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{session?.user?.name || "OrangeBoys User"}</h1>
              <p className="text-gray-400">Premium Member since March 2024</p>
            </div>
          </div>

          <div className="grid gap-6">
            <section className="space-y-4">
              <h3 className="text-lg font-bold">Personal Information</h3>
              <div className="grid gap-4">
                {editing ? (
                  <div className="space-y-4 rounded-xl border border-white/10 bg-zinc-900/50 p-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Full Name
                      <input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-medium normal-case text-white outline-none focus:border-primary" />
                    </label>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                      Email Address
                      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm font-medium normal-case text-white outline-none focus:border-primary" />
                    </label>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditing(false); setName(session?.user?.name || ""); setEmail(session?.user?.email || "") }} className="rounded-lg px-4 py-2 text-sm font-bold text-gray-300 hover:bg-white/5">Cancel</button>
                      <button onClick={saveProfile} disabled={saving} className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving…" : "Save changes"}</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <InfoCard label="Full Name" value={session?.user?.name || "OrangeBoys User"} onEdit={() => setEditing(true)} />
                    <InfoCard label="Email Address" value={session?.user?.email || ""} onEdit={() => setEditing(true)} />
                  </>
                )}
                {message && <p className={`text-sm ${message.includes("successfully") ? "text-green-400" : "text-red-400"}`}>{message}</p>}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold">Subscription Plan</h3>
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">Premium 4K</span>
                    <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                  </div>
                  <p className="text-sm text-gray-400">Next billing date: April 15, 2024</p>
                </div>
                <button className="bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
                  Manage
                </button>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-bold">Active Devices</h3>
              <div className="divide-y divide-white/5 bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
                <DeviceItem name="Chrome on Windows" location="Paris, France" current />
                <DeviceItem name="OrangeBoys App on iPhone 15" location="Paris, France" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProfileNavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <button className={`flex w-full items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${
      active ? "bg-primary text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        {label}
      </div>
      <ChevronRight className={`h-4 w-4 ${active ? "opacity-100" : "opacity-0"}`} />
    </button>
  )
}

function InfoCard({ label, value, onEdit }: { label: string, value: string, onEdit?: () => void }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/5">
      <div>
        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{label}</p>
        <p className="text-white font-medium">{value}</p>
      </div>
      <button onClick={onEdit} className="text-xs font-bold text-primary hover:underline">Edit</button>
    </div>
  )
}

function DeviceItem({ name, location, current = false }: { name: string, location: string, current?: boolean }) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
          <Shield className="h-5 w-5 text-gray-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold">{name}</h4>
            {current && <span className="text-[10px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded font-bold">CURRENT</span>}
          </div>
          <p className="text-xs text-gray-500">{location}</p>
        </div>
      </div>
      {!current && <button className="text-xs font-bold text-red-400 hover:underline">Revoke</button>}
    </div>
  )
}
