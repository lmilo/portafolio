<script setup lang="ts">
/**
 * Enlaces reales con hreflang, no botones con JS: un selector de idioma que
 * no es navegable ni indexable falla en las dos cosas que tiene que hacer.
 */
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { t } = useI18n()
</script>

<template>
  <nav :aria-label="t('comun.cambiarIdioma')" class="flex items-center gap-1">
    <template v-for="(l, i) in locales" :key="l.code">
      <span v-if="i > 0" aria-hidden="true" class="rotulo opacity-40">/</span>
      <NuxtLink
        :to="switchLocalePath(l.code)"
        :hreflang="l.language"
        :aria-current="l.code === locale ? 'true' : undefined"
        class="rotulo transition-colors duration-[120ms] hover:text-acento"
        :class="l.code === locale ? 'text-tinta' : ''"
      >{{ l.code }}</NuxtLink>
    </template>
  </nav>
</template>
