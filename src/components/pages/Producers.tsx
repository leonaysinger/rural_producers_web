import { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import {
  Container, Title, ModalOverlay, ModalContent
} from '../../styles/components/Layout'
import {
  PrimaryButton, SecondaryButton, DangerButton
} from '../../styles/components/Button'
import { Toast } from '../../styles/components/ui/Toast'
import { getProducers, deleteProducer, postProducers, updateProducer } from '../../api/producer'
import { FormSchema, ProducerForm } from '../producer/ProducerForm'
import { ProducerList } from '../producer/ProducerList'

interface Producer extends Omit<FormSchema, 'document_type'> {
    id: number
    document_type: "CPF" | "CNPJ"
}

export const Producers = () => {
  const user = useAppSelector(state => state.user)
  const [producers, setProducers] = useState<Producer[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Producer | null>(null)
  const [toDelete, setToDelete] = useState<Producer | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducers = async () => {
      try {
        const result = await getProducers()
        setProducers(result.map(p => ({ ...p, id: Number(p.id), document_type: p.document_type as "CPF" | "CNPJ" })))
      } catch {
        setToast({ message: 'Erro ao carregar produtores', type: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchProducers()
  }, [])

  const handleSubmit = async (data: Omit<Producer, 'id'>) => {
    try {
      if (editing) {
        setProducers(prev => prev.map(p => (p.id === editing.id ? { ...p, ...data } : p)))
        await updateProducer(editing.id, data)
        setToast({ message: 'Produtor atualizado com sucesso!', type: 'success' })
      } else {
        const newProducer = await postProducers(data)
        setProducers(prev => [...prev, { ...newProducer, id: Number(newProducer.id), document_type: newProducer.document_type as "CPF" | "CNPJ" }])
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
    if (!toDelete) return
    try {
      await deleteProducer(toDelete.id)
      setProducers(prev => prev.filter(p => p.id !== toDelete.id))
      setToast({ message: 'Produtor excluído com sucesso', type: 'success' })
    } catch {
      setToast({ message: 'Erro ao excluir produtor', type: 'error' })
    } finally {
      setToDelete(null)
    }
  }

  return (
    <Container>
      <Title>Produtores</Title>

      {showForm ? (
        <ProducerForm
          onCancel={() => { setShowForm(false); setEditing(null) }}
          onSubmit={handleSubmit}
          initial={editing || undefined}
        />
      ) : (
        <>
          <PrimaryButton onClick={() => setShowForm(true)}>+ Novo Produtor</PrimaryButton>
          {loading
            ? <p>Carregando...</p>
            : <ProducerList
                producers={producers}
                onEdit={(p) => { setEditing(p); setShowForm(true) }}
                onDelete={setToDelete}
              />
          }
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
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </Container>
  )
}
