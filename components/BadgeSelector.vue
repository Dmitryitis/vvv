<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      @click="selectOption(option.value)"
      :class="[
        'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
        isSelected(option.value)
          ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
      ]"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string
  value: number
}

defineProps<{
  options: Option[]
  modelValue?: number | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const isSelected = (value: number): boolean => {
  return value === props.modelValue
}

const selectOption = (value: number) => {
  emit('update:modelValue', value)
}

const props = defineProps<{
  options: Option[]
  modelValue?: number | null
}>()
</script>
