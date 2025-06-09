import { useEffect, useState } from 'react'
import {
  Container, Title, ModalOverlay, ModalContent
} from '../../styles/components/Layout'
import {
  PrimaryButton, SecondaryButton, DangerButton
} from '../../styles/components/Button'
import { Toast } from '../../styles/components/ui/Toast'
import { getProducers } from '../../api/producer'
import { getSeasons } from '../../api/season'
import { getCrops } from '../../api/crop'
import { deleteProperty, getProperties, postProperty, PropertyResponse, updateProperty } from '../../api/property'
import { PropertyForm } from '../property/PropertyForm'
import { PropertyList } from '../property/PropertyList'
import { StyledTitle } from '../../styles/components/StyledTitle'

interface Property {
  id: string
  name: string
  producer_id: string
  property_crops: {
    season_id: string
    crop_ids: string[]
  }[]
}

interface Producer { id: string; name: string }
interface Season { id: string; name: string; year: number }
interface Crop { id: string; name: string }

export const Properties = () => {
  const [properties, setProperties] = useState<PropertyResponse[]>([])
  const [producers, setProducers] = useState<Producer[]>([])
  const [seasons, setSeasons] = useState<Season[]>([])
  const [crops, setCrops] = useState<Crop[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Property | null>(null)
  const [toDelete, setToDelete] = useState<Property | null>(null)
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [props, prods, seas, crs] = await Promise.all([
          getProperties(), getProducers(), getSeasons(), getCrops()
        ])
        setProperties(props)
        setProducers(prods)
        setSeasons(seas)
        setCrops(crs)
      } catch (e){
        console.log('eee: ', e)
        setToast({ message: 'Erro ao carregar dados', type: 'error' })
      }
    }
    fetchAll()
  }, [])

  const handleSubmit = async (data: any) => {
    try {
      if (editing) {
        const updated = await updateProperty(editing.id, data)
        setProperties(prev => prev.map(p => p.id === editing.id ? updated : p))
        setToast({ message: 'Propriedade atualizada com sucesso!', type: 'success' })
      } else {
        const created = await postProperty(data)
        setProperties(prev => [...prev, created])
        setToast({ message: 'Propriedade cadastrada com sucesso!', type: 'success' })
      }
    } catch {
      setToast({ message: 'Erro ao salvar propriedade', type: 'error' })
    } finally {
      setShowForm(false)
      setEditing(null)
    }
  }

  const confirmDelete = async () => {
    if (toDelete) {
      try {
        await deleteProperty(toDelete.id)
        setProperties(prev => prev.filter(p => p.id !== toDelete.id))
        setToast({ message: 'Propriedade excluída', type: 'success' })
      } catch {
        setToast({ message: 'Erro ao excluir', type: 'error' })
      } finally {
        setToDelete(null)
      }
    }
  }

  return (
    <Container>
      <Title>Propriedades</Title>
      {showForm ? (
        <PropertyForm
          producers={producers}
          seasons={seasons}
          crops={crops}
          onCancel={() => { setShowForm(false); setEditing(null) }}
          onSubmit={handleSubmit}
          initial={editing || undefined}
        />
      ) : (
        <>
          <PrimaryButton onClick={() => setShowForm(true)}>+ Nova Propriedade</PrimaryButton>
          <PropertyList
            properties={properties}
            onEdit={(p) => { setEditing(p); setShowForm(true) }}
            onDelete={(p) => setToDelete(p)}
          />
        </>
      )}

      {toDelete && (
        <ModalOverlay>
          <ModalContent>
            <StyledTitle>Deseja excluir {toDelete.name}?</StyledTitle>
            <DangerButton onClick={confirmDelete}>Sim</DangerButton>
            <SecondaryButton onClick={() => setToDelete(null)} style={{ marginLeft: '0.5rem'}}>Cancelar</SecondaryButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </Container>
  )
}
