<script setup lang="ts">
// Página de verificación de los marcos. Temporal: se borra cuando estén
// montadas las capturas reales.
useHead({ title: 'Marcos de captura' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-6 py-16 md:px-12">
    <p class="rotulo">verificación</p>
    <h1 class="fuente-display mt-3 text-4xl">Marcos de captura</h1>
    <p class="medida-ancha mt-4 text-tinta-media">
      Los cuatro estados, con imágenes de prueba. Se comprueba aquí antes de tomar las
      capturas reales para no tener que recapturar si algo no encaja.
    </p>

    <section class="mt-16 border-t border-linea pt-10">
      <h2 class="rotulo">01 · escritorio con url</h2>
      <Marco
        src="/capturas/_prueba-claro.jpg"
        alt="Panel de administración con tarjetas de métricas y una tabla de registros"
        url="motila.onrender.com/admin"
        pie="Panel del dueño: estadísticas del mes y liquidación por barbero."
      />
    </section>

    <section class="border-t border-linea pt-10">
      <h2 class="rotulo">02 · composición escritorio + móvil</h2>
      <Composicion
        escritorio="/capturas/_prueba-claro.jpg"
        escritorio-alt="Panel de administración en escritorio"
        movil="/capturas/_prueba-claro.jpg"
        movil-alt="La misma página de reservas en un teléfono"
        url="motila.onrender.com/b/la-70"
        pie="La misma reserva desde el escritorio y desde el celular del cliente."
      />
    </section>

    <section class="border-t border-linea pt-10">
      <h2 class="rotulo">03 · teléfono solo</h2>
      <MarcoTelefono
        src="/capturas/_prueba-claro.jpg"
        alt="Pantalla de marcar turno con el recargo corriendo en vivo"
        pie="Recargo: marcar entrada y salida en dos toques."
      />
    </section>

    <section class="border-t border-linea pt-10">
      <h2 class="rotulo">04 · captura pendiente</h2>
      <CapturaPendiente descripcion="Captura pendiente: panel de gestión de glosas" />
    </section>
  </div>
</template>
