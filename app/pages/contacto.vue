<script setup lang="ts">
const { t } = useI18n()
useRevelar()
useSeoMeta({ title: () => t('contacto.titulo'), description: () => t('contacto.entrada') })
</script>

<template>
  <div class="mx-auto w-full max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
    <header class="max-w-3xl">
      <h1 class="fuente-display text-[clamp(2.25rem,6vw,4rem)]">{{ t('contacto.titulo') }}</h1>
      <div class="mt-6 h-2 w-40 bg-acento" aria-hidden="true" />
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('contacto.entrada') }}</p>
      <p class="medida-ancha mt-3 text-tinta-media">{{ t('contacto.queIncluir') }}</p>
    </header>

    <div class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start">
      <FormularioContacto class="revelar" />

      <aside class="revelar space-y-5" style="--retraso: 60ms">
        <div class="bloque bg-hundido p-6">
          <p class="mono font-semibold uppercase">{{ t('contacto.oPorCorreo') }}</p>
          <a
            :href="`mailto:${perfil.correo}`"
            class="mono mt-3 block break-all font-bold text-enlace underline underline-offset-4
                   transition-colors duration-150 hover:text-enlace-hover"
          >{{ perfil.correo }}</a>

          <ul class="mt-6 space-y-2.5">
            <li v-for="s in enlacesSociales().filter(s => !s.url.startsWith('mailto:'))" :key="s.url">
              <a
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                class="pulsable boton-hueco flex w-full items-center justify-between px-4 py-2.5 text-sm"
              >
                {{ s.etiqueta }}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <p class="mono flex items-center gap-2 text-tinta-tenue">
          <span class="size-2 bg-exito" aria-hidden="true" />
          {{ t('comun.disponible') }}
        </p>
      </aside>
    </div>
  </div>
</template>
