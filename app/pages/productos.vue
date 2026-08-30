<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: () => t('productos.titulo'), description: () => t('productos.entrada') })

const es = computed(() => locale.value === 'es')

/**
 * Los sistemas que se alquilan por mensualidad. Es la oferta original de esta página.
 */
const enAlquiler = computed(() => [
  {
    nombre: 'Motila',
    caso: '/trabajo/motila',
    // El slug real en producción. Cambiarlo aquí si se siembra otra barbería.
    demo: 'https://motila.onrender.com/b/prueba-borrar',
    para: es.value ? 'Barberías y peluquerías' : 'Barbershops and salons',
    resumen: es.value
      ? 'Página pública de reservas para tus clientes, panel para cada barbero y panel administrativo para el dueño. Varias sedes en la misma cuenta.'
      : 'A public booking page for your clients, a panel for each barber and an admin panel for the owner. Multiple locations under one account.',
    incluye: es.value
      ? ['Reservas sin que el cliente cree cuenta', 'Cancelación y cambio por enlace', 'Horarios y ausencias por barbero', 'Estadísticas y liquidación de pagos', 'Clientes y fidelización']
      : ['Bookings with no client account needed', 'Cancel and reschedule by link', 'Per-barber hours and time off', 'Statistics and payout settlement', 'Client records and loyalty']
  }
])

/**
 * Las apps de Android.
 *
 * Van en esta página y no solo en Trabajo porque son producto terminado que cualquiera
 * puede usar, no un caso que se lee. Pero NO son "sistemas en alquiler": son gratuitas y se
 * sostienen con publicidad, así que tienen su propio bloque en vez de colarse en la promesa
 * de la sección de arriba, que habla de mensualidad.
 *
 * `play: null` mientras la ficha no exista. La tarjeta lo dice en vez de esconderlo: un
 * botón que lleva a un 404 de Play es peor que una línea honesta.
 */
