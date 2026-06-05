import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '../components/ui'
import { useAuth } from '../hooks/useAuth'

export default function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const initials = useMemo(() => (user?.email ? user.email.charAt(0).toUpperCase() : 'U'), [user])

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Meu perfil</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Perfil do usuário</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Acesse suas informações e preferências pessoais dentro do CRM.</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/settings')}>
            Editar configurações
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.7fr_1fr]">
        <Card className="rounded-[28px] border border-slate-200 p-8 shadow-panel">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-semibold text-white">
              {initials}
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-950">{user?.email ?? 'Usuário Moviio'}</p>
              <p className="mt-2 text-sm text-slate-500">Acesso autenticado à sua conta Moviio</p>
            </div>
          </div>
        </Card>

        <Card title="Detalhes do usuário" description="Informações utilizadas pelo sistema para autenticação e relatórios." className="rounded-[28px] border border-slate-200 p-8 shadow-panel">
          <div className="grid gap-4">
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">E-mail</p>
              <p className="mt-2 font-semibold text-slate-950">{user?.email ?? 'não disponível'}</p>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">ID do usuário</p>
              <p className="mt-2 font-semibold text-slate-950">{user?.id ?? 'não disponível'}</p>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Data de cadastro</p>
              <p className="mt-2 font-semibold text-slate-950">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
