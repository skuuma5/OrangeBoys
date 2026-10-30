import Link from "next/link"

export function Footer() {
  return (
    <footer id="footer" className="relative isolate bg-transparent px-5 py-16 md:px-10 md:py-20">
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
        <Link
          href="https://mail.google.com/mail/?view=cm&fs=1&to=support.orangeboys@gmail.com&su=OrangeBoys%20Feedback"
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-sm text-white/55 transition-colors hover:text-primary"
        >
          support.orangeboys@gmail.com
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
    </footer>
  )
}
