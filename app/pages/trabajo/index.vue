<script setup lang="ts">
const { t, locale } = useI18n()
const { casos: colCasos, archivo: colArchivo } = useColecciones()

const { data } = await useAsyncData(
  () => `trabajo-${locale.value}`,
  async () => ({
    casos: await queryCollection(colCasos.value).order('orden', 'ASC').all(),
    archivo: await queryCollection(colArchivo.value).order('orden', 'ASC').all()
  }),
  { watch: [colCasos] }
)

useSeoMeta({ title: () => t('trabajo.titulo'), description: () => t('trabajo.entrada') })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <h1 class="fuente-display text-[clamp(2.5rem,6vw,3.5rem)]">{{ t('trabajo.titulo') }}</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('trabajo.entrada') }}</p>
    </header>

    <div class="grid gap-4 md:grid-cols-2">
      <CasoTarjeta v-for="c in data?.casos" :key="c.path" :caso="c as any" />
    </div>

    <section class="mt-24 border-t border-linea pt-16">
      <h2 class="rotulo">{{ t('comun.archivo') }}</h2>
      <p class="medida-ancha mt-4 text-tinta-media">{{ t('trabajo.archivoEntrada') }}</p>

      <ul class="mt-10 divide-y divide-linea border-y border-linea">
        <li
          v-for="f in data?.archivo"
          :key="f.titulo"
          class="grid gap-3 py-6 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8"
        >
          <div>
            <h3 class="font-medium">{{ f.titulo }}</h3>
            <EstadoProyecto :estado="f.estado" class="mt-2" />
          </div>
          <div>
            <p class="text-tinta-media">{{ f.resumen }}</p>
            <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <p class="mono text-tinta-tenue">{{ f.stack.join(' · ') }}</p>
              <a
                v-for="e in f.enlaces"
                :key="e.url"
                :href="e.url"
                target="_blank"
                rel="noopener noreferrer"
                class="mono text-acento transition-colors duration-[120ms] hover:text-acento-hover"
              >{{ e.etiqueta }} ↗</a>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
