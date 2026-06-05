import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, User, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { Button, Input } from '../components/ui'

export default function SignUpPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row overflow-hidden select-none">
      
      {/* Lado Esquerdo - Formulário Minimalista e Focado */}
      <div className="flex flex-col justify-center w-full lg:w-[55%] px-6 py-12 sm:px-16 lg:px-24 bg-slate-950 relative z-10">
        <div className="mx-auto w-full max-w-md space-y-8">
          
          {/* Cabeçalho */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Comece a vender mais
            </h2>
            <p className="text-sm text-slate-400">
              Cadastre sua imobiliária e ganhe visibilidade premium no gerenciamento de leads.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Nome completo
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome completo"
                  className="pl-11 bg-slate-900/40 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500 h-11 w-full"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                E-mail corporativo
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Senha
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo 8 caracteres"
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

            <Button 
              type="submit" 
              className="w-full h-12 font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors mt-2 rounded-xl shadow-none" 
              disabled={loading}
            >
              {loading ? 'Configurando seu espaço...' : 'Criar minha conta'}
            </Button>
          </form>

          {/* Links de navegação */}
          <div className="space-y-6 pt-4 border-t border-white/5">
            <p className="text-sm text-slate-400">
              Já tem uma conta no MOVIIO?{' '}
              <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Fazer login
              </Link>
            </p>
            
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-blue-500/70" />
              Sua privacidade garantida sob criptografia de ponta a ponta.
            </div>
          </div>

        </div>
      </div>

      {/* Lado Direito - Painel de Impacto Visual */}
      <div className="hidden lg:flex w-[45%] bg-slate-900 border-l border-white/5 p-12 items-center justify-center relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300">
            Plataforma Enterprise
          </div>

          <h3 className="text-3xl font-bold leading-tight tracking-tight">
            A tecnologia que move as maiores imobiliárias do mercado.
          </h3>

          {/* Card de Depoimento */}
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md">
            <p className="text-slate-300 italic text-sm leading-relaxed">
              "A migração para o MOVIIO transformou a nossa operação imobiliária. A agilidade no tratamento dos leads vindo das campanhas aumentou nossa taxa de conversão em 34% logo no primeiro trimestre."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-md">
                RC
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Ricardo Cavalcanti</p>
                <p className="text-xs text-slate-500">Diretor de Operações na Prime Imóveis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}