import Link from "next/link"

const providers = [
  { id: "8", name: "Netflix", logo: "https://image.tmdb.org/t/p/w154/wwemzKWzjKYJFfCeiB57q3r4Bcm.png" },
  { id: "9", name: "Prime Video", logo: "https://image.tmdb.org/t/p/w154/emthp39XA2YScoYL1p0sdbAH2WA.png" },
  { id: "337", name: "Disney+", logo: "https://image.tmdb.org/t/p/w154/97yvRBw1GzX7fXprcF80erKSYR.png" },
  { id: "1899", name: "HBO Max", logo: "https://image.tmdb.org/t/p/w154/7rwgEs15tFwyR9NPQ5vpzxTj19Q.png" },
  { id: "350", name: "Apple TV+", logo: "https://image.tmdb.org/t/p/w154/6uhKBfmtzFV1FQT5GLvGL6bqGg2.png" },
  { id: "15", name: "Hulu", logo: "https://image.tmdb.org/t/p/w154/zxrV1yeoNYxgSd5QJbRXYgGq89A.png" },
  { id: "289", name: "Crunchyroll", logo: "https://image.tmdb.org/t/p/w154/c5w3oaAPnsYhZcZc0v3s8YzB.jpg" },
  { id: "192", name: "YouTube", logo: "https://image.tmdb.org/t/p/w154/fp5WE38eS1Jm4KePXsMCeDsN5gW.png" },
]

export function ProviderSection() {
  return (
    <div className="w-full px-5 py-6 sm:px-8 md:px-12 lg:px-16 lg:py-8">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-white">
        <span className="h-6 w-1.5 rounded-full bg-primary" />
        Browse by Provider
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {providers.map((provider) => (
          <Link
            key={provider.id}
            href={`/provider/${provider.id}?name=${encodeURIComponent(provider.name)}`}
            aria-label={`Browse ${provider.name}`}
            className="group flex aspect-[16/10] items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/70 p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-zinc-800"
          >
            <img src={provider.logo} alt={provider.name} className="max-h-full max-w-full object-contain opacity-85 transition-all group-hover:scale-105 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </div>
  )
}
