import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Briefcase, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Badge, Card } from '../components/ui'

const initialColumns = [
  {
    id: 'novo',
    title: 'Novo Lead',
    description: 'Potenciais contatos que ainda não foram abordados.',
    items: [
      { id: 'KAN-001', title: 'Bruno Alves', subtitle: 'Sala comercial', owner: 'Marina' },
      { id: 'KAN-002', title: 'Sofia Monteiro', subtitle: 'Apartamento 2Q', owner: 'Pedro' },
    ],
  },
  {
    id: 'contato',
    title: 'Contato',
    description: 'Leads em conversas e qualificação de necessidades.',
    items: [
      { id: 'KAN-003', title: 'Mariana Silva', subtitle: 'Loft Premium', owner: 'Thiago' },
      { id: 'KAN-004', title: 'Júlia Fernandes', subtitle: 'Casa de condomínio', owner: 'Bianca' },
    ],
  },
  {
    id: 'visita',
    title: 'Visita',
    description: 'Agendados para visita ou apresentação de imóvel.',
    items: [
      { id: 'KAN-005', title: 'Carlos Souza', subtitle: 'Casa Granja Viana', owner: 'Lucas' },
    ],
  },
  {
    id: 'proposta',
    title: 'Proposta',
    description: 'Negócios com proposta enviada e em negociação.',
    items: [
      { id: 'KAN-006', title: 'Fernanda Lima', subtitle: 'Cobertura Ipanema', owner: 'Camila' },
    ],
  },
  {
    id: 'fechado',
    title: 'Fechado',
    description: 'Oportunidades convertidas em contrato assinado.',
    items: [
      { id: 'KAN-007', title: 'Ricardo Nunes', subtitle: 'Apartamento Central Park', owner: 'Rafaela' },
    ],
  },
]

const badgeVariant: Record<string, 'primary' | 'muted' | 'warning' | 'success' | 'danger'> = {
  novo: 'primary',
  contato: 'muted',
  visita: 'warning',
  proposta: 'primary',
  fechado: 'success',
}

function SortableCard({ item }: { item: { id: string; title: string; subtitle: string; owner: string } }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <button
      type="button"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`w-full rounded-[20px] border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-300 ${
        isDragging ? 'opacity-80 shadow-lg' : 'opacity-100'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{item.title}</p>
          <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
        </div>
        <Badge variant="muted">{item.owner}</Badge>
      </div>
    </button>
  )
}

export default function KanbanPage() {
  const [columns, setColumns] = useState(initialColumns)
  const sensors = useSensors(useSensor(PointerSensor))

  function findColumn(itemId: string) {
    return columns.find((column) => column.items.some((task) => task.id === itemId))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const sourceColumn = findColumn(active.id as string)
    const targetColumn = findColumn(over.id as string)
    if (!sourceColumn || !targetColumn) return

    const activeItem = sourceColumn.items.find((task) => task.id === active.id)
    if (!activeItem) return

    if (sourceColumn.id === targetColumn.id) return

    setColumns((current) =>
      current.map((column) => {
        if (column.id === sourceColumn.id) {
          return { ...column, items: column.items.filter((task) => task.id !== active.id) }
        }
        if (column.id === targetColumn.id) {
          return { ...column, items: [...column.items, activeItem] }
        }
        return column
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-panel">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Kanban</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Pipeline de oportunidades</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          Controle visual dos leads em cada etapa, com movimentação intuitiva por drag-and-drop.
        </p>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 xl:grid-cols-5">
          {columns.map((column) => (
            <div key={column.id} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-panel">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-950">{column.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{column.items.length} itens</p>
                </div>
                <Badge variant={badgeVariant[column.id]}>{column.items.length}</Badge>
              </div>
              <p className="mb-4 text-xs leading-5 text-slate-500">{column.description}</p>
              <SortableContext items={column.items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                <div className="space-y-3">
                  {column.items.map((item) => (
                    <SortableCard key={item.id} item={item} />
                  ))}
                </div>
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      <Card title="Destaques da semana" description="Leads que merecem acompanhamento prioritário." className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-3 text-slate-500">
            <Sparkles className="h-5 w-5" />
            <p className="text-sm font-semibold text-slate-900">Mais ativo</p>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-900">Mariana Silva</p>
          <p className="mt-2 text-sm text-slate-600">Foco em fechamento de proposta de cobertura.</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-panel">
          <div className="flex items-center gap-3 text-slate-500">
            <Briefcase className="h-5 w-5" />
            <p className="text-sm font-semibold text-slate-900">Maior oportunidade</p>
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-900">Proposta para Ipanema</p>
          <p className="mt-2 text-sm text-slate-600">Valor de R$ 4.100.000 previsto para fechamento.</p>
        </div>
      </Card>
    </div>
  )
}
