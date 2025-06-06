<template>
  <div class="w-80 bg-white border-l border-gray-200 flex flex-col h-screen">
    <!-- Header -->
    <div class="p-4 border-b border-gray-200 bg-gray-50">
      <h2 class="text-lg font-semibold text-gray-900 flex items-center">
        <i class="fas fa-history mr-2 text-gray-600"></i>
        История расчетов
      </h2>
      <p class="text-sm text-gray-600 mt-1">
        {{ calculations.length }} расчет{{ calculations.length === 1 ? '' : calculations.length < 5 ? 'а' : 'ов' }}
      </p>
    </div>

    <!-- Calculations List -->
    <div class="flex-1 overflow-y-auto p-4 space-y-3">
      <div v-if="calculations.length === 0" class="text-center py-8">
        <i class="fas fa-calculator text-4xl text-gray-300 mb-4"></i>
        <p class="text-gray-500">Пока нет расчетов</p>
        <p class="text-sm text-gray-400 mt-1">
          Заполните форму и получите первую оценку
        </p>
      </div>

      <div
        v-for="calculation in calculations"
        :key="calculation.id"
        class="bg-gray-50 rounded-lg p-4 border hover:shadow-sm transition-shadow duration-200"
      >
        <!-- Price and Date -->
        <div class="mb-3">
          <div class="text-lg font-semibold text-green-600 mb-1">
            {{ formatPrice(calculation.price) }}
          </div>
          <div class="text-xs text-gray-500">
            {{ formatDate(calculation.timestamp) }}
          </div>
        </div>

        <!-- Apartment Info -->
        <div class="space-y-1 text-sm text-gray-700 mb-3">
          <div class="flex justify-between">
            <span>Общая площадь:</span>
            <span class="font-medium">{{ calculation.apartmentData.totalArea }} м²</span>
          </div>
          <div class="flex justify-between">
            <span>Комнат:</span>
            <span class="font-medium">{{ calculation.apartmentData.rooms || 'Не указано' }}</span>
          </div>
          <div class="flex justify-between">
            <span>Этаж:</span>
            <span class="font-medium">
              {{ calculation.apartmentData.floor }}{{ calculation.apartmentData.totalFloors ? `/${calculation.apartmentData.totalFloors}` : '' }}
            </span>
          </div>
          <div v-if="calculation.apartmentData.buildingType" class="flex justify-between">
            <span>Тип дома:</span>
            <span class="font-medium text-xs">{{ getBuildingTypeName(calculation.apartmentData.buildingType) }}</span>
          </div>
        </div>

        <!-- Price Range -->
        <div v-if="calculation.priceRange" class="mb-3 p-2 bg-white rounded border">
          <div class="text-xs text-gray-600 mb-1">Диапазон цен:</div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-700">От {{ formatPrice(calculation.priceRange.min) }}</span>
            <span class="text-gray-700">До {{ formatPrice(calculation.priceRange.max) }}</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button
            @click="editCalculation(calculation)"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded transition-colors duration-200"
          >
            <i class="fas fa-edit mr-1"></i>
            Изменить
          </button>
          <button
            @click="deleteCalculation(calculation.id)"
            class="bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 rounded transition-colors duration-200"
          >
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalculationResult } from '../types/apartment'

defineProps<{
  calculations: CalculationResult[]
}>()

const emit = defineEmits<{
  editCalculation: [calculation: CalculationResult]
  deleteCalculation: [id: string]
}>()

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const getBuildingTypeName = (type: number): string => {
  const types = {
    1: 'Панельный',
    2: 'Кирпичный',
    3: 'Монолитно-кирпичный',
    4: 'Монолитный',
    5: 'Сталинский'
  }
  return types[type as keyof typeof types] || 'Не указано'
}

const editCalculation = (calculation: CalculationResult) => {
  emit('editCalculation', calculation)
}

const deleteCalculation = (id: string) => {
  if (confirm('Удалить этот расчет?')) {
    emit('deleteCalculation', id)
  }
}
</script>
