import { NavLink } from 'react-router-dom'
import { Building, CalendarDays, FileText, Home, LayoutDashboard, Settings2, Users, BarChart3, UserCheck } from 'lucide-react'

const navigation = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Leads', path: '/leads', icon: Users },
  { label: 'Pipeline', path: '/pipeline', icon: LayoutDashboard },
  { label: 'Agenda', path: '/agenda', icon: CalendarDays },
  { label: 'Imóveis', path: '/properties', icon: Building },
  { label: 'Clientes', path: '/clients', icon: UserCheck },
  { label: 'Propostas', path: '/proposals', icon: FileText },
  { label: 'Relatórios', path: '/reports', icon: BarChart3 },
  { label: 'Configurações', path: '/settings', icon: Settings2 },
]

interface SidebarProps {
  isMobile?: boolean
  onNavigate?: () => void
}

export default function Sidebar({ isMobile = false, onNavigate }: SidebarProps) {
  return (
    <aside className={isMobile ? 'block w-full bg-slate-950 text-white' : 'hidden lg:flex w-[280px] flex-shrink-0 bg-slate-950 text-white'}>
      <div className="flex min-h-screen flex-col justify-between border-r border-white/10 px-6 py-8">
        <div>
          <div className="mb-10">
            <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.45em] text-sky-300">
              moviio
            </span>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white">Painel CRM</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">O centro de controle para sua operação imobiliária.</p>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-[24px] px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-slate-800 text-white shadow-inner shadow-slate-950/20 ring-1 ring-sky-400/20'
                        : 'text-slate-300 hover:bg-slate-900/70 hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? <span className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-sky-400" /> : null}
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="space-y-4 rounded-[28px] border border-slate-800/80 bg-slate-900/95 p-5 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Plano</p>
              <p className="mt-2 text-xl font-semibold text-white">Enterprise</p>
            </div>
            <span className="rounded-2xl bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
              Atual
            </span>
          </div>
          <p className="text-sm leading-6 text-slate-400">Acesso a todos os relatórios, pipeline e integração com agenda.</p>
          <div className="grid gap-2 rounded-3xl border border-slate-800/80 bg-slate-950/80 p-4 text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span>Leads</span>
              <strong className="text-white">138</strong>
            </div>
            <div className="flex items-center justify-between">
              <span>Visitas</span>
              <strong className="text-white">18</strong>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
