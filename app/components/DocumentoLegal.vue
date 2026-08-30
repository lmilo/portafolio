<script setup lang="ts">
import type { SeccionLegal } from '~/utils/legal'
import { CORREO_LEGAL } from '~/utils/legal'

/**
 * Rinde un documento legal de cualquiera de las apps.
 *
 * Antes estaba escrito contra Recargo —importaba sus constantes y traía su nombre puesto—
 * y al llegar la segunda app había que duplicarlo o generalizarlo. La app entra por props
 * y los textos viven en `~/utils/legal<App>.ts`.
 *
 * Lo brutalista aquí se contiene a propósito: bordes duros y rótulos mono sí, pero el
 * cuerpo va en medida de lectura y sin adornos. Alguien que abre esto lo hace porque
 * quiere entender qué pasa con sus datos, muchas veces desde el teléfono y con prisa; la
 * dirección de arte no puede ponerse por delante de eso.
 */
const props = defineProps<{
  /** El nombre de la app, para el rótulo. */
  app: string
  titulo: string
  entrada: string
  secciones: SeccionLegal[]
  vigencia: string
  repo: string
}>()

const { locale } = useI18n()

/** Las entradas que empiezan con "- " forman una lista; el resto son párrafos. */
function bloques(parrafos: string[]) {
  const salida: { tipo: 'p' | 'ul'; items: string[] }[] = []
  for (const p of parrafos) {
    const esItem = p.startsWith('- ')
    const ultimo = salida[salida.length - 1]
    if (esItem && ultimo?.tipo === 'ul') ultimo.items.push(p.slice(2))
    else salida.push({ tipo: esItem ? 'ul' : 'p', items: [esItem ? p.slice(2) : p] })
  }
  return salida
}

const secciones = computed(() => props.secciones.map((s) => ({ ...s, bloques: bloques(s.parrafos) })))
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <p class="rotulo">{{ app }}</p>
      <h1 class="fuente-display mt-3 text-[clamp(2.2rem,5vw,3.2rem)]">{{ titulo }}</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ entrada }}</p>
      <p class="mono mt-6 text-sm text-tinta-tenue">Vigente desde el {{ vigencia }}</p>
    </header>

    <!--
      El sitio es bilingüe pero estos textos no se traducen: las apps se distribuyen solo en
      Colombia y se rigen por la ley colombiana. Una traducción no oficial de un documento
      legal crea el problema de cuál versión manda si las dos divergen.
    -->
    <p
      v-if="locale !== 'es'"
      class="border-2 border-acento bg-hundido px-5 py-4 text-sm text-tinta-media"
    >
      This app is distributed in Colombia only and governed by Colombian law. The binding
      text is the Spanish original below — an unofficial translation would create ambiguity
      about which version prevails. Questions in English are welcome at
      <a class="mono font-bold underline" :href="`mailto:${CORREO_LEGAL}`">{{ CORREO_LEGAL }}</a>.
    </p>

    <div class="pb-20">
      <section v-for="s in secciones" :key="s.titulo" class="border-t border-linea py-10">
        <h2 class="fuente-display text-xl md:text-2xl">{{ s.titulo }}</h2>

        <div
          class="mt-5"
          :class="s.destacado ? 'medida-ancha border-l-4 border-acento bg-hundido py-5 pl-5 pr-4' : ''"
        >
          <template v-for="(b, i) in s.bloques" :key="i">
            <ul v-if="b.tipo === 'ul'" class="medida-ancha mt-3 space-y-2 first:mt-0">
              <li v-for="item in b.items" :key="item" class="flex gap-3 text-tinta-media">
                <span class="mono text-acento" aria-hidden="true">—</span>
                <span>{{ item }}</span>
              </li>
            </ul>
            <p v-else class="medida-ancha mt-3 text-tinta-media first:mt-0">{{ b.items[0] }}</p>
          </template>
        </div>
      </section>

      <section class="border-t border-linea py-10">
        <h2 class="rotulo">Preguntas</h2>
        <p class="medida-ancha mt-4 text-tinta-media">
          <a class="mono font-bold underline" :href="`mailto:${CORREO_LEGAL}`">{{ CORREO_LEGAL }}</a>
        </p>
        <p class="medida-ancha mt-3 text-sm text-tinta-tenue">
          El texto completo también vive versionado en
          <a class="mono font-bold underline" :href="repo" target="_blank" rel="noopener noreferrer">
            el repositorio del proyecto</a>, donde cada cambio queda con su fecha.
        </p>
        <div class="filo mt-8 h-3" aria-hidden="true" />
      </section>
    </div>
  </div>
</template>
