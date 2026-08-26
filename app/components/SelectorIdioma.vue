<script setup lang="ts">
/**
 * Enlaces reales con hreflang, no botones con JS: un selector de idioma que no
 * es navegable ni indexable falla en las dos cosas que tiene que hacer.
 */
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <nav
    :aria-label="t('comun.cambiarIdioma')"
    class="flex items-stretch border border-vidrio-borde"
  >
    <NuxtLink
      v-for="l in locales"
      :key="l.code"
      :to="switchLocalePath(l.code)"
      :hreflang="l.language"
      :aria-current="l.code === locale ? 'true' : undefined"
      class="mono px-2.5 py-2 font-semibold uppercase transition-colors duration-150"
      :class="l.code === locale
        ? 'bg-acento text-acento-fg'
        : 'text-tinta-media hover:bg-acento hover:text-acento-fg'"
    >{{ l.code }}</NuxtLink>
  </nav>
</template>
