import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { useAppSelector } from '../app/hooks'
import { Login } from '../components/pages/Login'
import { Home } from '../components/pages/Home'
import { ProtectedRoute } from '../components/main/ProtectedRoute'

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

      <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} replace />} />
    </Routes>
  )
}
