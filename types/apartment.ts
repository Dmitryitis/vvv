export interface ApartmentData {
  // Required fields
  totalArea: number | null
  livingArea: number | null
  floor: number | null
  
  // Optional numeric fields
  kitchenArea: number | null
  totalFloors: number | null
  passengerElevators: number | null
  cargoElevators: number | null
  yearBuilt: number | null
  rooms: number | null
  ceilingHeight: number | null
  separateBathrooms: number | null
  metroDistance: number | null
  
  // Badge selector fields (categorical)
  buildingType: number | null // 1-5
  renovation: number | null // 1-4
  balcony: number | null // 0-1
  windowView: number | null // 1-3
  objectType: number | null // 1-2
  garbageChute: number | null // 0-1
  parking: number | null // 0-1
}

export interface PriceRange {
  min: number
  max: number
}

export interface CalculationResult {
  id: string
  timestamp: Date
  apartmentData: ApartmentData
  price: number
  priceRange?: PriceRange
}

export interface CalculationResponse {
  price: number
  priceRange: PriceRange
}
