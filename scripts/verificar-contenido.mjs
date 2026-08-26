/**
 * Valida el frontmatter de los casos y las fichas antes de construir.
 *
 * Existe por un fallo real: YAML lee `clave: valor con: dos puntos` como un
 * mapa anidado y deja el resto del frontmatter en null SIN lanzar ningún
 * error. Dos casos quedaron sin `orden` ni `estado` y la única señal fue una
 * lista vacía en pantalla.
 *
 * Uso: node scripts/verificar-contenido.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const RAIZ = new URL('../content', import.meta.url).pathname
const ESTADOS = ['produccion', 'desarrollo', 'entregado']
const OBLIGATORIOS_CASO = ['titulo', 'resumen', 'gancho', 'orden', 'estado', 'desde', 'evidencia', 'stack']
const OBLIGATORIOS_FICHA = ['titulo', 'resumen', 'orden', 'estado', 'stack']

function archivosMd(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? archivosMd(p) : p.endsWith('.md') ? [p] : []
  })
}

function frontmatter(texto) {
  const lineas = texto.split('\n')
  if (lineas[0]?.trim() !== '---') return null
  const fin = lineas.findIndex((l, i) => i > 0 && l.trim() === '---')
  if (fin < 0) return null

  const campos = {}
  let clave = null
  for (const linea of lineas.slice(1, fin)) {
    const escalar = linea.match(/^([a-zA-Z_]+):\s*(.*)$/)
    if (escalar) {
      clave = escalar[1]
      campos[clave] = escalar[2].trim()
    } else if (clave && /^\s+-\s/.test(linea)) {
      campos[clave] = Array.isArray(campos[clave]) ? campos[clave] : []
      campos[clave].push(linea.replace(/^\s+-\s/, '').trim())
    }
  }
  return campos
}

const fallos = []

for (const ruta of archivosMd(RAIZ)) {
  const rel = relative(RAIZ, ruta)
  const texto = readFileSync(ruta, 'utf8')
  const fm = frontmatter(texto)

  if (!fm) {
    fallos.push(`${rel}: sin frontmatter`)
    continue
  }

  const esCaso = rel.includes('/casos/')
  for (const clave of esCaso ? OBLIGATORIOS_CASO : OBLIGATORIOS_FICHA) {
    const v = fm[clave]
    if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) {
      fallos.push(`${rel}: falta "${clave}" (probable ": " sin comillas más arriba)`)
    }
  }

  if (fm.estado && !ESTADOS.includes(fm.estado)) {
    fallos.push(`${rel}: estado "${fm.estado}" no es uno de ${ESTADOS.join(', ')}`)
  }

  // La causa raíz, detectada directamente sobre el texto: un escalar con ": "
  // sin entrecomillar. Se revisa TODO el frontmatter línea a línea, no solo las
  // claves de primer nivel: la segunda vez que apareció fue dentro de
  // `capturas:`, en un `pie:`, y el chequeo por clave no lo veía.
  const cuerpoFm = texto.split('\n').slice(1, texto.split('\n').findIndex((l, i) => i > 0 && l.trim() === '---'))
  for (const [n, linea] of cuerpoFm.entries()) {
    const m = linea.match(/^(\s*-?\s*)([a-zA-Z_]+):\s+(.+)$/)
    if (!m) continue
    const valor = m[3].trim()
    if (/^["'|>[{]/.test(valor)) continue
    if (valor.includes(': ')) {
      fallos.push(`${rel}:${n + 2}: "${m[2]}" lleva ": " sin comillas — YAML lo parte en silencio`)
    }
  }
}

// Los seis casos deben existir en los dos idiomas, y con el mismo conjunto.
const slugs = (idioma) => archivosMd(join(RAIZ, idioma, 'casos'))
  .map(p => p.split('/').pop().replace('.md', '')).sort()
const [es, en] = [slugs('es'), slugs('en')]
if (es.join() !== en.join()) {
  fallos.push(`los casos no coinciden entre idiomas:\n    es: ${es.join(', ')}\n    en: ${en.join(', ')}`)
}

if (fallos.length) {
  console.error(`\n  ${fallos.length} problema(s) en el contenido:\n`)
  for (const f of fallos) console.error(`  ✗ ${f}`)
  console.error('')
  process.exit(1)
}

console.log(`\n  Contenido correcto: ${es.length} casos × 2 idiomas, frontmatter completo.\n`)
