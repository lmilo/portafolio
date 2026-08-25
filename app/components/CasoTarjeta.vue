<script setup lang="ts">
defineProps<{
  caso: {
    path: string
    titulo: string
    cliente?: string
    gancho: string
    orden: number
    estado: 'produccion' | 'desarrollo' | 'entregado'
    stack: string[]
  }
}>()
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <article
    class="group relative border border-linea bg-superficie p-6 transition-colors
           duration-[120ms] hover:border-linea-fuerte md:p-8"
  >
    <header class="flex flex-wrap items-center justify-between gap-3">
      <span class="rotulo">{{ String(caso.orden).padStart(2, '0') }}</span>
      <EstadoProyecto :estado="caso.estado" />
    </header>

    <h3 class="fuente-display mt-4 text-2xl md:text-3xl">
      <NuxtLink :to="localePath(rutaCaso(caso.path))" class="after:absolute after:inset-0">
        {{ caso.titulo }}
      </NuxtLink>
    </h3>
    <p v-if="caso.cliente" class="mono mt-1 text-tinta-tenue">{{ caso.cliente }}</p>

    <p class="medida mt-4 text-tinta-media">{{ caso.gancho }}</p>

    <footer class="mt-6 flex flex-wrap items-baseline justify-between gap-3">
      <p class="mono text-tinta-tenue">{{ caso.stack.slice(0, 3).join(' · ') }}</p>
      <span class="mono text-acento transition-transform duration-[120ms] group-hover:translate-x-1">
        {{ t('comun.verCaso') }} →
      </span>
    </footer>
  </article>
</template>
