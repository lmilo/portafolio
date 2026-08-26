<script setup lang="ts">
import { esquemaContacto } from '#shared/contacto'

/**
 * Formulario de contacto.
 *
 * Valida al salir de cada campo, no en cada tecla: marcar un correo como
 * inválido mientras la persona todavía lo está escribiendo es hostil. Una vez
 * que un campo ya dio error, sí se revalida al escribir, para que el error
 * desaparezca en cuanto se corrige.
 */
const { t } = useI18n()

type Campo = 'nombre' | 'correo' | 'mensaje'
const datos = reactive({
  nombre: '', correo: '', asunto: 'proyecto' as const, mensaje: '', web: ''
})
const errores = reactive<Record<Campo, string>>({ nombre: '', correo: '', mensaje: '' })
const tocado = reactive<Record<Campo, boolean>>({ nombre: false, correo: false, mensaje: false })
const estado = ref<'inactivo' | 'enviando' | 'exito' | 'error'>('inactivo')
const motivoError = ref('')

const mensajes: Record<Campo, (v: string) => string> = {
  nombre: v => (v.trim().length < 2 ? t('contacto.errNombre') : ''),
  correo: v => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? t('contacto.errCorreo') : ''),
  mensaje: (v) => {
    const n = v.trim().length
    if (n < 20) return t('contacto.errMensaje')
    if (n > 2000) return t('contacto.errMensajeLargo')
    return ''
  }
}

function validar(campo: Campo) {
  errores[campo] = mensajes[campo](datos[campo])
}

function alSalir(campo: Campo) {
  tocado[campo] = true
  validar(campo)
}

function alEscribir(campo: Campo) {
  // Solo se revalida en vivo si el campo YA estaba en error: así el mensaje
  // desaparece al corregir, sin acusar a quien todavía está escribiendo.
  if (tocado[campo] && errores[campo]) validar(campo)
}

const restantes = computed(() => 2000 - datos.mensaje.trim().length)

async function enviar() {
  for (const c of ['nombre', 'correo', 'mensaje'] as Campo[]) {
    tocado[c] = true
    validar(c)
  }
  const primerError = (['nombre', 'correo', 'mensaje'] as Campo[]).find(c => errores[c])
  if (primerError) {
    // El foco va al primer campo con problema: sin esto, quien navega con
    // teclado o lector de pantalla no sabe dónde está el fallo.
    document.getElementById(`campo-${primerError}`)?.focus()
    return
  }

  const local = esquemaContacto.safeParse(datos)
  if (!local.success) return

  estado.value = 'enviando'
  try {
    await $fetch('/api/contacto', { method: 'POST', body: datos })
    estado.value = 'exito'
  } catch (e: any) {
    motivoError.value = e?.data?.data?.motivo ?? 'desconocido'
    estado.value = 'error'
  }
}

function reiniciar() {
  Object.assign(datos, { nombre: '', correo: '', asunto: 'proyecto', mensaje: '', web: '' })
  Object.assign(errores, { nombre: '', correo: '', mensaje: '' })
  Object.assign(tocado, { nombre: false, correo: false, mensaje: false })
  estado.value = 'inactivo'
}

const opciones = computed(() => [
  { v: 'empleo', txt: t('contacto.asuntoEmpleo') },
  { v: 'proyecto', txt: t('contacto.asuntoProyecto') },
  { v: 'producto', txt: t('contacto.asuntoProducto') },
  { v: 'otro', txt: t('contacto.asuntoOtro') }
])
</script>