const enPlay = computed(() => [
  {
    nombre: 'Recargo',
    caso: '/trabajo/recargo',
    play: null as string | null,
    para: es.value ? 'Trabajadores por turnos' : 'Shift workers',
    resumen: es.value
      ? 'Cuenta las horas nocturnas, dominicales, festivas y extras, dice cuánto valen, y saca el corte en PDF, Excel, Word o CSV — con una carta de reclamación ya redactada.'
      : 'Counts night, Sunday, holiday and overtime hours, works out what they are worth, and exports the pay period as PDF, Excel, Word or CSV — with a claim letter already drafted.',
    legal: '/legal/recargo/privacidad',
    incluye: es.value
      ? ['Marcar entrada y salida en dos toques', 'Ocho categorías legales, con su norma', 'Comparar contra el desprendible', 'Cinco formatos de salida', 'Todo en el teléfono, sin cuenta']
      : ['Clock in and out in two taps', 'Eight legal categories, each with its statute', 'Compare against your payslip', 'Five export formats', 'All on the phone, no account']
  },
  {
    nombre: 'Cocina a Mano',
    caso: '/trabajo/cocina-a-mano',
    play: null as string | null,
    para: es.value ? 'Cualquiera que haga mercado' : 'Anyone who buys groceries',
    resumen: es.value
      ? 'Lleva la cuenta de lo que hay en la despensa, avisa antes de que algo se venza, y ordena las recetas por lo que ya te alcanza. El mercado se carga con una foto de la factura.'
      : 'Tracks what is in the pantry, warns before anything spoils, and ranks recipes by what you can already cook. Groceries load from a photo of the receipt.',
    legal: '/legal/cocina-a-mano/privacidad',
    incluye: es.value
      ? ['Foto de la factura y entra el mercado', 'Código de barras y dictado por voz', 'Aviso antes de que algo se venza', 'Recetas ordenadas por lo que falta', 'Todo en el teléfono, sin cuenta']
      : ['Photograph the receipt to load groceries', 'Barcode scanning and voice dictation', 'A warning before anything spoils', 'Recipes ranked by what you are missing', 'All on the phone, no account']
  }
])
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <h1 class="fuente-display text-[clamp(2.5rem,6vw,3.5rem)]">{{ t('productos.titulo') }}</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('productos.entrada') }}</p>
    </header>

    <!-- ── Sistemas en alquiler ─────────────────────────────────────── -->
    <h2 class="rotulo border-t border-linea pt-10">{{ t('productos.alquiler') }}</h2>

    <section v-for="p in enAlquiler" :key="p.nombre" class="py-10">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p class="rotulo">{{ p.para }}</p>
          <h3 class="fuente-display mt-3 text-3xl">{{ p.nombre }}</h3>
          <p class="medida-ancha mt-4 text-tinta-media">{{ p.resumen }}</p>

          <div class="mt-8 flex flex-wrap gap-4">
            <a
              :href="p.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-sm bg-acento px-5 py-2.5
                     font-medium text-acento-fg transition-colors duration-[120ms] hover:bg-acento-hover"
            >{{ t('productos.verDemo') }} <span aria-hidden="true">↗</span></a>
            <NuxtLink
              :to="localePath(p.caso)"
              class="inline-flex items-center gap-2 rounded-sm border border-linea-fuerte px-5 py-2.5
                     text-sm font-medium transition-colors duration-[120ms]
                     hover:border-acento hover:text-acento"
            >{{ t('comun.verCaso') }} →</NuxtLink>
          </div>
          <p class="mono mt-3 text-tinta-tenue">{{ t('comun.arranqueLento') }}</p>
        </div>

        <ul class="space-y-3 border-t border-linea pt-6 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
          <li v-for="i in p.incluye" :key="i" class="flex gap-3 text-tinta-media">
            <span class="mono text-acento" aria-hidden="true">·</span>
            <span>{{ i }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ── Apps de Android ──────────────────────────────────────────── -->
    <h2 class="rotulo border-t border-linea pt-10">{{ t('productos.enPlay') }}</h2>
    <p class="medida-ancha mt-3 text-tinta-media">{{ t('productos.enPlayEntrada') }}</p>

    <section v-for="p in enPlay" :key="p.nombre" class="border-t border-linea py-10 first-of-type:border-t-0">
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p class="rotulo">{{ p.para }}</p>
          <h3 class="fuente-display mt-3 text-3xl">{{ p.nombre }}</h3>
          <p class="medida-ancha mt-4 text-tinta-media">{{ p.resumen }}</p>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <a
              v-if="p.play"
              :href="p.play"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-sm bg-acento px-5 py-2.5
                     font-medium text-acento-fg transition-colors duration-[120ms] hover:bg-acento-hover"
            >{{ t('productos.verEnPlay') }} <span aria-hidden="true">↗</span></a>
            <!--
              Sin ficha todavía. Se dice, no se esconde: una tarjeta sin ningún botón se lee
              como un descuido, y un botón que lleva a un 404 de Play es peor.
            -->
            <p v-else class="mono border border-dashed border-linea-fuerte px-4 py-2 text-tinta-tenue">
              {{ t('productos.prontoEnPlay') }}
            </p>

            <NuxtLink
              :to="localePath(p.caso)"
              class="inline-flex items-center gap-2 rounded-sm border border-linea-fuerte px-5 py-2.5
                     text-sm font-medium transition-colors duration-[120ms]
                     hover:border-acento hover:text-acento"
            >{{ t('comun.verCaso') }} →</NuxtLink>
          </div>

          <NuxtLink
            :to="localePath(p.legal)"
            class="mono mt-4 inline-block text-sm text-tinta-tenue underline"
          >{{ t('productos.verLegal') }}</NuxtLink>
        </div>

        <ul class="space-y-3 border-t border-linea pt-6 lg:border-s lg:border-t-0 lg:ps-8 lg:pt-0">
          <li v-for="i in p.incluye" :key="i" class="flex gap-3 text-tinta-media">
            <span class="mono text-acento" aria-hidden="true">·</span>
            <span>{{ i }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
