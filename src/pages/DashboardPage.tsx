import { ArrowUpRight, CalendarDays, ClipboardList, DollarSign, LayoutList, Sparkles, TrendingUp, Users, Watch } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Table } from '../components/ui'
import { appointments, dashboardMetrics, leads, pipelineSummary, salesChart } from '../lib/mockData'

const statusVariant: Record<string, 'primary' | 'muted' | 'warning' | 'success' | 'danger'> = {
  Novo: 'primary',
  'Contato Feito': 'warning',
  'Visita Marcada': 'success',
  Proposta: 'primary',
  Fechado: 'success',
  Perdido: 'danger',
}

const kpiCards = [
  { label: 'Leads do mês', value: dashboardMetrics.monthlyLeads, delta: '+12%', icon: Users, accent: 'from-sky-500 to-cyan-500' },
  { label: 'Novos clientes', value: dashboardMetrics.newClients, delta: '+18%', icon: Sparkles, accent: 'from-emerald-500 to-teal-500' },
  { label: 'Imóveis ativos', value: dashboardMetrics.activeProperties, delta: '+4%', icon: LayoutList, accent: 'from-violet-500 to-indigo-500' },
  { label: 'Taxa de conversão', value: `${dashboardMetrics.conversionRate}%`, delta: '+9%', icon: TrendingUp, accent: 'from-amber-500 to-orange-400' },
  { label: 'Comissão prevista', value: dashboardMetrics.expectedCommission.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), delta: '+9%', icon: DollarSign, accent: 'from-blue-500 to-sky-500' },
  { label: 'Comissão recebida', value: dashboardMetrics.commissionReceived.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), delta: '+14%', icon: DollarSign, accent: 'from-emerald-500 to-teal-500' },
  { label: 'Visitas agendadas', value: dashboardMetrics.scheduledVisits, delta: '+7%', icon: CalendarDays, accent: 'from-sky-500 to-cyan-500' },
  { label: 'Contratos fechados', value: dashboardMetrics.closedDeals, delta: '+22%', icon: ClipboardList, accent: 'from-indigo-500 to-violet-500' },
]

