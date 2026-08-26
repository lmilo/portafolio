<script setup lang="ts">
/**
 * Las mediciones como una ficha técnica, no como el marcador de un SaaS.
 *
 * La fila de cuatro números enormes con su etiqueta debajo es el patrón más
 * repetido del género, y además invita a inflar: nadie audita "5 años de
 * experiencia". Aquí cada valor va con la medición que lo produjo y enlaza al
 * caso donde está descrita, así que se puede comprobar.
 */
defineProps<{
  filas: { valor: string, etiqueta: string, nota: string, a: string }[]
}>()
const localePath = useLocalePath()
</script>

<template>
  <dl class="divide-y divide-linea border-y border-linea">
    <div
      v-for="f in filas"
      :key="f.etiqueta"
      class="group grid items-baseline gap-x-6 gap-y-1 py-5
             sm:grid-cols-[minmax(7rem,auto)_minmax(0,1fr)_auto]"
    >
      <dt class="cifra text-[clamp(1.5rem,3vw,2.25rem)] transition-colors duration-150
                 group-hover:text-acento">
        {{ f.valor }}
      </dt>
      <dd class="sm:col-start-2">
        <p class="text-tinta">{{ f.etiqueta }}</p>
        <p class="mono mt-1 text-tinta-tenue">{{ f.nota }}</p>
      </dd>
      <dd class="mono sm:col-start-3">
        <NuxtLink
          :to="localePath(f.a)"
          class="inline-flex items-center gap-2 text-tinta-tenue transition-colors
                 duration-150 hover:text-acento"
        >
          <span class="sr-only">{{ f.etiqueta }} — </span>
          {{ $t('comun.verCaso') }}
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </dd>
    </div>
  </dl>
</template>
