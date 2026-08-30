<script setup lang="ts">
import { APPS_LEGALES, CORREO_LEGAL } from '~/utils/legal'

const localePath = useLocalePath()

/**
 * El índice de la letra pequeña.
 *
 * Existe porque con dos apps ya son cuatro documentos, y el pie no puede crecer un enlace
 * por cada una — vienen más. Las rutas directas de cada documento se conservan intactas:
 * son las que apuntan las fichas de Google Play y romperlas es motivo de suspensión.
 */
useSeoMeta({
  title: 'Legal — políticas de datos y términos',
  description:
    'Las políticas de tratamiento de datos y los términos de uso de las apps: Recargo y Cocina a Mano.'
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <p class="rotulo">Legal</p>
      <h1 class="fuente-display mt-3 text-[clamp(2.2rem,5vw,3.2rem)]">La letra pequeña</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">
        Las políticas de datos y los términos de las apps publicadas. Están escritos para
        leerse sin abogado, porque quien las usa rara vez tiene uno.
      </p>
    </header>

    <div class="pb-20">
      <section v-for="app in APPS_LEGALES" :key="app.slug" class="border-t border-linea py-10">
        <h2 class="fuente-display text-xl md:text-2xl">{{ app.nombre }}</h2>
        <p class="medida-ancha mt-3 text-tinta-media">{{ app.quees }}</p>

        <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <li>
            <NuxtLink
              :to="localePath(`/legal/${app.slug}/privacidad`)"
              class="pulsable boton-hueco inline-flex px-4 py-2 text-sm"
            >Tratamiento de datos</NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="localePath(`/legal/${app.slug}/terminos`)"
              class="pulsable boton-hueco inline-flex px-4 py-2 text-sm"
            >Términos de uso</NuxtLink>
          </li>
        </ul>

        <p class="mono mt-4 text-sm text-tinta-tenue">Vigente desde el {{ app.vigencia }}</p>
      </section>

      <section class="border-t border-linea py-10">
        <h2 class="rotulo">Preguntas</h2>
        <p class="medida-ancha mt-4 text-tinta-media">
          <a class="mono font-bold underline" :href="`mailto:${CORREO_LEGAL}`">{{ CORREO_LEGAL }}</a>
        </p>
        <div class="filo mt-8 h-3" aria-hidden="true" />
      </section>
    </div>
  </div>
</template>
