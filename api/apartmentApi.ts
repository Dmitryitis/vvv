import type { ApartmentData, CalculationResponse } from '../types/apartment'

const API_BASE_URL = 'http://localhost:8000'

export const calculateApartmentPrice = async (data: ApartmentData): Promise<CalculationResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/apartment/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error calculating apartment price:', error)
    
    // Fallback to local calculation if API is not available
    return calculateLocalPrice(data)
  }
}

// Local fallback calculation
const calculateLocalPrice = (data: ApartmentData): CalculationResponse => {
  const {
    totalArea,
    livingArea,
    kitchenArea,
    floor,
    totalFloors,
    yearBuilt,
    rooms,
    buildingType,
    renovation,
    balcony,
    windowView,
    objectType,
    metroDistance,
    garbageChute,
    parking,
    ceilingHeight,
    separateBathrooms
  } = data

  let basePricePerSqm = 200000

  const buildingTypeMultipliers = {
    1: 0.85, 2: 1.1, 3: 1.15, 4: 1.2, 5: 1.3
  }
  basePricePerSqm *= buildingTypeMultipliers[buildingType as keyof typeof buildingTypeMultipliers] || 1

  const renovationMultipliers = {
    1: 0.8, 2: 0.9, 3: 1.1, 4: 1.3
  }
  basePricePerSqm *= renovationMultipliers[renovation as keyof typeof renovationMultipliers] || 1

  if (floor && totalFloors) {
    if (floor === 1) {
      basePricePerSqm *= 0.95
    } else if (floor === totalFloors) {
      basePricePerSqm *= 0.98
    } else if (floor >= 2 && floor <= Math.min(7, totalFloors - 1)) {
      basePricePerSqm *= 1.05
    }
  }

  if (objectType === 2) basePricePerSqm *= 1.15

  const windowViewMultipliers = { 1: 0.95, 2: 1.05, 3: 1.1 }
  basePricePerSqm *= windowViewMultipliers[windowView as keyof typeof windowViewMultipliers] || 1

  if (metroDistance) {
    if (metroDistance <= 5) basePricePerSqm *= 1.2
    else if (metroDistance <= 10) basePricePerSqm *= 1.1
    else if (metroDistance <= 15) basePricePerSqm *= 1.0
    else basePricePerSqm *= 0.9
  }

  if (yearBuilt) {
    const age = 2025 - yearBuilt
    if (age < 5) basePricePerSqm *= 1.15
    else if (age < 15) basePricePerSqm *= 1.05
    else if (age > 50) basePricePerSqm *= 0.9
  }

  if (balcony) basePricePerSqm *= 1.03
  if (parking) basePricePerSqm *= 1.05
  if (garbageChute) basePricePerSqm *= 1.02
  if (kitchenArea && kitchenArea > 10) basePricePerSqm *= 1.02
  if (ceilingHeight && ceilingHeight > 2.8) basePricePerSqm *= 1.03

  const basePrice = basePricePerSqm * (totalArea || 50)
  const variation = 0.1
  const randomFactor = 1 + (Math.random() - 0.5) * variation * 2
  const finalPrice = Math.round(basePrice * randomFactor)
  
  const rangeVariation = 0.15
  const minPrice = Math.round(finalPrice * (1 - rangeVariation))
  const maxPrice = Math.round(finalPrice * (1 + rangeVariation))

  return {
    price: finalPrice,
    priceRange: { min: minPrice, max: maxPrice }
  }
}
