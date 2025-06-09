import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { ProducerList } from '../components/producer/ProducerList'
import type { Producer } from '../components/producer/ProducerList'

describe('ProducerList', () => {
  const mockProducers: Producer[] = [
    {
      id: '1',
      name: 'João da Silva',
      document_type: 'CPF' as const,
      document: '12345678900',
    },
    {
      id: '2',
      name: 'Maria LTDA',
      document_type: 'CNPJ' as const,
      document: '12345678000199',
    },
  ]

  const onEdit = jest.fn()
  const onDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders empty state when there are no producers', () => {
    render(<ProducerList producers={[]} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText('Nenhum produtor cadastrado.')).toBeInTheDocument()
  })

  it('renders list of producers', () => {
    render(<ProducerList producers={mockProducers} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText('João da Silva')).toBeInTheDocument()
    expect(screen.getByText('Maria LTDA')).toBeInTheDocument()
    expect(screen.getAllByText('Editar')).toHaveLength(2)
    expect(screen.getAllByText('Excluir')).toHaveLength(2)
  })

  it('calls onEdit when clicking "Editar"', () => {
    render(<ProducerList producers={mockProducers} onEdit={onEdit} onDelete={onDelete} />)

    const editButtons = screen.getAllByText('Editar')
    fireEvent.click(editButtons[0])

    expect(onEdit).toHaveBeenCalledWith(mockProducers[0])
  })

  it('calls onDelete when clicking "Excluir"', () => {
    render(<ProducerList producers={mockProducers} onEdit={onEdit} onDelete={onDelete} />)

    const deleteButtons = screen.getAllByText('Excluir')
    fireEvent.click(deleteButtons[1])

    expect(onDelete).toHaveBeenCalledWith(mockProducers[1])
  })
})
