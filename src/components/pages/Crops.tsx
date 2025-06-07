import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useAppSelector } from '../../app/hooks'
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
import { Toast } from '../../styles/components/ui/Toast'
import { getCrops, postCrop, updateCrop, deleteCrop } from '../../api/crop'

interface Crop {
  id: string
  name: string
}

const CropList = ({
  crops,
  onEdit,
  onDelete
}: {
  crops: Crop[]
  onEdit: (c: Crop) => void
  onDelete: (c: Crop) => void
}) => {
  if (crops.length === 0) {
    return <p style={{ color: '#4a5568', marginTop: '1rem' }}>Nenhuma cultura cadastrada.</p>
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Ações</Th>
        </tr>
      </thead>
      <tbody>
        {crops.map((c) => (
          <tr key={c.id}>
            <Td>{c.name}</Td>
            <Td>
              <PrimaryButton onClick={() => onEdit(c)}>Editar</PrimaryButton>
              <DangerButton onClick={() => onDelete(c)} style={{ marginLeft: '0.5rem' }}>
                Excluir
              </DangerButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const CropForm = ({
  onCancel,
  onSubmit,
  initial
}: {
  onCancel: () => void
  onSubmit: (data: Omit<Crop, 'id'>) => void
  initial?: Crop
}) => {
  const [form, setForm] = useState<Omit<Crop, 'id'>>({
    name: initial?.name || ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div>
      <h2>{initial ? 'Editar Cultura' : 'Nova Cultura'}</h2>
      <form onSubmit={handleSubmit}>
        <FormField
          name="name"
          placeholder="Nome da cultura"
          value={form.name}
          onChange={handleChange}
        />

        <PrimaryButton type="submit">Salvar</PrimaryButton>
        <SecondaryButton onClick={onCancel} type="button" style={{ marginLeft: '0.5rem' }}>
          Cancelar
        </SecondaryButton>
      </form>
    </div>
  )
}

export const Crops = () => {
  const user = useAppSelector((state) => state.user)
  const [crops, setCrops] = useState<Crop[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Crop | null>(null)
  const [toDelete, setToDelete] = useState<Crop | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const result = await getCrops()
        setCrops(result)
      } catch {
        setToast({ message: 'Erro ao carregar culturas', type: 'error' })
      }
    }

    fetchCrops()
  }, [])

  const handleSubmit = async (data: Omit<Crop, 'id'>) => {
    try {
      if (editing) {
        const updated = await updateCrop(editing.id, data)
        setCrops((prev) => prev.map((c) => (c.id === editing.id ? updated : c)))
        setToast({ message: 'Cultura atualizada com sucesso!', type: 'success' })
      } else {
        const created = await postCrop(data)
        setCrops((prev) => [...prev, created])
        setToast({ message: 'Cultura cadastrada com sucesso!', type: 'success' })
      }
    } catch {
      setToast({ message: 'Erro ao salvar cultura', type: 'error' })
    } finally {
      setShowForm(false)
      setEditing(null)
    }
  }

  const confirmDelete = async () => {
    if (toDelete) {
      try {
        await deleteCrop(toDelete.id)
        setCrops((prev) => prev.filter((c) => c.id !== toDelete.id))
        setToast({ message: 'Cultura excluída com sucesso', type: 'success' })
      } catch {
        setToast({ message: 'Erro ao excluir cultura', type: 'error' })
      } finally {
        setToDelete(null)
      }
    }
  }

  return (
    <Container>
      <Title>Culturas</Title>
      {showForm ? (
        <CropForm
          initial={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
        />
      ) : (
        <>
          <PrimaryButton onClick={() => setShowForm(true)}>+ Nova Cultura</PrimaryButton>
          <CropList crops={crops} onEdit={(c) => { setShowForm(true); setEditing(c) }} onDelete={setToDelete} />
        </>
      )}

      {toDelete && (
        <ModalOverlay>
          <ModalContent>
            <p>Deseja excluir {toDelete.name}?</p>
            <DangerButton onClick={confirmDelete}>Sim, excluir</DangerButton>
            <SecondaryButton onClick={() => setToDelete(null)} style={{ marginLeft: '0.5rem' }}>
              Cancelar
            </SecondaryButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Container>
  )
}
