import { useState } from 'react'
import { Card, Input, Select, Button } from '../components/ui'

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState('Imobiliária Vitória')
  const [timezone, setTimezone] = useState('America/Sao_Paulo')
  const [defaultCurrency, setDefaultCurrency] = useState('BRL')

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Configurações</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Administração da conta</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Ajuste as preferências do CRM e as configurações de equipe para seu escritório.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_0.8fr]">
        <Card title="Preferências gerais" description="Defina informações da empresa e opções de relatórios." className="space-y-6">
          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Nome da imobiliária</label>
              <Input value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Fuso horário</label>
                <Select value={timezone} onChange={(event) => setTimezone(event.target.value)}>
                  <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Moeda padrão</label>
                <Select value={defaultCurrency} onChange={(event) => setDefaultCurrency(event.target.value)}>
                  <option value="BRL">BRL</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </Select>
              </div>
            </div>
          </div>
          <Button variant="primary">Salvar alterações</Button>
        </Card>

        <Card title="Equipe e acesso" description="Gerencie usuários, permissões e integrações de conta." className="space-y-6">
          <div className="grid gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-900">Uso atual</p>
            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-3 rounded-3xl bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">12 membros ativos</p>
                  <p className="text-sm text-slate-500">Equipe com acesso ao CRM.</p>
                </div>
                <span className="rounded-3xl bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Plano Enterprise</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-3xl bg-white p-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">4 integrações ativas</p>
                  <p className="text-sm text-slate-500">WhatsApp, e-mail e calendário.</p>
                </div>
                <span className="rounded-3xl bg-success/10 px-3 py-1 text-xs font-semibold text-success">Online</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-[20px] border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">Gerenciar membros</h2>
            <p className="text-sm text-slate-600">Adicione ou altere o acesso dos corretores com permissões específicas.</p>
            <Button variant="outline" className="w-full border-slate-200 text-slate-900 hover:bg-slate-100">
              Ver equipe
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
