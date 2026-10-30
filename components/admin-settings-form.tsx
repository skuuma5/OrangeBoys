"use client"

import * as React from "react"
import { useSession } from "next-auth/react"

export function AdminSettingsForm({
  initialName,
  initialEmail,
}: {
  initialName: string
  initialEmail: string
}) {
  const { update } = useSession()
  const [name, setName] = React.useState(initialName)
  const [email, setEmail] = React.useState(initialEmail)
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [error, setError] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  async function saveProfile() {
    setSaving(true)
    setError("")
    setMessage("")
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
    const data = await response.json()
    if (!response.ok) setError(data.error || "Could not save profile")
    else {
      await update()
      setMessage("Profile saved successfully")
    }
    setSaving(false)
  }

  async function changePassword() {
    setSaving(true)
    setError("")
    setMessage("")
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    const data = await response.json()
    if (!response.ok) setError(data.error || "Could not change password")
    else {
      setCurrentPassword("")
      setNewPassword("")
      setMessage("Password changed successfully")
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {message && <p className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">{message}</p>}
      {error && <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>}

      <section className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
        <h2 className="mb-5 font-bold">Administrator Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-gray-400">Name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-primary" /></label>
          <label className="text-sm text-gray-400">Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-primary" /></label>
        </div>
        <button type="button" onClick={saveProfile} disabled={saving} className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white disabled:opacity-60">Save profile</button>
      </section>

      <section className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6">
        <h2 className="mb-5 font-bold">Change Password</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-gray-400">Current password<input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-primary" /></label>
          <label className="text-sm text-gray-400">New password<input type="password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-primary" /></label>
        </div>
        <button type="button" onClick={changePassword} disabled={saving || !currentPassword || newPassword.length < 8} className="mt-5 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white disabled:opacity-40">Change password</button>
      </section>
    </div>
  )
}
