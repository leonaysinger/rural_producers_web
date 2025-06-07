interface LoginResponse {
    user_name: string
    user_email: string
    access_token: string
    refresh_token: string
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'Erro ao fazer login')
    }

    return res.json()
}
