import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  children: ReactNode
}

const variantStyles = {
  primary: 'bg-primary text-white hover:bg-sky-600',
  secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  danger: 'bg-danger text-white hover:bg-red-500',
}

export default function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={
        'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 ' +
        variantStyles[variant] +
        ' ' +
        className
      }
      {...props}
    >
      {children}
    </button>
  )
}
