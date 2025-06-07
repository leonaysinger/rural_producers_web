import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { FormField } from '../../styles/components/FormField'
import { PrimaryButton, SecondaryButton, DangerButton } from '../../styles/components/Button'
import { SelectField } from '../../styles/components/Select'
import { StyledTitle } from '../../styles/components/StyledTitle'
import { FormGrid } from '../../styles/components/FormGrid'
import { ErrorText } from '../../styles/components/ErrorText'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  producer_id: z.string().min(1, 'Produtor é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().length(2, 'UF deve ter 2 letras'),
  cep: z.string().regex(/^\d*$/, 'CEP deve conter apenas números').optional(),
  number: z.string().optional(),
  description: z.string().optional(),
  total_area: z.coerce.number().min(0.01, 'Obrigatório'),
  farming_area: z.coerce.number().min(0.01, 'Obrigatório'),
  vegetation_area: z.coerce.number().min(0.01, 'Obrigatório'),
  crops: z.array(
    z.object({
      season_id: z.string().min(1, 'Safra obrigatória'),
      crop_id: z.string().min(1, 'Cultura obrigatória')
    })
  ).refine(crops => crops.every(c => c.season_id && c.crop_id), {
    message: 'Todos os pares de safra e cultura devem estar completos',
    path: ['crops']
  })
})

type FormSchema = z.infer<typeof schema>

interface PropertyFormProps {
  initial?: Partial<FormSchema> & { crops?: { season_id: string; crop_id: string }[] }
  producers: { id: string; name: string }[]
  seasons: { id: string; name: string; year: number }[]
  crops: { id: string; name: string }[]
  onSubmit: (data: FormSchema) => void
  onCancel: () => void
}

export const PropertyForm = ({
  initial,
  producers,
  seasons,
  crops,
  onSubmit,
  onCancel
}: PropertyFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      producer_id: '',
      city: '',
      state: '',
      cep: '',
      number: '',
      description: '',
      total_area: undefined,
      farming_area: undefined,
      vegetation_area: undefined,
      crops: []
    }
  })

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: 'crops'
  })

  useEffect(() => {
    if (initial) {
      const {
        name,
        producer_id,
        city,
        state,
        cep,
        number,
        description,
        total_area,
        farming_area,
        vegetation_area,
        crops: initialCrops
      } = initial

      reset({
        name,
        producer_id,
        city,
        state,
        cep,
        number,
        description,
        total_area: total_area ? Number(total_area) : undefined,
        farming_area: farming_area ? Number(farming_area) : undefined,
        vegetation_area: vegetation_area ? Number(vegetation_area) : undefined,
        crops: initialCrops || []
      })
      if (initialCrops) {
        replace(initialCrops)
      }
    }
  }, [initial, reset, replace])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledTitle>{initial ? 'Editar' : 'Nova'} Propriedade</StyledTitle>

      <FormGrid>
        <div>
          <FormField placeholder="Nome da propriedade" {...register('name')} />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </div>

        <div>
          <SelectField {...register('producer_id')}>
            <option value="">Selecione o produtor</option>
            {producers.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </SelectField>
          {errors.producer_id && <ErrorText>{errors.producer_id.message}</ErrorText>}
        </div>

        <div>
          <FormField placeholder="Cidade" {...register('city')} />
          {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
        </div>

        <div>
          <FormField placeholder="UF" maxLength={2} {...register('state')} />
          {errors.state && <ErrorText>{errors.state.message}</ErrorText>}
        </div>

        <div>
          <FormField placeholder="CEP" {...register('cep')} />
          {errors.cep && <ErrorText>{errors.cep.message}</ErrorText>}
        </div>

        <div>
          <FormField placeholder="Número" {...register('number')} />
          {errors.number && <ErrorText>{errors.number.message}</ErrorText>}
        </div>

        <div>
          <FormField placeholder="Descrição" {...register('description')} />
          {errors.description && <ErrorText>{errors.description.message}</ErrorText>}
        </div>

        <div>
          <FormField type="number" placeholder="Área total (ha)" {...register('total_area')} />
          {errors.total_area && <ErrorText>{errors.total_area.message}</ErrorText>}
        </div>

        <div>
          <FormField type="number" placeholder="Área cultivável (ha)" {...register('farming_area')} />
          {errors.farming_area && <ErrorText>{errors.farming_area.message}</ErrorText>}
        </div>

        <div>
          <FormField type="number" placeholder="Área de vegetação (ha)" {...register('vegetation_area')} />
          {errors.vegetation_area && <ErrorText>{errors.vegetation_area.message}</ErrorText>}
        </div>
      </FormGrid>

      <div style={{ marginTop: '2rem' }}>
        <StyledTitle>Culturas por Safra</StyledTitle>
        {fields.map((field, index) => (
          <div key={field.id} style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <SelectField {...register(`crops.${index}.season_id`)}>
                <option value="">Safra</option>
                {seasons.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.year})</option>
                ))}
              </SelectField>
              {errors.crops?.[index]?.season_id && (
                <ErrorText>{errors.crops[index]?.season_id?.message}</ErrorText>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <SelectField {...register(`crops.${index}.crop_id`)}>
                <option value="">Cultura</option>
                {crops.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </SelectField>
              {errors.crops?.[index]?.crop_id && (
                <ErrorText>{errors.crops[index]?.crop_id?.message}</ErrorText>
              )}
            </div>

            <DangerButton
              type="button"
              onClick={() => remove(index)}
              style={{
                height: '2.4rem',
                padding: '0.75rem',
                fontSize: '0.85rem',
                alignSelf: 'center',
              }}
            >
              Remover
            </DangerButton>
          </div>
        ))}

        {errors.crops && typeof errors.crops.message === 'string' && (
          <ErrorText>{errors.crops.message}</ErrorText>
        )}

        <PrimaryButton type="button" onClick={() => append({ season_id: '', crop_id: '' })}>
          + Adicionar Safra e Cultura
        </PrimaryButton>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <PrimaryButton type="submit">Salvar</PrimaryButton>
        <SecondaryButton type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancelar
        </SecondaryButton>
      </div>
    </form>
  )
}
