<script setup lang="ts">
/**
 * Escritorio con el móvil superpuesto en la esquina. Enseña el responsive en
 * un solo bloque en vez de gastar dos.
 *
 * Por debajo de 768px la superposición se deshace y el teléfono baja a su
 * propia fila: encogido dentro de un escritorio ya pequeño no se leería nada,
 * y el solape se comería la esquina de la captura principal.
 */
withDefaults(defineProps<{
  escritorio: string
  escritorioAlt: string
  movil: string
  movilAlt: string
  url?: string
  pie?: string
  ratio?: string
  prioridad?: boolean
}>(), { ratio: '16 / 10', prioridad: false })
</script>

<template>
  <figure class="my-10">
    <!-- md+ : el teléfono se superpone. La caja necesita el padding derecho e
         inferior para que el solape no se recorte. -->
    <div class="md:relative md:pb-10 md:pe-16">
      <div class="border-2 border-linea-fuerte bg-superficie p-2 pb-0 shadow-[6px_6px_0_var(--linea-fuerte)]">
        <div v-if="url" class="flex items-center gap-2 border-b-2 border-linea-fuerte px-2 pb-2">
          <span class="flex gap-1" aria-hidden="true">
            <span class="size-2 border border-linea-fuerte" />
            <span class="size-2 border border-linea-fuerte" />
            <span class="size-2 border border-linea-fuerte" />
          </span>
          <span class="mono truncate ps-1 text-tinta-tenue">{{ url }}</span>
        </div>
        <NuxtImg
          :src="escritorio"
          :alt="escritorioAlt"
          :loading="prioridad ? 'eager' : 'lazy'"
          :fetchpriority="prioridad ? 'high' : undefined"
          format="webp"
          sizes="100vw md:768px lg:1024px"
          class="block w-full object-cover object-top"
          :style="{ aspectRatio: ratio }"
        />
      </div>

      <div class="relative -mx-[3%] h-3 border-x-2 border-b-2 border-linea-fuerte bg-hundido" aria-hidden="true">
        <span
          class="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 border-x-2 border-b-2
                 border-linea-fuerte bg-superficie"
        />
      </div>

      <div
        class="mx-auto mt-6 w-40 overflow-hidden rounded-[1.5rem] border-2 border-linea-fuerte
               bg-hundido p-1 shadow-tarjeta
               md:absolute md:bottom-0 md:end-0 md:mt-0 md:w-44 lg:w-48"
      >
        <NuxtImg
          :src="movil"
          :alt="movilAlt"
          loading="lazy"
          format="webp"
          sizes="192px"
          class="block w-full rounded-[1.15rem] object-cover object-top"
          style="aspect-ratio: 9 / 19.5"
        />
      </div>
    </div>

    <figcaption v-if="pie" class="mono mt-3 text-tinta-tenue">
      {{ pie }}
    </figcaption>
  </figure>
</template>
