import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Square, Star } from 'lucide-react'
import { Button, Card, Badge } from '../components/ui'
import { loadState } from '../lib/storage'
import { properties } from '../lib/mockData'
import type { Property } from '../lib/types'

export default function PropertyDetailPage() {
  const { propertyId } = useParams<{ propertyId: string }>()
  const navigate = useNavigate()

  const property = useMemo(() => {
    const storedProperties = loadState<Property[]>('moviio-properties', properties)
    return storedProperties.find((item) => item.id === propertyId) ?? null
  }, [propertyId])

  if (!property) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-sm text-slate-500">Imóvel não encontrado.</p>
        <Button variant="primary" onClick={() => navigate('/properties')} className="mt-4">
          Voltar para imóveis
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Imóvel</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">{property.title}</h1>
            <p className="mt-2 text-sm text-slate-600">Detalhes de imóvel, valor e status de publicação.</p>
          </div>
          <Button variant="ghost" onClick={() => navigate('/properties')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card title="Visão geral" description={property.description}>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Tipo</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{property.type}</p>
              </div>
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Cidade</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{property.city}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <p className="text-sm">Endereço</p>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-950">{property.address}</p>
              </div>
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Square className="h-4 w-4" />
                  <p className="text-sm">Área</p>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-950">{property.area} m²</p>
              </div>
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-slate-600">
                  <Star className="h-4 w-4" />
                  <p className="text-sm">Dormitórios</p>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-950">{property.bedrooms}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Status e ações" description="Controle rápido de publicação e arquivamento.">
          <div className="space-y-4">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Status</p>
              <Badge variant={property.status === 'Disponível' ? 'success' : property.status === 'Reservado' ? 'warning' : 'danger'} className="mt-3">
                {property.status}
              </Badge>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Valor</p>
              <p className="mt-2 text-lg font-semibold text-slate-950">
                {property.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
            <div className="grid gap-3">
              <Button variant="primary" onClick={() => navigate('/properties')}>
                Agendar visita
              </Button>
              <Button variant="outline" onClick={() => navigate('/properties')}>
                Duplicar imóvel
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Fotos e destaque" description="Principais imagens para apresentação do imóvel.">
        <div className="grid gap-4 sm:grid-cols-2">
          {property.photos.map((photo) => (
            <img key={photo} src={photo} alt={property.title} className="h-56 w-full rounded-[24px] object-cover shadow-sm" />
          ))}
        </div>
      </Card>
    </div>
  )
}
