export const apiClient = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('access_token')

    const headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    }
  
    const response = await fetch(url, {
      ...options,
      headers,
    })
  
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Erro ao processar requisição')
    }
  
    return await response.json()
  }
  