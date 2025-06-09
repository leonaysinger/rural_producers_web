import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { useAppSelector } from '../app/hooks'
import { Login } from '../components/pages/Login'
import { Home } from '../components/pages/Home'
import { ProtectedRoute } from '../components/main/ProtectedRoute'
import { Producers } from '../components/pages/Producers'
import { Seasons } from '../components/pages/Seasons'
import { Crops } from '../components/pages/Crops'
import { Properties } from '../components/pages/Properties'
import { Dashboard } from '../components/pages/Dashboard'

export const AppRouter = () => {
  const { loggedIn, hydrated } = useAppSelector(state => state.user)
  const location = useLocation()

  if (!hydrated) {
    return null // ou <LoadingSpinner />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn
            ? <Navigate to="/home" replace />
            : <Login />
        }
      />

      <Route element={<MainLayout />}>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/producers" element={<ProtectedRoute><Producers /></ProtectedRoute>} />
        <Route path="/seasons" element={<ProtectedRoute><Seasons /></ProtectedRoute>} />
        <Route path="/crops" element={<ProtectedRoute><Crops /></ProtectedRoute>} />
        <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Route>

      <Route
        path="*"
        element={
          loggedIn
            ? <Navigate to={location.pathname} replace />
            : <Navigate to="/" replace />
        }
      />
    </Routes>
  )
}
