<script setup lang="ts">
import { PRIVACIDAD_COCINA, REPO_COCINA, VIGENCIA_COCINA } from '~/utils/legalCocina'

/**
 * La URL que Google Play exige para publicar la app. Tiene que ser pública, estable y no
 * pedir inicio de sesión: si se rompe, la ficha queda apuntando a un 404 y eso es motivo de
 * suspensión. Por eso vive en una ruta propia y no colgada de una sección del portafolio
 * que algún día se reorganice.
 */
useSeoMeta({
  title: 'Cocina a Mano — Tratamiento de datos',
  description:
    'Qué guarda Cocina a Mano en tu teléfono y qué sale de él. Solo dos cosas salen —la foto de una factura y una lista de ingredientes— y las dos las activas tú.'
})
</script>

<template>
  <DocumentoLegal
    app="Cocina a Mano"
    titulo="Política de tratamiento de datos"
    entrada="Tu despensa no sale de tu teléfono. Aquí está, sin abogado de por medio, qué se guarda, qué sale, cuándo y a quién."
    :secciones="PRIVACIDAD_COCINA"
    :vigencia="VIGENCIA_COCINA"
    :repo="REPO_COCINA"
  />
</template>
