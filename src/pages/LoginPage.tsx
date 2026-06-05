import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, Zap, BarChart3, Users, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { Button, Input } from '../components/ui'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)

    if (error) {
      toast.error(error.message || 'Não foi possível entrar. Verifique seus dados.')
      return
    }

    toast.success('Bem-vindo ao Moviio!')
    navigate('/')
  }

  const features = [
    { icon: Zap, label: 'Gestão Inteligente de Leads', desc: 'Pontuação e qualificação de leads por IA' },
    { icon: BarChart3, label: 'Análise de Receita', desc: 'Insights em tempo real do seu funil de vendas' },
    { icon: Users, label: 'Colaboração em Equipe', desc: 'Espaço de trabalho unificado para seu time' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row overflow-hidden select-none">
      
      {/* Lado Esquerdo - Formulário Minimalista de Login */}
      <div className="flex flex-col justify-center w-full lg:w-[55%] px-6 py-12 sm:px-16 lg:px-24 bg-slate-950 relative z-10">
        <div className="mx-auto w-full max-w-md space-y-8">
          
          {/* Cabeçalho */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-slate-400">
              Acesse seu espaço de trabalho no MOVIIO para gerenciar seus negócios.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Endereço de e-mail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nome@empresa.com"
                  className="pl-11 bg-slate-900/40 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 h-11 w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Senha
                </label>
                <Link to="/forgot" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="pl-11 pr-12 bg-slate-900/40 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 h-11 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                  title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="inline-flex items-center gap-3 text-sm text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/10 bg-slate-900 text-blue-600 focus:ring-blue-500/50 focus:ring-2 focus:ring-offset-0 accent-blue-600"
                />
                Lembrar de mim
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors mt-2 rounded-xl shadow-none" 
              disabled={loading}
            >
              {loading ? 'Autenticando...' : 'Entrar no MOVIIO'}
            </Button>
          </form>

          {/* Links de navegação */}
          <div className="space-y-6 pt-4 border-t border-white/5">
            <p className="text-sm text-slate-400">
              Não tem uma conta?{' '}
              <Link to="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Solicitar acesso
              </Link>
            </p>
            
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-blue-500/70" />
              Criptografia de nível empresarial — Certificação SOC 2 Tipo II
            </div>
          </div>

        </div>
      </div>

      {/* Lado Direito - Recursos e Prova Visual */}
      <div className="hidden lg:flex w-[45%] bg-slate-900 border-l border-white/5 p-12 items-center justify-center relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
            CRM Imobiliário
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl font-bold leading-tight tracking-tight">
              Feche mais negócios. <br /> Mova-se mais rápido.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              O ecossistema premium construído para imobiliárias modernas que demandam alta performance e visibilidade completa de ponta a ponta.
            </p>
          </div>

          <div className="space-y-5 pt-2">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{feature.label}</p>
                    <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </div>
  )
}