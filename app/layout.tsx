import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AuthSessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OrangeBoys — Premium Movies, Series & Anime Streaming",
  description: "Watch your favorite movies, series, and anime on OrangeBoys. A premium cinematic streaming experience.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body id="top" className={`${inter.className} bg-black text-white`}>
        <AuthSessionProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  )
}
