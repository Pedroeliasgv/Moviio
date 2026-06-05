interface StatusBadgeProps {
  status: string
}

const statusStyleMap: Record<string, string> = {
  Novo: 'bg-primary/10 text-primary',
  'Contato Feito': 'bg-slate-100 text-slate-700',
  'Visita Marcada': 'bg-warning/10 text-warning',
  Proposta: 'bg-primary/10 text-primary',
  Fechado: 'bg-success/10 text-success',
  Perdido: 'bg-danger/10 text-danger',
  Enviada: 'bg-warning/10 text-warning',
  Aceita: 'bg-success/10 text-success',
  Recusada: 'bg-danger/10 text-danger',
  Agendada: 'bg-primary/10 text-primary',
  Confirmada: 'bg-success/10 text-success',
  Realizada: 'bg-slate-100 text-slate-700',
  Cancelada: 'bg-danger/10 text-danger',
  Disponível: 'bg-success/10 text-success',
  Reservado: 'bg-warning/10 text-warning',
  Vendido: 'bg-danger/10 text-danger',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyleMap[status] ?? 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  )
}
