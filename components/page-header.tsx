import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2 pb-8", className)}>
      <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}
