import styled from 'styled-components'
import { useAppSelector } from '../../app/hooks'
import { Card, CardTitle, CardValue, Container, Summary } from '../../styles/components/Card'


const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
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
