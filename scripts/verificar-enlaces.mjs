/**
 * Comprueba que todo enlace externo del sitio responde.
 *
 * Un portafolio con un enlace muerto es peor que uno sin ese enlace: el
 * visitante que lo prueba concluye que nada de lo que dice el sitio se
 * sostiene. Los servicios de Render duermen, así que se les da margen amplio.
 *
 * Uso: node scripts/verificar-enlaces.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const RAIZ = new URL('../content', import.meta.url).pathname
const ESPERA = 90_000

function archivosMd(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n)
    return statSync(p).isDirectory() ? archivosMd(p) : p.endsWith('.md') ? [p] : []
  })
}

const urls = new Set()
for (const ruta of archivosMd(RAIZ)) {
  for (const m of readFileSync(ruta, 'utf8').matchAll(/^\s+url:\s*(\S+)/gm)) {
    const u = m[1].replace(/^["']|["']$/g, '')
    if (u.startsWith('http')) urls.add(u)
  }
}

console.log(`\n  Comprobando ${urls.size} enlaces externos (los de Render pueden tardar ~50 s en despertar)…\n`)

const resultados = await Promise.all([...urls].map(async (url) => {
  const control = new AbortController()
  const t = setTimeout(() => control.abort(), ESPERA)
  try {
    const r = await fetch(url, { redirect: 'follow', signal: control.signal })
    if (r.status >= 400) return { url, estado: r.status, ok: false }

    // Una SPA devuelve 200 y pinta el "no encontrado" en el cliente, así que
    // el código de estado no basta. Esto ya dejó pasar un enlace roto de
    // Motila: /b/la-70 respondía 200 mostrando "Aquí no corta nadie".
    const cuerpo = (await r.text()).toLowerCase()
    const señales = [
      'no corta nadie',           // la página de barbería inexistente de Motila
      'no encontramos esta',
      'página no encontrada',
      'page not found'
    ]
    const sospecha = señales.find(s => cuerpo.includes(s))
    return sospecha
      ? { url, estado: `200 pero "${sospecha}"`, ok: false }
      : { url, estado: r.status, ok: true }
  } catch (e) {
    return { url, estado: e.name === 'AbortError' ? 'timeout' : 'error', ok: false }
  } finally {
    clearTimeout(t)
  }
}))

for (const r of resultados.sort((a, b) => Number(a.ok) - Number(b.ok))) {
  console.log(`  ${r.ok ? '✓' : '✗'} ${String(r.estado).padEnd(8)} ${r.url}`)
}

const rotos = resultados.filter(r => !r.ok)
console.log(rotos.length ? `\n  ${rotos.length} enlace(s) no responden.\n` : '\n  Todos responden.\n')
process.exit(rotos.length ? 1 : 0)
