import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { login } from './features/user/userSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true'
    const name = localStorage.getItem('name') || ''
    if (isLoggedIn) {
      dispatch(login(name))
    }
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
