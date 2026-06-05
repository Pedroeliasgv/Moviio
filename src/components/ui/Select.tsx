import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full rounded-[24px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15',
        props.className,
      )}
    />
  )
}
