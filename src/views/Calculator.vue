<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- Hero Section -->
      <div class="w-full bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl overflow-hidden mb-8">
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

      <!-- Calculator Form and History Side by Side -->
      <div class="flex gap-8">
        <ApartmentForm
          :apartment-data="apartmentData"
          :is-calculating="isCalculating"
          :building-types="buildingTypes"
          :renovation-types="renovationTypes"
          :object-types="objectTypes"
          :window-views="windowViews"
          @calculate="calculatePrice"
          @clear-form="clearFormAndSelection"
        />

        <CalculationHistory
          :calculations="calculations"
          :last-result="lastCalculation"
          @load-calculation="loadCalculation"
          @delete-calculation="deleteCalculation"
          @clear-history="clearHistory"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ApartmentForm from '../components/ApartmentForm.vue'
import CalculationHistory from '../components/CalculationHistory.vue'
import { useCalculations } from '../composables/useCalculations.js'

const {
  apartmentData,
  calculations,
  lastCalculation,
  isCalculating,
  buildingTypes,
  renovationTypes,
  objectTypes,
  windowViews,
  calculatePrice,
  loadCalculation,
  deleteCalculation,
  clearHistory,
  clearFormAndSelection
} = useCalculations()
</script>