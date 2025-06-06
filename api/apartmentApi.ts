import type { ApartmentData, CalculationResponse } from '../types/apartment'

const API_BASE_URL = 'http://localhost:8000'

export const calculateApartmentPrice = async (data: ApartmentData): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/apartment/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error calculating apartment price:', error)
    throw new Error('Не удалось рассчитать стоимость квартиры. Проверьте подключение к серверу.')
  }
}
