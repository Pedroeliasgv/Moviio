import { supabase } from './supabase'
import type { Lead, LeadStatus } from '../lib/types'

export async function fetchLeads(userId: string, search = '', status?: LeadStatus) {
  let query = supabase.from('leads').select('*') as any
  query = query.eq('user_id', userId)

  if (status) {
    query = query.eq('status', status)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`).or(`email.ilike.%${search}%,phone.ilike.%${search}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })
  return { data: data ?? [], error }
}

export async function upsertLead(lead: Partial<Lead> & { user_id: string }) {
  const { data, error } = await (supabase.from('leads').upsert(lead).select().single() as any)
  return { data, error }
}

export async function deleteLead(leadId: string) {
  const { error } = await supabase.from('leads').delete().eq('id', leadId)
  return { error }
}

export async function fetchLeadHistory(leadId: string) {
  const { data, error } = await supabase.from('lead_history').select('*').eq('lead_id', leadId).order('created_at', { ascending: false })
  return { data: data ?? [], error }
}
