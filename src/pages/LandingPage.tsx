import { Link } from 'react-router-dom'
import { 
  Zap, 
  BarChart3, 
  Users, 
  Target, 
  ShieldCheck, 
  ChevronRight, 
  Building2, 
  Layers, 
  ArrowUpRight 
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Gestão Inteligente de Leads',
      desc: 'Pontuação automática baseada em IA para identificar os compradores com maior intenção de fechamento instantaneamente.',
    },
    {
      icon: BarChart3,
      title: 'Análise de Receita Real-time',
      desc: 'Previsões de fechamento e dashboards completos para diretores gerenciarem o pipeline de vendas sem esforço.',
    },
    {
      icon: Users,
      title: 'Colaboração para Equipes',
      desc: 'Distribuição inteligente de leads e histórico unificado para que seu time de corretores nunca perca o tempo de resposta.',
    },
    {
      icon: Target,
      title: 'Foco em Alta Conversão',
      desc: 'Funis personalizados adaptados ao mercado de médio e alto padrão para acelerar a jornada de compra.',
    }
  ]

  const stats = [
    { value: '+34%', label: 'Taxa de Conversão' },
    { value: '2.400+', label: 'Corretores Ativos' },
    { value: 'R$ 2B+', label: 'Em VGV Gerenciados' },
    { value: '99.9%', label: 'Uptime em Nuvem' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-600/30 overflow-hidden">
      
      {/* 1. Header / Navbar */}
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-16 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center font-black text-lg text-white tracking-tighter">
            M
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">Moviio</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#recursos" className="hover:text-white transition-colors">Recursos</a>
          <a href="#metricas" className="hover:text-white transition-colors">Métricas</a>
          <a href="#seguranca" className="hover:text-white transition-colors">Segurança</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-4 py-2">
            Entrar
          </Link>
          <Link to="/signup" className="text-sm font-semibold bg-white text-slate-950 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-all shadow-lg hover:scale-[1.02]">
            Criar conta
          </Link>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative px-6 pt-20 pb-24 md:pt-32 md:pb-36 lg:px-16 text-center max-w-5xl mx-auto space-y-8">
        {/* Efeito de Luz Centralizado de Fundo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-blue-300 relative z-10">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          O Futuro da Gestão Imobiliária
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white relative z-10">
          Feche mais negócios. <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-200 to-white">
            Mova-se mais rápido.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed relative z-10">
          O ecossistema de CRM premium desenvolvido exclusivamente para imobiliárias e incorporadoras modernas que exigem inteligência, velocidade e alta performance.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link to="/signup" className="h-12 px-8 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 group">
            Começar Agora 
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#recursos" className="h-12 px-8 rounded-xl font-semibold border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center text-slate-300 hover:text-white">
            Conhecer os recursos
          </a>
        </div>

        {/* Mockup Simulado da Plataforma */}
        <div className="pt-12 relative z-10">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/40 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="rounded-[16px] overflow-hidden bg-slate-950 aspect-[16/9] border border-white/5 flex items-center justify-center text-slate-600 relative">
              <Layers className="absolute opacity-5 h-32 w-32 animate-pulse" />
              <div className="z-10 text-center space-y-2 px-4">
                <p className="text-slate-400 font-medium text-sm sm:text-base">Painel de Controle Moviio — Dashboard Interativo</p>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">Visualização analítica protegida. Cadastre-se para acessar dados em tempo real da sua imobiliária.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Logos de Empresas / Prova Social Passiva */}
      <section className="border-y border-white/5 bg-slate-900/30 py-10 text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Apoiando as maiores marcas e imobiliárias do mercado nacional
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale pt-2 px-6">
          <div className="flex items-center gap-2 font-bold text-lg"><Building2 className="h-5 w-5" /> VERTICAL CO.</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Layers className="h-5 w-5" /> PRIME LAB</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Target className="h-5 w-5" /> NEXUS REALTY</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Building2 className="h-5 w-5" /> APEX ESTATE</div>
        </div>
      </section>

      {/* 4. Features Grid */}
      <section id="recursos" className="px-6 py-20 lg:px-16 max-w-6xl mx-auto space-y-16">
        <div className="text-center md:text-left space-y-3 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Tudo o que você precisa para dominar o seu ecossistema imobiliário
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Elimine planilhas complexas e softwares legados fragmentados. Centralize sua jornada do lead ao contrato assinado.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-white/10 transition-colors space-y-4 group">
                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 5. Metrics Section */}
      <section id="metricas" className="bg-slate-900/20 border-y border-white/5 px-6 py-16 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl sm:text-5xl font-black tracking-tight text-white">{stat.value}</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Security CTA Section */}
      <section id="seguranca" className="px-6 py-20 lg:px-16 max-w-5xl mx-auto relative text-center">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="rounded-[36px] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-8 sm:p-12 lg:p-16 space-y-8 relative z-10 overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
              Pronto para transformar a produtividade da sua equipe?
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Leve menos de 2 minutos para configurar o seu ambiente corporativo seguro. Comece a capturar leads com inteligência e performance hoje mesmo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="w-full sm:w-auto h-12 px-8 rounded-xl font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              Solicitar Acesso Premium
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-slate-500 pt-2">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            Infraestrutura corporativa — Homologação de Segurança SOC 2 Tipo II ativa.
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-600 px-6">
        <p>&copy; {new Date().getFullYear()} MOVIIO S.A. Todos os direitos reservados. Criptografia de ponta a ponta.</p>
      </footer>

    </div>
  )
}