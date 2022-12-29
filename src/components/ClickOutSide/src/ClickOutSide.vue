<template>
  <div ref="wrap">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
const emit = defineEmits(['mounted', 'clickOutside'])
const wrap = ref()

onClickOutside(wrap, () => {
  emit('clickOutside')
})

onMounted(() => {
  emit('mounted')
})
</script>
