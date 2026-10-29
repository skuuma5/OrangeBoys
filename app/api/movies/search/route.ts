import { NextResponse } from "next/server"
import { searchContent, mapTMDBContent } from "@/lib/tmdb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get("q") || "").trim()
  if (!query) return NextResponse.json([])

  try {
    const data = await searchContent(query) as { results: any[] }
    const results = data.results.slice(0, 24).map((item: any) =>
      mapTMDBContent(item, item.media_type === "tv" ? "series" : "movie")
    )
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Movie search failed" }, { status: 502 })
  }
}
