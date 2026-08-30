/**
 * Lo común a los documentos legales de las apps.
 *
 * Este archivo nació cuando la segunda app —Cocina a Mano— necesitó su propia política:
 * `DocumentoLegal.vue` estaba escrito contra Recargo (importaba sus constantes y decía su
 * nombre en el rótulo), así que o se duplicaba el componente o se generalizaba. Se
 * generalizó, porque van a venir más: los cuatro juegos de Play necesitarán lo mismo.
 *
 * LAS RUTAS YA PUBLICADAS NO SE TOCAN. Google Play apunta a una URL fija en la ficha de
 * cada app, y si se rompe, la ficha queda en un 404 — que es motivo de suspensión. Cada app
 * conserva `/legal/<app>/privacidad` y `/legal/<app>/terminos` para siempre.
 */

export type SeccionLegal = {
  titulo: string
  /** Cada entrada es un párrafo. Las que empiezan con "- " se rinden como lista. */
  parrafos: string[]
  /** Se destaca en caja con borde de acento: lo que no se puede pasar por alto. */
  destacado?: boolean
}

/** El mismo para todas: es el correo del desarrollador que se declara en la tienda. */
export const CORREO_LEGAL = 'camiloarinconc@gmail.com'

/** Una app con documentos legales publicados aquí. */
export type AppLegal = {
  /** El nombre como aparece en la tienda. */
  nombre: string
  /** El segmento de la ruta: /legal/<slug>/privacidad */
  slug: string
  vigencia: string
  repo: string
  /** Una línea sobre qué es la app, para el índice. */
  quees: string
}

export const APPS_LEGALES: AppLegal[] = [
  {
    nombre: 'Recargo',
    slug: 'recargo',
    vigencia: '30 de agosto de 2026',
    repo: 'https://github.com/lmilo/recargo',
    quees: 'Cuenta las horas nocturnas, dominicales y extras de un trabajador por turnos, y dice cuánto valen.'
  },
  {
    nombre: 'Cocina a Mano',
    slug: 'cocina-a-mano',
    vigencia: '30 de agosto de 2026',
    repo: 'https://github.com/lmilo/CocinaMano',
    quees: 'Lleva la cuenta de lo que hay en la despensa, avisa antes de que algo se venza y dice qué recetas alcanzan con eso.'
  }
]
