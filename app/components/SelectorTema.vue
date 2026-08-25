<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()

// Antes de hidratar no se sabe el tema real: se rinde un hueco del mismo
// tamaño para que nada salte cuando llegue el valor.
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
    :aria-label="t('comun.cambiarTema')"
    :aria-pressed="montado ? esOscuro : undefined"
    class="rotulo rounded-sm px-2 py-1 transition-colors duration-[120ms] hover:text-acento"
    @click="alternar"
  >
    <ClientOnly>
      <span aria-hidden="true">{{ esOscuro ? '☾' : '☀' }}</span>
      <template #fallback><span aria-hidden="true" class="opacity-0">☾</span></template>
    </ClientOnly>
  </button>
</template>
