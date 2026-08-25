<script setup lang="ts">
/**
 * Marco de teléfono. Bisel redondeado y nada más.
 *
 * Sin notch ni isla dibujada: son detalles de un modelo concreto y envejecen
 * en un año. El bisel basta para que el ojo lea "esto es un teléfono", que es
 * todo lo que la imagen necesita comunicar.
 */
withDefaults(defineProps<{
  src: string
  alt: string
  pie?: string
  /** 19.5/9 es la proporción de un Android de gama media, el equipo real del usuario. */
  ratio?: string
  ancho?: string
}>(), { ratio: '9 / 19.5', ancho: '15rem' })
</script>

<template>
  <figure class="my-8">
    <div
      class="mx-auto overflow-hidden rounded-[1.75rem] border-2 border-linea-fuerte
             bg-hundido p-1.5 shadow-tarjeta"
      :style="{ width: ancho }"
    >
      <NuxtImg
        :src="src"
        :alt="alt"
        loading="lazy"
        format="webp"
        sizes="240px"
        class="block w-full rounded-[1.35rem] object-cover object-top"
        :style="{ aspectRatio: ratio }"
      />
    </div>

    <figcaption v-if="pie" class="mono mt-3 text-center text-tinta-tenue">
      {{ pie }}
    </figcaption>
  </figure>
</template>
