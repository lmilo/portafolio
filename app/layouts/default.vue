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
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50
             focus:rounded-sm focus:bg-acento focus:px-4 focus:py-2 focus:text-acento-fg"
    >
      {{ t('comun.saltarContenido') }}
    </a>

    <!--
      La cabecera no es sticky a propósito: una barra fija roba 64px de alto
      durante toda la lectura, y este sitio pide leer (LAYOUT §3).
    -->
    <header class="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-x-6 gap-y-3 px-6 py-6 md:px-12">
      <NuxtLink :to="localePath('/')" class="fuente-display text-lg tracking-normal">
        {{ perfil.iniciales }}
      </NuxtLink>

      <nav class="flex flex-wrap items-center gap-x-5 gap-y-1" aria-label="principal">
        <NuxtLink
          v-for="e in enlaces"
          :key="e.a"
          :to="localePath(e.a)"
          class="text-sm text-tinta-media transition-colors duration-[120ms] hover:text-acento"
          active-class="text-tinta"
        >{{ e.txt }}</NuxtLink>
      </nav>

      <div class="ms-auto flex items-center gap-3">
        <SelectorTema />
        <SelectorIdioma />
      </div>
    </header>

    <main id="contenido" class="flex-1">
      <slot />
    </main>

    <footer class="mt-24 border-t border-linea">
      <div class="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-10 md:px-12">
        <p class="mono text-tinta-tenue">
          {{ perfil.nombre }} · {{ perfil.ciudad[$i18n.locale as 'es' | 'en'] }}
        </p>
        <ul class="flex flex-wrap gap-x-5 gap-y-2">
          <li v-for="s in enlacesSociales()" :key="s.url">
            <a
              :href="s.url"
              class="mono text-tinta-media transition-colors duration-[120ms] hover:text-acento"
              :target="s.url.startsWith('mailto:') ? undefined : '_blank'"
              :rel="s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
            >{{ s.etiqueta }}</a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>
