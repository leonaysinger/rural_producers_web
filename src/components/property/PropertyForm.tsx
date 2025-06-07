import { useState, type ChangeEvent, type FormEvent } from 'react'
import { FormField } from '../../styles/components/FormField'
import { PrimaryButton, SecondaryButton, DangerButton } from '../../styles/components/Button'
import { SelectField } from '../../styles/components/Select'
import { StyledTitle } from '../../styles/components/StyledTitle'
import { FormGrid } from '../../styles/components/FormGrid'

interface PropertyFormProps {
    initial?: {
        name: string
        producer_id: string
        city: string
        state: string
        cep?: string
        number?: string
        description?: string
        total_area: number
        farming_area: number
        vegetation_area: number
        crops: {
            season_id: string
            crop_id: string
        }[]
    }
    producers: { id: string; name: string }[]
    seasons: { id: string; name: string; year: number }[]
    crops: { id: string; name: string }[]
    onSubmit: (data: Omit<PropertyFormProps['initial'], 'id'>) => void
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
    const [form, setForm] = useState<PropertyFormProps['initial']>({
        name: initial?.name || '',
        producer_id: initial?.producer_id || '',
        city: initial?.city || '',
        state: initial?.state || '',
        cep: initial?.cep || '',
        number: initial?.number || '',
        description: initial?.description || '',
        total_area: initial?.total_area || 0,
        farming_area: initial?.farming_area || 0,
        vegetation_area: initial?.vegetation_area || 0,
        crops: initial?.crops || []
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCropChange = (index: number, field: 'season_id' | 'crop_id', value: string) => {
        const updated = [...form.crops]
        updated[index] = { ...updated[index], [field]: value }
        setForm({ ...form, crops: updated })
    }

    const addCropPair = () => {
        setForm({ ...form, crops: [...form.crops, { season_id: '', crop_id: '' }] })
    }

    const removeCropPair = (index: number) => {
        const updated = [...form.crops]
        updated.splice(index, 1)
        setForm({ ...form, crops: updated })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (form) onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit}>
            <StyledTitle>{initial ? 'Editar' : 'Nova'} Propriedade</StyledTitle>

            <FormGrid>
                <FormField
                    name="name"
                    placeholder="Nome da propriedade"
                    value={form.name}
                    onChange={handleChange}
                />

                <SelectField name="producer_id" value={form.producer_id} onChange={handleChange}>
                    <option value="">Selecione o produtor</option>
                    {producers.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </SelectField>

                <FormField name="city" placeholder="Cidade" value={form.city} onChange={handleChange} />
                <FormField name="state" placeholder="UF" value={form.state} maxLength={2} onChange={handleChange} />
                <FormField name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
                <FormField name="number" placeholder="Número" value={form.number} onChange={handleChange} />
                <FormField name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
                <FormField
                    name="total_area"
                    placeholder="Área total (ha)"
                    type="number"
                    value={form.total_area.toString()}
                    onChange={handleChange}
                />
                <FormField
                    name="farming_area"
                    placeholder="Área cultivável (ha)"
                    type="number"
                    value={form.farming_area.toString()}
                    onChange={handleChange}
                />
                <FormField
                    name="vegetation_area"
                    placeholder="Área de vegetação (ha)"
                    type="number"
                    value={form.vegetation_area.toString()}
                    onChange={handleChange}
                />
            </FormGrid>

            <div>
                <StyledTitle>Culturas por Safra</StyledTitle>
                {form.crops.map((pc, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '0.75rem',
                        alignItems: 'center'
                    }}>
                        <SelectField
                            value={pc.season_id}
                            onChange={(e) => handleCropChange(index, 'season_id', e.target.value)}
                        >
                            <option value="">Safra</option>
                            {seasons.map(s => (
                                <option key={s.id} value={s.id}>{s.name} ({s.year})</option>
                            ))}
                        </SelectField>

                        <SelectField
                            value={pc.crop_id}
                            onChange={(e) => handleCropChange(index, 'crop_id', e.target.value)}
                        >
                            <option value="">Cultura</option>
                            {crops.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </SelectField>

                        <DangerButton
                            type="button"
                            onClick={() => removeCropPair(index)}
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

                <PrimaryButton type="button" onClick={addCropPair}>
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
