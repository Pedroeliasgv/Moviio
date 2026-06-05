import { useEffect, useMemo, useState } from 'react'
import { Bell, Menu, Search, Plus, User, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Input from './ui/Input'
import Button from './ui/Button'
import { clients, leads, properties, proposals } from '../lib/mockData'

interface SearchItem {
  id: string
  type: string
  title: string
  subtitle: string
  meta: string
  route: string
}

const buildSearchItems = (): SearchItem[] => [
  ...leads.map((item) => ({
    id: item.id,
    type: 'Lead',
    title: item.name,
    subtitle: item.interest,
    meta: item.origin,
    route: `/leads/${item.id}`,
  })),
  ...properties.map((item) => ({
    id: item.id,
    type: 'Imóvel',
    title: item.title,
    subtitle: `${item.bedrooms} dorms · ${item.area} m²`,
    meta: item.city,
    route: `/properties/${item.id}`,
  })),
  ...clients.map((item) => ({
    id: item.id,
    type: 'Cliente',
    title: item.name,
    subtitle: item.company,
    meta: item.category ?? item.status,
    route: `/clients/${item.id}`,
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

const defaultNotifications = [
  {
    id: 'notification-1',
    type: 'Novo lead',
    title: 'Lead capturado',
    description: 'Bruno Alves preencheu o formulário de contato.',
    route: '/leads',
    isRead: false,
  },
  {
    id: 'notification-2',
    type: 'Agendamento',
    title: 'Visita confirmada',
    description: 'Visita marcada com Mariana Silva para amanhã.',
    route: '/agenda',
    isRead: false,
  },
  {
    id: 'notification-3',
    type: 'Atividade',
    title: 'Proposta enviada',
    description: 'Proposta para Fernanda Lima foi enviada.',
    route: '/proposals',
    isRead: true,
  },
]

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const initials = useMemo(() => {
    if (!user?.email) return 'M'
    return user.email.charAt(0).toUpperCase()
  }, [user])

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(defaultNotifications)
  const items = useMemo(buildSearchItems, [])

  const results = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    return items
      .filter((item) => [item.title, item.subtitle, item.meta, item.type].some((value) => value.toLowerCase().includes(query)))
      .slice(0, 8)
  }, [items, searchQuery])

  const unreadCount = notifications.filter((item) => !item.isRead).length

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
        setNotificationsOpen(false)
        setProfileOpen(false)
      }
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setNotificationsOpen(false)
        setProfileOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleResultClick = (route: string) => {
    navigate(route)
    setSearchOpen(false)
    setSearchQuery('')
  }

  const handleNotificationClick = (id: string, route: string) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    )
    setNotificationsOpen(false)
    navigate(route)
  }

  const handleProfileAction = (path: string) => {
    setProfileOpen(false)
    if (path === '/logout') {
      signOut()
      navigate('/login')
      return
    }
    navigate(path)
  }

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
              <div className="relative">
                <Button
                  variant="ghost"
                  size="md"
                  className="rounded-[12px] border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-100"
                  onClick={() => {
                    setNotificationsOpen((current) => !current)
                    setSearchOpen(false)
                    setProfileOpen(false)
                  }}
                >
                  <span className="relative inline-flex items-center gap-2">
                    <Bell className="h-4 w-4" /> Notificações
                    {unreadCount > 0 ? (
                      <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
                        {unreadCount}
                      </span>
                    ) : null}
                  </span>
                </Button>
                {notificationsOpen ? (
                  <div className="absolute right-0 z-10 mt-3 w-[320px] rounded-[24px] border border-slate-200 bg-white p-4 shadow-soft">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-950">Notificações</p>
                      <button
                        type="button"
                        onClick={() => setNotifications((current) => current.map((item) => ({ ...item, isRead: true })))}
                        className="text-xs font-medium text-slate-500 hover:text-slate-700"
                      >
                        Marcar todas como lidas
                      </button>
                    </div>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <button
                          key={notification.id}
                          type="button"
                          onClick={() => handleNotificationClick(notification.id, notification.route)}
                          className="w-full rounded-[18px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-primary/50 hover:bg-white"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-sm font-semibold text-slate-950">{notification.title}</p>
                            <span className="text-[11px] uppercase tracking-[0.3em] text-slate-500">{notification.type}</span>
                          </div>
                          <p className="mt-2 text-sm text-slate-600">{notification.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <Button variant="primary" size="md" className="rounded-[12px]" onClick={() => navigate('/leads')}>
                <Plus className="mr-2 h-4 w-4" /> Novo lead
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 min-w-0">
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(true)
                  setNotificationsOpen(false)
                  setProfileOpen(false)
                }}
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

            <div className="relative flex items-center gap-3 self-start lg:self-auto">
              <div className="hidden rounded-[12px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 lg:flex">
                Olá, <span className="font-semibold text-slate-950">{user?.email?.split('@')[0] ?? 'Usuário'}</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen((current) => !current)
                    setSearchOpen(false)
                    setNotificationsOpen(false)
                  }}
                  className="inline-flex items-center gap-3 rounded-[12px] border border-slate-200 bg-white px-4 py-3 shadow-soft transition hover:border-slate-300"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-semibold text-white">
                    {initials}
                  </span>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-slate-950">{user?.email ?? 'Usuário Moviio'}</p>
                    <p className="text-xs text-slate-500">Minha conta</p>
                  </div>
                </button>
                {profileOpen ? (
                  <div className="absolute right-0 z-10 mt-3 w-56 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-soft">
                    <button
                      type="button"
                      onClick={() => handleProfileAction('/profile')}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                    >
                      <User className="h-4 w-4" /> Meu perfil
                    </button>
                    <button
                      type="button"
                      onClick={() => handleProfileAction('/settings')}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100"
                    >
                      <User className="h-4 w-4" /> Configurações
                    </button>
                    <button
                      type="button"
                      onClick={() => handleProfileAction('/logout')}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-rose-600 hover:bg-rose-50"
                    >
                      <X className="h-4 w-4" /> Sair
                    </button>
                  </div>
                ) : null}
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
                    <button
                      key={`${result.type}-${result.id}`}
                      type="button"
                      onClick={() => handleResultClick(result.route)}
                      className="w-full rounded-[16px] border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-primary hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-950">{result.title}</p>
                          <p className="mt-1 text-sm text-slate-600">{result.subtitle}</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">{result.type}</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-500">{result.meta}</p>
                    </button>
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
