import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import type { JSX } from 'react'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useAppSelector(state => state.user.loggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}
