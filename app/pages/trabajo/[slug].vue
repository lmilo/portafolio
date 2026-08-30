<script setup lang="ts">
import { APPS_LEGALES } from '~/utils/legal'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const { casos: coleccion } = useColecciones()
const slug = computed(() => route.params.slug as string)

const { data } = await useAsyncData(
  () => `caso-${slug.value}-${locale.value}`,
  async () => {
    const todos = await queryCollection(coleccion.value).order('orden', 'ASC').all()
    const i = todos.findIndex(c => c.path.endsWith(`/${slug.value}`))
    return {
      caso: i >= 0 ? todos[i] : null,
      anterior: i > 0 ? todos[i - 1] : null,
      siguiente: i >= 0 && i < todos.length - 1 ? todos[i + 1] : null
    }
  },
  { watch: [coleccion] }
)

if (!data.value?.caso) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found', fatal: true })
}

const caso = computed(() => data.value!.caso!)

/**
 * Los documentos legales de la app de este caso, si los tiene publicados.
 *
 * Viven junto al proyecto y no en un índice global a propósito: con dos apps ya son
 * cuatro documentos y los juegos de Play traerán ocho más. Una lista de doce enlaces en el
 * pie no la lee nadie y no dice de qué app es cada uno. Aquí, en cambio, están donde el
 * lector ya sabe de qué producto está hablando.
 *
 * El slug del caso y el de la app coinciden por convención; si algún día dejan de hacerlo,
 * esto simplemente no pinta nada en vez de romperse.
 */
const legal = computed(() => APPS_LEGALES.find(a => a.slug === slug.value) ?? null)
const portada = computed(() => caso.value.capturas?.[0])
const resto = computed(() => caso.value.capturas?.slice(1) ?? [])
const soloMoviles = computed(() =>
  resto.value.length > 1 && resto.value.every(c => c.dispositivo === 'movil')
)

useSeoMeta({
  title: () => caso.value.titulo,
  description: () => caso.value.resumen
})
</script>

<template>
  <article v-if="caso" class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <NuxtLink
      :to="localePath('/trabajo')"
      class="pulsable boton-hueco mono mt-8 inline-flex px-4 py-2"
    >← {{ t('comun.volverTrabajo') }}</NuxtLink>

    <header class="border-b border-vidrio-borde py-10 md:py-14">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="rotulo">{{ String(caso.orden).padStart(2, '0') }}</span>
        <EstadoProyecto :estado="caso.estado" />
      </div>

      <h1 class="fuente-display mt-4 text-[clamp(2.5rem,6vw,3.5rem)]">{{ caso.titulo }}</h1>
      <p v-if="caso.cliente" class="mono mt-2 text-tinta-tenue">{{ caso.cliente }}</p>

      <CintaEvidencia :datos="caso.evidencia" class="mt-5" />

      <p class="medida-ancha mt-8 text-lg leading-relaxed text-tinta-media">
        {{ caso.resumen }}
      </p>

      <CapturaCaso
        v-if="portada"
        :captura="portada"
        prioridad
        class="mt-10"
      />
      <CapturaPendiente
        v-else
        :descripcion="`Captura pendiente: ${caso.titulo}`"
        class="mt-10"
      />
    </header>

    <!--
      La columna de margen aparece a partir de 1024px. `relative` en el
      contenedor es lo que ancla las notas de <Margen> a su párrafo.
    -->
    <div class="prosa-caso relative py-12 lg:max-w-[34rem]">
      <ContentRenderer :value="caso" />
    </div>

    <section v-if="resto.length" class="border-t border-vidrio-borde py-10">
      <!-- Si todo lo que queda son pantallas de teléfono, van en fila: apiladas
           gastan una pantalla cada una y se pierde que son un mismo recorrido. -->
      <div :class="soloMoviles ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : ''">
        <CapturaCaso
          v-for="c in resto"
          :key="c.archivo"
          :captura="c"
          :class="soloMoviles ? '!my-0' : ''"
        />
      </div>
    </section>

    <footer class="border-t border-vidrio-borde py-10">
      <h2 class="rotulo">{{ t('comun.stack') }}</h2>
      <p class="mono mt-3 text-tinta-media">{{ caso.stack.join(' · ') }}</p>

      <div v-if="caso.enlaces?.length" class="mt-8 flex flex-wrap gap-4">
        <EnlaceProyecto v-for="e in caso.enlaces" :key="e.url" :enlace="e" />
      </div>
      <!-- La ausencia de enlace se explica. Sin esto se lee como un olvido, y
           lo que es en realidad es una decisión sobre datos de terceros. -->
      <p v-else class="mono mt-8 flex max-w-lg items-start gap-2 border border-vidrio-borde p-4">
        <span aria-hidden="true">🔒</span>
        <span>{{ t('comun.sinEnlace') }}</span>
      </p>

      <div v-if="legal" class="mt-12 border-t border-vidrio-borde pt-8">
        <h2 class="rotulo">{{ t('comun.legal') }}</h2>
        <p class="medida mt-3 text-sm text-tinta-media">{{ t('comun.legalPie') }}</p>
        <div class="mt-5 flex flex-wrap gap-4">
          <NuxtLink
            :to="localePath(`/legal/${legal.slug}/privacidad`)"
            class="pulsable boton-hueco inline-flex px-4 py-2 text-sm"
          >{{ t('comun.legalDatos') }}</NuxtLink>
          <NuxtLink
            :to="localePath(`/legal/${legal.slug}/terminos`)"
            class="pulsable boton-hueco inline-flex px-4 py-2 text-sm"
          >{{ t('comun.legalTerminos') }}</NuxtLink>
        </div>
      </div>

      <nav class="mt-14 flex flex-wrap justify-between gap-4 border-t border-vidrio-borde pt-8">
        <NuxtLink
          v-if="data?.anterior"
          :to="localePath(rutaCaso(data.anterior.path))"
          class="group max-w-[45%]"
        >
          <span class="rotulo">← {{ t('comun.anterior') }}</span>
          <span class="mt-1 block transition-colors duration-[120ms] group-hover:text-enlace">
            {{ data.anterior.titulo }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="data?.siguiente"
          :to="localePath(rutaCaso(data.siguiente.path))"
          class="group ms-auto max-w-[45%] text-right"
        >
          <span class="rotulo">{{ t('comun.siguiente') }} →</span>
          <span class="mt-1 block transition-colors duration-[120ms] group-hover:text-enlace">
            {{ data.siguiente.titulo }}
          </span>
        </NuxtLink>
      </nav>
    </footer>
  </article>
</template>
