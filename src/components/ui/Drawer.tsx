import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function Drawer({ open, onClose, children }: DrawerProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button className="absolute inset-0 bg-slate-950/30" onClick={onClose} aria-label="Fechar menu" />
          <motion.div
            className="relative z-10 flex h-full w-[320px] flex-col overflow-y-auto rounded-r-[28px] bg-sidebar px-6 pb-8 pt-6 text-white shadow-soft"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Moviio</p>
                <h1 className="text-xl font-semibold">CRM</h1>
              </div>
              <button onClick={onClose} className="rounded-2xl bg-slate-900/80 p-2 text-slate-200 hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
