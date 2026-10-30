import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  LayoutDashboard,
  Film,
  Tv,
  Users,
  Settings,
  Play,
} from "lucide-react"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) redirect("/login?callbackUrl=/admin")
  if (session.user.role !== "ADMIN") redirect("/")

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b border-white/10 bg-zinc-950 px-5 md:hidden">
        <Link href="/admin" className="text-lg font-bold">
          Orange<span className="text-primary">Admin</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/admin/users" aria-label="Users" className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"><Users className="h-5 w-5" /></Link>
          <Link href="/admin/settings" aria-label="Settings" className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"><Settings className="h-5 w-5" /></Link>
        </div>
      </div>
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-white/10 bg-zinc-950 px-4 py-8 md:block">
        <div className="mb-10 flex items-center gap-2 px-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Play className="h-5 w-5 fill-white text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Orange<span className="text-primary">Admin</span>
          </span>
        </div>

        <nav className="space-y-1">
          <AdminNavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <AdminNavItem href="/admin/users" icon={Users} label="Users" />
          <AdminNavItem href="/admin/settings" icon={Settings} label="Settings" />
        </nav>

      </aside>

      {/* Main Content */}
      <main className="mt-16 flex-1 px-4 py-6 md:ml-64 md:mt-0 md:p-8">
        {children}
      </main>
    </div>
  )
}

function AdminNavItem({ href, icon: Icon, label, active = false }: { href: string, icon: any, label: string, active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-primary text-white shadow-lg shadow-primary/20"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  )
}
