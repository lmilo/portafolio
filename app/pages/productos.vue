<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: () => t('productos.titulo'), description: () => t('productos.entrada') })

const productos = computed(() => [
  {
    nombre: 'Motila',
    caso: '/trabajo/motila',
    // El slug real en producción. Cambiarlo aquí si se siembra otra barbería.
    demo: 'https://motila.onrender.com/b/prueba-borrar',
    para: locale.value === 'es' ? 'Barberías y peluquerías' : 'Barbershops and salons',
    resumen: locale.value === 'es'
      ? 'Página pública de reservas para tus clientes, panel para cada barbero y panel administrativo para el dueño. Varias sedes en la misma cuenta.'
      : 'A public booking page for your clients, a panel for each barber and an admin panel for the owner. Multiple locations under one account.',
    incluye: locale.value === 'es'
      ? ['Reservas sin que el cliente cree cuenta', 'Cancelación y cambio por enlace', 'Horarios y ausencias por barbero', 'Estadísticas y liquidación de pagos', 'Clientes y fidelización']
      : ['Bookings with no client account needed', 'Cancel and reschedule by link', 'Per-barber hours and time off', 'Statistics and payout settlement', 'Client records and loyalty']
  }
])
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <h1 class="fuente-display text-[clamp(2.5rem,6vw,3.5rem)]">{{ t('productos.titulo') }}</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('productos.entrada') }}</p>
    </header>

    <section
      v-for="p in productos"
      :key="p.nombre"
      class="border-t border-linea py-14"
    >
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p class="rotulo">{{ p.para }}</p>
          <h2 class="fuente-display mt-3 text-3xl">{{ p.nombre }}</h2>
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
  </div>
</template>
