<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Аналитика рынка</h1>
      
      <!-- Market Overview Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-blue-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{{ averagePrice }}</div>
          <div class="text-sm text-gray-600">Средняя цена за м²</div>
        </div>
        <div class="bg-green-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{{ totalCalculations }}</div>
          <div class="text-sm text-gray-600">Всего расчетов</div>
        </div>
        <div class="bg-purple-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">{{ averageArea }}</div>
          <div class="text-sm text-gray-600">Средняя площадь</div>
        </div>
        <div class="bg-orange-50 rounded-lg p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">{{ priceRange }}</div>
          <div class="text-sm text-gray-600">Разброс цен</div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" v-if="calculations.length >= 3">
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-4">Динамика цен</h3>
          <canvas id="priceChart" width="400" height="200"></canvas>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-4">
          <h3 class="text-lg font-medium mb-4">Распределение по типам домов</h3>
          <canvas id="buildingTypeChart" width="400" height="200"></canvas>
        </div>
      </div>

      <!-- Price Projections -->
      <div class="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">Прогноз цен на недвижимость</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-white rounded-lg">
            <div class="text-lg font-semibold text-green-600">Консервативный</div>
            <div class="text-2xl font-bold">+3.2%</div>
            <div class="text-sm text-gray-600">Рост за год</div>
          </div>
          <div class="text-center p-4 bg-white rounded-lg">
            <div class="text-lg font-semibold text-blue-600">Оптимистичный</div>
            <div class="text-2xl font-bold">+7.8%</div>
            <div class="text-sm text-gray-600">Рост за год</div>
          </div>
          <div class="text-center p-4 bg-white rounded-lg">
            <div class="text-lg font-semibold text-red-600">Пессимистичный</div>
            <div class="text-2xl font-bold">-1.5%</div>
            <div class="text-sm text-gray-600">Изменение за год</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import Chart from 'chart.js/auto'
import type { CalculationResult } from '../types/apartment'

// Get calculations from localStorage
const calculations = computed(() => {
  const stored = localStorage.getItem('apartmentCalculations')
  return stored ? JSON.parse(stored) : []
})

const totalCalculations = computed(() => calculations.value.length)

const averagePrice = computed(() => {
  if (calculations.value.length === 0) return '0 ₽'
  const total = calculations.value.reduce((sum: number, calc: CalculationResult) => {
    return sum + (calc.price / calc.apartmentData.totalArea!)
  }, 0)
  const avg = total / calculations.value.length
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(avg)
})

const averageArea = computed(() => {
  if (calculations.value.length === 0) return '0 м²'
  const total = calculations.value.reduce((sum: number, calc: CalculationResult) => {
    return sum + calc.apartmentData.totalArea!
  }, 0)
  return Math.round(total / calculations.value.length) + ' м²'
})

const priceRange = computed(() => {
  if (calculations.value.length === 0) return '0%'
  const prices = calculations.value.map((calc: CalculationResult) => calc.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const range = ((max - min) / min) * 100
  return Math.round(range) + '%'
})

onMounted(async () => {
  await nextTick()
  if (calculations.value.length >= 3) {
    createPriceChart()
    createBuildingTypeChart()
  }
})

function createPriceChart() {
  const ctx = document.getElementById('priceChart') as HTMLCanvasElement
  if (!ctx) return

  const labels = calculations.value.map((_: any, index: number) => `Расчет ${index + 1}`)
  const data = calculations.value.map((calc: CalculationResult) => calc.price)

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Стоимость квартиры',
        data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return new Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                minimumFractionDigits: 0
              }).format(value as number)
            }
          }
        }
      }
    }
  })
}

function createBuildingTypeChart() {
  const ctx = document.getElementById('buildingTypeChart') as HTMLCanvasElement
  if (!ctx) return

  const buildingTypes = ['Панельный', 'Кирпичный', 'Монолитно-кирпичный', 'Монолитный', 'Сталинский']
  const typeCounts = [0, 0, 0, 0, 0]

  calculations.value.forEach((calc: CalculationResult) => {
    const type = calc.apartmentData.buildingType
    if (type && type >= 1 && type <= 5) {
      typeCounts[type - 1]++
    }
  })

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: buildingTypes,
      datasets: [{
        data: typeCounts,
        backgroundColor: [
          '#ef4444',
          '#f97316',
          '#eab308',
          '#22c55e',
          '#3b82f6'
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  })
}
</script>