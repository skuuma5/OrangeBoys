"use client"

import Link from "next/link"
import { Play, Github, Mail, User, Lock, Check } from "lucide-react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [accepted, setAccepted] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!accepted) {
      setError("Please accept the Terms of Service and Privacy Policy")
      return
    }

    setLoading(true)
    setError("")
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await response.json()

    if (!response.ok) {
      setError(data.error || "Unable to create account")
      setLoading(false)
      return
    }

    await signIn("credentials", { email, password, callbackUrl: "/profile" })
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-12">
      {/* Abstract Background Decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="bg-primary p-2 rounded-xl orange-glow">
              <Play className="h-8 w-8 fill-white text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-white">
              Orange<span className="text-primary">Boys</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-gray-400 mt-2 text-center">Join thousands of entertainment enthusiasts today</p>
        </div>

        <div className="glassmorphism p-8 rounded-3xl space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  minLength={6}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white outline-none focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <button
                type="button"
                aria-label="Accept terms"
                onClick={() => setAccepted((value) => !value)}
                className="mt-1 flex h-4 w-4 items-center justify-center rounded border border-white/20 bg-white/5 cursor-pointer hover:border-primary/50"
              >
                <Check className={`h-3 w-3 text-primary ${accepted ? "opacity-100" : "opacity-0"}`} />
              </button>
              <p className="text-xs text-gray-500 leading-normal">
                I agree to the <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>

            {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
            <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all orange-glow mt-4 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Creating account…" : "Get Started"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/50 px-2 text-gray-500 backdrop-blur-sm">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all">
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all">
              <Mail className="h-5 w-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">Sign in instead</Link>
        </p>
      </motion.div>
    </div>
  )
}
