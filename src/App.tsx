import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useAuth } from './hooks/useAuth.tsx'
import AppLayout from './layouts/AppLayout.tsx'
import AuthLayout from './layouts/AuthLayout.tsx'
import LoadingState from './components/ui/LoadingState.tsx'

const DashboardPage = lazy(() => import('./pages/DashboardPage.tsx'))
const LeadsPage = lazy(() => import('./pages/LeadsPage.tsx'))
const KanbanPage = lazy(() => import('./pages/KanbanPage.tsx'))
const AgendaPage = lazy(() => import('./pages/AgendaPage.tsx'))
const PropertiesPage = lazy(() => import('./pages/PropertiesPage.tsx'))
const ClientsPage = lazy(() => import('./pages/ClientsPage.tsx'))
const ProposalsPage = lazy(() => import('./pages/ProposalsPage.tsx'))
const ReportsPage = lazy(() => import('./pages/ReportsPage.tsx'))
const SettingsPage = lazy(() => import('./pages/SettingsPage.tsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'))
const SignUpPage = lazy(() => import('./pages/SignUpPage.tsx'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage.tsx'))

function ProtectedRoutes() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-slate-700">
        <div className="rounded-3xl border border-border bg-white px-8 py-10 text-center shadow-soft">
          <p className="text-lg font-semibold">Carregando Moviio...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Suspense fallback={<LoadingState />}>
                <LoginPage />
              </Suspense>
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <Suspense fallback={<LoadingState />}>
                <SignUpPage />
              </Suspense>
            </AuthLayout>
          }
        />
        <Route
          path="/forgot"
          element={
            <AuthLayout>
              <Suspense fallback={<LoadingState />}>
                <ForgotPasswordPage />
              </Suspense>
            </AuthLayout>
          }
        />

        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Suspense fallback={<LoadingState />}><DashboardPage /></Suspense>} />
          <Route path="leads" element={<Suspense fallback={<LoadingState />}><LeadsPage /></Suspense>} />
          <Route path="pipeline" element={<Suspense fallback={<LoadingState />}><KanbanPage /></Suspense>} />
          <Route path="agenda" element={<Suspense fallback={<LoadingState />}><AgendaPage /></Suspense>} />
          <Route path="properties" element={<Suspense fallback={<LoadingState />}><PropertiesPage /></Suspense>} />
          <Route path="clients" element={<Suspense fallback={<LoadingState />}><ClientsPage /></Suspense>} />
          <Route path="proposals" element={<Suspense fallback={<LoadingState />}><ProposalsPage /></Suspense>} />
          <Route path="reports" element={<Suspense fallback={<LoadingState />}><ReportsPage /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<LoadingState />}><SettingsPage /></Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors={true} />
    </>
  )
}

export default App
