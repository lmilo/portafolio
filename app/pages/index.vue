<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { casos: coleccion } = useColecciones()

useRevelar()

const { data: casos } = await useAsyncData(
  () => `home-casos-${locale.value}`,
  () => queryCollection(coleccion.value).order('orden', 'ASC').limit(3).all(),
  { watch: [coleccion] }
)

const destacado = computed(() => casos.value?.[0])
const secundarios = computed(() => casos.value?.slice(1) ?? [])

useSeoMeta({
  title: () => `${perfil.nombre} — ${perfil.titulo[locale.value as 'es' | 'en']}`,
  description: () => `${t('home.tituloA')} ${t('home.tituloAcento')} ${t('home.tituloB')}`
})

// Datos verificables: cada uno está descrito en el caso correspondiente.
const datosCinta = computed(() => [
  `6 ${t('home.cifra1')}`,
  `0,022 s ${t('home.cifra2')}`,
  `172 ${t('home.cifra3')}`,
  `3 ${t('home.cifra4')}`,
  `244 commits · CRM Sposito`,
  `14 ${locale.value === 'es' ? 'tablas multi-tenant' : 'multi-tenant tables'}`
])

const caminos = computed(() => [
  { titulo: t('home.camino1Titulo'), texto: t('home.camino1Texto'), cta: t('home.camino1Cta'), a: '/contacto', tono: 'boton-acento' },
  { titulo: t('home.camino2Titulo'), texto: t('home.camino2Texto'), cta: t('home.camino2Cta'), a: '/servicios', tono: 'boton-hueco' },
  { titulo: t('home.camino3Titulo'), texto: t('home.camino3Texto'), cta: t('home.camino3Cta'), a: '/productos', tono: 'boton-hueco' }
])
</script>

