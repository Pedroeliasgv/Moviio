import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary text-white shadow-card hover:bg-primary-dark focus-visible:ring-primary/40',
  secondary: 'bg-slate-950 text-white shadow-sm hover:bg-slate-900 focus-visible:ring-slate-300/40',
  ghost: 'bg-white text-slate-700 shadow-sm hover:bg-slate-100',
  destructive: 'bg-danger text-white shadow-sm hover:bg-red-600 focus-visible:ring-danger/40',
  outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 shadow-sm',
}

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-sm',
  lg: 'h-14 px-7 text-base',
}

export default function Button({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center rounded-[12px] font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    />
  )
}
