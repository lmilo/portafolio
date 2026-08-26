<script setup lang="ts">
/**
 * Los datos duros cruzando la página en horizontal.
 *
 * Sustituye a la ficha de mediciones, que se leía apagada. La misma
 * información con movimiento y color plano: se ve antes y no ocupa una sección
 * entera. La pista va duplicada porque el bucle necesita una segunda copia que
 * entre justo cuando sale la primera.
 */
const props = defineProps<{ datos: string[] }>()
const duplicados = computed(() => [...props.datos, ...props.datos])
</script>

<template>
  <div class="cinta" role="region" :aria-label="$t('home.cifrasTitulo')">
    <div class="cinta__pista">
      <p
        v-for="(d, i) in duplicados"
        :key="i"
        class="mono flex shrink-0 items-center gap-4 px-5 py-2.5 font-semibold uppercase"
        :aria-hidden="i >= props.datos.length ? 'true' : undefined"
      >
        {{ d }}
        <span aria-hidden="true" class="text-base leading-none">◆</span>
      </p>
    </div>
  </div>
</template>
