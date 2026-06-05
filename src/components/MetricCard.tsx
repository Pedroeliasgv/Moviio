interface MetricCardProps {
  title: string
  value: string | number
  description: string
  accent?: 'primary' | 'success' | 'warning' | 'danger'
}

const accentClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
}

export default function MetricCard({ title, value, description, accent = 'primary' }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
        <span className={`inline-flex rounded-2xl px-3 py-1 text-xs font-semibold ${accentClasses[accent]}`}>
          {description}
        </span>
      </div>
    </div>
  )
}