<template>
  <div class="bloque bg-superficie p-6 md:p-8">
    <!-- ÉXITO -->
    <div v-if="estado === 'exito'" class="py-6 text-center">
      <p class="mx-auto flex size-14 items-center justify-center border-2 border-linea-fuerte bg-exito text-2xl text-exito-fg">
        <span aria-hidden="true">✓</span>
      </p>
      <h3 class="fuente-display mt-5 text-2xl">{{ t('contacto.exitoTitulo') }}</h3>
      <p class="mx-auto medida mt-3 text-tinta-media">{{ t('contacto.exitoTexto') }}</p>
      <button type="button" class="pulsable boton-hueco mt-7 px-5 py-2.5" @click="reiniciar">
        {{ t('contacto.otroMensaje') }}
      </button>
    </div>

    <form v-else novalidate @submit.prevent="enviar">
      <!-- Trampa para bots. aria-hidden y tabindex -1: nadie que navegue con
           teclado o lector de pantalla llega aquí por accidente. -->
      <div class="absolute -left-[9999px]" aria-hidden="true">
        <label for="campo-web">No rellenar</label>
        <input id="campo-web" v-model="datos.web" type="text" tabindex="-1" autocomplete="off">
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label for="campo-nombre" class="mono block font-semibold uppercase">
            {{ t('contacto.nombre') }}
            <span class="text-enlace" aria-hidden="true">*</span>
            <span class="sr-only">({{ t('contacto.requerido') }})</span>
          </label>
          <input
            id="campo-nombre"
            v-model="datos.nombre"
            type="text"
            autocomplete="name"
            required
            :aria-invalid="!!errores.nombre"
            :aria-describedby="errores.nombre ? 'error-nombre' : undefined"
            class="mt-2 w-full border-2 bg-fondo px-3 py-2.5 transition-colors duration-150
                   focus:outline-none focus-visible:outline-3 focus-visible:outline-enlace"
            :class="errores.nombre ? 'border-magenta' : 'border-linea-fuerte'"
            @blur="alSalir('nombre')"
            @input="alEscribir('nombre')"
          >
          <p v-if="errores.nombre" id="error-nombre" class="mono mt-1.5 text-magenta">
            {{ errores.nombre }}
          </p>
        </div>

        <div>
          <label for="campo-correo" class="mono block font-semibold uppercase">
            {{ t('contacto.correo') }}
            <span class="text-enlace" aria-hidden="true">*</span>
            <span class="sr-only">({{ t('contacto.requerido') }})</span>
          </label>
          <input
            id="campo-correo"
            v-model="datos.correo"
            type="email"
            autocomplete="email"
            required
            :aria-invalid="!!errores.correo"
            :aria-describedby="errores.correo ? 'error-correo' : undefined"
            class="mt-2 w-full border-2 bg-fondo px-3 py-2.5 transition-colors duration-150
                   focus:outline-none focus-visible:outline-3 focus-visible:outline-enlace"
            :class="errores.correo ? 'border-magenta' : 'border-linea-fuerte'"
            @blur="alSalir('correo')"
            @input="alEscribir('correo')"
          >
          <p v-if="errores.correo" id="error-correo" class="mono mt-1.5 text-magenta">
            {{ errores.correo }}
          </p>
        </div>
      </div>

      <fieldset class="mt-6">
        <legend class="mono font-semibold uppercase">{{ t('contacto.asunto') }}</legend>
        <div class="mt-2 flex flex-wrap gap-2">
          <label
            v-for="o in opciones"
            :key="o.v"
            class="cursor-pointer border-2 border-linea-fuerte px-3 py-2 text-sm font-semibold
                   transition-colors duration-150 has-[:checked]:bg-acento
                   has-[:checked]:text-acento-fg has-[:focus-visible]:outline-3
                   has-[:focus-visible]:outline-enlace"
          >
            <input v-model="datos.asunto" type="radio" name="asunto" :value="o.v" class="sr-only">
            {{ o.txt }}
          </label>
        </div>
      </fieldset>

      <div class="mt-6">
        <label for="campo-mensaje" class="mono block font-semibold uppercase">
          {{ t('contacto.mensaje') }}
          <span class="text-enlace" aria-hidden="true">*</span>
          <span class="sr-only">({{ t('contacto.requerido') }})</span>
        </label>
        <p id="ayuda-mensaje" class="mono mt-1 text-tinta-tenue">{{ t('contacto.mensajeAyuda') }}</p>
        <textarea
          id="campo-mensaje"
          v-model="datos.mensaje"
          rows="6"
          required
          :aria-invalid="!!errores.mensaje"
          :aria-describedby="errores.mensaje ? 'error-mensaje ayuda-mensaje' : 'ayuda-mensaje'"
          class="mt-2 w-full resize-y border-2 bg-fondo px-3 py-2.5 transition-colors duration-150
                 focus:outline-none focus-visible:outline-3 focus-visible:outline-enlace"
          :class="errores.mensaje ? 'border-magenta' : 'border-linea-fuerte'"
          @blur="alSalir('mensaje')"
          @input="alEscribir('mensaje')"
        />
        <div class="mt-1.5 flex items-start justify-between gap-4">
          <p v-if="errores.mensaje" id="error-mensaje" class="mono text-magenta">
            {{ errores.mensaje }}
          </p>
          <p class="mono ms-auto shrink-0" :class="restantes < 0 ? 'text-magenta' : 'text-tinta-tenue'">
            {{ restantes }}
          </p>
        </div>
      </div>

      <!-- Los estados de envío se anuncian: quien usa lector de pantalla no ve
           que el botón cambió de texto. -->
      <p aria-live="polite" class="sr-only">
        {{ estado === 'enviando' ? t('contacto.enviando') : '' }}
      </p>

      <div
        v-if="estado === 'error'"
        role="alert"
        class="mt-6 border-2 border-linea-fuerte bg-magenta p-4 text-magenta-fg"
      >
        <p class="font-bold">{{ t('contacto.errorTitulo') }}</p>
        <p class="mt-1 text-sm">{{ t('contacto.errorTexto') }}</p>
        <a :href="`mailto:${perfil.correo}`" class="mono mt-2 inline-block font-bold underline">
          {{ perfil.correo }}
        </a>
      </div>

      <button
        type="submit"
        class="pulsable boton-acento mt-7 w-full px-6 py-3.5 text-base disabled:cursor-wait
               disabled:opacity-70 sm:w-auto"
        :disabled="estado === 'enviando'"
      >
        {{ estado === 'enviando' ? t('contacto.enviando') : t('contacto.enviar') }} →
      </button>
    </form>
  </div>
</template>
