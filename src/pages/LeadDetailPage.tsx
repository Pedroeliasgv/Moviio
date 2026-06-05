import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Phone, User } from 'lucide-react'
import { Button, Card, Badge } from '../components/ui'
import { loadState } from '../lib/storage'
import { leads } from '../lib/mockData'
import type { Lead } from '../lib/types'

export default function LeadDetailPage() {
  const { leadId } = useParams<{ leadId: string }>()
  const navigate = useNavigate()

  const lead = useMemo(() => {
    const savedLeads = loadState<Lead[]>('moviio-leads', leads)
    return savedLeads.find((item) => item.id === leadId) ?? null
  }, [leadId])

  if (!lead) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm text-slate-500">Lead não encontrado.</p>
        <Button variant="primary" onClick={() => navigate('/leads')} className="mt-4">
          Voltar para leads
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Lead</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{lead.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Detalhes completos do lead e histórico de contato.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/leads')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Informações do lead" description="Dados de contato e interesse.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Telefone</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{lead.phone}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Phone className="h-4 w-4" /> {lead.whatsapp === 'Sim' ? 'WhatsApp disponível' : 'Sem WhatsApp'}
              </div>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{lead.email}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <User className="h-4 w-4" /> {lead.origin}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Interesse</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{lead.interest}</p>
            <p className="mt-3 text-sm text-slate-600">{lead.price_range}</p>
          </div>
        </Card>

        <Card title="Status" description="Acompanhamento do estágio atual do lead.">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Status atual</p>
              <Badge variant={lead.status === 'Fechado' ? 'success' : lead.status === 'Perdido' ? 'danger' : lead.status === 'Contato Feito' ? 'warning' : 'primary'} className="mt-3">
                {lead.status}
              </Badge>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Criado em</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">{lead.created_at}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Notas" description="Detalhes registrados pelo corretor.">
        <p className="text-sm leading-7 text-slate-600">{lead.notes}</p>
      </Card>

      <Card className="rounded-[28px] border border-slate-200 p-6 shadow-soft">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-slate-500">Próximo passo</p>
          <Badge variant="warning">Acompanhar</Badge>
        </div>
        <div className="mt-5 space-y-3 rounded-[20px] bg-slate-50 p-5 text-sm text-slate-600">
          <p>Entre em contato nas próximas 24h para confirmar o interesse e alinhamento de proposta.</p>
          <p>Use informações de interesse de preço e localização para próxima reunião.</p>
        </div>
      </Card>
    </div>
  )
}
