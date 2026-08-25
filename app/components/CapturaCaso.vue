<script setup lang="ts">
/**
 * Elige el marco según lo que declare la captura en el frontmatter:
 * composición si trae `movil`, teléfono si es `dispositivo: movil`,
 * escritorio en el resto de casos.
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

const ruta = (archivo: string) => `/capturas/${archivo}`
</script>

<template>
  <Composicion
    v-if="props.captura.movil"
    :escritorio="ruta(props.captura.archivo)"
    :escritorio-alt="props.captura.alt"
    :movil="ruta(props.captura.movil.archivo)"
    :movil-alt="props.captura.movil.alt"
    :url="props.captura.url"
    :pie="props.captura.pie"
    :ratio="props.captura.ratio"
    :prioridad="props.prioridad"
  />

  <MarcoTelefono
    v-else-if="props.captura.dispositivo === 'movil'"
    :src="ruta(props.captura.archivo)"
    :alt="props.captura.alt"
    :pie="props.captura.pie"
  />

  <Marco
    v-else
    :src="ruta(props.captura.archivo)"
    :alt="props.captura.alt"
    :url="props.captura.url"
    :pie="props.captura.pie"
    :ratio="props.captura.ratio"
    :prioridad="props.prioridad"
  />
</template>
