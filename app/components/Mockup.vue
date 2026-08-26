<script setup lang="ts">
/**
 * Mockup único de todo el sitio. Dos formatos, un solo lenguaje visual.
 *
 * Antes había tres componentes (marco de escritorio, marco de teléfono y
 * composición) con biseles distintos. Un portafolio donde cada proyecto se
 * presenta con un marco diferente se lee como una colección de piezas sueltas,
 * no como el trabajo de una misma persona.
 *
 * El cuerpo se dibuja en CSS, no es una imagen: hereda los tokens, sigue el
 * tema claro/oscuro y escala sin pixelarse. Un render de portátil sería un peso
 * muerto que además no podría cambiar de tema.
 */
withDefaults(defineProps<{
  src: string
  alt: string
  variante?: 'escritorio' | 'telefono'
  url?: string
  pie?: string
  ratio?: string
  prioridad?: boolean
}>(), { variante: 'escritorio', ratio: '16 / 10', prioridad: false })
</script>

<template>
  <figure class="my-8">
    <!-- El resplandor de aurora va detrás del dispositivo: es lo que lo separa
         del fondo sin necesidad de un borde duro. -->
    <div class="relative">
      <div
        class="pointer-events-none absolute -inset-x-6 -bottom-4 -top-6 -z-10 opacity-70 blur-2xl
               [background:radial-gradient(50%_50%_at_30%_20%,color-mix(in_oklab,var(--violeta)_35%,transparent),transparent_70%),radial-gradient(45%_45%_at_75%_35%,color-mix(in_oklab,var(--cian)_28%,transparent),transparent_70%)]"
        aria-hidden="true"
      />

      <!-- ESCRITORIO -->
      <div v-if="variante === 'escritorio'" class="mx-auto w-full">
        <div class="vidrio overflow-hidden p-2 pb-0">
          <div v-if="url" class="flex items-center gap-2 px-2 pb-2">
            <span class="flex gap-1.5" aria-hidden="true">
              <span class="size-2 rounded-full bg-rosa/70" />
              <span class="size-2 rounded-full bg-aviso/70" />
              <span class="size-2 rounded-full bg-exito/70" />
            </span>
            <span
              class="mono ms-1 min-w-0 flex-1 truncate rounded-full bg-hundido/60 px-3 py-1
                     text-tinta-tenue"
            >{{ url }}</span>
          </div>

          <NuxtImg
            :src="src"
            :alt="alt"
            :loading="prioridad ? 'eager' : 'lazy'"
            :fetchpriority="prioridad ? 'high' : undefined"
            format="webp"
            sizes="100vw md:768px lg:1024px"
            class="block w-full rounded-t-[10px] object-cover object-top"
            :style="{ aspectRatio: ratio }"
          />
        </div>

        <!-- Base del portátil: más ancha que la pantalla y con la muesca de
             apertura. Es lo que hace que se lea como un equipo y no como un
             recuadro. -->
        <div class="relative mx-[-4%] h-3 rounded-b-xl bg-gradient-to-b from-linea to-hundido" aria-hidden="true">
          <span class="absolute left-1/2 top-0 h-1.5 w-20 -translate-x-1/2 rounded-b-lg bg-hundido/80" />
        </div>
      </div>

      <!-- TELÉFONO -->
      <div v-else class="mx-auto w-full max-w-[16rem]">
        <div class="vidrio rounded-[2rem] p-2">
          <NuxtImg
            :src="src"
            :alt="alt"
            :loading="prioridad ? 'eager' : 'lazy'"
            format="webp"
            sizes="256px"
            class="block w-full rounded-[1.6rem] object-cover object-top"
            style="aspect-ratio: 9 / 19.5"
          />
        </div>
      </div>
    </div>

    <figcaption v-if="pie" class="mono mt-4 text-tinta-tenue">{{ pie }}</figcaption>
  </figure>
</template>
