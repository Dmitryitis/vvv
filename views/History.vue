<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">История расчетов</h1>
      <CalculationHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
import CalculationHistory from '../components/CalculationHistory.vue'
</script>