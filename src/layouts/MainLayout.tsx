import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/main/Sidebar'

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: #f5f7fa;
`

export const MainLayout = () => {
    return (
      <Container>
        <Sidebar />
        <Content>
          <Main>
            <Outlet />
          </Main>
        </Content>
      </Container>
    )
  }
