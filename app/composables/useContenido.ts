/**
 * El contenido vive en colecciones por idioma (`casos_es`, `casos_en`, …).
 *
 * El nombre se resuelve en el setup y se expone como computed: llamar
 * `useI18n()` dentro del handler de `useAsyncData` pierde el contexto de Nuxt
 * y la consulta devuelve vacío en SSR sin lanzar ningún error.
 */
export function useColecciones() {
  const { locale } = useI18n()
  return {
    casos: computed(() => `casos_${locale.value}` as 'casos_es' | 'casos_en'),
    archivo: computed(() => `archivo_${locale.value}` as 'archivo_es' | 'archivo_en')
  }
}
