<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-6">О проекте</h1>
          
          <div class="prose prose-lg max-w-none">
            <p class="text-gray-700 mb-6">
              Калькулятор стоимости квартиры — это современный инструмент для оценки недвижимости, 
              основанный на актуальных рыночных данных и профессиональных алгоритмах расчета.
            </p>
            
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Возможности</h2>
            <ul class="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Комплексная оценка квартир с учетом 20+ параметров</li>
              <li>Расчет на основе московских рыночных коэффициентов</li>
              <li>История расчетов с возможностью сравнения</li>
              <li>Интуитивно понятный интерфейс</li>
              <li>Мгновенные результаты расчета</li>
            </ul>
            
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Принцип работы</h2>
            <p class="text-gray-700 mb-6">
              Алгоритм учитывает множество факторов: от базовых параметров квартиры до инфраструктурных 
              особенностей района. Каждый фактор имеет свой весовой коэффициент, основанный на 
              статистических данных рынка недвижимости Москвы.
            </p>
            
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">Технологии</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="font-medium text-gray-900">Vue 3</div>
                <div class="text-sm text-gray-600">Фронтенд фреймворк</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="font-medium text-gray-900">Tailwind CSS</div>
                <div class="text-sm text-gray-600">Стилизация</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="font-medium text-gray-900">Vite</div>
                <div class="text-sm text-gray-600">Сборщик</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="font-medium text-gray-900">Vue Router</div>
                <div class="text-sm text-gray-600">Маршрутизация</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="font-medium text-gray-900">Composition API</div>
                <div class="text-sm text-gray-600">Реактивность</div>
              </div>
              <div class="bg-gray-50 rounded-lg p-4 text-center">
                <div class="font-medium text-gray-900">LocalStorage</div>
                <div class="text-sm text-gray-600">Хранение данных</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page component
</script>