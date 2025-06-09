// src/__tests__/Producers.test.tsx
jest.mock('../api/producer')
jest.mock('../utils/baseUrl', () => ({
  getBaseUrl: () => 'http://localhost:3000', // mock base URL
}))
import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'
import * as api from '../api/producer'
import { store } from '../app/store'
import { Producers } from '../components/pages/Producers'
import { Provider } from 'react-redux'


const mockedProducers = [
  {
    id: 1,
    name: 'Produtor Teste',
    document_type: 'CPF',
    document: '12345678900'
  }
]

describe('Producers page', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('render producers list page', async () => {
    (api.getProducers as jest.Mock).mockResolvedValue(mockedProducers)

    render(
      <Provider store={store}>
        <Producers />
      </Provider>
    )

    expect(screen.getByText('Carregando...')).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('Produtor Teste')).toBeInTheDocument()
    })
  })

  it('open New producers form"', async () => {
    (api.getProducers as jest.Mock).mockResolvedValue([])

    render(
      <Provider store={store}>
        <Producers />
      </Provider>
    )

    fireEvent.click(screen.getByText('+ Novo Produtor'))

    expect(screen.getByText('Novo Produtor')).toBeInTheDocument()
  })

})
