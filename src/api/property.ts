import { getBaseUrl } from "../utils/baseUrl"
import { apiClient } from "./client"

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

const baseUrl = getBaseUrl()

export async function getProperties(): Promise<PropertyResponse[]> {
  return apiClient(`${baseUrl}/properties?with_relations=true`, {
    method: 'GET'
  })
}

export async function postProperty(data: PropertyPayload): Promise<PropertyResponse> {
  return apiClient(`${baseUrl}/properties`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function updateProperty(id: string, data: PropertyPayload): Promise<PropertyResponse> {
  return apiClient(`${baseUrl}/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export async function deleteProperty(id: string): Promise<void> {
  await apiClient(`${baseUrl}/properties/${id}`, {
    method: 'DELETE'
  })
}
