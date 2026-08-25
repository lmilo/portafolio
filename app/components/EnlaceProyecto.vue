<script setup lang="ts">
/**
 * Un enlace a un servicio dormido que parece roto es peor que uno con
 * advertencia honesta (BRAND §7). Render gratuito tarda ~50 s en frío.
 */
defineProps<{
  enlace: { etiqueta: string, url: string, tipo: string, duerme?: boolean }
}>()
const { t } = useI18n()
</script>

<template>
  <div>
    <a
      :href="enlace.url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 rounded-sm border border-linea-fuerte px-4 py-2
             text-sm font-medium transition-colors duration-[120ms]
             hover:border-acento hover:text-acento"
    >
      {{ enlace.etiqueta }}
      <span aria-hidden="true">↗</span>
    </a>
    <p v-if="enlace.duerme" class="mono mt-2 max-w-xs text-tinta-tenue">
      {{ t('comun.arranqueLento') }}
    </p>
  </div>
</template>
