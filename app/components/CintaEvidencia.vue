<script setup lang="ts">
/** Hechos duros y verificables. Datos, no adjetivos (BRAND §2). */
defineProps<{ datos: readonly string[] }>()
</script>

<template>
  <ul class="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-tinta-tenue">
    <li v-for="(dato, i) in datos" :key="dato" class="flex items-center gap-3">
      <span>{{ dato }}</span>
      <span v-if="i < datos.length - 1" aria-hidden="true" class="opacity-50">·</span>
    </li>
  </ul>
</template>