const activityFeed = [
  { time: 'Agora', title: 'Nova visita agendada', description: 'Visita confirmada para Mariana Silva em Higienópolis.', badge: 'Visita' },
  { time: '1h atrás', title: 'Novo lead cadastrado', description: 'Bruno Alves entrou em contato via WhatsApp.', badge: 'Lead' },
  { time: 'Ontem', title: 'Proposta enviada', description: 'Proposta para Fernanda Lima foi enviada.', badge: 'Proposta' },
  { time: '2 dias', title: 'Imóvel reservado', description: 'Casa em Granja Viana recebeu reserva formal.', badge: 'Imóvel' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const [leadRows, setLeadRows] = useState(leads)
  const [loadingAction, setLoadingAction] = useState(false)

  const handleAction = (route: string) => {
    setLoadingAction(true)
    setTimeout(() => {
      setLoadingAction(false)
      navigate(route)
    }, 120)
  }

  const handleDeleteLead = (leadId: string) => {
    setLeadRows((current) => current.filter((lead) => lead.id !== leadId))
  }

  const handleMoveStage = (leadId: string) => {
    setLeadRows((current) =>
      current.map((lead) => {
        if (lead.id !== leadId) return lead
        const nextStatus =
          lead.status === 'Novo'
            ? 'Contato Feito'
            : lead.status === 'Contato Feito'
            ? 'Visita Marcada'
            : lead.status === 'Visita Marcada'
            ? 'Proposta'
            : lead.status === 'Proposta'
            ? 'Fechado'
            : lead.status
        return { ...lead, status: nextStatus }
      }),
    )
  }

  const recentLeads = useMemo(() => leadRows.slice(0, 5), [leadRows])
  const totalCalls = 8
  const followUps = 7

  return (
    <div className="space-y-6">
      <motion.section
        className="rounded-[16px] border border-slate-200 bg-white p-8 shadow-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Painel executivo</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">Dashboard</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Visão estratégica da sua operação imobiliária com foco em conversões, agenda e receita.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" className="rounded-[12px]" onClick={() => handleAction('/leads')}>
              {loadingAction ? 'Carregando...' : 'Novo lead'}
            </Button>
            <Button variant="outline" className="rounded-[12px] border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => handleAction('/reports')}>
              Exportar
            </Button>
          </div>
        </div>
      </motion.section>

      <motion.section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
        {kpiCards.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-[16px] border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">{item.label}</p>
                  <p className="mt-4 text-3xl font-bold text-slate-950">{item.value}</p>
                </div>
                <div className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br ${item.accent} text-white shadow-lg shadow-slate-900/10`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                <span>{item.delta} desde último mês</span>
              </div>
            </div>
          )
        })}
      </motion.section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <Card title="Vendas projetadas" description="Comparativo de receita e tendência do pipeline.">
          <div className="h-80 px-2 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesChart} margin={{ top: 16, right: 16, left: -4, bottom: 0 }}>
                <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#94A3B8" fontSize={12} />
                <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" fontSize={12} />
                <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Pipeline" description="Distribuição de oportunidades no funil de vendas.">
          <div className="space-y-4">
            {pipelineSummary.map((item, index) => (
              <button
                key={item.stage}
                type="button"
                onClick={() => handleAction('/pipeline')}
                className="w-full rounded-[16px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-slate-300 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.stage}</p>
                    <p className="mt-1 text-xs text-slate-500">{item.total} oportunidades</p>
                  </div>
                  <Badge variant="primary">{item.delta}</Badge>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div className={`h-full rounded-full ${['w-3/4 bg-blue-600', 'w-2/3 bg-emerald-500', 'w-1/2 bg-sky-500', 'w-1/3 bg-amber-500', 'w-5/6 bg-violet-500'][index % 5]}`} />
                </div>
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
        <Card title="Últimos leads" description="Acompanhe os contatos mais quentes em tempo real.">
          <div className="overflow-x-auto">
            <Table>
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.24em] text-slate-500">
                <tr>
                  <th className="px-6 py-3">Nome</th>
                  <th className="px-6 py-3">Interesse</th>
                  <th className="px-6 py-3">Origem</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-900">{lead.name}</td>
                    <td className="px-6 py-3 text-sm text-slate-600">{lead.interest}</td>
                    <td className="px-6 py-3 text-sm text-slate-600">{lead.origin}</td>
                    <td className="px-6 py-3">
                      <Badge variant={statusVariant[lead.status] ?? 'muted'}>{lead.status}</Badge>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600">
                      <div className="flex flex-wrap gap-2">
                        <Button variant="ghost" size="sm" className="rounded-full px-3 py-1" onClick={() => handleAction('/leads')}>
                          Ver
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full px-3 py-1" onClick={() => handleAction('/leads')}>
                          Editar
                        </Button>
                        <Button variant="secondary" size="sm" className="rounded-full px-3 py-1" onClick={() => handleDeleteLead(lead.id)}>
                          Excluir
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full px-3 py-1" onClick={() => handleMoveStage(lead.id)}>
                          Mover estágio
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>

        <Card title="Agenda do dia" description="Compromissos, visitas e follow-ups prioritários.">
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{appointment.lead_name}</p>
                    <p className="mt-1 text-sm text-slate-600">{appointment.property_title}</p>
                  </div>
                  <Badge variant={appointment.status === 'Confirmada' ? 'success' : appointment.status === 'Realizada' ? 'muted' : 'warning'}>
                    {appointment.status}
                  </Badge>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[16px] bg-white p-3 text-xs">
                    <p className="uppercase tracking-[0.3em] text-slate-400">Data</p>
                    <p className="mt-1 font-semibold text-slate-900">{appointment.date}</p>
                  </div>
                  <div className="rounded-[16px] bg-white p-3 text-xs">
                    <p className="uppercase tracking-[0.3em] text-slate-400">Hora</p>
                    <p className="mt-1 font-semibold text-slate-900">{appointment.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[16px] border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Ligações pendentes</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">{totalCalls}</p>
            </div>
            <div className="rounded-[16px] border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Follow-ups</p>
              <p className="mt-3 text-3xl font-bold text-slate-950">{followUps}</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <Card title="Feed de atividades" description="Linha do tempo das ações mais importantes.">
          <div className="space-y-4">
            {activityFeed.map((item) => (
              <div key={item.title} className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Resumo rápido" description="Indicadores de ação para as próximas 24h.">
          <div className="space-y-4">
            <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Visitas confirmadas</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{appointments.filter((item) => item.status === 'Confirmada').length}</p>
            </div>
            <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Leads em negociação</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">9</p>
            </div>
            <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Taxa de follow-up</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">78%</p>
            </div>
            <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Tempo médio de resposta</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">1h 24m</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
