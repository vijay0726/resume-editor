<template>
  <svg
    class="app-logo"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
    />
    <path
      fill="currentColor"
      d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>

<style scoped>
.app-logo {
  color: #409eff;
  transition: all 0.3s;
}
</style> 