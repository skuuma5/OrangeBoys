"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    const data = await response.json()
    setLoading(false)

    if (!response.ok) {
      setError(data.error || "Unable to process request")
      return
    }
    setMessage(data.message)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" aria-label="OrangeBoys home">
            <img src="/OrangeBoys-Logo-removebg.png" alt="OrangeBoys" className="mx-auto h-14 w-14 object-contain" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-white">Forgot password?</h1>
          <p className="mt-2 text-sm text-gray-400">Enter your account email to receive a reset link.</p>
        </div>
        <form onSubmit={handleSubmit} className="glassmorphism space-y-4 rounded-3xl p-8">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-12 py-3 text-white outline-none focus:border-primary/50"
            />
          </div>
          {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
          {message && <p className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">{message}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-primary py-3 font-bold text-white disabled:opacity-60">
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>
        <Link href="/login" className="mt-6 block text-center text-sm text-primary hover:underline">Back to sign in</Link>
      </motion.div>
    </div>
  )
}
