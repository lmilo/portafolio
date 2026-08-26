<script setup lang="ts">
/**
 * Navegación en móvil: panel a pantalla completa.
 *
 * Un cajón lateral estrecho obliga a apuntar; a pantalla completa cada destino
 * es un blanco grande, que es lo que se necesita con el pulgar. El foco se
 * queda dentro mientras está abierto y Escape lo cierra: si se puede abrir con
 * teclado, se tiene que poder salir con teclado.
 */
const props = defineProps<{ enlaces: { a: string, txt: string }[] }>()

const abierto = ref(false)
const panel = ref<HTMLElement | null>(null)
const { t } = useI18n()
const localePath = useLocalePath()
const ruta = useRoute()

// Cambiar de página cierra el menú: si no, queda tapando el destino.
watch(() => ruta.fullPath, () => { abierto.value = false })

// El fondo no debe poder desplazarse detrás del panel.
watch(abierto, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})

function alTeclado(e: KeyboardEvent) {
  if (!abierto.value) return
  if (e.key === 'Escape') { abierto.value = false; return }
  if (e.key !== 'Tab' || !panel.value) return

  const focos = panel.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled])'
  )
  if (!focos.length) return
  const primero = focos[0]!
  const ultimo = focos[focos.length - 1]!

  if (e.shiftKey && document.activeElement === primero) {
    e.preventDefault(); ultimo.focus()
  } else if (!e.shiftKey && document.activeElement === ultimo) {
    e.preventDefault(); primero.focus()
  }
}
onMounted(() => document.addEventListener('keydown', alTeclado))
onBeforeUnmount(() => document.removeEventListener('keydown', alTeclado))

async function abrir() {
  abierto.value = true
  await nextTick()
  panel.value?.querySelector<HTMLElement>('a')?.focus()
}
</script>

<template>
  <div class="md:hidden">
    <button
      type="button"
      class="pulsable boton-hueco flex size-11 items-center justify-center"
      :aria-expanded="abierto"
      aria-controls="menu-movil"
      :aria-label="t('comun.abrirMenu')"
      @click="abierto ? (abierto = false) : abrir()"
    >
      <span class="sr-only">{{ t('comun.abrirMenu') }}</span>
      <span aria-hidden="true" class="flex flex-col gap-[3px]">
        <span class="block h-[2px] w-5 bg-current" />
        <span class="block h-[2px] w-5 bg-current" />
        <span class="block h-[2px] w-5 bg-current" />
      </span>
    </button>

    <Teleport to="body">
      <Transition
        enter-active-class="transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
        enter-from-class="opacity-0 translate-y-2"
        leave-active-class="transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="abierto"
          id="menu-movil"
          ref="panel"
          class="fixed inset-0 flex flex-col bg-fondo"
          style="z-index: var(--z-panel)"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-center justify-between border-b-2 border-linea-fuerte px-6 py-5">
            <span class="fuente-display text-lg">{{ perfil.iniciales }}</span>
            <button
              type="button"
              class="pulsable boton-hueco flex size-11 items-center justify-center text-xl"
              :aria-label="t('comun.cerrarMenu')"
              @click="abierto = false"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <nav class="flex-1 overflow-y-auto px-6 py-8" aria-label="principal">
            <ul class="space-y-4">
              <li v-for="e in props.enlaces" :key="e.a">
                <NuxtLink
                  :to="localePath(e.a)"
                  class="fuente-display block border-b-2 border-linea py-3 text-3xl
                         transition-colors duration-150"
                  active-class="text-enlace"
                >{{ e.txt }}</NuxtLink>
              </li>
            </ul>

            <div class="mt-10 flex flex-wrap gap-3">
              <a
                v-for="s in enlacesSociales()"
                :key="s.url"
                :href="s.url"
                class="pulsable boton-hueco px-4 py-2 text-sm"
                :target="s.url.startsWith('mailto:') ? undefined : '_blank'"
                :rel="s.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
              >{{ s.etiqueta }}</a>
            </div>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
