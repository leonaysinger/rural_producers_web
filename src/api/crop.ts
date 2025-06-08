export interface CropResponse {
    id: string,
    name: string
}

export interface CropPayload {
    name: string
}

export async function getCrops(): Promise<CropResponse[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/crops`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao buscar a cultura')
    }

    return res.json()
}

export async function postCrop(data: CropPayload): Promise<CropResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/crops`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao cadastrar a cultura')
    }

    return res.json()
}

export async function updateCrop(id: string, data: CropPayload): Promise<CropResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/crops/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao atualizar cultura')
    }

    return res.json()
}

export async function deleteCrop(id: string): Promise<void> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/crops/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao excluir a cultura')
    }
}
