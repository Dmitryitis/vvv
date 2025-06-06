<template>
  <div class="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
    <h2 class="text-2xl font-semibold text-gray-900 mb-8">Параметры квартиры</h2>
    <form @submit.prevent="$emit('calculate')" class="space-y-8">
      
      <!-- Основные параметры -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Основные параметры</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Общая площадь (м²) *</label>
            <input v-model.number="apartmentData.totalArea" 
                   type="number" 
                   required 
                   placeholder="45"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Жилая площадь (м²) *</label>
            <input v-model.number="apartmentData.livingArea" 
                   type="number" 
                   required 
                   placeholder="30"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Этаж *</label>
            <input v-model.number="apartmentData.floor" 
                   type="number" 
                   required 
                   placeholder="5"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
        </div>
      </div>

      <!-- Дополнительная информация -->
      <div class="space-y-4">
        <h3 class="text-lg font-medium text-gray-900">Дополнительная информация</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Площадь кухни (м²)</label>
            <input v-model.number="apartmentData.kitchenArea" 
                   type="number" 
                   placeholder="12"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Этажность дома</label>
            <input v-model.number="apartmentData.totalFloors" 
                   type="number" 
                   placeholder="17"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Количество комнат</label>
            <input v-model.number="apartmentData.rooms" 
                   type="number" 
                   placeholder="2"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Год постройки</label>
            <input v-model.number="apartmentData.yearBuilt" 
                   type="number" 
                   min="1900" 
                   max="2025" 
                   placeholder="2018"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Расстояние до метро (мин)</label>
            <input v-model.number="apartmentData.metroDistance" 
                   type="number" 
                   min="1" 
                   max="60" 
                   placeholder="7"
                   class="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all">
          </div>
        </div>
      </div>

      <!-- Селекторы -->
      <div class="space-y-6">
        <!-- Тип дома -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Тип дома</h3>
          <div class="flex flex-wrap gap-3">
            <button v-for="(type, index) in buildingTypes" 
                    :key="index"
                    type="button"
                    @click="apartmentData.buildingType = index + 1"
                    :class="apartmentData.buildingType === index + 1 ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0">
              {{ type }}
            </button>
          </div>
        </div>

        <!-- Качество ремонта -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Качество ремонта</h3>
          <div class="flex flex-wrap gap-3">
            <button v-for="(renovation, index) in renovationTypes" 
                    :key="index"
                    type="button"
                    @click="apartmentData.renovation = index + 1"
                    :class="apartmentData.renovation === index + 1 ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0">
              {{ renovation }}
            </button>
          </div>
        </div>

        <!-- Тип объекта -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Тип объекта</h3>
          <div class="flex flex-wrap gap-3">
            <button v-for="(objType, index) in objectTypes" 
                    :key="index"
                    type="button"
                    @click="apartmentData.objectType = index + 1"
                    :class="apartmentData.objectType === index + 1 ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0">
              {{ objType }}
            </button>
          </div>
        </div>

        <!-- Вид из окон -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Вид из окон</h3>
          <div class="flex flex-wrap gap-3">
            <button v-for="(view, index) in windowViews" 
                    :key="index"
                    type="button"
                    @click="apartmentData.windowView = index + 1"
                    :class="apartmentData.windowView === index + 1 ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0">
              {{ view }}
            </button>
          </div>
        </div>

        <!-- Дополнительно -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Дополнительно</h3>
          <div class="flex flex-wrap gap-3">
            <button type="button"
                    @click="apartmentData.balcony = !apartmentData.balcony"
                    :class="apartmentData.balcony ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0 flex items-center gap-2">
              <span class="text-lg">🏠</span>
              Балкон
            </button>
            <button type="button"
                    @click="apartmentData.parking = !apartmentData.parking"
                    :class="apartmentData.parking ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0 flex items-center gap-2">
              <span class="text-lg">🚗</span>
              Парковка
            </button>
            <button type="button"
                    @click="apartmentData.garbageChute = !apartmentData.garbageChute"
                    :class="apartmentData.garbageChute ? 
                            'bg-black text-white shadow-md' : 
                            'bg-gray-50 text-gray-700 hover:bg-gray-100'"
                    class="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border-0 flex items-center gap-2">
              <span class="text-lg">🗑️</span>
              Мусоропровод
            </button>
          </div>
        </div>
      </div>

      <!-- Кнопки -->
      <div class="pt-4 space-y-3">
        <button type="submit" 
                :disabled="!canCalculate || isCalculating"
                :class="canCalculate && !isCalculating ? 
                    'bg-black hover:bg-gray-800' : 
                    'bg-gray-400 cursor-not-allowed'"
                class="w-full text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 text-lg">
          <span v-if="isCalculating" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Расчет стоимости...
          </span>
          <span v-else>Рассчитать стоимость</span>
        </button>
        
        <button type="button" 
                @click="$emit('clearForm')"
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
          Очистить форму
        </button>
      </div>

      <p class="text-xs text-gray-500 text-center">
        * Обязательные поля для расчета
      </p>
    </form>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  apartmentData: Object,
  isCalculating: Boolean,
  buildingTypes: Array,
  renovationTypes: Array,
  objectTypes: Array,
  windowViews: Array
})

const emit = defineEmits(['calculate', 'clearForm'])

const canCalculate = computed(() => {
  return props.apartmentData.totalArea && 
         props.apartmentData.livingArea && 
         props.apartmentData.floor
})
</script>