<template>
  <div>
    <!-- HERO. La entrada va escalonada en CSS: corre fuera del hilo principal
         y no pierde fotogramas mientras el resto todavía monta. -->
    <section class="reticula relative overflow-hidden border-b border-vidrio-borde">
      <div class="mx-auto w-full max-w-[1280px] px-5 pb-14 pt-12 md:px-10 md:pb-20 md:pt-16">
        <p class="entra etiqueta" style="--retraso: 0ms">
          <span class="size-2 bg-exito" aria-hidden="true" />
          {{ t('home.kicker') }}
        </p>

        <h1 class="fuente-display mt-6 max-w-[13ch] text-[clamp(2.5rem,8vw,5.5rem)]">
          <span class="entra block" style="--retraso: 80ms">{{ t('home.tituloA') }}</span>
          <span class="entra acentuado block" style="--retraso: 160ms">{{ t('home.tituloAcento') }}</span>
          <span class="entra block" style="--retraso: 240ms">{{ t('home.tituloB') }}</span>
        </h1>

        <div
          class="entra-barra mt-8 h-2 w-full max-w-lg bg-cian"
          style="--retraso: 320ms"
          aria-hidden="true"
        />

        <div class="mt-8 gap-8 lg:grid lg:grid-cols-[minmax(0,36rem)_minmax(0,18rem)]">
          <div class="entra space-y-4 text-lg text-tinta-media" style="--retraso: 400ms">
            <p>{{ t('home.entrada1') }}</p>
            <p>{{ t('home.entrada2') }}</p>
          </div>

          <aside
            class="entra mt-8 border border-vidrio-borde bg-superficie p-4 lg:mt-0"
            style="--retraso: 460ms"
          >
            <p class="mono">{{ t('home.notaHero') }}</p>
          </aside>
        </div>

        <div class="entra mt-10 flex flex-wrap items-center gap-4" style="--retraso: 520ms">
          <NuxtLink :to="localePath('/contacto')" class="pulsable boton-acento px-6 py-3 text-base">
            {{ t('comun.escribeme') }} →
          </NuxtLink>
          <NuxtLink :to="localePath('/trabajo')" class="pulsable boton-hueco px-6 py-3 text-base">
            {{ t('home.verTodo') }}
          </NuxtLink>
        </div>

        <p
          class="entra mono mt-14 flex items-center gap-2 text-tinta-tenue"
          style="--retraso: 620ms"
        >
          <span class="invita-scroll inline-block" aria-hidden="true">↓</span>
          {{ t('comun.desliza') }}
        </p>
      </div>
    </section>

    <!-- Los datos cruzando la página: la misma evidencia que antes, pero
         visible de un vistazo y con movimiento. -->
    <CintaDatos :datos="datosCinta" />

    <!-- CASO DESTACADO -->
    <section v-if="destacado" class="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
      <article class="revelar grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-center">
        <div>
          <EstadoProyecto :estado="destacado.estado" />

          <h2 class="fuente-display mt-4 text-[clamp(2rem,5vw,3.25rem)]">
            <NuxtLink
              :to="localePath(rutaCaso(destacado.path))"
              class="transition-colors duration-150 hover:text-enlace"
            >{{ destacado.titulo }}</NuxtLink>
          </h2>
          <p v-if="destacado.cliente" class="mono mt-2 text-tinta-tenue">{{ destacado.cliente }}</p>

          <p class="medida mt-5 text-lg text-tinta-media">{{ destacado.gancho }}</p>

          <CintaEvidencia :datos="destacado.evidencia" class="mt-5" />

          <NuxtLink
            :to="localePath(rutaCaso(destacado.path))"
            class="pulsable boton-hueco mt-7 inline-flex px-5 py-2.5"
          >{{ t('comun.verCaso') }} →</NuxtLink>
        </div>

        <CapturaCaso
          v-if="destacado.capturas?.[0]"
          :captura="destacado.capturas[0]"
          class="!my-0"
        />
        <CapturaPendiente v-else :descripcion="destacado.titulo" class="!my-0" />
      </article>
    </section>

    <section class="mx-auto w-full max-w-[1280px] px-5 pb-14 md:px-10 md:pb-20">
      <div class="grid gap-5 lg:grid-cols-5">
        <CasoTarjeta
          v-for="(c, i) in secundarios"
          :key="c.path"
          :caso="c as any"
          class="revelar"
          :class="i === 0 ? 'lg:col-span-3' : 'lg:col-span-2'"
          :style="{ '--retraso': `${i * 50}ms` }"
        />
      </div>

      <div class="revelar mt-10 flex justify-center">
        <NuxtLink :to="localePath('/trabajo')" class="pulsable boton-hueco px-7 py-3.5 text-base">
          {{ t('home.verTodo') }} →
        </NuxtLink>
      </div>
    </section>

    <!-- LOS TRES CAMINOS, cada uno con su color. -->
    <section class="border-y border-vidrio-borde bg-hundido">
      <div class="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
        <h2 class="fuente-display revelar text-[clamp(2rem,5.5vw,3.5rem)]">
          {{ t('home.caminosTitulo') }}
        </h2>
        <p class="medida-ancha revelar mt-4 text-tinta-media">{{ t('home.caminosKicker') }}</p>

        <ul class="mt-10 grid gap-6 md:grid-cols-3">
          <li
            v-for="(c, i) in caminos"
            :key="c.a"
            class="revelar bloque flex flex-col p-6"
            :style="{ '--retraso': `${i * 60}ms` }"
          >
            <h3 class="fuente-display text-xl">{{ c.titulo }}</h3>
            <p class="mt-3 flex-1 text-tinta-media">{{ c.texto }}</p>
            <NuxtLink
              :to="localePath(c.a)"
              class="pulsable mt-6 inline-flex px-4 py-2.5 text-sm"
              :class="c.tono"
            >{{ c.cta }} →</NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- CIERRE con el formulario a un clic. -->
    <section class="mx-auto w-full max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
      <div class="revelar bloque bg-acento p-8 text-acento-fg md:p-12">
        <h2 class="fuente-display max-w-[16ch] text-[clamp(1.85rem,4.5vw,3rem)]">
          {{ t('home.cierreTitulo') }}
        </h2>
        <p class="medida-ancha mt-4 text-lg">{{ t('home.cierreTexto') }}</p>

        <div class="mt-8 flex flex-wrap gap-4">
          <NuxtLink
            :to="localePath('/contacto')"
            class="pulsable border-acento-fg bg-acento-fg px-6 py-3 font-bold text-acento
                   shadow-suave"
          >{{ t('contacto.abrirFormulario') }} →</NuxtLink>
          <a
            :href="`mailto:${perfil.correo}`"
            class="pulsable border-acento-fg bg-acento px-6 py-3 font-bold text-acento-fg
                   shadow-suave"
          >{{ perfil.correo }}</a>
        </div>
      </div>
    </section>
  </div>
</template>
