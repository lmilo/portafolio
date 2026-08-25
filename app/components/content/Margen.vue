<script setup lang="ts">
/**
 * El gesto identitario del sitio (BRAND §2). En escritorio la anotación vive
 * en la columna del margen, alineada al párrafo que la motiva. En móvil, donde
 * no hay margen, se convierte en bloque con borde de acento: se conserva la
 * jerarquía, se pierde la lateralidad.
 *
 * No flota ni se pega al scroll: una nota despegada de su párrafo deja de ser
 * anotación y pasa a ser widget.
 */
</script>

<template>
  <aside
    class="my-6 border-l-2 border-acento pl-4
           lg:absolute lg:right-0 lg:my-0 lg:w-56 lg:border-l lg:pl-5
           lg:translate-x-[calc(100%+2rem)]"
  >
    <div class="mono text-acento [&>p]:mt-0 [&>p+p]:mt-3 [&>p:not(:first-child)]:text-tinta-tenue">
      <slot />
    </div>
  </aside>
</template>
