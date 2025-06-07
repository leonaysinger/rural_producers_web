import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getProducers, deleteProducer, postProducers } from '../../api/producer'
import {
  Container,
  Title,
  ModalOverlay,
  ModalContent
} from '../../styles/components/Layout'
import {
  PrimaryButton,
  SecondaryButton,
  DangerButton
} from '../../styles/components/Button'
import { Table, Th, Td } from '../../styles/components/Table'
import { FormField } from '../../styles/components/FormField'
import styled from 'styled-components'
import { isValidCPF, isValidCNPJ } from '../../utils/validators'
import { IMaskInput } from 'react-imask'
import { Toast } from '../../styles/components/ui/Toast'
import { StyledTitle } from '../../styles/components/StyledTitle'

interface Producer {
  id: number
  name: string
  document_type: string
  document: string
}

const SelectField = styled.select`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
`

const ProducerList = ({
  producers,
  onEdit,
  onDelete
}: {
  producers: Producer[]
  onEdit: (p: Producer) => void
  onDelete: (p: Producer) => void
}) => {
  if (producers.length === 0) {
    return <p style={{ color: '#4a5568', marginTop: '1rem' }}>Nenhum produtor cadastrado.</p>
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Tipo de Documento</Th>
          <Th>Documento</Th>
          <Th>Ações</Th>
        </tr>
      </thead>
      <tbody>
        {producers.map((p) => (
          <tr key={p.id}>
            <Td>{p.name}</Td>
            <Td>{p.document_type}</Td>
            <Td>{p.document}</Td>
            <Td>
              <PrimaryButton onClick={() => onEdit(p)}>Editar</PrimaryButton>
              <DangerButton onClick={() => onDelete(p)} style={{ marginLeft: '0.5rem' }}>
                Excluir
              </DangerButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const ProducerForm = ({ onCancel, onSubmit, initial }: {
  onCancel: () => void
  onSubmit: (data: Omit<Producer, 'id'>) => void
  initial?: Producer
}) => {
  const [form, setForm] = useState<Omit<Producer, 'id'>>({
    name: initial?.name || '',
    document_type: initial?.document_type || '',
    document: initial?.document || ''
  })
  const [error, setError] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const rawDocument = form.document.replace(/\D/g, '')
    if (form.document_type === 'CPF' && !isValidCPF(rawDocument)) {
      setError('CPF inválido')
      return
    }
    if (form.document_type === 'CNPJ' && !isValidCNPJ(rawDocument)) {
      setError('CNPJ inválido')
      return
    }

    onSubmit({ ...form, document: rawDocument })
  }

  const documentMask = form.document_type === 'CPF'
    ? '000.000.000-00'
    : form.document_type === 'CNPJ'
    ? '00.000.000/0000-00'
    : ''

  return (
    <div>
      <StyledTitle>{initial ? 'Editar Produtor' : 'Novo Produtor'}</StyledTitle>
      <form onSubmit={handleSubmit}>
        <FormField
          name="name"
          placeholder="Nome do produtor"
          value={form.name}
          onChange={handleChange}
        />

        <SelectField
          name="document_type"
          value={form.document_type}
          onChange={handleChange}
        >
          <option value="">Selecione o tipo de documento</option>
          <option value="CPF">CPF</option>
          <option value="CNPJ">CNPJ</option>
        </SelectField>

        {documentMask && (
          <IMaskInput
            mask={documentMask}
            name="document"
            value={form.document}
            onAccept={(value) => setForm({ ...form, document: value })}
            placeholder="Documento"
            unmask={false}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
        )}

        {error && <ErrorText>{error}</ErrorText>}

        <PrimaryButton type="submit">Salvar</PrimaryButton>
        <SecondaryButton type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancelar
        </SecondaryButton>
      </form>
    </div>
  )
}

export const Producers = () => {
  const user = useAppSelector(state => state.user)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Producer | null>(null)
  const [producers, setProducers] = useState<Producer[]>([])
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState<Producer | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const result = await getProducers()
        setProducers(result)
      } catch (err) {
        setToast({ message: 'Erro ao carregar produtores', type: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchProducers()
  }, [])

  const handleEdit = (producer: Producer) => {
    setEditing(producer)
    setShowForm(true)
  }

  const handleSubmit = async (data: Omit<Producer, 'id'>) => {
    try {
      if (editing) {
        setProducers(prev => prev.map(p => (p.id === editing.id ? { ...p, ...data } : p)))
        setToast({ message: 'Produtor atualizado com sucesso!', type: 'success' })
      } else {
        const newProducer = await postProducers(data)
        setProducers(prev => [...prev, newProducer])
        setToast({ message: 'Produtor cadastrado com sucesso!', type: 'success' })
      }
    } catch (err: any) {
      setToast({ message: err.message || 'Erro ao salvar produtor', type: 'error' })
    } finally {
      setShowForm(false)
      setEditing(null)
    }
  }

  const confirmDelete = async () => {
    if (toDelete) {
      try {
        await deleteProducer(toDelete.id)
        setProducers(prev => prev.filter(p => p.id !== toDelete.id))
        setToast({ message: 'Produtor excluído com sucesso', type: 'success' })
      } catch (err) {
        setToast({ message: 'Erro ao excluir produtor', type: 'error' })
      } finally {
        setToDelete(null)
      }
    }
  }

  return (
    <Container>
      <Title>Produtores</Title>
      {showForm ? (
        <ProducerForm
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSubmit={handleSubmit}
          initial={editing || undefined}
        />
      ) : (
        <>
          <PrimaryButton onClick={() => setShowForm(true)}>+ Novo Produtor</PrimaryButton>
          {loading ? <p>Carregando...</p> : <ProducerList producers={producers} onEdit={handleEdit} onDelete={setToDelete} />}
        </>
      )}

      {toDelete && (
        <ModalOverlay>
          <ModalContent>
            <p>Deseja realmente excluir {toDelete.name}?</p>
            <div style={{ marginTop: '1rem' }}>
              <DangerButton onClick={confirmDelete}>Sim, excluir</DangerButton>
              <SecondaryButton onClick={() => setToDelete(null)} style={{ marginLeft: '0.5rem' }}>
                Cancelar
              </SecondaryButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Container>
  )
}
