<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <div class="relative bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl overflow-hidden">
      <div class="flex flex-row lg:flex-row items-center">
        <div class="lg:w-1/2 p-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Узнайте рыночную стоимость квартиры</h1>
          <p class="text-gray-700 text-lg mb-6">Профессиональная оценка недвижимости на основе актуальных рыночных данных</p>
          <div class="flex items-center space-x-4 text-sm text-gray-600">
            <div class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Точная оценка
            </div>
            <div class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Быстрый расчет
            </div>
          </div>
        </div>
        <div class="lg:w-1/2">
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
               alt="Современная квартира" 
               class="w-full h-64 lg:h-80 object-cover">
        </div>
      </div>
    </div>

    <!-- Calculation Result -->
    <div v-if="lastCalculation" class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold mb-4">Результат оценки</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-1">Рыночная стоимость</p>
          <p class="text-2xl font-bold text-blue-600">{{ formatPrice(lastCalculation.price) }}</p>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-1">Минимальная цена</p>
          <p class="text-xl font-semibold text-green-600">{{ formatPrice(lastCalculation.priceRange?.min) }}</p>
        </div>
        <div class="text-center p-4 bg-orange-50 rounded-lg">
          <p class="text-sm text-gray-600 mb-1">Максимальная цена</p>
          <p class="text-xl font-semibold text-orange-600">{{ formatPrice(lastCalculation.priceRange?.max) }}</p>
        </div>
      </div>
    </div>

    <!-- Apartment Form -->
    <ApartmentForm @calculation-complete="handleCalculationComplete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ApartmentForm from '../components/ApartmentForm.vue'
import type { CalculationResult } from '../types/apartment'

const lastCalculation = ref<CalculationResult | null>(null)

const handleCalculationComplete = (result: CalculationResult) => {
  lastCalculation.value = result
}

const formatPrice = (price: number | undefined): string => {
  if (!price) return ''
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price)
}
</script>