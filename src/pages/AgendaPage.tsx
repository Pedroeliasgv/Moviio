import { CalendarDays, Clock3 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Card, Badge, Button } from '../components/ui'
import { appointments as appointmentMocks } from '../lib/mockData'
import type { Appointment } from '../lib/types'

export default function AgendaPage() {
  const [events, setEvents] = useState(appointmentMocks)
  const [saving, setSaving] = useState(false)

  const handleCreate = () => {
    setSaving(true)
    const nextId = `A-${(events.length + 1).toString().padStart(3, '0')}`
    const newEvent: Appointment = {
      id: nextId,
      user_id: 'U-999',
      lead_id: 'L-999',
      property_id: 'P-999',
      date: '2026-06-08',
      time: '11:30',
      note: 'Reunião para apresentação de proposta.',
      status: 'Agendada',
      created_at: '2026-06-05',
      lead_name: 'Novo lead',
      property_title: 'Apresentação de imóvel premium',
    }
    setTimeout(() => {
      setEvents((current) => [newEvent, ...current])
      setSaving(false)
      toast.success('Compromisso criado com sucesso.')
    }, 200)
  }

  const handleEdit = (id: string) => {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...event, note: event.note.includes('(edit)') ? event.note : `${event.note} (editado)` }
          : event,
      ),
    )
    toast.success('Compromisso atualizado.')
  }

  const handleComplete = (id: string) => {
    setEvents((current) =>
      current.map((event) => (event.id === id ? { ...event, status: 'Realizada' } : event)),
    )
    toast.success('Compromisso concluído.')
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Agenda</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Calendário de visitas</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Visão clara dos agendamentos diários e próximos compromissos da equipe.</p>
          </div>
          <Button variant="primary" onClick={handleCreate} disabled={saving}>
            {saving ? 'Criando...' : 'Criar compromisso'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {events.map((appointment) => (
            <Card key={appointment.id} className="rounded-[28px] border border-slate-200 p-6 shadow-panel">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{appointment.date}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950">{appointment.lead_name}</h2>
                  <p className="mt-2 text-sm text-slate-600">{appointment.property_title}</p>
                </div>
                <Badge variant={appointment.status === 'Confirmada' || appointment.status === 'Realizada' ? 'success' : 'warning'}>
                  {appointment.status}
                </Badge>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Hora</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.time}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Contato</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.lead_name}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Local</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{appointment.property_title}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="ghost" className="rounded-3xl px-4 py-2" onClick={() => handleEdit(appointment.id)}>
                  Editar
                </Button>
                <Button variant="primary" className="rounded-3xl px-4 py-2" onClick={() => handleComplete(appointment.id)}>
                  Concluir
                </Button>
              </div>

              <p className="mt-4 text-sm text-slate-600">{appointment.note}</p>
            </Card>
          ))}
        </div>

        <Card title="Próximas visitas" description="Resumo rápido das visitas agendadas para os próximos dias." className="rounded-[28px] border border-slate-200 shadow-panel">
          <div className="space-y-4">
            {events.map((appointment) => (
              <div key={appointment.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3 text-slate-700">
                  <CalendarDays className="h-4 w-4" />
                  <p className="text-sm font-semibold">{appointment.date} às {appointment.time}</p>
                </div>
                <p className="mt-3 text-sm text-slate-500">{appointment.lead_name} — {appointment.property_title}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Agenda semanal</p>
              <p className="mt-1 text-sm text-slate-500">3 visitas amanhã</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
              <Clock3 className="h-4 w-4" /> Próximo em 1h
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
