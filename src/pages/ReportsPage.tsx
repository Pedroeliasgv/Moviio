import { BarChart2, ChartPie, ClipboardList, DollarSign } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge, Button, Card } from '../components/ui'
import { dashboardMetrics, salesChart } from '../lib/mockData'

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Relatórios</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Análise de performance</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Dados estratégicos reunidos em relatórios fáceis de entender.</p>
      </div>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="space-y-4">
          <div className="flex items-center gap-3 text-slate-500">
            <ClipboardList className="h-5 w-5" />
            <p className="text-sm font-semibold text-slate-900">Leads faturáveis</p>
          </div>
          <p className="text-3xl font-semibold text-slate-950">{dashboardMetrics.monthlyLeads}</p>
          <Badge variant="primary">+14% mês</Badge>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center gap-3 text-slate-500">
            <BarChart2 className="h-5 w-5" />
            <p className="text-sm font-semibold text-slate-900">Conversões</p>
          </div>
          <p className="text-3xl font-semibold text-slate-950">{dashboardMetrics.conversionRate}%</p>
          <Badge variant="success">Meta próxima</Badge>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center gap-3 text-slate-500">
            <DollarSign className="h-5 w-5" />
            <p className="text-sm font-semibold text-slate-900">Comissão prevista</p>
          </div>
          <p className="text-3xl font-semibold text-slate-950">
            {dashboardMetrics.expectedCommission.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <Badge variant="success">pipeline saudável</Badge>
        </Card>
        <Card className="space-y-4">
          <div className="flex items-center gap-3 text-slate-500">
            <ChartPie className="h-5 w-5" />
            <p className="text-sm font-semibold text-slate-900">Taxa de retenção</p>
          </div>
          <p className="text-3xl font-semibold text-slate-950">82%</p>
          <Badge variant="primary">Crescimento constante</Badge>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <Card title="Tendência de vendas" description="Como evoluiu a receita nos últimos meses.">
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChart} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" />
                <XAxis dataKey="month" stroke="#64748B" tickLine={false} />
                <YAxis stroke="#64748B" tickLine={false} />
                <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Bar dataKey="revenue" fill="#2563EB" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Resumo rápido" description="Principais indicadores para decisões mais rápidas.">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-500">Meta de leads</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">150</p>
              </div>
              <Badge variant="success">94%</Badge>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-500">Taxa de visita</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">72%</p>
              </div>
              <Badge variant="primary">Controle</Badge>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm text-slate-500">Conversões em proposta</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">29%</p>
              </div>
              <Badge variant="warning">Em crescimento</Badge>
            </div>
            <Button variant="ghost" className="w-full border border-slate-200 text-slate-700 hover:bg-slate-50">
              Ver relatório completo
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}
