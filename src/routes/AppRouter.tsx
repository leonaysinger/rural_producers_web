import { Routes, Route, Navigate } from 'react-router-dom'
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
  const isLoggedIn = useAppSelector(state => state.user.loggedIn)

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace /> : <Login />} />

      <Route element={<MainLayout />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/producers"
          element={
            <ProtectedRoute>
              <Producers />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/seasons"
          element={
            <ProtectedRoute>
              <Seasons />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/crops"
          element={
            <ProtectedRoute>
              <Crops />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/properties"
          element={
            <ProtectedRoute>
              <Properties />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} replace />} />
    </Routes>
  )
}
