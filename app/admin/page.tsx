import {
  Users,
  Film,
  Tv,
  Eye,
  TrendingUp,
  Settings
} from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const [totalUsers, totalContent, totalHistory] = await Promise.all([
    prisma.user.count(),
    prisma.content.count(),
    prisma.history.count(),
  ])
  const featuredContent = await prisma.content.findMany({
    take: 4,
    orderBy: { updatedAt: "desc" },
    select: { title: true, type: true, updatedAt: true },
  })

  const stats = [
    { label: "Total Users", value: totalUsers.toLocaleString(), icon: Users, color: "text-blue-400", trend: "Live" },
    { label: "Catalog Items", value: totalContent.toLocaleString(), icon: Film, color: "text-orange-400", trend: "Live" },
    { label: "Watch History", value: totalHistory.toLocaleString(), icon: Tv, color: "text-purple-400", trend: "Live" },
    { label: "Active Views", value: totalHistory.toLocaleString(), icon: Eye, color: "text-green-400", trend: "Live" },
  ]

  const recentContent = featuredContent.map((item) => ({
    title: item.title,
    type: item.type === "anime" ? "Anime" : item.type === "series" ? "Series" : "Movie",
    date: item.updatedAt.toLocaleDateString(),
    status: "Published",
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Welcome back, Admin. Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-xs font-bold">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <h3 className="text-3xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="font-bold">Recent Content</h3>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
          <div className="divide-y divide-white/5">
            {recentContent.map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center">
                    {item.type === "Movie" ? <Film className="h-5 w-5 text-gray-400" /> : <Tv className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{item.title}</h4>
                    <p className="text-xs text-gray-500">{item.type} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === "Published" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {item.status}
                  </span>
                  <button className="text-gray-400 hover:text-white">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 space-y-6">
          <h3 className="font-bold">System Status</h3>
          <div className="space-y-4">
            <StatusItem label="API Connection" status="Healthy" />
            <StatusItem label="Database" status="Healthy" />
            <StatusItem label="Storage" status="85% Full" warning />
            <StatusItem label="Email Server" status="Healthy" />
          </div>

          <div className="pt-4 border-t border-white/5">
          </div>
        </div>
      </div>
    </div>
  )
}

function StatusItem({ label, status, warning = false }: { label: string, status: string, warning?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${warning ? "bg-yellow-500" : "bg-green-500"}`} />
        <span className="text-xs font-medium">{status}</span>
      </div>
    </div>
  )
}
