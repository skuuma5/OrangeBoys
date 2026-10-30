import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { AdminSettingsForm } from "@/components/admin-settings-form"

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect("/login?callbackUrl=/admin/settings")
  if (session.user.role !== "ADMIN") redirect("/")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  })

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your administrator account and password.</p>
      </div>
      <AdminSettingsForm initialName={user?.name || ""} initialEmail={user?.email || ""} />
    </div>
  )
}
