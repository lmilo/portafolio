<script setup lang="ts">
/**
 * Tarjeta de caso, en dos variantes.
 *
 * `ancha` pone la captura al lado del texto y ocupa la fila entera; `normal`
 * la pone encima. Alternar las dos es lo que le da ritmo al índice: seis
 * rectángulos del mismo tamaño se leen como una plantilla, por muy bien
 * escritos que estén.
 */
const props = withDefaults(defineProps<{
  caso: {
    path: string
    titulo: string
    cliente?: string
    gancho: string
    orden: number
    estado: 'produccion' | 'desarrollo' | 'entregado'
    stack: string[]
    capturas?: { archivo: string, alt: string, dispositivo?: string }[]
  }
  variante?: 'normal' | 'ancha'
  invertida?: boolean
}>(), { variante: 'normal', invertida: false })

const { t } = useI18n()
const localePath = useLocalePath()

const portada = computed(() => props.caso.capturas?.[0])
const esMovil = computed(() => portada.value?.dispositivo === 'movil')
</script>

<template>
  <article
    class="group relative flex border-2 border-linea-fuerte bg-superficie
           transition-[transform,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]
           hover:shadow-[6px_6px_0_var(--linea-fuerte)] md:hover:-translate-x-0.5 md:hover:-translate-y-0.5"
    :class="variante === 'ancha'
      ? ['flex-col', invertida ? 'lg:flex-row-reverse' : 'lg:flex-row']
      : 'flex-col'"
  >
    <!-- La captura. `overflow-hidden` para que el zoom del hover no se salga
         del borde, que en brutalismo es la pieza que no se puede romper. -->
    <div
      v-if="portada"
      class="relative shrink-0 overflow-hidden border-linea-fuerte"
      :class="[
        variante === 'ancha'
          ? (invertida ? 'lg:w-[46%] border-b-2 lg:border-b-0 lg:border-s-2' : 'lg:w-[46%] border-b-2 lg:border-b-0 lg:border-e-2')
          : 'border-b-2',
        esMovil ? 'bg-hundido' : ''
      ]"
    >
      <NuxtImg
        :src="`/capturas/${portada.archivo}`"
        :alt="portada.alt"
        loading="lazy"
        format="webp"
        sizes="100vw md:50vw lg:600px"
        class="block w-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
               motion-safe:group-hover:scale-[1.03]"
        :class="esMovil ? 'object-contain object-top' : 'object-cover object-top'"
        :style="{ aspectRatio: variante === 'ancha' ? '16 / 11' : '16 / 10' }"
      />
    </div>

    <div class="flex flex-1 flex-col p-5 md:p-6">
      <header class="flex flex-wrap items-center justify-between gap-3">
        <span class="mono text-tinta-tenue">{{ String(caso.orden).padStart(2, '0') }}</span>
        <EstadoProyecto :estado="caso.estado" />
      </header>

      <h3
        class="fuente-display mt-3"
        :class="variante === 'ancha' ? 'text-[clamp(1.5rem,3vw,2.25rem)]' : 'text-xl md:text-2xl'"
      >
        <NuxtLink
          :to="localePath(rutaCaso(caso.path))"
          class="after:absolute after:inset-0 group-hover:text-enlace"
        >{{ caso.titulo }}</NuxtLink>
      </h3>
      <p v-if="caso.cliente" class="mono mt-1 text-tinta-tenue">{{ caso.cliente }}</p>

      <p class="mt-3 flex-1 text-tinta-media">{{ caso.gancho }}</p>

      <footer class="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p class="mono text-tinta-tenue">{{ caso.stack.slice(0, 3).join(' · ') }}</p>
        <span class="mono flex items-center gap-1.5 font-semibold text-enlace">
          {{ t('comun.verCaso') }}
          <span class="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
        </span>
      </footer>
    </div>
  </article>
</template>
