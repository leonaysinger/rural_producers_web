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
import { deleteSeason, getSeasons, postSeason, updateSeason } from '../../api/season'
import { StyledTitle } from '../../styles/components/StyledTitle'

interface Season {
  id: string
  name: string
  year: number
}

const SeasonList = ({
  seasons,
  onEdit,
  onDelete
}: {
  seasons: Season[]
  onEdit: (s: Season) => void
  onDelete: (s: Season) => void
}) => {
  if (seasons.length === 0) {
    return <p style={{ color: '#4a5568', marginTop: '1rem' }}>Nenhuma safra cadastrada.</p>
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Ano</Th>
          <Th>Ações</Th>
        </tr>
      </thead>
      <tbody>
        {seasons.map((s) => (
          <tr key={s.id}>
            <Td>{s.name}</Td>
            <Td>{s.year}</Td>
            <Td>
              <PrimaryButton onClick={() => onEdit(s)}>Editar</PrimaryButton>
              <DangerButton onClick={() => onDelete(s)} style={{ marginLeft: '0.5rem' }}>
                Excluir
              </DangerButton>
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const SeasonForm = ({
  onCancel,
  onSubmit,
  initial
}: {
  onCancel: () => void
  onSubmit: (data: Omit<Season, 'id'>) => void
  initial?: Season
}) => {
  const [form, setForm] = useState<Omit<Season, 'id'>>({
    name: initial?.name || '',
    year: initial?.year || new Date().getFullYear()
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.name === 'year' ? parseInt(e.target.value) : e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div>
      <StyledTitle>{initial ? 'Editar Safra' : 'Nova Safra'}</StyledTitle>
      <form onSubmit={handleSubmit}>
        <FormField
          name="name"
          placeholder="Nome da safra"
          value={form.name}
          onChange={handleChange}
        />
        <FormField
          name="year"
          type="number"
          placeholder="Ano"
          value={form.year.toString()}
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

export const Seasons = () => {
  const user = useAppSelector((state) => state.user)
  const [seasons, setSeasons] = useState<Season[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Season | null>(null)
  const [toDelete, setToDelete] = useState<Season | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const result = await getSeasons()
        setSeasons(result)
      } catch {
        setToast({ message: 'Erro ao carregar safras', type: 'error' })
      }
    }

    fetchSeasons()
  }, [])

  const handleSubmit = async (data: Omit<Season, 'id'>) => {
    try {
      if (editing) {
        const updated = await updateSeason(editing.id, data)
        setSeasons((prev) => prev.map((s) => (s.id === editing.id ? updated : s)))
        setToast({ message: 'Safra atualizada com sucesso!', type: 'success' })
      } else {
        const created = await postSeason(data)
        setSeasons((prev) => [...prev, created])
        setToast({ message: 'Safra cadastrada com sucesso!', type: 'success' })
      }
    } catch {
      setToast({ message: 'Erro ao salvar safra', type: 'error' })
    } finally {
      setShowForm(false)
      setEditing(null)
    }
  }

  const confirmDelete = async () => {
    if (toDelete) {
      try {
        await deleteSeason(toDelete.id)
        setSeasons((prev) => prev.filter((s) => s.id !== toDelete.id))
        setToast({ message: 'Safra excluída com sucesso', type: 'success' })
      } catch {
        setToast({ message: 'Erro ao excluir safra', type: 'error' })
      } finally {
        setToDelete(null)
      }
    }
  }

  return (
    <Container>
      <Title>Safras</Title>
      {showForm ? (
        <SeasonForm
          initial={editing || undefined}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false)
            setEditing(null)
          }}
        />
      ) : (
        <>
          <PrimaryButton onClick={() => setShowForm(true)}>+ Nova Safra</PrimaryButton>
          <SeasonList seasons={seasons} onEdit={(s) => { setShowForm(true); setEditing(s) }} onDelete={setToDelete} />
        </>
      )}

      {toDelete && (
        <ModalOverlay>
          <ModalContent>
            <StyledTitle>Deseja excluir {toDelete.name}?</StyledTitle>
            <DangerButton onClick={confirmDelete}>Sim, excluir</DangerButton>
            <SecondaryButton onClick={() => setToDelete(null)} style={{ marginLeft: '0.5rem'}}>
              Cancelar
            </SecondaryButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Container>
  )
}
