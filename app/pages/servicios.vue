<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

useSeoMeta({ title: () => t('servicios.titulo'), description: () => t('servicios.entrada') })

// El contenido de esta página es corto y fijo: vive aquí y no en Markdown,
// porque no tiene la estructura de un caso ni se consulta desde otra parte.
const como = computed(() => locale.value === 'es'
  ? [
      ['Primero el problema, no la solución', 'La primera conversación es sobre qué se rompe hoy y cuánto cuesta que se rompa. Si el problema no está claro, ningún sistema lo resuelve.'],
      ['Se entrega funcionando, no en demo', 'Cada fase termina con algo que se puede usar de verdad, no con una presentación. Prefiero entregar poco y en producción que mucho y en rama.'],
      ['Queda escrito por qué', 'Cada decisión de peso queda documentada en el repositorio: qué se descartó y por qué. Es lo que permite que otro —o tú— siga después sin adivinar.'],
      ['Pruebas donde duele', 'No en todo: en el cálculo que si falla cuesta plata, y en los permisos que si fallan exponen datos.']
    ]
  : [
      ['The problem first, not the solution', "The first conversation is about what breaks today and what that costs. If the problem isn't clear, no system solves it."],
      ['Delivered working, not as a demo', 'Every phase ends with something genuinely usable, not a presentation. I would rather ship small and in production than large and on a branch.'],
      ['The reasoning is written down', 'Every significant decision is documented in the repository: what was ruled out and why. That is what lets somebody else — or you — pick it up later without guessing.'],
      ['Tests where it hurts', 'Not everywhere: on the calculation that costs money when it fails, and on the permissions that expose data when they fail.']
    ]
)

const queNo = computed(() => locale.value === 'es'
  ? [
      'Sitios que solo son una plantilla con tu logo encima. Para eso hay herramientas más baratas que yo.',
      'Estimar sin entender el problema. Si te doy un precio en la primera llamada, uno de los dos va a perder.',
      'Prometer que un sistema queda “terminado”. El software que se usa cambia; lo que se puede prometer es que quede fácil de cambiar.'
    ]
  : [
      "Sites that are a template with your logo on top. There are cheaper tools than me for that.",
      "Estimating without understanding the problem. If I quote you on the first call, one of us is going to lose.",
      'Promising a system will be "finished". Software in use changes; what can be promised is that it stays easy to change.'
    ]
)
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 md:px-12">
    <header class="py-16 md:py-24">
      <h1 class="fuente-display text-[clamp(2.5rem,6vw,3.5rem)]">{{ t('servicios.titulo') }}</h1>
      <p class="medida-ancha mt-6 text-lg text-tinta-media">{{ t('servicios.entrada') }}</p>
    </header>

    <section class="border-t border-linea py-14">
      <h2 class="rotulo">{{ t('servicios.comoTitulo') }}</h2>
      <ol class="mt-8 grid gap-8 md:grid-cols-2">
        <li v-for="([titulo, texto], i) in como" :key="titulo">
          <span class="mono text-acento">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="fuente-display mt-2 text-xl">{{ titulo }}</h3>
          <p class="medida mt-2 text-tinta-media">{{ texto }}</p>
        </li>
      </ol>
    </section>

    <section class="border-t border-linea py-14">
      <h2 class="rotulo">{{ t('servicios.queNoTitulo') }}</h2>
      <ul class="medida-ancha mt-6 space-y-4">
        <li v-for="linea in queNo" :key="linea" class="flex gap-3 text-tinta-media">
          <span class="mono text-tinta-tenue" aria-hidden="true">—</span>
          <span>{{ linea }}</span>
        </li>
      </ul>
    </section>

    <section class="border-t border-linea py-14">
      <NuxtLink
        :to="localePath('/contacto')"
        class="inline-flex items-center gap-2 rounded-sm bg-acento px-5 py-2.5
               font-medium text-acento-fg transition-colors duration-[120ms] hover:bg-acento-hover"
      >
        {{ t('comun.escribeme') }} <span aria-hidden="true">→</span>
      </NuxtLink>
    </section>
  </div>
</template>
