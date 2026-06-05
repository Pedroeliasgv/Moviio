import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Briefcase, Mail } from 'lucide-react'
import { Button, Card, Badge } from '../components/ui'
import { clients } from '../lib/mockData'
import { loadState } from '../lib/storage'
import type { Client } from '../lib/types'

export default function ClientDetailPage() {
  const { clientId } = useParams<{ clientId: string }>()
  const navigate = useNavigate()

  const client = useMemo(() => {
    const storedClients = loadState<Client[]>('moviio-clients', clients)
    return storedClients.find((item) => item.id === clientId) ?? null
  }, [clientId])

  if (!client) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm text-slate-500">Cliente não encontrado.</p>
        <Button variant="primary" onClick={() => navigate('/clients')} className="mt-4">
          Voltar para clientes
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Cliente</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{client.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Perfil do cliente e histórico de relacionamento.</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/clients')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Dados do cliente" description="Informações básicas e pessoais.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Empresa</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{client.company}</p>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Categoria</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{client.category ?? 'Não definido'}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Telefone</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{client.phone}</p>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{client.email}</p>
            </div>
          </div>
        </Card>

        <Card title="Status" description="Resumo do relacionamento atual.">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Status</p>
              <Badge variant={client.status === 'VIP' ? 'primary' : client.status === 'Ativo' ? 'success' : 'muted'} className="mt-3">
                {client.status}
              </Badge>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Último contato</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{client.last_contacted}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Notas e histórico" description="Resumo das necessidades e prioridades do cliente.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-700">
              <Briefcase className="h-4 w-4" />
              <p className="text-sm font-semibold text-slate-900">Corretor responsável</p>
            </div>
            <p className="mt-3 text-sm text-slate-600">{client.assigned_agent}</p>
          </div>
          <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="h-4 w-4" />
              <p className="text-sm font-semibold text-slate-900">Canal preferencial</p>
            </div>
            <p className="mt-3 text-sm text-slate-600">{client.email}</p>
          </div>
        </div>
        <div className="mt-6 rounded-[20px] border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
          {client.notes}
        </div>
      </Card>
    </div>
  )
}
