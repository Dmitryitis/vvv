<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-xl font-bold text-gray-900">
              Калькулятор квартир
            </router-link>
            <div class="hidden md:flex space-x-6">
              <router-link 
                to="/" 
                :class="$route.path === '/' ? 'text-black' : 'text-gray-600 hover:text-gray-900'"
                class="font-medium transition-colors">
                Калькулятор
              </router-link>
              <router-link 
                to="/about" 
                :class="$route.path === '/about' ? 'text-black' : 'text-gray-600 hover:text-gray-900'"
                class="font-medium transition-colors">
                О проекте
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <router-view />
  </div>
</template>

<script setup>
// Main App component with navigation
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
