import { motion } from 'framer-motion'
import { Users, Wallet, Star, UserCheck } from 'lucide-react'
import { Badge, Button, Card, Table } from '../components/ui'
import { clients } from '../lib/mockData'

const statusVariant: Record<string, 'primary' | 'muted' | 'warning' | 'success' | 'danger'> = {
  Ativo: 'success',
  Inativo: 'muted',
  VIP: 'primary',
}

export default function ClientsPage() {
  const totalClients = clients.length
  const vipClients = clients.filter((client) => client.status === 'VIP').length
  const activeClients = clients.filter((client) => client.status === 'Ativo').length

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Clientes</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Gestão de carteira</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Controle de clientes, relacionamentos e oportunidades com visual focado em imóveis premium.
            </p>
          </div>
          <Button variant="primary">Adicionar cliente</Button>
        </div>
      </div>

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card className="space-y-4 border-transparent bg-slate-950 text-white">
            <div className="flex items-center gap-3 text-slate-200">
              <Users className="h-5 w-5 text-sky-300" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Carteira</p>
            </div>
            <p className="text-3xl font-semibold">{totalClients}</p>
            <p className="text-sm text-slate-300">Clientes ativos e oportunidades cadastradas</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Card className="space-y-4 border-transparent bg-white">
            <div className="flex items-center gap-3 text-slate-500">
              <Star className="h-5 w-5 text-amber-500" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">VIP</p>
            </div>
            <p className="text-3xl font-semibold text-slate-950">{vipClients}</p>
            <Badge variant="primary">Relacionamento prioritário</Badge>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Card className="space-y-4 border-transparent bg-white">
            <div className="flex items-center gap-3 text-slate-500">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Ativos</p>
            </div>
            <p className="text-3xl font-semibold text-slate-950">{activeClients}</p>
            <p className="text-sm text-slate-500">Clientes com acompanhamento atualizado</p>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="space-y-4 border-transparent bg-white">
            <div className="flex items-center gap-3 text-slate-500">
              <Wallet className="h-5 w-5 text-slate-900" />
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Valor médio</p>
            </div>
            <p className="text-3xl font-semibold text-slate-950">R$ 2,1 mi</p>
            <p className="text-sm text-slate-500">Ticket médio por cliente VIP</p>
          </Card>
        </motion.div>
      </section>

      <Card title="Principais clientes" description="Lista com histórico de contato e estágio atual.">
        <div className="overflow-x-auto">
          <Table>
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Empresa</th>
                <th className="px-6 py-4">Telefone</th>
                <th className="px-6 py-4">Último contato</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{client.name}</td>
                  <td className="px-6 py-4 text-slate-600">{client.company}</td>
                  <td className="px-6 py-4 text-slate-600">{client.phone}</td>
                  <td className="px-6 py-4 text-slate-600">{client.last_contacted}</td>
                  <td className="px-6 py-4">
                    <Badge variant={statusVariant[client.status] ?? 'muted'}>{client.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
