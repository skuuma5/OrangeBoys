"use client"

import Link from "next/link"
import { FormEvent, Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Lock } from "lucide-react"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token") || ""
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setError(data.error || "Unable to reset password")
      return
    }
    setSuccess(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md">
        <img src="/OrangeBoys-Logo-removebg.png" alt="OrangeBoys" className="mx-auto mb-6 h-14 w-14 object-contain" />
        <div className="glassmorphism rounded-3xl p-8">
          {success ? (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">Password updated</h1>
              <Link href="/login" className="mt-5 inline-block rounded-xl bg-primary px-5 py-3 font-bold text-white">Sign in</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h1 className="text-center text-2xl font-bold text-white">Reset password</h1>
              {!token && <p className="text-sm text-red-400">This reset link is missing its token.</p>}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="New password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3 text-white outline-none focus:border-primary/50"
                />
              </div>
              {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
              <button disabled={loading || !token} className="w-full rounded-xl bg-primary py-3 font-bold text-white disabled:opacity-60">
                {loading ? "Updating…" : "Update password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-black text-white">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
