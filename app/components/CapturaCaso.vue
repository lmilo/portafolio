<script setup lang="ts">
/**
 * Elige el formato del mockup según lo que declare la captura. Un solo
 * componente de mockup para todo el sitio; aquí solo se decide el formato.
 */
type Captura = {
  archivo: string
  alt: string
  pie?: string
  dispositivo?: 'escritorio' | 'movil'
  url?: string
  ratio?: string
  movil?: { archivo: string, alt: string }
}

const props = withDefaults(defineProps<{ captura: Captura, prioridad?: boolean }>(), {
  prioridad: false
})
</script>

<template>
  <Mockup
    :src="`/capturas/${props.captura.archivo}`"
    :alt="props.captura.alt"
    :variante="props.captura.dispositivo === 'movil' ? 'telefono' : 'escritorio'"
    :url="props.captura.dispositivo === 'movil' ? undefined : props.captura.url"
    :pie="props.captura.pie"
    :ratio="props.captura.ratio"
    :prioridad="props.prioridad"
  />
</template>
