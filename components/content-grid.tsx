import { Content } from "@/types"
import { ContentCard } from "./content-card"

interface ContentGridProps {
  items: Content[]
}

export function ContentGrid({ items }: ContentGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {items.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  )
}
