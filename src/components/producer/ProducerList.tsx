import { PrimaryButton, DangerButton } from '../../styles/components/Button'
import { Table, Th, Td } from '../../styles/components/Table'
import { FormSchema } from './ProducerForm'

interface Producer extends Omit<FormSchema, 'document_type'> {
  id: string
  document_type: "CPF" | "CNPJ"
}

interface Props {
  producers: Producer[]
  onEdit: (p: Producer) => void
  onDelete: (p: Producer) => void
}

export const ProducerList = ({ producers, onEdit, onDelete }: Props) => {
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
