import { Injectable } from '@nestjs/common'
import { CalculateApartmentDto } from './apartment.dto'

@Injectable()
export class ApartmentService {
  calculatePrice(apartmentData: CalculateApartmentDto) {
    // Mock calculation algorithm - placeholder for future AI integration
    // This is a simplified formula based on common real estate factors
    
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
    } = apartmentData

    // Base price per square meter (in rubles) - Moscow average
    let basePricePerSqm = 200000

    // Area factor
    const areaMultiplier = Math.max(totalArea || 50, 30) / 50

    // Building type factor
    const buildingTypeMultipliers = {
      1: 0.85, // Панельный
      2: 1.1,  // Кирпичный
      3: 1.15, // Монолитно-кирпичный
      4: 1.2,  // Монолитный
      5: 1.3   // Сталинский
    }
    basePricePerSqm *= buildingTypeMultipliers[buildingType] || 1

    // Renovation factor
    const renovationMultipliers = {
      1: 0.8,  // Без ремонта
      2: 0.9,  // Косметический
      3: 1.1,  // Евроремонт
      4: 1.3   // Дизайнерский
    }
    basePricePerSqm *= renovationMultipliers[renovation] || 1

    // Floor factor
    if (floor && totalFloors) {
      if (floor === 1) {
        basePricePerSqm *= 0.95 // First floor discount
      } else if (floor === totalFloors) {
        basePricePerSqm *= 0.98 // Top floor discount
      } else if (floor >= 2 && floor <= Math.min(7, totalFloors - 1)) {
        basePricePerSqm *= 1.05 // Premium floors
      }
    }

    // Object type factor
    if (objectType === 2) { // Новостройка
      basePricePerSqm *= 1.15
    }

    // Window view factor
    const windowViewMultipliers = {
      1: 0.95, // Во двор
      2: 1.05, // На улицу
      3: 1.1   // На улицу и двор
    }
    basePricePerSqm *= windowViewMultipliers[windowView] || 1

    // Metro distance factor
    if (metroDistance) {
      if (metroDistance <= 5) {
        basePricePerSqm *= 1.2
      } else if (metroDistance <= 10) {
        basePricePerSqm *= 1.1
      } else if (metroDistance <= 15) {
        basePricePerSqm *= 1.0
      } else {
        basePricePerSqm *= 0.9
      }
    }

    // Year built factor
    if (yearBuilt) {
      const currentYear = new Date().getFullYear()
      const age = currentYear - yearBuilt
      if (age < 5) {
        basePricePerSqm *= 1.15
      } else if (age < 15) {
        basePricePerSqm *= 1.05
      } else if (age > 50) {
        basePricePerSqm *= 0.9
      }
    }

    // Additional amenities
    if (balcony) basePricePerSqm *= 1.03
    if (parking) basePricePerSqm *= 1.05
    if (garbageChute) basePricePerSqm *= 1.02

    // Kitchen area bonus
    if (kitchenArea && kitchenArea > 10) {
      basePricePerSqm *= 1.02
    }

    // Ceiling height factor
    if (ceilingHeight && ceilingHeight > 2.8) {
      basePricePerSqm *= 1.03
    }

    // Calculate final price
    const basePrice = basePricePerSqm * (totalArea || 50)
    
    // Add some randomness to simulate market fluctuations
    const variation = 0.1 // 10% variation
    const randomFactor = 1 + (Math.random() - 0.5) * variation * 2
    
    const finalPrice = Math.round(basePrice * randomFactor)
    
    // Calculate price range (±15%)
    const rangeVariation = 0.15
    const minPrice = Math.round(finalPrice * (1 - rangeVariation))
    const maxPrice = Math.round(finalPrice * (1 + rangeVariation))

    return {
      price: finalPrice,
      priceRange: {
        min: minPrice,
        max: maxPrice
      }
    }
  }
}
