// src/api/crop.ts

import { apiClient } from './client'
import { getBaseUrl } from '../utils/baseUrl'

export interface CropResponse {
  id: string
  name: string
}

export interface CropPayload {
  name: string
}

const baseUrl = getBaseUrl()

export async function getCrops(): Promise<CropResponse[]> {
  return await apiClient(`${baseUrl}/crops`, { method: 'GET' })
}

export async function postCrop(data: CropPayload): Promise<CropResponse> {
  return await apiClient(`${baseUrl}/crops`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function updateCrop(id: string, data: CropPayload): Promise<CropResponse> {
  return await apiClient(`${baseUrl}/crops/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteCrop(id: string): Promise<void> {
  return await apiClient(`${baseUrl}/crops/${id}`, {
    method: 'DELETE',
  })
}
