import type { ReactNode } from 'react'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Drawer from '../components/ui/Drawer'

export default function AppLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-slate-900">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar />
        <Drawer open={mobileNavOpen} onClose={() => setMobileNavOpen(false)}>
          <Sidebar isMobile onNavigate={() => setMobileNavOpen(false)} />
        </Drawer>

        <div className="flex flex-1 flex-col overflow-hidden">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 xl:px-10">
            <div className="w-full max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
