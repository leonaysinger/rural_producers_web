// src/api/season.ts

import { apiClient } from './client'
import { getBaseUrl } from '../utils/baseUrl'

export interface SeasonResponse {
  id: string
  name: string
  year: number
}

export interface SeasonPayload {
  name: string
  year: number
}

const baseUrl = getBaseUrl()

export async function getSeasons(): Promise<SeasonResponse[]> {
  return await apiClient(`${baseUrl}/seasons`)
}

export async function postSeason(data: SeasonPayload): Promise<SeasonResponse> {
  return await apiClient(`${baseUrl}/seasons`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateSeason(id: string, data: SeasonPayload): Promise<SeasonResponse> {
  return await apiClient(`${baseUrl}/seasons/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteSeason(id: string): Promise<void> {
  return await apiClient(`${baseUrl}/seasons/${id}`, {
    method: 'DELETE',
  })
}
