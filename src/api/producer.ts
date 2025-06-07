import { getBaseUrl } from "../utils/baseUrl"

export interface ProducerResponse {
    name: string,
    document_type: string,
    document: string,
    id: string,
    created_at: string,
    updated_at: string
}

export interface ProducerPayload {
    name: string
    document_type: string
    document: string
}


const baseUrl = getBaseUrl()

export async function getProducers(): Promise<ProducerResponse[]> {
    const res = await fetch(`${baseUrl}/producers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao fazer login')
    }

    return res.json()
}

export async function postProducers(data: ProducerPayload): Promise<ProducerResponse> {
    const res = await fetch(`${baseUrl}/producers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao cadastrar produtor')
    }

    return res.json()
}

export async function updateProducer(id: number, data: Omit<ProducerPayload, 'id'>) {
    const response = await fetch(`${baseUrl}/producers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!response.ok) {
        throw new Error('Erro ao atualizar produtor')
    }
    return await response.json()
}

export async function deleteProducer(id: number): Promise<void> {
    const res = await fetch(`${baseUrl}/producers/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao excluir produtor')
    }
}
