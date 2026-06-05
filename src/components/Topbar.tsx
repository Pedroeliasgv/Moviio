import { useMemo, useState, useEffect } from 'react'
import { Bell, Menu, Search, Plus, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Input from './ui/Input'
import Button from './ui/Button'
import { clients, leads, properties, proposals } from '../lib/mockData'

interface TopbarProps {
  onMenuClick: () => void
}

const buildSearchItems = () => [
  ...leads.map((item) => ({
    id: item.id,
    type: 'Lead',
    title: item.name,
    subtitle: item.interest,
    meta: item.origin,
    route: '/leads',
  })),
  ...properties.map((item) => ({
    id: item.id,
    type: 'Imóvel',
    title: item.title,
    subtitle: `${item.bedrooms} dorms · ${item.area} m²`,
    meta: item.city,
    route: '/properties',
  })),
  ...clients.map((item) => ({
    id: item.id,
    type: 'Cliente',
    title: item.name,
    subtitle: item.company,
    meta: item.category ?? item.status,
    route: '/clients',
  })),
  ...proposals.map((item) => ({
    id: item.id,
    type: 'Proposta',
    title: item.property,
    subtitle: item.lead,
    meta: item.status,
    route: '/proposals',
  })),
]

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { signOut, user } = useAuth()
  const initials = useMemo(() => {
    if (!user?.email) return 'M'
    return user.email.charAt(0).toUpperCase()
  }, [user])

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const items = useMemo(buildSearchItems, [])
  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    return items.filter((item) => [item.title, item.subtitle, item.meta, item.type].some((value) => value.toLowerCase().includes(query))).slice(0, 8)
  }, [items, searchQuery])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl shadow-soft">
        <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 xl:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onMenuClick}
                className="inline-flex h-12 w-12 items-center justify-center rounded-[12px] border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
                aria-label="Abrir menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Operação</p>
                <h1 className="text-xl font-semibold text-slate-950">Painel de controle</h1>
              </div>
            </div>

            <div className="hidden items-center gap-3 sm:flex">
              <Button variant="ghost" size="md" className="rounded-[12px] border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-100">
                <Bell className="mr-2 h-4 w-4" /> Notificações
              </Button>
              <Button variant="primary" size="md" className="rounded-[12px]">
                <Plus className="mr-2 h-4 w-4" /> Novo lead
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="group relative w-full rounded-[12px] border border-slate-200 bg-white py-3 pl-12 pr-4 text-left text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-primary/20"
                aria-label="Abrir busca global"
              >
                <span className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
                  <Search className="h-4 w-4" />
                </span>
                Buscar leads, clientes, imóveis ou propostas
                <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 px-2 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-500">
                  Ctrl + K
                </span>
              </button>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-auto">
              <div className="hidden rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 lg:flex">
                Olá, <span className="font-semibold text-slate-950">{user?.email?.split('@')[0] ?? 'Usuário'}</span>
              </div>
              <div className="inline-flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-4 py-3 shadow-soft">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white">
                  {initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">{user?.email ?? 'Usuário Moviio'}</p>
                  <button type="button" onClick={signOut} className="text-xs font-medium text-slate-500 hover:text-slate-700">
                    Sair
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {searchOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/60 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-[20px] border border-slate-200 bg-white p-6 shadow-panel">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Busca global</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">Encontre leads, imóveis, clientes ou propostas</h2>
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100"
                aria-label="Fechar busca"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative mt-6">
              <div className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Digite para buscar..."
                className="pl-11 pr-4"
                autoFocus
                aria-label="Pesquisa global"
              />
            </div>

            <div className="mt-6 space-y-4">
              {results.length > 0 ? (
                <div className="space-y-3">
                  {results.map((result) => (
                    <div key={`${result.type}-${result.id}`} className="rounded-[16px] border border-slate-200 bg-slate-50 p-4 transition hover:border-primary hover:bg-white">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{result.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{result.subtitle}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">{result.type}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">{result.meta}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                  <p className="text-sm font-semibold">Nenhum resultado encontrado</p>
                  <p className="mt-2 text-sm">Tente outra palavra-chave ou refine sua busca.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
