import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, Zap, BarChart3, Users } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../hooks/useAuth'
import { Button, Input } from '../components/ui'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('pedroeliasv@gmail.com')
  const [password, setPassword] = useState('••••••••')
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
    { icon: Zap, label: 'Smart Lead Management', desc: 'AI-powered scoring and qualification' },
    { icon: BarChart3, label: 'Revenue Analytics', desc: 'Real-time insights across your pipeline' },
    { icon: Users, label: 'Team Collaboration', desc: 'Unified workspace for your sales team' },
  ]

  const avatars = ['AM', 'JR', 'CB', 'CC']

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-0 overflow-hidden rounded-[36px] border border-white/10 bg-slate-950/95 shadow-[0_40px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:flex-row lg:gap-0">
        {/* Left Panel - Dark with Features */}
        <div className="flex flex-col justify-between border-b border-white/10 px-8 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-14">
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.45em] text-blue-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400" />
                Real Estate CRM
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white">
                Close more deals.
                <br />
                Move faster.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-400">
                The premium CRM built exclusively for modern real estate agencies who demand more from their software.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-5">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{feature.label}</p>
                      <p className="mt-1 text-sm text-slate-400">{feature.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Social Proof */}
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {avatars.map((avatar, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-950 bg-blue-600 text-xs font-bold text-white"
                  >
                    {avatar}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Trusted by 2,400+ agents</p>
                <p className="text-xs text-slate-400">across 100+ real estate agencies worldwide</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Light Form */}
        <div className="bg-white px-8 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
          <div className="mx-auto w-full max-w-sm space-y-8 text-slate-900">
            {/* Form Header */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-950">Welcome back</h2>
              <p className="text-sm leading-6 text-slate-600">Sign in to your MOVIIO workspace</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@company.com"
                    className="pl-11 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <Link to="/forgot" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    className="pl-11 text-slate-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="inline-flex items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-600/50 focus:ring-2 focus:ring-offset-2"
                  />
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full h-12 font-semibold" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in to MOVIIO'}
              </Button>
            </form>

            {/* Footer */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-slate-950 hover:text-slate-700">
                  Request access
                </Link>
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1c6.075 0 11 4.925 11 11s-4.925 11-11 11S1 18.075 1 12 5.925 1 12 1zm-1 16h2v2h-2v-2zm0-12h2v8h-2V5z" />
                </svg>
                Enterprise-grade encryption - SOC 2 Type II certified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
