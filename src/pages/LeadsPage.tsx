import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Badge, Button, Card, Input, Modal, Select, Table } from '../components/ui'
import { leads, properties } from '../lib/mockData'
import type { Lead } from '../lib/types'

const statusVariants: Record<string, 'primary' | 'muted' | 'warning' | 'success' | 'danger'> = {
  Novo: 'primary',
  'Contato Feito': 'muted',
  'Visita Marcada': 'warning',
  Proposta: 'primary',
  Fechado: 'success',
  Perdido: 'danger',
}

const statusOptions = ['Todos', 'Novo', 'Contato Feito', 'Visita Marcada', 'Proposta', 'Fechado', 'Perdido']

const leadTimeline = [
  { timestamp: 'Hoje, 09:00', event: 'Primeiro contato por WhatsApp' },
  { timestamp: 'Hoje, 14:30', event: 'Envio de proposta inicial' },
  { timestamp: 'Ontem, 18:00', event: 'Agendamento de visita' },
]

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Todos')
  const [page, setPage] = useState(1)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = [lead.name, lead.phone, lead.interest, lead.email, lead.origin].some((field) =>
        field.toLowerCase().includes(search.toLowerCase()),
      )
      const matchesStatus = status === 'Todos' || lead.status === status
      return matchesSearch && matchesStatus
    })
  }, [search, status])

  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / pageSize))
  const paginatedLeads = filteredLeads.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[16px] border border-slate-200 bg-white p-6 shadow-panel sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Leads</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">Lista de leads</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Ferramentas rápidas para classificar, filtrar e avançar negócios.</p>
        </div>
        <Button variant="primary" className="rounded-[12px]" onClick={() => setSelectedLead(leads[0])}>
          Adicionar novo lead
        </Button>
      </div>

      <Card title="Buscar e filtrar" description="Aplique filtros para localizar leads por status, interesse ou canal." className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div className="relative">
            <Input
              placeholder="Pesquisar nome, telefone ou interesse"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-12"
            />
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            {statusOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="w-full rounded-[12px]">
              Limpar
            </Button>
            <Button variant="ghost" className="w-full rounded-[12px] border border-slate-200 text-slate-700 hover:bg-slate-50">
              Atualizar
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Tabela de leads" description="Organize seus leads por prioridade, status e última interação.">
        <div className="overflow-x-auto">
          <Table>
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Telefone</th>
                <th className="px-6 py-4">Interesse</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Corretor</th>
                <th className="px-6 py-4">Última interação</th>
                <th className="px-6 py-4">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                  <td className="px-6 py-4 text-slate-600">{lead.phone}</td>
                  <td className="px-6 py-4 text-slate-600">{lead.interest}</td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariants[lead.status] ?? 'muted'}>{lead.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-600">Ana Ribeiro</td>
                  <td className="px-6 py-4 text-slate-600">{lead.created_at}</td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" className="rounded-full px-3 py-2 text-slate-700 hover:bg-slate-100" onClick={() => setSelectedLead(lead)}>
                      Ver
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Mostrando {paginatedLeads.length} de {filteredLeads.length} leads
          </p>
          <div className="inline-flex items-center gap-3 rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span className="text-sm text-slate-600">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      </Card>

      <Modal open={Boolean(selectedLead)} title={selectedLead?.name ?? 'Detalhes do lead'} description="Visão completa do lead e suas interações." onClose={() => setSelectedLead(null)}>
        {selectedLead ? (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Contato</p>
                <p className="text-sm font-semibold text-slate-950">{selectedLead.phone}</p>
                <p className="text-sm text-slate-600">{selectedLead.email}</p>
              </div>
              <div className="space-y-2 rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Origem</p>
                <p className="text-sm font-semibold text-slate-950">{selectedLead.origin}</p>
                <p className="text-sm text-slate-600">Faixa: {selectedLead.price_range}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Status</p>
                <Badge variant={statusVariants[selectedLead.status] ?? 'muted'}>{selectedLead.status}</Badge>
              </div>
              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Corretor responsável</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">Ana Ribeiro</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4 rounded-[16px] border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-950">Notas</h3>
                <p className="text-sm leading-6 text-slate-600">{selectedLead.notes}</p>
              </div>
              <div className="space-y-4 rounded-[16px] border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-semibold text-slate-950">Tarefas</h3>
                <div className="space-y-3">
                  <div className="rounded-[16px] bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-950">Confirmar visita</p>
                    <p className="text-xs text-slate-500">Agendado para hoje às 14:00</p>
                  </div>
                  <div className="rounded-[16px] bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-950">Enviar contrato</p>
                    <p className="text-xs text-slate-500">Pendente</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-950">Timeline</h3>
                <div className="mt-4 space-y-3">
                  {leadTimeline.map((event) => (
                    <div key={event.timestamp} className="rounded-[16px] bg-white p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-950">{event.event}</p>
                      <p className="mt-1 text-xs text-slate-500">{event.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-950">Imóveis relacionados</h3>
                <div className="mt-4 space-y-3">
                  {properties.slice(0, 2).map((property) => (
                    <div key={property.id} className="rounded-[16px] bg-white p-4">
                      <p className="text-sm font-semibold text-slate-950">{property.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{property.city} · {property.area} m²</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
