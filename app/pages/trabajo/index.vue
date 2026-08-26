<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { casos: colCasos, archivo: colArchivo } = useColecciones()

useRevelar()

const { data } = await useAsyncData(
  () => `trabajo-${locale.value}`,
  async () => ({
    casos: await queryCollection(colCasos.value).order('orden', 'ASC').all(),
    archivo: await queryCollection(colArchivo.value).order('orden', 'ASC').all()
  }),
  { watch: [colCasos] }
)

useSeoMeta({ title: () => t('trabajo.titulo'), description: () => t('trabajo.entrada') })

/**
 * Ritmo del índice: ancha, dos normales, ancha invertida, dos normales.
 * Seis tarjetas del mismo tamaño se leen como una plantilla; alternar el ancho
 * obliga al ojo a recorrer la página en vez de barrerla.
 */
const disposicion = ['ancha', 'normal', 'normal', 'ancha-inv', 'normal', 'normal'] as const

const conFormato = computed(() =>
  (data.value?.casos ?? []).map((caso, i) => {
    const forma = disposicion[i % disposicion.length] ?? 'normal'
    return {
      caso,
      variante: forma.startsWith('ancha') ? 'ancha' as const : 'normal' as const,
      invertida: forma === 'ancha-inv',
      span: forma.startsWith('ancha') ? 'lg:col-span-6' : 'lg:col-span-3'
    }
  })
)

const enProduccion = computed(() =>
  (data.value?.archivo ?? []).filter(f => f.estado === 'produccion').length
)
</script>

<template>
  <div>
    <header class="reticula relative border-b border-vidrio-borde">
      <div class="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
        <h1 class="fuente-display text-[clamp(2.5rem,7vw,4.5rem)]">{{ t('trabajo.titulo') }}</h1>
        <div class="mt-6 h-2 w-48 bg-acento" aria-hidden="true" />
        <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('trabajo.entrada') }}</p>
      </div>
    </header>

    <section class="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-10 md:py-16">
      <div class="grid gap-6 lg:grid-cols-6">
        <CasoTarjeta
          v-for="(f, i) in conFormato"
          :key="f.caso.path"
          :caso="f.caso as any"
          :variante="f.variante"
          :invertida="f.invertida"
          class="revelar"
          :class="f.span"
          :style="{ '--retraso': `${Math.min(i, 3) * 50}ms` }"
        />
      </div>
    </section>

    <!-- ARCHIVO -->
    <section class="border-t border-vidrio-borde bg-hundido">
      <div class="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 class="fuente-display revelar text-[clamp(1.85rem,4.5vw,2.75rem)]">
            {{ t('comun.archivo') }}
          </h2>
          <p class="mono revelar text-tinta-tenue">
            {{ data?.archivo?.length }} · {{ enProduccion }} {{ t('estado.produccion') }}
          </p>
        </div>
        <p class="medida-ancha revelar mt-4 text-tinta-media">{{ t('trabajo.archivoEntrada') }}</p>

        <ul class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <li
            v-for="(f, i) in data?.archivo"
            :key="f.titulo"
            class="revelar bloque flex flex-col bg-superficie p-5"
            :style="{ '--retraso': `${Math.min(i, 5) * 40}ms` }"
          >
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="font-bold">{{ f.titulo }}</h3>
              <EstadoProyecto :estado="f.estado" />
            </div>

            <p class="mt-3 flex-1 text-sm text-tinta-media">{{ f.resumen }}</p>

            <p class="mono mt-4 text-tinta-tenue">{{ f.stack.slice(0, 4).join(' · ') }}</p>

            <div v-if="f.enlaces?.length" class="mt-4 flex flex-wrap gap-2">
              <a
                v-for="e in f.enlaces"
                :key="e.url"
                :href="e.url"
                target="_blank"
                rel="noopener noreferrer"
                class="pulsable boton-hueco inline-flex px-3 py-1.5 text-sm"
              >{{ e.etiqueta }} ↗</a>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
      <div class="revelar bloque bg-acento p-8 text-acento-fg md:p-10">
        <h2 class="fuente-display max-w-[18ch] text-[clamp(1.6rem,4vw,2.5rem)]">
          {{ t('home.cierreTitulo') }}
        </h2>
        <NuxtLink
          :to="localePath('/contacto')"
          class="pulsable mt-6 inline-flex border-acento-fg bg-acento-fg px-6 py-3 font-bold
                 text-acento shadow-suave"
        >{{ t('contacto.abrirFormulario') }} →</NuxtLink>
      </div>
    </section>
  </div>
</template>
