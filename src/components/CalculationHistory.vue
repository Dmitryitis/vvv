<template>
  <div class="w-96 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">История расчетов</h3>
      </div>
      <div class="flex items-center gap-2">
        <button v-if="calculations.length > 0" 
                @click="$emit('clearHistory')"
                class="w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                title="Очистить историю">
          <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
        <div class="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Empty state -->
    <div v-if="calculations.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <h4 class="text-base font-medium text-gray-900 mb-2">Пока нет расчетов</h4>
      <p class="text-sm text-gray-500">Создайте первый расчет</p>
    </div>
    
    <!-- History list -->
    <div v-else class="space-y-3 max-h-96 overflow-y-auto">
      <div v-for="(calc, index) in calculations.slice(0, 10)" :key="calc.id" 
           :class="[
             'group rounded-2xl p-4 transition-all duration-200 border relative',
             lastResult && lastResult.id === calc.id 
               ? 'bg-blue-100 border-blue-300 shadow-md' 
               : 'bg-gray-50 hover:bg-blue-50 border-transparent hover:border-blue-100'
           ]">
        
        <!-- Delete button -->
        <button @click.stop="$emit('deleteCalculation', calc.id)"
                class="absolute top-3 right-3 w-6 h-6 bg-red-50 hover:bg-red-100 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                title="Удалить расчет">
          <svg class="w-3 h-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Main content area - clickable -->
        <div @click="$emit('loadCalculation', calc)" class="cursor-pointer">
          <!-- Header with number and price -->
          <div class="flex items-center justify-between mb-3 pr-8">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold relative',
                lastResult && lastResult.id === calc.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-green-100 text-green-700'
              ]">
                {{ index + 1 }}
                <!-- Selected indicator -->
                <div v-if="lastResult && lastResult.id === calc.id" 
                     class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                </div>
              </div>
              <div class="text-lg font-bold text-gray-900">{{ formatPrice(calc.price) }}</div>
            </div>
            <div :class="[
              'text-xs px-2 py-1 rounded-lg',
              lastResult && lastResult.id === calc.id 
                ? 'text-blue-700 bg-blue-200' 
                : 'text-gray-500 bg-white group-hover:bg-blue-50'
            ]">
              ±15%
            </div>
          </div>
        
          <!-- Price per square meter -->
          <div class="text-sm text-gray-600 mb-3">
            {{ Math.round(calc.price / calc.apartmentData.totalArea).toLocaleString('ru-RU') }} ₽/м²
          </div>
          
          <!-- Property details -->
          <div class="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-4a1 1 0 011-1h2a1 1 0 011 1v4"></path>
              </svg>
              {{ calc.apartmentData.totalArea }}м²
            </div>
            <div class="flex items-center gap-1">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              {{ calc.apartmentData.floor }} этаж
            </div>
          </div>
          
          <!-- Timestamp -->
          <div class="flex items-center justify-between">
            <div class="text-xs text-gray-500">
              <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ formatDate(calc.timestamp) }}, {{ new Date(calc.timestamp).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}) }}
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="calculations.length > 10" class="text-center pt-4">
        <button class="text-blue-600 text-sm font-medium hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors">
          Показать еще {{ calculations.length - 10 }}
        </button>
      </div>
    </div>

    <!-- Current Result Display -->
    <div v-if="lastResult" class="mt-6 pt-6 border-t border-gray-100">
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-700 mb-2">{{ formatPrice(lastResult.price) }}</div>
          <div class="text-sm text-green-600 mb-3">
            {{ Math.round(lastResult.price / lastResult.apartmentData.totalArea).toLocaleString('ru-RU') }} ₽/м²
          </div>
          <div v-if="lastResult.priceRange" class="text-xs text-green-600">
            Диапазон: {{ formatPrice(lastResult.priceRange.min) }} - {{ formatPrice(lastResult.priceRange.max) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  calculations: Array,
  lastResult: Object
})

const emit = defineEmits(['loadCalculation', 'deleteCalculation', 'clearHistory'])

const formatPrice = (price) => {
  if (!price) return ''
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU')
}
</script>