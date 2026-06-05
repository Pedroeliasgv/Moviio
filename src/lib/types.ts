export type LeadStatus = 'Novo' | 'Contato Feito' | 'Visita Marcada' | 'Proposta' | 'Fechado' | 'Perdido'
export type AppointmentStatus = 'Agendada' | 'Confirmada' | 'Realizada' | 'Cancelada'
export type PropertyStatus = 'Disponível' | 'Reservado' | 'Vendido'
export type ProposalStatus = 'Rascunho' | 'Enviada' | 'Aceita' | 'Recusada'

export interface Lead {
  id: string
  user_id: string
  name: string
  phone: string
  whatsapp: string
  email: string
  origin: string
  interest: string
  price_range: string
  notes: string
  status: LeadStatus
  created_at: string
}

export interface Property {
  id: string
  user_id: string
  title: string
  description: string
  type: string
  price: number
  address: string
  city: string
  bedrooms: number
  bathrooms: number
  parking_spots: number
  area: number
  photos: string[]
  status: PropertyStatus
  created_at: string
}

export interface Appointment {
  id: string
  user_id: string
  lead_id: string
  property_id: string
  date: string
  time: string
  note: string
  status: AppointmentStatus
  created_at: string
  lead_name?: string
  property_title?: string
}

export interface Proposal {
  id: string
  user_id: string
  lead_id: string
  property_id: string
  amount: number
  commission: number
  notes: string
  status: ProposalStatus
  created_at: string
  lead_name?: string
  property_title?: string
}

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'Ativo' | 'Inativo' | 'VIP'
  category?: 'Comprador' | 'Proprietário' | 'Investidor' | 'Locador' | 'Locatário'
  assigned_agent: string
  last_contacted: string
  notes: string
}

export interface MetricsSummary {
  total_leads: number
  new_leads: number
  visits_today: number
  proposals: number
  sales: number
  expected_commission: number
}
