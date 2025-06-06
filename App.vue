<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Main Content -->
    <div class="flex-1 p-6">
      <div class="max-w-4xl mx-auto">
        <header class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Калькулятор стоимости квартиры
          </h1>
          <p class="text-gray-600">
            Узнайте рыночную стоимость вашей недвижимости
          </p>
        </header>

        <ApartmentForm @calculation-complete="handleCalculationComplete" />
      </div>
    </div>

    <!-- Sidebar with calculation history -->
    <CalculationHistory 
      :calculations="calculations"
      @edit-calculation="handleEditCalculation"
      @delete-calculation="handleDeleteCalculation"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ApartmentForm from './components/ApartmentForm.vue'
import CalculationHistory from './components/CalculationHistory.vue'
import type { ApartmentData, CalculationResult } from './types/apartment'

const calculations = ref<CalculationResult[]>([])

// Load calculations from localStorage on mount
onMounted(() => {
  const stored = localStorage.getItem('apartment-calculations')
  if (stored) {
    try {
      calculations.value = JSON.parse(stored)
    } catch (error) {
      console.error('Error loading calculations from localStorage:', error)
    }
  }
})

// Save calculations to localStorage
const saveCalculations = () => {
  localStorage.setItem('apartment-calculations', JSON.stringify(calculations.value))
}

const handleCalculationComplete = (result: CalculationResult) => {
  calculations.value.unshift(result)
  saveCalculations()
}

const handleEditCalculation = (calculation: CalculationResult) => {
  // Remove from calculations and trigger form edit
  const index = calculations.value.findIndex(c => c.id === calculation.id)
  if (index !== -1) {
    calculations.value.splice(index, 1)
    saveCalculations()
  }
  // Emit event or use provide/inject to communicate with form
  window.dispatchEvent(new CustomEvent('edit-calculation', { detail: calculation }))
}

const handleDeleteCalculation = (id: string) => {
  const index = calculations.value.findIndex(c => c.id === id)
  if (index !== -1) {
    calculations.value.splice(index, 1)
    saveCalculations()
  }
}
</script>
