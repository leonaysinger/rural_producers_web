// src/api/report.ts

import { apiClient } from './client'
import { getBaseUrl } from '../utils/baseUrl'

const baseUrl = getBaseUrl()

export async function getSummary() {
  return await apiClient(`${baseUrl}/reports/summary`)
}

export async function getFarmsByState() {
  return await apiClient(`${baseUrl}/reports/farms-by-state`)
}

export async function getFarmsByCrop() {
  return await apiClient(`${baseUrl}/reports/farms-by-crop`)
}

export async function getLandUsage() {
  return await apiClient(`${baseUrl}/reports/land-usage`)
}
