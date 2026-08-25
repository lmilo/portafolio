<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { casos: coleccion } = useColecciones()

const { data: casos } = await useAsyncData(
  () => `home-casos-${locale.value}`,
  () => queryCollection(coleccion.value).order('orden', 'ASC').limit(3).all(),
  { watch: [coleccion] }
)

useSeoMeta({
  title: () => `${perfil.nombre} — ${perfil.titulo[locale.value as 'es' | 'en']}`,
  description: () => t('home.titulo')
})

const caminos = computed(() => [
  { titulo: t('home.camino1Titulo'), texto: t('home.camino1Texto'), a: '/contacto' },
  { titulo: t('home.camino2Titulo'), texto: t('home.camino2Texto'), a: '/servicios' },
  { titulo: t('home.camino3Titulo'), texto: t('home.camino3Texto'), a: '/productos' }
])
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <section class="py-16 md:py-28">
      <p class="rotulo">
        {{ perfil.titulo[locale as 'es' | 'en'] }} · {{ perfil.ciudad[locale as 'es' | 'en'] }}
      </p>

      <h1 class="fuente-display mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,4.5rem)]">
        {{ t('home.titulo') }}
      </h1>

      <div class="medida-ancha mt-10 space-y-4 text-lg leading-relaxed text-tinta-media">
        <p>{{ t('home.entrada1') }}</p>
        <p>{{ t('home.entrada2') }}</p>
      </div>

      <div class="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <p v-if="perfil.disponible" class="rotulo flex items-center gap-2">
          <span class="size-1.5 rounded-full bg-exito" aria-hidden="true" />
          {{ t('comun.disponible') }}
        </p>
        <NuxtLink
          :to="localePath('/contacto')"
          class="inline-flex items-center gap-2 rounded-sm bg-acento px-5 py-2.5
                 font-medium text-acento-fg transition-colors duration-[120ms]
                 hover:bg-acento-hover"
        >
          {{ t('comun.escribeme') }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </section>

    <section class="border-t border-linea py-16 md:py-24">
      <header class="flex flex-wrap items-baseline justify-between gap-4">
        <h2 class="rotulo">{{ t('home.seleccion') }}</h2>
        <NuxtLink
          :to="localePath('/trabajo')"
          class="mono text-acento transition-colors duration-[120ms] hover:text-acento-hover"
        >{{ t('home.verTodo') }} →</NuxtLink>
      </header>

      <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CasoTarjeta v-for="c in casos" :key="c.path" :caso="c as any" />
      </div>
    </section>

    <!-- Los tres caminos: el visitante se autoselecciona en vez de leer un
         discurso que no le corresponde (BRAND §1). -->
    <section class="border-t border-linea py-16 md:py-24">
      <h2 class="fuente-display text-3xl">{{ t('home.caminosTitulo') }}</h2>

      <ul class="mt-10 grid gap-px overflow-hidden rounded-sm border border-linea bg-linea md:grid-cols-3">
        <li v-for="c in caminos" :key="c.a" class="group relative bg-fondo p-6 md:p-8">
          <h3 class="fuente-display text-xl">
            <NuxtLink :to="localePath(c.a)" class="after:absolute after:inset-0">
              {{ c.titulo }}
            </NuxtLink>
          </h3>
          <p class="mt-3 text-tinta-media">{{ c.texto }}</p>
          <span
            class="mono mt-6 block text-acento transition-transform duration-[120ms]
                   group-hover:translate-x-1"
            aria-hidden="true"
          >→</span>
        </li>
      </ul>
    </section>
  </div>
</template>
