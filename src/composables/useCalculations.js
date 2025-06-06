import { ref, computed, onMounted } from 'vue'

export function useCalculations() {
  const apartmentData = ref({
    totalArea: null,
    livingArea: null,
    floor: null,
    kitchenArea: null,
    totalFloors: null,
    passengerElevators: null,
    cargoElevators: null,
    yearBuilt: null,
    balcony: false,
    garbageChute: false,
    parking: false,
    rooms: null,
    buildingType: null,
    ceilingHeight: null,
    separateBathrooms: null,
    renovation: null,
    windowView: null,
    metroDistance: null,
    objectType: null
  })

  const calculations = ref([])
  const lastCalculation = ref(null)
  const isCalculating = ref(false)

  // Data arrays
  const buildingTypes = ['Панельный', 'Кирпичный', 'Монолитно-кирпичный', 'Монолитный', 'Сталинский']
  const renovationTypes = ['Без ремонта', 'Косметический', 'Евроремонт', 'Дизайнерский']
  const objectTypes = ['Вторичка', 'Новостройка']
  const windowViews = ['Во двор', 'На улицу', 'На улицу и двор']

  // Computed properties
  const canCalculate = computed(() => {
    return apartmentData.value.totalArea && 
           apartmentData.value.livingArea && 
           apartmentData.value.floor
  })

  // Load data on mount
  onMounted(() => {
    const stored = localStorage.getItem('apartmentCalculations')
    if (stored) {
      try {
        calculations.value = JSON.parse(stored)
      } catch (error) {
        console.error('Error loading calculations:', error)
      }
    }
  })

  // Price calculation function
  const calculateApartmentPrice = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
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

    let basePricePerSqm = 220000

    // Building type coefficients
    const buildingTypeMultipliers = {
      1: 0.82, 2: 1.08, 3: 1.18, 4: 1.25, 5: 1.35
    }
    basePricePerSqm *= buildingTypeMultipliers[buildingType] || 1

    // Renovation state impact
    const renovationMultipliers = {
      1: 0.75, 2: 0.88, 3: 1.12, 4: 1.35
    }
    basePricePerSqm *= renovationMultipliers[renovation] || 1

    // Floor coefficient optimization
    if (floor && totalFloors) {
      if (floor === 1) {
        basePricePerSqm *= 0.92
      } else if (floor === totalFloors && totalFloors > 5) {
        basePricePerSqm *= 0.96
      } else if (floor >= 2 && floor <= Math.min(8, totalFloors - 1)) {
        basePricePerSqm *= 1.08
      } else if (floor > 15) {
        basePricePerSqm *= 0.98
      }
    }

    // New building premium
    if (objectType === 2) {
      basePricePerSqm *= 1.18
    }

    // Window view impact
    const windowViewMultipliers = {
      1: 0.94, 2: 1.06, 3: 1.12
    }
    basePricePerSqm *= windowViewMultipliers[windowView] || 1

    // Metro accessibility
    if (metroDistance !== null && metroDistance !== undefined) {
      if (metroDistance <= 3) {
        basePricePerSqm *= 1.25
      } else if (metroDistance <= 7) {
        basePricePerSqm *= 1.15
      } else if (metroDistance <= 15) {
        basePricePerSqm *= 1.02
      } else {
        basePricePerSqm *= 0.88
      }
    }

    // Building age factor
    if (yearBuilt) {
      const currentYear = new Date().getFullYear()
      const age = currentYear - yearBuilt
      if (age < 3) {
        basePricePerSqm *= 1.22
      } else if (age < 10) {
        basePricePerSqm *= 1.12
      } else if (age < 25) {
        basePricePerSqm *= 1.00
      } else if (age < 40) {
        basePricePerSqm *= 0.95
      } else {
        basePricePerSqm *= 0.88
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
        basePricePerSqm *= 1.05
      } else if (kitchenArea < 7) {
        basePricePerSqm *= 0.97
      }
    }

    // Ceiling height factor
    if (ceilingHeight) {
      if (ceilingHeight > 3.0) {
        basePricePerSqm *= 1.06
      } else if (ceilingHeight < 2.6) {
        basePricePerSqm *= 0.96
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
        basePricePerSqm *= 1.02
      } else if (areaPerRoom < 15) {
        basePricePerSqm *= 0.98
      }
    }

    // Calculate final price
    const basePrice = basePricePerSqm * totalArea
    
    // Market volatility simulation
    const volatility = 0.08
    const randomFactor = 1 + (Math.random() - 0.5) * volatility * 2
    const finalPrice = Math.round(basePrice * randomFactor)
    
    // Price range calculation
    const rangeVariation = 0.12
    const minPrice = Math.round(finalPrice * (1 - rangeVariation))
    const maxPrice = Math.round(finalPrice * (1 + rangeVariation))

    return {
      price: finalPrice,
      priceRange: { min: minPrice, max: maxPrice }
    }
  }

  const calculatePrice = async () => {
    if (!canCalculate.value || isCalculating.value) return
    
    isCalculating.value = true
    
    try {
      const result = await calculateApartmentPrice(apartmentData.value)
      
      const calculationResult = {
        id: Date.now().toString(),
        timestamp: new Date(),
        apartmentData: { ...apartmentData.value },
        price: result.price,
        priceRange: result.priceRange
      }
      
      lastCalculation.value = calculationResult
      calculations.value.unshift(calculationResult)
      
      localStorage.setItem('apartmentCalculations', JSON.stringify(calculations.value))
      
    } catch (error) {
      console.error('Calculation error:', error)
    } finally {
      isCalculating.value = false
    }
  }

  const loadCalculation = (calc) => {
    Object.assign(apartmentData.value, calc.apartmentData)
    lastCalculation.value = calc
  }

  const deleteCalculation = (calcId) => {
    if (confirm('Удалить этот расчет?')) {
      const wasSelected = lastCalculation.value && lastCalculation.value.id === calcId
      
      calculations.value = calculations.value.filter(calc => calc.id !== calcId)
      
      if (wasSelected) {
        lastCalculation.value = null
        clearForm()
      }
      
      localStorage.setItem('apartmentCalculations', JSON.stringify(calculations.value))
    }
  }

  const clearHistory = () => {
    if (confirm('Удалить всю историю расчетов? Это действие нельзя отменить.')) {
      calculations.value = []
      lastCalculation.value = null
      localStorage.removeItem('apartmentCalculations')
      clearForm()
    }
  }

  const clearForm = () => {
    apartmentData.value = {
      totalArea: null,
      livingArea: null,
      floor: null,
      kitchenArea: null,
      totalFloors: null,
      passengerElevators: null,
      cargoElevators: null,
      yearBuilt: null,
      balcony: false,
      garbageChute: false,
      parking: false,
      rooms: null,
      buildingType: null,
      ceilingHeight: null,
      separateBathrooms: null,
      renovation: null,
      windowView: null,
      metroDistance: null,
      objectType: null
    }
  }

  const clearFormAndSelection = () => {
    clearForm()
    lastCalculation.value = null
  }

  return {
    apartmentData,
    calculations,
    lastCalculation,
    isCalculating,
    buildingTypes,
    renovationTypes,
    objectTypes,
    windowViews,
    canCalculate,
    calculatePrice,
    loadCalculation,
    deleteCalculation,
    clearHistory,
    clearFormAndSelection
  }
}