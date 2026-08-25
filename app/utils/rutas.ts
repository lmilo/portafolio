/**
 * El `path` que da @nuxt/content deriva de la ruta del archivo
 * (`/es/casos/motila`), no de la URL pública. La URL del sitio es
 * `/trabajo/<slug>`, y el prefijo de idioma lo pone `useLocalePath()`.
 */
export function rutaCaso(pathContenido: string): string {
  const slug = pathContenido.split('/').filter(Boolean).pop() ?? ''
  return `/trabajo/${slug}`
}
