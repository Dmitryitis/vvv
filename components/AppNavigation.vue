<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex items-center space-x-2">
          <div class="text-2xl font-bold text-blue-600">🏠</div>
          <span class="text-xl font-semibold text-gray-900">Калькулятор квартир</span>
        </div>
        
        <div class="hidden md:flex space-x-6">
          <router-link 
            to="/" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'Calculator' }"
          >
            Калькулятор
          </router-link>
          <router-link 
            to="/history" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'History' }"
          >
            История
          </router-link>
          <router-link 
            to="/analytics" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'Analytics' }"
          >
            Аналитика
          </router-link>
          <router-link 
            to="/about" 
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === 'About' }"
          >
            О проекте
          </router-link>
        </div>
        
        <div class="md:hidden">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 hover:text-gray-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden pb-4">
        <div class="flex flex-col space-y-2">
          <router-link 
            to="/" 
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            Калькулятор
          </router-link>
          <router-link 
            to="/history" 
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            История
          </router-link>
          <router-link 
            to="/analytics" 
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            Аналитика
          </router-link>
          <router-link 
            to="/about" 
            class="mobile-nav-link"
            @click="mobileMenuOpen = false"
          >
            О проекте
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>

<style scoped>
.nav-link {
  @apply px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium;
}

.nav-link-active {
  @apply text-blue-600 border-b-2 border-blue-600;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200;
}
</style>