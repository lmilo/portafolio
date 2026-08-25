<script setup lang="ts">
/**
 * Marco de escritorio. Una barra fina con la URL real y nada más.
 *
 * Sin semáforos de macOS ni barra de direcciones dibujada: ese cromo es el
 * recurso más repetido del gremio y compite con la interfaz que se quiere
 * enseñar. La URL sí se conserva porque **es evidencia** — `motila.onrender.com`
 * dice "esto está en producción" mejor que cualquier frase (BRAND §1).
 *
 * En oscuro la elevación la da el borde, no la sombra: sobre un fondo profundo
 * una sombra no se ve (TOKENS §4).
 */
withDefaults(defineProps<{
  src: string
  alt: string
  url?: string
  pie?: string
  /** Proporción de la captura, para reservar el hueco y que nada salte al cargar. */
  ratio?: string
  prioridad?: boolean
}>(), { ratio: '16 / 10', prioridad: false })
</script>

<template>
  <figure class="my-8">
    <div
      class="overflow-hidden rounded-lg border border-linea-fuerte bg-superficie
             shadow-tarjeta"
    >
      <div
        v-if="url"
        class="flex items-center gap-2 border-b border-linea px-4 py-2"
      >
        <span class="mono truncate text-tinta-tenue">{{ url }}</span>
      </div>

      <NuxtImg
        :src="src"
        :alt="alt"
        :loading="prioridad ? 'eager' : 'lazy'"
        :fetchpriority="prioridad ? 'high' : undefined"
        format="webp"
        sizes="100vw md:768px lg:1024px"
        class="block w-full object-cover object-top"
        :style="{ aspectRatio: ratio }"
      />
    </div>

    <figcaption v-if="pie" class="mono mt-3 text-tinta-tenue">
      {{ pie }}
    </figcaption>
  </figure>
</template>
