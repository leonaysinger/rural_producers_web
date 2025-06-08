export interface SeasonResponse {
    id: string,
    name: string,
    year: number
}

export interface SeasonPayload {
    name: string
    year: number
}

export async function getSeasons(): Promise<SeasonResponse[]> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/seasons`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao buscar as safras')
    }

    return res.json()
}

export async function postSeason(data: SeasonPayload): Promise<SeasonResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/seasons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao cadastrar a safra')
    }

    return res.json()
}

export async function updateSeason(id: string, data: SeasonPayload): Promise<SeasonResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/seasons/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao atualizar safra')
    }

    return res.json()
}

export async function deleteSeason(id: string): Promise<void> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/seasons/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao excluir a safra')
    }
}
