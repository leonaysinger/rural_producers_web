// src/api/property.ts

export interface PropertyCropPayload {
    season_id: string
    crop_ids: string[]
}

export interface PropertyPayload {
    name: string
    producer_id: string
    property_crops: PropertyCropPayload[]
}

export interface PropertyResponse extends PropertyPayload {
    id: string
}

export async function getProperties(): Promise<PropertyResponse[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/properties?with_relations=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao buscar propriedades')
    }

    return res.json()
}

export async function postProperty(data: PropertyPayload): Promise<PropertyResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/properties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao criar propriedade')
    }

    return res.json()
}

export async function updateProperty(id: string, data: PropertyPayload): Promise<PropertyResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/properties/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao atualizar propriedade')
    }

    return res.json()
}

export async function deleteProperty(id: string): Promise<void> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/properties/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao excluir propriedade')
    }
}

