<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

const enlaces = computed(() => [
  { a: '/trabajo', txt: t('nav.trabajo') },
  { a: '/servicios', txt: t('nav.servicios') },
  { a: '/productos', txt: t('nav.productos') },
  { a: '/contacto', txt: t('nav.contacto') }
])
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-fondo text-tinta">
    <a
      href="#contenido"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4
             focus:bg-acento focus:px-4 focus:py-2 focus:font-bold focus:text-acento-fg"
      style="z-index: var(--z-superpuesto)"
    >{{ t('comun.saltarContenido') }}</a>

    <header
      class="sticky top-0 border-b border-vidrio-borde bg-fondo/95 backdrop-blur-sm"
      style="z-index: var(--z-pegado)"
    >
      <div class="mx-auto flex w-full max-w-[1280px] items-center gap-4 px-5 py-3 md:px-10">
        <NuxtLink
          :to="localePath('/')"
          class="fuente-display rounded-[10px] bg-gradient-to-br from-violeta via-cian
                 to-rosa px-2.5 py-1 text-lg text-acento-fg shadow-suave
                 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
                 motion-safe:hover:scale-105"
        >{{ perfil.iniciales }}</NuxtLink>

        <nav class="hidden items-center gap-1 md:flex" aria-label="principal">
          <NuxtLink
            v-for="e in enlaces"
            :key="e.a"
            :to="localePath(e.a)"
            class="border-2 border-transparent px-3 py-1.5 text-sm font-semibold
                   transition-colors duration-150 hover:border-linea-fuerte hover:bg-acento
                   hover:text-acento-fg"
            active-class="border-linea-fuerte bg-acento text-acento-fg"
          >{{ e.txt }}</NuxtLink>
        </nav>

        <div class="ms-auto flex items-center gap-2">
          <NuxtLink
            :to="localePath('/contacto')"
            class="pulsable boton-acento hidden px-4 py-2 text-sm lg:inline-flex"
          >{{ t('comun.hablemos') }}</NuxtLink>
          <SelectorTema />
          <SelectorIdioma />
          <MenuMovil :enlaces="enlaces" />
        </div>
      </div>
    </header>

    <main id="contenido" class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-vidrio-borde bg-hundido">
      <div class="mx-auto w-full max-w-[1280px] px-5 py-12 md:px-10">
        <div class="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p class="fuente-display text-2xl">{{ perfil.nombre }}</p>
            <p class="mono mt-2 text-tinta-tenue">
              {{ perfil.titulo[$i18n.locale as 'es' | 'en'] }} ·
              {{ perfil.ciudad[$i18n.locale as 'es' | 'en'] }}
            </p>
          </div>

          <nav aria-label="redes">
            <ul class="flex flex-wrap gap-3">
              <li v-for="s in enlacesSociales()" :key="s.url">
                <a
                  :href="s.url"
                  class="pulsable boton-hueco inline-flex px-4 py-2 text-sm"
                  :target="s.url.startsWith('mailto:') ? undefined : '_blank'"
                  :rel="s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
                >{{ s.etiqueta }}</a>
              </li>
            </ul>
          </nav>
        </div>

        <!--
          Los documentos legales de Recargo viven en este sitio porque Google Play exige una
          URL pública y estable para publicar la app. Van en el pie y no en la navegación:
          no son contenido del portafolio, son la letra pequeña de otro producto.
        -->
        <nav class="mt-10 border-t border-linea pt-6" aria-label="legal">
          <p class="rotulo">{{ $t('pie.legal') }}</p>
          <ul class="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <NuxtLink
                :to="localePath('/legal/recargo/privacidad')"
                class="mono text-sm text-tinta-tenue underline"
              >{{ $t('pie.privacidad') }}</NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="localePath('/legal/recargo/terminos')"
                class="mono text-sm text-tinta-tenue underline"
              >{{ $t('pie.terminos') }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="filo mt-10 h-3" aria-hidden="true" />
      </div>
    </footer>

    <VolverArriba />
  </div>
</template>
