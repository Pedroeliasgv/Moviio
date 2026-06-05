import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-[12px] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 placeholder:text-slate-400',
        props.className,
      )}
    />
  )
}
