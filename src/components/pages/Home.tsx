import styled from 'styled-components'
import { useAppSelector } from '../../app/hooks'
import { Container } from '../../styles/components/Card'


const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
`

export const Home = () => {
  const user = useAppSelector(state => state.user)

  return (
    <Container>
      <Title>Bem-vindo, {user.name || 'usuário'}!</Title>
    </Container>
  )
}
