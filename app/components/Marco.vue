<script setup lang="ts">
/**
 * Mockup de portátil: pantalla con bisel, barra de URL y base con muesca.
 *
 * El cuerpo se dibuja en CSS, no es una imagen: así hereda los tokens, sigue el
 * tema claro/oscuro y escala sin pixelarse. Un PNG de portátil sería un peso
 * muerto que además chocaría con el modo claro.
 *
 * La URL se conserva porque es evidencia: dice que esto está en producción y
 * dónde. Sin ella el mockup sería decoración.
 */
withDefaults(defineProps<{
  src: string
  alt: string
  url?: string
  pie?: string
  ratio?: string
  prioridad?: boolean
}>(), { ratio: '16 / 10', prioridad: false })
</script>

<template>
  <figure class="my-8">
    <div class="mx-auto w-full">
      <!-- Pantalla -->
      <div class="border-2 border-linea-fuerte bg-superficie p-2 pb-0 shadow-[6px_6px_0_var(--linea-fuerte)]">
        <div
          v-if="url"
          class="flex items-center gap-2 border-b-2 border-linea-fuerte px-2 pb-2"
        >
          <span class="flex gap-1" aria-hidden="true">
            <span class="size-2 border border-linea-fuerte" />
            <span class="size-2 border border-linea-fuerte" />
            <span class="size-2 border border-linea-fuerte" />
          </span>
          <span class="mono truncate ps-1 text-tinta-tenue">{{ url }}</span>
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

      <!-- Base del portátil. Ligeramente más ancha que la pantalla, con la
           muesca de apertura: es lo que hace que se lea como un portátil y no
           como un recuadro cualquiera. -->
      <div class="relative -mx-[3%] h-3 border-x-2 border-b-2 border-linea-fuerte bg-hundido" aria-hidden="true">
        <span
          class="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 border-x-2 border-b-2
                 border-linea-fuerte bg-superficie"
        />
      </div>
    </div>

    <figcaption v-if="pie" class="mono mt-4 text-tinta-tenue">{{ pie }}</figcaption>
  </figure>
</template>
