import Link from "next/link"
import {
  LayoutDashboard,
  Film,
  Tv,
  Users,
  Settings,
  BarChart3,
  Play,
  LogOut
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-zinc-950 px-4 py-8">
        <div className="mb-10 flex items-center gap-2 px-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <Play className="h-5 w-5 fill-white text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Orange<span className="text-primary">Admin</span>
          </span>
        </div>

        <nav className="space-y-1">
          <AdminNavItem href="/admin" icon={LayoutDashboard} label="Dashboard" active />
          <AdminNavItem href="/admin/movies" icon={Film} label="Movies" />
          <AdminNavItem href="/admin/series" icon={Tv} label="TV Series" />
          <AdminNavItem href="/admin/anime" icon={Tv} label="Anime" />
          <AdminNavItem href="/admin/users" icon={Users} label="Users" />
          <AdminNavItem href="/admin/analytics" icon={BarChart3} label="Analytics" />
          <AdminNavItem href="/admin/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
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
