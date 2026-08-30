<script setup lang="ts">
import { REPO_RECARGO, TERMINOS_RECARGO, VIGENCIA_RECARGO } from '~/utils/legalRecargo'

useSeoMeta({
  title: 'Recargo — Términos de uso',
  description:
    'Recargo es una calculadora, no una liquidación de nómina. Qué puede y qué no puede hacer con sus cifras.'
})
</script>

<template>
  <DocumentoLegal
    app="Recargo"
    titulo="Términos de uso"
    entrada="Hasta dónde llega esta cuenta y hasta dónde no. Lo que importa está en los tres primeros puntos."
    :secciones="TERMINOS_RECARGO"
    :vigencia="VIGENCIA_RECARGO"
    :repo="REPO_RECARGO"
  />
</template>
