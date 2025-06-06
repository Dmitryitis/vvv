import type { ApartmentData, CalculationResponse } from '../types/apartment'

export const calculateApartmentPrice = async (data: ApartmentData): Promise<CalculationResponse> => {
  // Имитация запроса к серверу
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Алгоритм расчета на основе входных данных
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

  // Базовая цена за квадратный метр (в рублях) - средняя по Москве
  let basePricePerSqm = 200000

  // Коэффициент площади
  const areaMultiplier = Math.max(totalArea || 50, 30) / 50

  // Коэффициент типа дома
  const buildingTypeMultipliers = {
    1: 0.85, // Панельный
    2: 1.1,  // Кирпичный
    3: 1.15, // Монолитно-кирпичный
    4: 1.2,  // Монолитный
    5: 1.3   // Сталинский
  }
  basePricePerSqm *= buildingTypeMultipliers[buildingType as keyof typeof buildingTypeMultipliers] || 1

  // Коэффициент ремонта
  const renovationMultipliers = {
    1: 0.8,  // Без ремонта
    2: 0.9,  // Косметический
    3: 1.1,  // Евроремонт
    4: 1.3   // Дизайнерский
  }
  basePricePerSqm *= renovationMultipliers[renovation as keyof typeof renovationMultipliers] || 1

  // Коэффициент этажа
  if (floor && totalFloors) {
    if (floor === 1) {
      basePricePerSqm *= 0.95 // Скидка за первый этаж
    } else if (floor === totalFloors) {
      basePricePerSqm *= 0.98 // Скидка за последний этаж
    } else if (floor >= 2 && floor <= Math.min(7, totalFloors - 1)) {
      basePricePerSqm *= 1.05 // Премиум этажи
    }
  }

  // Коэффициент типа объекта
  if (objectType === 2) { // Новостройка
    basePricePerSqm *= 1.15
  }

  // Коэффициент вида из окон
  const windowViewMultipliers = {
    1: 0.95, // Во двор
    2: 1.05, // На улицу
    3: 1.1   // На улицу и двор
  }
  basePricePerSqm *= windowViewMultipliers[windowView as keyof typeof windowViewMultipliers] || 1

  // Коэффициент расстояния до метро
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

  // Коэффициент года постройки
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

  // Дополнительные удобства
  if (balcony) basePricePerSqm *= 1.03
  if (parking) basePricePerSqm *= 1.05
  if (garbageChute) basePricePerSqm *= 1.02

  // Бонус за большую кухню
  if (kitchenArea && kitchenArea > 10) {
    basePricePerSqm *= 1.02
  }

  // Коэффициент высоты потолков
  if (ceilingHeight && ceilingHeight > 2.8) {
    basePricePerSqm *= 1.03
  }

  // Расчет итоговой цены
  const basePrice = basePricePerSqm * (totalArea || 50)
  
  // Добавляем случайность для имитации рыночных колебаний
  const variation = 0.1 // 10% вариации
  const randomFactor = 1 + (Math.random() - 0.5) * variation * 2
  
  const finalPrice = Math.round(basePrice * randomFactor)
  
  // Расчет диапазона цен (±15%)
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
