<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">О калькуляторе</h1>
      
      <div class="prose max-w-none">
        <p class="text-lg text-gray-700 mb-6">
          Наш калькулятор стоимости квартир использует современные алгоритмы оценки недвижимости, 
          основанные на актуальных рыночных данных Москвы и области.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Факторы оценки</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-blue-50 rounded-lg p-4">
            <h3 class="font-semibold text-blue-900 mb-2">Характеристики квартиры</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Общая и жилая площадь</li>
              <li>• Количество комнат</li>
              <li>• Этаж и этажность дома</li>
              <li>• Площадь кухни</li>
              <li>• Высота потолков</li>
            </ul>
          </div>
          
          <div class="bg-green-50 rounded-lg p-4">
            <h3 class="font-semibold text-green-900 mb-2">Характеристики дома</h3>
            <ul class="text-sm text-green-800 space-y-1">
              <li>• Тип постройки</li>
              <li>• Год постройки</li>
              <li>• Наличие лифтов</li>
              <li>• Мусоропровод</li>
              <li>• Парковка</li>
            </ul>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-4">
            <h3 class="font-semibold text-purple-900 mb-2">Состояние и удобства</h3>
            <ul class="text-sm text-purple-800 space-y-1">
              <li>• Качество ремонта</li>
              <li>• Наличие балкона</li>
              <li>• Вид из окон</li>
              <li>• Количество санузлов</li>
            </ul>
          </div>
          
          <div class="bg-orange-50 rounded-lg p-4">
            <h3 class="font-semibold text-orange-900 mb-2">Расположение</h3>
            <ul class="text-sm text-orange-800 space-y-1">
              <li>• Расстояние до метро</li>
              <li>• Тип объекта</li>
              <li>• Инфраструктура района</li>
            </ul>
          </div>
        </div>

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Методология расчета</h2>
        <p class="text-gray-700 mb-4">
          Алгоритм использует базовую стоимость квадратного метра для Москвы (220 000 ₽/м²) 
          и применяет коэффициенты корректировки на основе характеристик объекта:
        </p>
        
        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 class="font-semibold mb-2">Коэффициенты корректировки:</h3>
          <ul class="text-sm space-y-1">
            <li><strong>Тип дома:</strong> от 0.82 (панельный) до 1.35 (сталинский)</li>
            <li><strong>Ремонт:</strong> от 0.75 (без ремонта) до 1.35 (дизайнерский)</li>
            <li><strong>Близость к метро:</strong> до +25% за расстояние менее 3 минут</li>
            <li><strong>Новостройки:</strong> +18% к базовой стоимости</li>
            <li><strong>Возраст дома:</strong> до +22% для новых построек</li>
          </ul>
        </div>

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Функции приложения</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 border rounded-lg">
            <div class="text-2xl mb-2">🏠</div>
            <h3 class="font-semibold mb-2">Расчет стоимости</h3>
            <p class="text-sm text-gray-600">Точная оценка с учетом всех параметров</p>
          </div>
          
          <div class="text-center p-4 border rounded-lg">
            <div class="text-2xl mb-2">📊</div>
            <h3 class="font-semibold mb-2">Аналитика</h3>
            <p class="text-sm text-gray-600">Графики и статистика ваших расчетов</p>
          </div>
          
          <div class="text-center p-4 border rounded-lg">
            <div class="text-2xl mb-2">📄</div>
            <h3 class="font-semibold mb-2">Экспорт отчетов</h3>
            <p class="text-sm text-gray-600">PDF и Excel отчеты для печати</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page - no additional logic needed
</script>