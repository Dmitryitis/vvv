<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <form @submit.prevent="submitForm" class="space-y-8">
      <!-- Basic Information -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-900 border-b pb-2">
          Основные характеристики
        </h2>
        
        <!-- Row 1: Areas -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Общая площадь, м² <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.totalArea"
              type="number"
              required
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="32"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Жилая площадь, м² <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.livingArea"
              type="number"
              required
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="22"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Площадь кухни, м²
            </label>
            <input
              v-model.number="formData.kitchenArea"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="8"
            />
          </div>
        </div>

        <!-- Row 2: Floor and Building -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Этаж <span class="text-red-500">*</span>
            </label>
            <input
              v-model.number="formData.floor"
              type="number"
              required
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="5"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Этажей в доме
            </label>
            <input
              v-model.number="formData.totalFloors"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="9"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Лифт пассажирский
            </label>
            <input
              v-model.number="formData.passengerElevators"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Лифт грузовой
            </label>
            <input
              v-model.number="formData.cargoElevators"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>
        </div>

        <!-- Row 3: Year and Rooms -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Год строительства
            </label>
            <input
              v-model.number="formData.yearBuilt"
              type="number"
              min="1800"
              :max="new Date().getFullYear()"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2010"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Количество комнат
            </label>
            <input
              v-model.number="formData.rooms"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Высота потолков, м
            </label>
            <input
              v-model.number="formData.ceilingHeight"
              type="number"
              step="0.1"
              min="2"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="2.7"
            />
          </div>
        </div>

        <!-- Additional Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Раздельных санузлов
            </label>
            <input
              v-model.number="formData.separateBathrooms"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="1"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Расстояние до метро, мин
            </label>
            <input
              v-model.number="formData.metroDistance"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
            />
          </div>
        </div>
      </div>

      <!-- Building Type -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Тип дома</h3>
        <BadgeSelector
          v-model="formData.buildingType"
          :options="buildingTypeOptions"
        />
      </div>

      <!-- Renovation -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Ремонт</h3>
        <BadgeSelector
          v-model="formData.renovation"
          :options="renovationOptions"
        />
      </div>

      <!-- Balcony -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Балкон/лоджия</h3>
        <BadgeSelector
          v-model="formData.balcony"
          :options="balconyOptions"
        />
      </div>

      <!-- View from windows -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Вид из окон</h3>
        <BadgeSelector
          v-model="formData.windowView"
          :options="windowViewOptions"
        />
      </div>

      <!-- Object Type -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Объект продажи</h3>
        <BadgeSelector
          v-model="formData.objectType"
          :options="objectTypeOptions"
        />
      </div>

      <!-- Yes/No Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Мусоропровод</h3>
          <BadgeSelector
            v-model="formData.garbageChute"
            :options="yesNoOptions"
          />
        </div>
        
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Парковка</h3>
          <BadgeSelector
            v-model="formData.parking"
            :options="yesNoOptions"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="pt-6">
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <i class="fas fa-spinner fa-spin mr-2"></i>
            Рассчитываем...
          </span>
          <span v-else>Рассчитать стоимость</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import BadgeSelector from './BadgeSelector.vue'
import { calculateApartmentPrice } from '../api/apartmentApi'
import type { ApartmentData, CalculationResult } from '../types/apartment'

const emit = defineEmits<{
  calculationComplete: [result: CalculationResult]
}>()

const loading = ref(false)

const formData = reactive<ApartmentData>({
  totalArea: null,
  livingArea: null,
  kitchenArea: null,
  floor: null,
  totalFloors: null,
  passengerElevators: null,
  cargoElevators: null,
  yearBuilt: null,
  balcony: null,
  garbageChute: null,
  parking: null,
  rooms: null,
  buildingType: null,
  ceilingHeight: null,
  separateBathrooms: null,
  renovation: null,
  windowView: null,
  metroDistance: null,
  objectType: null
})

// Options for badge selectors
const buildingTypeOptions = [
  { label: 'Панельный', value: 1 },
  { label: 'Кирпичный', value: 2 },
  { label: 'Монолитно-кирпичный', value: 3 },
  { label: 'Монолитный', value: 4 },
  { label: 'Сталинский', value: 5 }
]

const renovationOptions = [
  { label: 'Без ремонта', value: 1 },
  { label: 'Косметический', value: 2 },
  { label: 'Евроремонт', value: 3 },
  { label: 'Дизайнерский', value: 4 }
]

const balconyOptions = [
  { label: 'Есть', value: 1 },
  { label: 'Нет', value: 0 }
]

const windowViewOptions = [
  { label: 'Во двор', value: 1 },
  { label: 'На улицу', value: 2 },
  { label: 'На улицу и двор', value: 3 }
]

const objectTypeOptions = [
  { label: 'Вторичка', value: 1 },
  { label: 'Новостройка', value: 2 }
]

const yesNoOptions = [
  { label: 'Да', value: 1 },
  { label: 'Нет', value: 0 }
]

// Listen for edit calculation events
onMounted(() => {
  window.addEventListener('edit-calculation', (event: any) => {
    const calculation = event.detail as CalculationResult
    Object.assign(formData, calculation.apartmentData)
  })
})

const submitForm = async () => {
  try {
    loading.value = true
    
    const result = await calculateApartmentPrice(formData)
    
    const calculationResult: CalculationResult = {
      id: Date.now().toString(),
      timestamp: new Date(),
      apartmentData: { ...formData },
      price: result.price,
      priceRange: result.priceRange
    }
    
    emit('calculationComplete', calculationResult)
    
  } catch (error) {
    console.error('Error calculating apartment price:', error)
    alert('Произошла ошибка при расчете стоимости. Попробуйте еще раз.')
  } finally {
    loading.value = false
  }
}
</script>
