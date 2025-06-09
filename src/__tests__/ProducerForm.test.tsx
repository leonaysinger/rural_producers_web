import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { FormSchema, ProducerForm } from '../components/producer/ProducerForm'

jest.mock('../utils/baseUrl', () => ({
    getBaseUrl: () => 'http://localhost:3000',
  }))

jest.mock('react-imask', () => ({
  IMaskInput: jest.fn(({ onAccept, ...props }) => (
    <input
      {...props}
      onChange={(e) => {
        props.onChange?.(e)
        onAccept?.(e.target.value)
      }}
    />
  )),
}))

describe('ProducerForm', () => {
  const onCancel = jest.fn()
  const onSubmit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form correctly', () => {
    render(<ProducerForm onCancel={onCancel} onSubmit={onSubmit} />)

    expect(screen.getByText('Novo Produtor')).toBeInTheDocument()
    expect(screen.getByText('Salvar')).toBeInTheDocument()
    expect(screen.getByText('Cancelar')).toBeInTheDocument()
  })

  it('shows validation errors on submit without filling fields', async () => {
    render(<ProducerForm onCancel={onCancel} onSubmit={onSubmit} />)

    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
      expect(screen.getByText('Tipo de documento é obrigatório')).toBeInTheDocument()
    })

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits with valid CPF data', async () => {
    render(<ProducerForm onCancel={onCancel} onSubmit={onSubmit} />)

    fireEvent.change(screen.getByPlaceholderText('Nome do produtor'), {
      target: { value: 'João' },
    })
    fireEvent.change(screen.getByDisplayValue('Selecione o tipo de documento'), {
      target: { value: 'CPF' },
    })
    fireEvent.change(screen.getByPlaceholderText('Documento'), {
      target: { value: '689.920.580-71' },
    })

    fireEvent.click(screen.getByText('Salvar'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'João',
        document_type: 'CPF',
        document: '68992058071',
      })
    })
  })

  it('calls onCancel when clicking "Cancelar"', () => {
    render(<ProducerForm onCancel={onCancel} onSubmit={onSubmit} />)

    fireEvent.click(screen.getByText('Cancelar'))

    expect(onCancel).toHaveBeenCalled()
  })

  it('renders initial values when passed', () => {
    const initial: FormSchema = {
      name: 'Maria',
      document_type: 'CNPJ',
      document: '12.345.678/0001-95',
    }

    render(<ProducerForm onCancel={onCancel} onSubmit={onSubmit} initial={initial} />)

    expect(screen.getByDisplayValue('Maria')).toBeInTheDocument()
    expect(screen.getByDisplayValue('CNPJ')).toBeInTheDocument()
    expect(screen.getByDisplayValue('12.345.678/0001-95')).toBeInTheDocument()
  })
})
