import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function Footer() {
  return (
    <footer id="footer" className="relative isolate overflow-hidden border-t border-white/5 bg-[#09090b] px-5 py-16 md:px-10 md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-12rem] left-[-8rem] h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[100px]" />
        <div className="absolute bottom-[-14rem] right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-red-700/20 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-col items-center text-center">
        <Link href="/" aria-label="OrangeBoys home" className="group mb-5 flex items-center gap-3">
          <img
            src="/OrangeBoys-Logo-removebg.png"
            alt="OrangeBoys"
            className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-black tracking-tight text-white">
            ORANGE<span className="text-primary">BOYS</span>
          </span>
        </Link>

        <p className="max-w-xl text-sm leading-6 text-white/55">
          OrangeBoys does not host, store, or distribute any media files. All content is sourced from third-party providers.
        </p>
        <Link href="mailto:contact@orangeboys.com" className="mt-4 text-sm text-white/55 transition-colors hover:text-primary">
          contact@orangeboys.com
        </Link>

        <div className="mt-10 flex items-center gap-6 text-xs font-medium text-white/40">
          <Link href="#" className="transition-colors hover:text-white">Privacy</Link>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <Link href="#" className="transition-colors hover:text-white">Terms</Link>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <Link href="#" className="transition-colors hover:text-white">DMCA</Link>
        </div>

        <p className="mt-6 text-xs text-white/30">© 2026 OrangeBoys. All rights reserved.</p>
      </div>

      <Link
        href="#top"
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-primary/60 bg-red-950/70 text-primary shadow-[0_0_18px_rgba(255,106,0,0.15)] backdrop-blur-md transition-all hover:bg-primary hover:text-white md:bottom-7 md:right-8"
      >
        <ArrowUp className="h-5 w-5" />
      </Link>
    </footer>
  )
}
