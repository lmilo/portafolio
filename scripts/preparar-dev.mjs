/**
 * Reconstruye la base de contenido antes de cada `pnpm dev`.
 *
 * @nuxt/content guarda las colecciones en un SQLite bajo `.data/`. Esa base se
 * queda inservible con más facilidad de la que debería —cambiar de rama,
 * recompilar better-sqlite3, matar el proceso a mitad de escritura— y el
 * síntoma es traicionero: la página responde 200 y sale VACÍA, porque la
 * consulta falla en el servidor y `useAsyncData` devuelve una lista sin
 * elementos en vez de un error.
 *
 * Pasó tres veces. Reconstruirla cuesta unos 200 ms; diagnosticarla otra vez,
 * mucho más. Se borra siempre y sin preguntar: es caché derivada de
 * `content/`, no hay nada ahí que no se pueda regenerar.
 */
import { rmSync, existsSync } from 'node:fs'

const cache = new URL('../.data/', import.meta.url)

if (existsSync(cache)) {
  rmSync(cache, { recursive: true, force: true })
  console.log('  contenido: caché reconstruida')
}
