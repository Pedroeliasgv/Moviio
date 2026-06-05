import { MapPin, Square, Star } from 'lucide-react'
import { Button, Card, Badge } from '../components/ui'
import { properties } from '../lib/mockData'

const statusVariant: Record<string, 'primary' | 'muted' | 'warning' | 'success' | 'danger'> = {
  Disponível: 'success',
  Reservado: 'warning',
  Vendido: 'danger',
}

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Imóveis</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Catálogo de imóveis</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Apresentação premium dos melhores imóveis para vender e alugar.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden rounded-[32px] border border-slate-200 p-0 shadow-panel">
            <div className="group relative overflow-hidden">
              <img src={property.photos[0]} alt={property.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <Badge className="absolute right-4 top-4" variant={statusVariant[property.status] ?? 'muted'}>
                {property.status}
              </Badge>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-500">{property.type}</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">{property.title}</h2>
                </div>
                <p className="text-lg font-semibold text-slate-900">
                  {property.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              <p className="text-sm leading-6 text-slate-600">{property.description}</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-600">
                  <MapPin className="h-3.5 w-3.5" /> {property.city}
                </div>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-600">
                  <Square className="h-3.5 w-3.5" /> {property.area} m²
                </div>
                <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-100 px-3 py-2 text-xs uppercase tracking-[0.3em] text-slate-600">
                  <Star className="h-3.5 w-3.5" /> {property.bedrooms} dorms
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 pt-4">
                <Button variant="outline" className="rounded-3xl border-slate-200 text-slate-900 hover:bg-slate-50">
                  Ver detalhes
                </Button>
                <Button variant="ghost" className="rounded-3xl border border-slate-200 text-slate-700 hover:bg-slate-50">
                  Agendar visita
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
