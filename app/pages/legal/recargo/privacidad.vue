<script setup lang="ts">
import { PRIVACIDAD_RECARGO, REPO_RECARGO, VIGENCIA_RECARGO } from '~/utils/legalRecargo'

/**
 * La URL que Google Play exige para publicar la app. Tiene que ser pública, estable y no
 * pedir inicio de sesión: si se rompe, la ficha queda apuntando a un 404 y eso es motivo de
 * suspensión. Por eso vive en una ruta propia y no colgada de una sección del portafolio
 * que algún día se reorganice.
 */
useSeoMeta({
  title: 'Recargo — Tratamiento de datos',
  description:
    'Qué datos guarda Recargo, qué no hace, y qué implica la publicidad. Tus turnos y tu sueldo no salen de tu teléfono.'
})
</script>

<template>
  <DocumentoLegal
    app="Recargo"
    titulo="Política de tratamiento de datos"
    entrada="Qué guarda la app, qué sale del teléfono y qué no. Escrito para leerse sin abogado, porque quien usa Recargo rara vez tiene uno."
    :secciones="PRIVACIDAD_RECARGO"
    :vigencia="VIGENCIA_RECARGO"
    :repo="REPO_RECARGO"
  />
</template>
