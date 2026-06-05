import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface TableProps {
  className?: string
  children: ReactNode
}

export default function Table({ className, children }: TableProps) {
  return (
    <div className={cn('overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-panel', className)}>
      <table className="min-w-full border-collapse text-sm text-slate-700">{children}</table>
    </div>
  )
}
