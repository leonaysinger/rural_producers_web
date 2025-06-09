import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { hydrate, login } from './features/user/userSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const name = localStorage.getItem('name')
    const loggedIn = localStorage.getItem('loggedIn')

    if (token && name && loggedIn === 'true') {
      dispatch(login({ name, access_token: token, refresh_token: '' }))
    }
    dispatch(hydrate())
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
