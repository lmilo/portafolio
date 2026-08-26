<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

// Antes de hidratar no se conoce el tema real: se reserva el hueco para que
// nada salte cuando llegue el valor.
const montado = ref(false)
onMounted(() => { montado.value = true })

const esOscuro = computed(() => colorMode.value === 'dark')
function alternar() {
  colorMode.preference = esOscuro.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    class="pulsable boton-hueco flex size-11 items-center justify-center"
    :aria-label="t('comun.cambiarTema')"
    :aria-pressed="montado ? esOscuro : undefined"
    @click="alternar"
  >
    <ClientOnly>
      <span aria-hidden="true" class="text-base">{{ esOscuro ? '☾' : '☀' }}</span>
      <template #fallback><span aria-hidden="true" class="opacity-0">☾</span></template>
    </ClientOnly>
  </button>
</template>
