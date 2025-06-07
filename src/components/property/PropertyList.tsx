import { Table, Th, Td } from '../../styles/components/Table'
import { PrimaryButton, DangerButton } from '../../styles/components/Button'

interface Property {
  id: string
  name: string
  producer_id: string
  property_crops: {
    season_id: string
    crop_ids: string[]
  }[]
}

export const PropertyList = ({
  properties,
  onEdit,
  onDelete
}: {
  properties: Property[]
  onEdit: (p: Property) => void
  onDelete: (p: Property) => void
}) => {
  if (properties.length === 0) {
    return <p style={{ color: '#4a5568', marginTop: '1rem' }}>Nenhuma propriedade cadastrada.</p>
  }

  return (
    <Table>
      <thead>
        <tr>
          <Th>Nome</Th>
          <Th>Produtor</Th>
          <Th>Ações</Th>
        </tr>
      </thead>
      <tbody>
        {properties.map((p) => (
          <tr key={p.id}>
            <Td>{p.name}</Td>
            <Td>{p.producer_id}</Td>
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
