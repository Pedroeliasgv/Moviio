import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, User } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { Button, Input } from '../components/ui'

export default function SignUpPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const { error } = await signUp(email, password, name)
    setLoading(false)

    if (error) {
      toast.error(error.message || 'Não foi possível criar sua conta. Tente novamente.')
      return
    }

    toast.success('Conta criada com sucesso!')
    navigate('/')
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 text-slate-900">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Cadastro</p>
        <h2 className="mt-3 text-3xl font-semibold">Comece a vender mais</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Cadastre sua imobiliária e comece a gerenciar leads e imóveis com visibilidade premium.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-soft">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Nome completo</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Email corporativo</label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Senha</label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="pl-11"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar minha conta'}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Já tem conta?{' '}
        <Link to="/login" className="font-semibold text-slate-900 hover:text-slate-700">
          Entrar
        </Link>
      </p>
    </div>
  )
}
