import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ items: [] })
  const items = await prisma.history.findMany({ where: { userId: session.user.id }, include: { content: true }, orderBy: { updatedAt: "desc" }, take: 30 })
  return NextResponse.json({ items })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await request.json()
  const tmdbId = String(body.tmdbId || "")
  const type = String(body.type || "movie")
  if (!tmdbId) return NextResponse.json({ error: "TMDB id is required" }, { status: 400 })
  let content = await prisma.content.findFirst({ where: { tmdbId, type } })
  if (!content) content = await prisma.content.create({ data: {
    title: String(body.title || "Untitled"), description: String(body.description || ""), type,
    releaseDate: String(body.releaseDate || ""), rating: Number(body.rating || 0),
    duration: body.duration ? String(body.duration) : null, backdropUrl: String(body.backdropUrl || ""),
    posterUrl: String(body.posterUrl || ""), tmdbId,
  } })
  const progress = Math.max(1, Math.min(100, Number(body.progress || 1)))
  const season = body.season ? Number(body.season) : null
  const episode = body.episode ? Number(body.episode) : null
  await prisma.history.upsert({
    where: { userId_contentId: { userId: session.user.id, contentId: content.id } },
    create: { userId: session.user.id, contentId: content.id, progress, season, episode },
    update: { progress, season, episode, updatedAt: new Date() },
  })
  return NextResponse.json({ saved: true })
}
