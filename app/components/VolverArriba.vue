<script setup lang="ts">
/**
 * Aparece cuando ya hay algo a lo que volver: dos pantallas de recorrido.
 * Antes de eso solo estorbaría.
 */
const visible = ref(false)
const { t } = useI18n()

function alDesplazar() {
  visible.value = window.scrollY > window.innerHeight * 2
}

onMounted(() => {
  alDesplazar()
  // passive: el listener no llama a preventDefault, y decirlo deja que el
  // navegador no espere por él para pintar el scroll.
  window.addEventListener('scroll', alDesplazar, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', alDesplazar))

function subir() {
  const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: suave ? 'smooth' : 'auto' })
}
</script>

<template>
  <Transition
    enter-active-class="transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
    leave-to-class="opacity-0 translate-y-3"
  >
    <button
      v-if="visible"
      type="button"
      class="pulsable boton-acento fixed bottom-6 end-6 flex size-12 items-center
             justify-center text-xl"
      style="z-index: var(--z-arriba)"
      :aria-label="t('comun.volverArriba')"
      @click="subir"
    >
      <span aria-hidden="true">↑</span>
    </button>
  </Transition>
</template>
