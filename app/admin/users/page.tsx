import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Shield, User } from "lucide-react"

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/login?callbackUrl=/admin/users")
  if (session.user.role !== "ADMIN") redirect("/")

  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
    take: 100,
    select: { id: true, name: true, email: true, role: true, image: true },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="mt-1 text-sm text-gray-400">{users.length} registered users</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50">
        <div className="divide-y divide-white/5">
          {users.map((account) => (
            <div key={account.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
                  {account.image ? <img src={account.image} alt="" className="h-full w-full rounded-full object-cover" /> : <User className="h-5 w-5 text-gray-400" />}
                </div>
                <div>
                  <p className="font-bold">{account.name || "User"}</p>
                  <p className="text-xs text-gray-500">{account.email || "No email"}</p>
                </div>
              </div>
              <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${account.role === "ADMIN" ? "bg-primary/15 text-primary" : "bg-white/5 text-gray-400"}`}>
                {account.role === "ADMIN" && <Shield className="h-3 w-3" />}
                {account.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
