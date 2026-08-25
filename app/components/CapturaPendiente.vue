<script setup lang="ts">
/**
 * Hueco declarado para una captura que todavía no existe.
 *
 * No es un placeholder gris genérico: dice explícitamente qué irá ahí
 * (LAYOUT §5). Un rectángulo vacío parece un error de carga; esto parece lo
 * que es, que es una parte del sitio aún sin terminar — y el sitio dice lo que
 * falta en vez de disimularlo (BRAND §3).
 */
defineProps<{ descripcion: string, ratio?: string }>()
</script>

<template>
  <div
    class="my-8 flex items-center justify-center rounded-lg border border-dashed
           border-linea-fuerte bg-superficie p-8 text-center"
    :style="{ aspectRatio: ratio ?? '16 / 10' }"
  >
    <p class="mono max-w-sm text-tinta-tenue">
      {{ descripcion }}
    </p>
  </div>
</template>
