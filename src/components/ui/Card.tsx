import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface CardProps {
  title?: string
  description?: string
  className?: string
  children: ReactNode
}

export default function Card({ title, description, className, children }: CardProps) {
  return (
    <section className={cn('rounded-[16px] border border-slate-200/70 bg-white p-7 shadow-panel', className)}>
      {(title || description) && (
        <div className="mb-6 flex flex-col gap-2">
          {title && <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>}
          {description && <p className="text-sm leading-7 text-slate-500">{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
