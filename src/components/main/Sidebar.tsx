import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Container = styled.div`
  width: 220px;
  background: #2d3748;
  color: white;
  padding: 2rem 1rem;
`

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

export const Sidebar = () => (
  <Container>
    <Item to="/home">Home</Item>
    <Item to="/outra">Outra Página</Item>
  </Container>
)
