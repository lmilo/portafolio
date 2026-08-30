<script setup lang="ts">
import { REPO_COCINA, TERMINOS_COCINA, VIGENCIA_COCINA } from '~/utils/legalCocina'

useSeoMeta({
  title: 'Cocina a Mano — Términos de uso',
  description:
    'Qué es Cocina a Mano y qué no. La app avisa cuándo tocaba revisar un alimento; si está bueno lo decides tú.'
})
</script>

<template>
  <DocumentoLegal
    app="Cocina a Mano"
    titulo="Términos de uso"
    entrada="Lo que la app hace y, sobre todo, lo que no: no sabe si tu comida está buena, no sabe de alergias, y la IA se equivoca."
    :secciones="TERMINOS_COCINA"
    :vigencia="VIGENCIA_COCINA"
    :repo="REPO_COCINA"
  />
</template>
