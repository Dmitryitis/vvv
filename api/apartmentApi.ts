import type { ApartmentData, CalculationResponse } from '../types/apartment'

// Real Estate API base URL from environment variable
const API_BASE_URL = 'http://127.0.0.1:8080'

export const calculateApartmentPrice = async (data: ApartmentData): Promise<CalculationResponse> => {
  try {
    // Transform our data format to match the API's PropertyRequest schema
    const apiRequest = transformToApiFormat(data)
    
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequest)
    })
    
    if (!response.ok) {
      throw new Error(`API error! status: ${response.status}`)
    }
    
    const apiResponse = await response.json()
    return transformFromApiFormat(apiResponse)
  } catch (error) {
    console.error('Real Estate API call failed, falling back to local calculation:', error)
    // Fallback to local calculation if API fails
    return calculatePrice(data)
  }
}

// Transform our ApartmentData to API's PropertyRequest format
const transformToApiFormat = (data: ApartmentData) => {
  return {
    sale_type: 1, // Default to sale type 1
    object_type: data.objectType || 1, // Default to 1 if not specified
    total_area: data.totalArea!,
    living_area: data.livingArea!,
    kitchen_area: data.kitchenArea || 0,
    floor: data.floor!,
    max_floor: data.totalFloors || null,
    passenger_elevators: data.passengerElevators || 0,
    freight_elevators: data.cargoElevators || 0,
    year_built: data.yearBuilt || 2025,
    balcony: data.balcony || 0,
    garbage_chute: data.garbageChute || 0,
    parking: data.parking || 0,
    rooms: data.rooms || 1,
    house_type: data.buildingType || 1,
    ceiling_height: data.ceilingHeight || 2.7,
    separate_bathrooms: data.separateBathrooms || 1,
    renovation: data.renovation || 1,
    view: data.windowView || 1,
    metro_distance: data.metroDistance ? `${data.metroDistance} мин. пешком` : null
  }
}

// Transform API's PropertyResponse to our CalculationResponse format
const transformFromApiFormat = (apiResponse: any): CalculationResponse => {
  const price = Math.round(apiResponse.predicted_price)
  const variance = price * 0.1 // 10% variance for price range
  
  return {
    price,
    priceRange: {
      min: Math.round(price - variance),
      max: Math.round(price + variance)
    }
  }
}

// Comprehensive apartment price calculation based on Moscow market data
const calculatePrice = (data: ApartmentData): CalculationResponse => {
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
    separateBathrooms,
    passengerElevators,
    cargoElevators
  } = data

  // Base price per sqm in Moscow (2025 market data)
  let basePricePerSqm = 220000

  // Building type coefficients based on market analysis
  const buildingTypeMultipliers = {
    1: 0.82, // Панельный
    2: 1.08, // Кирпичный
    3: 1.18, // Монолитно-кирпичный
    4: 1.25, // Монолитный
    5: 1.35  // Сталинский
  }
  basePricePerSqm *= buildingTypeMultipliers[buildingType as keyof typeof buildingTypeMultipliers] || 1

  // Renovation state impact
  const renovationMultipliers = {
    1: 0.75, // Без ремонта
    2: 0.88, // Косметический
    3: 1.12, // Евроремонт
    4: 1.35  // Дизайнерский
  }
  basePricePerSqm *= renovationMultipliers[renovation as keyof typeof renovationMultipliers] || 1

  // Floor coefficient optimization
  if (floor && totalFloors) {
    if (floor === 1) {
      basePricePerSqm *= 0.92 // Первый этаж
    } else if (floor === totalFloors && totalFloors > 5) {
      basePricePerSqm *= 0.96 // Последний этаж в высотном доме
    } else if (floor >= 2 && floor <= Math.min(8, totalFloors - 1)) {
      basePricePerSqm *= 1.08 // Оптимальные этажи
    } else if (floor > 15) {
      basePricePerSqm *= 0.98 // Очень высокие этажи
    }
  }

  // New building premium
  if (objectType === 2) {
    basePricePerSqm *= 1.18
  }

  // Window view impact
  const windowViewMultipliers = {
    1: 0.94, // Во двор
    2: 1.06, // На улицу
    3: 1.12  // На улицу и двор
  }
  basePricePerSqm *= windowViewMultipliers[windowView as keyof typeof windowViewMultipliers] || 1

  // Metro accessibility - critical factor in Moscow
  if (metroDistance !== null && metroDistance !== undefined) {
    if (metroDistance <= 3) {
      basePricePerSqm *= 1.25 // В шаговой доступности
    } else if (metroDistance <= 7) {
      basePricePerSqm *= 1.15 // Близко к метро
    } else if (metroDistance <= 15) {
      basePricePerSqm *= 1.02 // Умеренное расстояние
    } else {
      basePricePerSqm *= 0.88 // Далеко от метро
    }
  }

  // Building age factor
  if (yearBuilt) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - yearBuilt
    if (age < 3) {
      basePricePerSqm *= 1.22 // Новая постройка
    } else if (age < 10) {
      basePricePerSqm *= 1.12 // Современное жилье
    } else if (age < 25) {
      basePricePerSqm *= 1.00 // Стандартное состояние
    } else if (age < 40) {
      basePricePerSqm *= 0.95 // Требует обновления
    } else {
      basePricePerSqm *= 0.88 // Старый фонд
    }
  }

  // Infrastructure and amenities
  if (balcony) basePricePerSqm *= 1.04
  if (parking) basePricePerSqm *= 1.08
  if (garbageChute) basePricePerSqm *= 1.03

  // Elevator availability
  if (passengerElevators && passengerElevators > 0) {
    basePricePerSqm *= 1.02
  }
  if (cargoElevators && cargoElevators > 0) {
    basePricePerSqm *= 1.01
  }

  // Kitchen area premium
  if (kitchenArea) {
    if (kitchenArea > 12) {
      basePricePerSqm *= 1.05 // Большая кухня
    } else if (kitchenArea < 7) {
      basePricePerSqm *= 0.97 // Маленькая кухня
    }
  }

  // Ceiling height factor
  if (ceilingHeight) {
    if (ceilingHeight > 3.0) {
      basePricePerSqm *= 1.06 // Высокие потолки
    } else if (ceilingHeight < 2.6) {
      basePricePerSqm *= 0.96 // Низкие потолки
    }
  }

  // Bathroom configuration
  if (separateBathrooms && separateBathrooms > 1) {
    basePricePerSqm *= 1.03
  }

  // Room count optimization
  if (rooms && totalArea) {
    const areaPerRoom = totalArea / rooms
    if (areaPerRoom > 25) {
      basePricePerSqm *= 1.02 // Просторные комнаты
    } else if (areaPerRoom < 15) {
      basePricePerSqm *= 0.98 // Маленькие комнаты
    }
  }

  // Calculate final price
  const basePrice = basePricePerSqm * (totalArea || 50)
  
  // Market volatility simulation
  const volatility = 0.08
  const randomFactor = 1 + (Math.random() - 0.5) * volatility * 2
  const finalPrice = Math.round(basePrice * randomFactor)
  
  // Price range calculation (±12% for realistic spread)
  const rangeVariation = 0.12
  const minPrice = Math.round(finalPrice * (1 - rangeVariation))
  const maxPrice = Math.round(finalPrice * (1 + rangeVariation))

  return {
    price: finalPrice,
    priceRange: { min: minPrice, max: maxPrice }
  }
}
