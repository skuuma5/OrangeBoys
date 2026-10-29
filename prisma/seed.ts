import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create Genres
  const action = await prisma.genre.upsert({
    where: { name: "Action" },
    update: {},
    create: { name: "Action" },
  })

  const sciFi = await prisma.genre.upsert({
    where: { name: "Sci-Fi" },
    update: {},
    create: { name: "Sci-Fi" },
  })

  await prisma.user.upsert({
    where: { email: "demo@orangeboys.com" },
    update: { password: "password123", role: "USER" },
    create: {
      email: "demo@orangeboys.com",
      name: "Demo User",
      password: "password123",
      role: "USER",
    },
  })

  // Create Sample Movie
  await prisma.content.upsert({
    where: { id: "hero-1" },
    update: {},
    create: {
      id: "hero-1",
      title: "THE LAST HORIZON",
      description: "In a world on the edge of collapse, a lone warrior sets out on a dangerous journey to find the last remaining hope.",
      type: "MOVIE",
      releaseDate: "2025",
      rating: 8.7,
      backdropUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
      posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1925&auto=format&fit=crop",
      isFeatured: true,
      genres: {
        connect: [{ id: action.id }, { id: sciFi.id }]
      }
    },
  })

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
