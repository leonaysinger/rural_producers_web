import { getBaseUrl } from "../utils/baseUrl"

const baseUrl = getBaseUrl()

export async function getSummary() {
    const res = await fetch(`${baseUrl}/reports/summary`)
    if (!res.ok) throw new Error('Erro ao carregar resumo')
    return res.json()
}

export async function getFarmsByState() {
    const res = await fetch(`${baseUrl}/reports/farms-by-state`)
    if (!res.ok) throw new Error('Erro ao carregar dados por estado')
    return res.json()
}

export async function getFarmsByCrop() {
    const res = await fetch(`${baseUrl}/reports/farms-by-crop`)
    if (!res.ok) throw new Error('Erro ao carregar dados por cultura')
    return res.json()
}

export async function getLandUsage() {
    const res = await fetch(`${baseUrl}/reports/land-usage`)
    if (!res.ok) throw new Error('Erro ao carregar uso do solo')
    return res.json()
}
