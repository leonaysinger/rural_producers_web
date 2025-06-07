import styled from 'styled-components'
import { useAppSelector } from '../../app/hooks'

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f5f7fa;
  min-height: 100vh;
`

const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
`

const Summary = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 200px;
`

const CardTitle = styled.p`
  font-weight: bold;
  color: #4a5568;
`

const CardValue = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-top: 0.5rem;
`

export const Home = () => {
  const user = useAppSelector(state => state.user)

  const total = 128
  const ativos = 112
  const inativos = 16

  return (
    <Container>
      <Title>Bem-vindo, {user.name || 'usuário'}!</Title>
      <Summary>
        <Card>
          <CardTitle>Total de produtores</CardTitle>
          <CardValue>{total}</CardValue>
        </Card>
        <Card>
          <CardTitle>Ativos</CardTitle>
          <CardValue>{ativos}</CardValue>
        </Card>
        <Card>
          <CardTitle>Inativos</CardTitle>
          <CardValue>{inativos}</CardValue>
        </Card>
      </Summary>
    </Container>
  )
}
