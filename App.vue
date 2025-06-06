<template>
  <div class="min-h-screen bg-gray-50">
    <AppNavigation />
    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppNavigation from './components/AppNavigation.vue'
</script>

<style>
/* Global styles */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
}
</style>
