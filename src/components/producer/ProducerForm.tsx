import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IMaskInput } from 'react-imask'

import { FormField } from '../../styles/components/FormField'
import { PrimaryButton, SecondaryButton } from '../../styles/components/Button'
import { StyledTitle } from '../../styles/components/StyledTitle'
import { SelectField } from '../../styles/components/Select'
import { ErrorText } from '../../styles/components/ErrorText'
import { isValidCPF, isValidCNPJ } from '../../utils/validators'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  document_type: z
    .string()
    .transform(val => (val === '' ? undefined : val))
    .refine(val => val === 'CPF' || val === 'CNPJ', {
      message: 'Tipo de documento é obrigatório'
    }),
  document: z.string().min(1, 'Documento é obrigatório')
}).superRefine((data, ctx) => {
  const raw = data.document.replace(/\D/g, '')
  if (data.document_type === 'CPF' && !isValidCPF(raw)) {
    ctx.addIssue({
      path: ['document'],
      code: z.ZodIssueCode.custom,
      message: 'CPF inválido'
    })
  }
  if (data.document_type === 'CNPJ' && !isValidCNPJ(raw)) {
    ctx.addIssue({
      path: ['document'],
      code: z.ZodIssueCode.custom,
      message: 'CNPJ inválido'
    })
  }
})

export type FormSchema = z.infer<typeof schema>

interface Props {
  onCancel: () => void
  onSubmit: (data: Omit<FormSchema, 'id'>) => void
  initial?: FormSchema
}

export const ProducerForm = ({ onCancel, onSubmit, initial }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      document_type: '',
      document: ''
    }
  })

  useEffect(() => {
    if (initial) {
      setValue('name', initial.name)
      setValue('document_type', initial.document_type)
      setValue('document', initial.document)
    }
  }, [initial, setValue])

  const document_type = watch('document_type')
  const documentMask = document_type === 'CPF'
    ? '000.000.000-00'
    : document_type === 'CNPJ'
    ? '00.000.000/0000-00'
    : ''

  return (
    <div>
      <StyledTitle>{initial ? 'Editar Produtor' : 'Novo Produtor'}</StyledTitle>
      <form onSubmit={handleSubmit(data => {
        const raw = data.document.replace(/\D/g, '')
        onSubmit({ ...data, document: raw })
      })}>
        <FormField placeholder="Nome do produtor" {...register('name')} />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}

        <SelectField {...register('document_type')}>
          <option value="">Selecione o tipo de documento</option>
          <option value="CPF">CPF</option>
          <option value="CNPJ">CNPJ</option>
        </SelectField>
        {errors.document_type && <ErrorText>{errors.document_type.message}</ErrorText>}

        {documentMask && (
          <>
            <IMaskInput
              mask={documentMask}
              {...register('document')}
              value={watch('document')}
              onAccept={(val: string) => setValue('document', val)}
              placeholder="Documento"
              unmask={false}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                marginBottom: '0.5rem',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
            {errors.document && <ErrorText>{errors.document.message}</ErrorText>}
          </>
        )}

        <PrimaryButton type="submit">Salvar</PrimaryButton>
        <SecondaryButton type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancelar
        </SecondaryButton>
      </form>
    </div>
  )
}
