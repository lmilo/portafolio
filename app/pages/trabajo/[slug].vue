<script setup lang="ts">
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

useSeoMeta({
  title: () => caso.value.titulo,
  description: () => caso.value.resumen
})
</script>

<template>
  <article v-if="caso" class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <NuxtLink
      :to="localePath('/trabajo')"
      class="mono mt-8 inline-block text-tinta-tenue transition-colors duration-[120ms] hover:text-acento"
    >← {{ t('comun.volverTrabajo') }}</NuxtLink>

    <header class="border-b border-linea py-10 md:py-14">
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
    </header>

    <!--
      La columna de margen aparece a partir de 1024px. `relative` en el
      contenedor es lo que ancla las notas de <Margen> a su párrafo.
    -->
    <div class="prosa-caso relative py-12 lg:max-w-[34rem]">
      <ContentRenderer :value="caso" />
    </div>

    <footer class="border-t border-linea py-10">
      <h2 class="rotulo">{{ t('comun.stack') }}</h2>
      <p class="mono mt-3 text-tinta-media">{{ caso.stack.join(' · ') }}</p>

      <div v-if="caso.enlaces?.length" class="mt-8 flex flex-wrap gap-4">
        <EnlaceProyecto v-for="e in caso.enlaces" :key="e.url" :enlace="e" />
      </div>

      <nav class="mt-14 flex flex-wrap justify-between gap-4 border-t border-linea pt-8">
        <NuxtLink
          v-if="data?.anterior"
          :to="localePath(rutaCaso(data.anterior.path))"
          class="group max-w-[45%]"
        >
          <span class="rotulo">← {{ t('comun.anterior') }}</span>
          <span class="mt-1 block transition-colors duration-[120ms] group-hover:text-acento">
            {{ data.anterior.titulo }}
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="data?.siguiente"
          :to="localePath(rutaCaso(data.siguiente.path))"
          class="group ms-auto max-w-[45%] text-right"
        >
          <span class="rotulo">{{ t('comun.siguiente') }} →</span>
          <span class="mt-1 block transition-colors duration-[120ms] group-hover:text-acento">
            {{ data.siguiente.titulo }}
          </span>
        </NuxtLink>
      </nav>
    </footer>
  </article>
</template>
