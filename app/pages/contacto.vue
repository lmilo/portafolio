<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({ title: () => t('contacto.titulo'), description: () => t('contacto.entrada') })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <h1 class="fuente-display text-[clamp(2.5rem,6vw,3.5rem)]">{{ t('contacto.titulo') }}</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('contacto.entrada') }}</p>

      <a
        :href="`mailto:${perfil.correo}`"
        class="fuente-display mt-10 inline-block text-2xl text-acento underline
               underline-offset-[6px] transition-colors duration-[120ms] hover:text-acento-hover md:text-3xl"
      >{{ perfil.correo }}</a>

      <p class="medida-ancha mt-10 text-tinta-media">{{ t('contacto.queIncluir') }}</p>

      <ul class="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        <li v-for="s in enlacesSociales()" :key="s.url">
          <a
            :href="s.url"
            class="mono text-tinta-media transition-colors duration-[120ms] hover:text-acento"
            :target="s.url.startsWith('mailto:') ? undefined : '_blank'"
            :rel="s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
          >{{ s.etiqueta }}</a>
        </li>
      </ul>
    </header>
  </div>
</template>
