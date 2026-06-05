import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { Button, Input } from '../components/ui'

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const { error } = await resetPassword(email)
    setLoading(false)

    if (error) {
      toast.error('Não foi possível enviar as instruções. Tente novamente.')
      return
    }

    toast.success('Instruções de recuperação enviadas para o seu email.')
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 text-slate-900">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-500">Recuperação</p>
        <h2 className="mt-3 text-3xl font-semibold">Recupere sua senha</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">Digite o email cadastrado e nós enviaremos as instruções para redefinir sua senha.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-soft">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">Email</label>
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar instruções'}
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500">
        Já lembra a senha?{' '}
        <Link to="/login" className="font-semibold text-slate-900 hover:text-slate-700">
          Voltar para login
        </Link>
      </p>
    </div>
  )
}
