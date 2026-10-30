"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)
    if (result?.error) {
      setError("Invalid email or password")
    } else {
      window.location.href = "/profile"
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Abstract Background Decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" aria-label="OrangeBoys home" className="mb-6 flex items-center">
            <img
              src="/OrangeBoys-Logo-removebg.png"
              alt="OrangeBoys"
              className="h-14 w-14 object-contain"
            />
          </Link>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Sign in to continue your cinematic journey</p>
        </div>

        <div className="glassmorphism p-8 rounded-3xl space-y-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="demo@orangeboys.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">Forgot password?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50 transition-all"
              />
            </div>
            {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
            <button disabled={loading} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-all orange-glow mt-2 disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black/50 px-2 text-gray-500 backdrop-blur-sm">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/profile" })}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </button>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/profile" })}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 py-2.5 rounded-xl hover:bg-white/10 transition-all"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M21.35 12.2c0-.74-.07-1.45-.2-2.14H12v4.05h5.24a4.48 4.48 0 0 1-1.94 2.94v2.8h3.14c1.84-1.69 2.91-4.18 2.91-7.65z" />
                <path fill="#34A853" d="M12 22c2.62 0 4.82-.86 6.44-2.35l-3.14-2.44c-.87.58-1.98.92-3.3.92-2.53 0-4.67-1.71-5.44-4.01H3.32v2.52A10 10 0 0 0 12 22z" />
                <path fill="#FBBC05" d="M6.56 14.12A6 6 0 0 1 6.25 12c0-.74.13-1.46.31-2.12V7.36H3.32A10 10 0 0 0 2 12c0 1.62.39 3.16 1.32 4.64l3.24-2.52z" />
                <path fill="#EA4335" d="M12 5.87c1.43 0 2.71.49 3.72 1.46l2.79-2.79A9.61 9.61 0 0 0 12 2a10 10 0 0 0-8.68 5.36l3.24 2.52C7.33 7.58 9.47 5.87 12 5.87z" />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
        </p>
      </motion.div>
    </div>
  )
}
