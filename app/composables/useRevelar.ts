/**
 * Aparición al entrar en pantalla.
 *
 * El contenido NO se oculta en el HTML: esta función es la que añade
 * `js-animar` al documento, y solo entonces el CSS oculta los `.revelar`.
 * Si el script no corre —error, JS desactivado, navegador sin
 * IntersectionObserver— la página se ve completa, sin animación. Ocultar con
 * CSS y depender de JS para revelar convierte cualquier fallo en una página
 * en blanco, que es peor que no tener animación.
 *
 * Con `prefers-reduced-motion` no se activa nada, por la misma razón.
 */
export function useRevelar() {
  onMounted(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const raiz = document.documentElement
    raiz.classList.add('js-animar')

    const observador = new IntersectionObserver((entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue
        ;(e.target as HTMLElement).dataset.visible = 'true'
        observador.unobserve(e.target)
      }
      // Margen POSITIVO abajo: el elemento se marca antes de entrar del todo.
      // Con margen negativo disparaba tarde y, al bajar rápido, se veían huecos
      // donde el contenido aún no había aparecido.
    }, { rootMargin: '0px 0px 15% 0px', threshold: 0 })

    // Un frame de margen: el observador se engancha cuando el layout ya está
    // resuelto, para que lo que ya está en pantalla se marque de inmediato.
    requestAnimationFrame(() => {
      for (const el of document.querySelectorAll('.revelar')) observador.observe(el)
    })

    onScopeDispose(() => {
      observador.disconnect()
      raiz.classList.remove('js-animar')
    })
  })
}
