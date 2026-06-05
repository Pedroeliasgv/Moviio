import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface BadgeProps {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'muted' | 'outline'
  className?: string
  children: ReactNode
}

const badgeStyles: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary/10 text-primary ring-1 ring-primary/20 shadow-sm',
  success: 'bg-success/10 text-success ring-1 ring-success/20 shadow-sm',
  warning: 'bg-warning/10 text-warning ring-1 ring-warning/20 shadow-sm',
  danger: 'bg-danger/10 text-danger ring-1 ring-danger/20 shadow-sm',
  muted: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200 shadow-sm',
  outline: 'border border-slate-200 bg-white text-slate-900 shadow-sm',
}

export default function Badge({ variant = 'muted', className, children }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]', badgeStyles[variant], className)}>
      {children}
    </span>
  )
}
