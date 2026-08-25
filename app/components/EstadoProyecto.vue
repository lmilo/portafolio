<script setup lang="ts">
/**
 * El estado nunca se comunica solo con color: siempre lleva su palabra escrita.
 * Un daltónico deuteranope no distingue el verde del naranja (TOKENS §2).
 */
const props = defineProps<{ estado: 'produccion' | 'desarrollo' | 'entregado' }>()
const { t } = useI18n()

const color = computed(() => ({
  produccion: 'bg-exito',
  desarrollo: 'bg-aviso',
  entregado: 'bg-tinta-tenue'
}[props.estado]))
</script>

<template>
  <span class="rotulo flex items-center gap-2">
    <span :class="color" class="size-1.5 rounded-full" aria-hidden="true" />
    {{ t(`estado.${estado}`) }}
  </span>
</template>
