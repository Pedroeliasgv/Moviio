import type { ReactNode } from 'react'
import { ImageOff } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: ReactNode
}

export default function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-12 text-center shadow-panel">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-soft">
        {icon ?? <ImageOff className="h-10 w-10 text-slate-400" />}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
      {description && <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>}
    </div>
  )
}
