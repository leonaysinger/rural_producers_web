import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../features/user/userSlice'
import { useAppDispatch } from '../../app/hooks'

const Container = styled.div`
  width: 220px;
  background: #2d3748;
  color: white;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NavGroup = styled.div``

const Item = styled(NavLink)`
  display: block;
  color: white;
  padding: 12px;
  border-radius: 6px;
  text-decoration: none;
  margin-bottom: 10px;

  &.active, &:hover {
    background: #4a5568;
  }
`

const LogoutButton = styled.button`
  margin-top: auto;
  background: #e53e3e;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #c53030;
  }
`

export const Sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout()) 
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return (
    <Container>
      <NavGroup>
        <Item to="/home">Home</Item>
        <Item to="/producers">Produtores</Item>
        <Item to="/properties">Propriedades</Item>
        <Item to="/crops">Culturas</Item>
        <Item to="/seasons">Safras</Item>
        <Item to="/dashboard">Dashboard</Item>
      </NavGroup>

      <LogoutButton onClick={handleLogout}>
        Sair
      </LogoutButton>
    </Container>
  )
}
