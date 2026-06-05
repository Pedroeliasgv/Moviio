import { Send } from 'lucide-react'
import { Badge, Button, Card, Table } from '../components/ui'
import { proposals } from '../lib/mockData'

const statusVariant: Record<string, 'primary' | 'muted' | 'warning' | 'success' | 'danger'> = {
  Rascunho: 'muted',
  Enviada: 'warning',
  Aceita: 'success',
  Recusada: 'danger',
}

export default function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Propostas</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Gestão de propostas</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Acompanhe cada proposta desde a criação até o fechamento.</p>
      </div>

      <Card title="Visão geral" description="Propostas em andamento e próximas ações.">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Propostas abertas</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">12</p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Valor em negociação</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {proposals.reduce((sum, proposal) => sum + proposal.amount, 0).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Aceitas</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">1</p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Pendentes</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">2</p>
          </div>
        </div>
      </Card>

      <Card title="Lista de propostas" description="Acompanhe o status e o valor de cada proposta enviada.">
        <div className="overflow-x-auto">
          <Table>
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Lead</th>
                <th className="px-6 py-4">Imóvel</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{proposal.id}</td>
                  <td className="px-6 py-4 text-slate-600">{proposal.lead}</td>
                  <td className="px-6 py-4 text-slate-600">{proposal.property}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {proposal.amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{proposal.due}</td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariant[proposal.status] ?? 'muted'}>{proposal.status}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" className="rounded-3xl px-3 py-2 text-slate-700 hover:bg-slate-100">
                      <div className="inline-flex items-center gap-2">
                        <Send className="h-4 w-4" /> Detalhes
                      </div>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
