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

const mediciones = computed(() => [
  { valor: '6', etiqueta: t('home.cifra1'), nota: t('home.cifra1Nota'), a: '/trabajo' },
  { valor: '0,022 s', etiqueta: t('home.cifra2'), nota: t('home.cifra2Nota'), a: '/trabajo/crm-sposito' },
  { valor: '172', etiqueta: t('home.cifra3'), nota: t('home.cifra3Nota'), a: '/trabajo/recargo' },
  { valor: '3', etiqueta: t('home.cifra4'), nota: t('home.cifra4Nota'), a: '/trabajo' }
])

const caminos = computed(() => [
  { titulo: t('home.camino1Titulo'), texto: t('home.camino1Texto'), cta: t('home.camino1Cta'), a: '/contacto' },
  { titulo: t('home.camino2Titulo'), texto: t('home.camino2Texto'), cta: t('home.camino2Cta'), a: '/servicios' },
  { titulo: t('home.camino3Titulo'), texto: t('home.camino3Texto'), cta: t('home.camino3Cta'), a: '/productos' }
])
</script>

<template>
  <div class="grano">
    <!--
      HERO. La retícula y el halo le quitan al fondo la planitud de "div con
      color de fondo", que es la firma de la página generada a máquina.
    -->
    <section class="reticula halo-laton relative overflow-hidden">
      <div class="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-14 md:px-12 md:pb-28 md:pt-20">
        <p class="mono text-tinta-tenue">{{ t('home.kicker') }}</p>

        <h1 class="fuente-display mt-7 max-w-[13ch] text-[clamp(2.5rem,7.5vw,5.25rem)]">
          {{ t('home.tituloA') }}
          <span class="acentuado">{{ t('home.tituloAcento') }}</span>
          {{ t('home.tituloB') }}
        </h1>

        <div class="mt-12 gap-10 lg:grid lg:grid-cols-[minmax(0,38rem)_minmax(0,16rem)]">
          <div class="space-y-4 text-lg leading-relaxed text-tinta-media">
            <p>{{ t('home.entrada1') }}</p>
            <p>{{ t('home.entrada2') }}</p>
          </div>

          <!-- El gesto de la casa, en la portada: la anotación vive al lado de
               lo que comenta, no al pie ni dentro de un desplegable. -->
          <aside class="mt-8 rounded-sm bg-acento-tenue px-4 py-3 lg:mt-1 lg:bg-transparent
                        lg:border-l lg:border-linea-fuerte lg:px-0 lg:py-0 lg:pl-5">
            <p class="mono text-acento">{{ t('home.notaHero') }}</p>
          </aside>
        </div>

        <div class="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <NuxtLink
            :to="localePath('/contacto')"
            class="inline-flex items-center gap-2 rounded-sm bg-acento px-6 py-3 font-semibold
                   text-acento-fg transition-[background-color,transform] duration-150
                   ease-out hover:bg-acento-hover active:scale-[0.97]"
          >
            {{ t('comun.escribeme') }} <span aria-hidden="true">→</span>
          </NuxtLink>

          <NuxtLink
            :to="localePath('/trabajo')"
            class="mono text-tinta-media underline-offset-4 transition-colors duration-150
                   hover:text-acento hover:underline"
          >{{ t('home.verTodo') }} →</NuxtLink>

          <p v-if="perfil.disponible" class="rotulo ms-auto flex items-center gap-2">
            <span class="size-1.5 rounded-full bg-exito" aria-hidden="true" />
            {{ t('comun.disponible') }}
          </p>
        </div>
      </div>
    </section>

    <!-- LAS MEDICIONES. Ficha técnica, no marcador: cada valor enlaza al caso
         donde está descrita la medición que lo produjo. -->
    <section class="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12 md:py-20">
      <h2 class="fuente-display revelar text-[clamp(1.5rem,3vw,2rem)]">
        {{ t('home.cifrasTitulo') }}
      </h2>
      <HojaMediciones :filas="mediciones" class="revelar mt-8" />
    </section>

    <!-- CASO DESTACADO con el producto en pantalla. Enseñar el sistema
         funcionando es lo que separa esto de una lista de artículos. -->
    <section v-if="destacado" class="mx-auto w-full max-w-[1200px] px-6 pb-16 md:px-12 md:pb-24">
      <article class="revelar grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-center">
        <div>
          <EstadoProyecto :estado="destacado.estado" />

          <h2 class="fuente-display mt-4 text-[clamp(2rem,4.5vw,3rem)]">
            <NuxtLink
              :to="localePath(rutaCaso(destacado.path))"
              class="transition-colors duration-150 hover:text-acento"
            >{{ destacado.titulo }}</NuxtLink>
          </h2>
          <p v-if="destacado.cliente" class="mono mt-2 text-tinta-tenue">{{ destacado.cliente }}</p>

          <p class="medida mt-6 text-lg text-tinta-media">{{ destacado.gancho }}</p>

          <CintaEvidencia :datos="destacado.evidencia" class="mt-6" />

          <NuxtLink
            :to="localePath(rutaCaso(destacado.path))"
            class="mono group mt-8 inline-flex items-center gap-2 text-acento"
          >
            {{ t('comun.verCaso') }}
            <span class="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
          </NuxtLink>
        </div>

        <CapturaCaso
          v-if="destacado.capturas?.[0]"
          :captura="destacado.capturas[0]"
          class="!my-0"
        />
        <CapturaPendiente v-else :descripcion="destacado.titulo" class="!my-0" />
      </article>
    </section>

    <!-- Anchos distintos a propósito: una rejilla de rectángulos idénticos se
         lee como plantilla. -->
    <section class="mx-auto w-full max-w-[1200px] px-6 pb-16 md:px-12 md:pb-24">
      <div class="grid gap-4 lg:grid-cols-5">
        <CasoTarjeta
          v-for="(c, i) in secundarios"
          :key="c.path"
          :caso="c as any"
          class="revelar"
          :class="i === 0 ? 'lg:col-span-3' : 'lg:col-span-2'"
          :style="{ '--retraso': `${i * 50}ms` }"
        />
      </div>
    </section>

    <!-- LOS TRES CAMINOS. Tres opciones paralelas, sin numerar: no son una
         secuencia y numerarlas sería andamiaje. -->
    <section class="reticula relative border-t border-linea">
      <div class="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12 md:py-24">
        <h2 class="fuente-display revelar text-[clamp(2rem,5vw,3.25rem)]">
          {{ t('home.caminosTitulo') }}
        </h2>
        <p class="medida-ancha revelar mt-4 text-tinta-media">{{ t('home.caminosKicker') }}</p>

        <ul class="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
          <li
            v-for="(c, i) in caminos"
            :key="c.a"
            class="revelar group relative flex flex-col border-t border-linea-fuerte pt-6
                   transition-colors duration-150 hover:border-acento"
            :style="{ '--retraso': `${i * 50}ms` }"
          >
            <h3 class="fuente-display text-xl">
              <NuxtLink :to="localePath(c.a)" class="after:absolute after:inset-0">
                {{ c.titulo }}
              </NuxtLink>
            </h3>
            <p class="mt-3 flex-1 text-tinta-media">{{ c.texto }}</p>
            <span class="mono mt-6 flex items-center gap-2 text-acento">
              {{ c.cta }}
              <span class="transition-transform duration-150 group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <section class="border-t border-linea bg-hundido">
      <div class="mx-auto flex w-full max-w-[1200px] flex-wrap items-end justify-between gap-8 px-6 py-16 md:px-12 md:py-20">
        <div>
          <h2 class="fuente-display max-w-[16ch] text-[clamp(1.75rem,4vw,2.5rem)]">
            {{ t('home.cierreTitulo') }}
          </h2>
          <p class="medida mt-4 text-tinta-media">{{ t('home.cierreTexto') }}</p>
        </div>

        <a
          :href="`mailto:${perfil.correo}`"
          class="mono text-lg text-acento underline underline-offset-[6px]
                 transition-colors duration-150 hover:text-acento-hover"
        >{{ perfil.correo }}</a>
      </div>
    </section>
  </div>
</template>
