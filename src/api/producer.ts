import { getBaseUrl } from "../utils/baseUrl"
import { apiClient } from "./client"

export interface ProducerResponse {
  name: string
  document_type: "CPF" | "CNPJ"
  document: string
  id: string
  created_at: string
  updated_at: string
}

export interface ProducerPayload {
  name: string
  document_type: "CPF" | "CNPJ"
  document: string
}

const baseUrl = getBaseUrl()

export async function getProducers(): Promise<ProducerResponse[]> {
  return apiClient(`${baseUrl}/producers`, {
    method: 'GET'
  })
}

export async function postProducers(data: ProducerPayload): Promise<ProducerResponse> {
  return apiClient(`${baseUrl}/producers`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function updateProducer(id: string, data: Omit<ProducerPayload, 'id'>): Promise<ProducerResponse> {
  return apiClient(`${baseUrl}/producers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
}

export async function deleteProducer(id: string): Promise<void> {
  await apiClient(`${baseUrl}/producers/${id}`, {
    method: 'DELETE'
  })
}
