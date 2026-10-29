import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ items: [] })
  const user = await prisma.user.findUnique({ where: { id: session.user.id }, include: { watchlist: true } })
  return NextResponse.json({ items: user?.watchlist || [] })
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
  await prisma.user.update({ where: { id: session.user.id }, data: { watchlist: { connect: { id: content.id } } } })
  return NextResponse.json({ added: true })
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const tmdbId = searchParams.get("tmdbId") || ""
  const type = searchParams.get("type") || "movie"
  const content = await prisma.content.findFirst({ where: { tmdbId, type } })
  if (content) await prisma.user.update({ where: { id: session.user.id }, data: { watchlist: { disconnect: { id: content.id } } } })
  return NextResponse.json({ removed: true })
}
