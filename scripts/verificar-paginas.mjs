/**
 * Comprueba que las páginas rinden CONTENIDO, no solo que responden 200.
 *
 * El fallo que motivó este script no daba error: la base de contenido se
 * quedaba sin tablas, la consulta fallaba en el servidor, `useAsyncData`
 * devolvía una lista vacía y la página salía 200 con el esqueleto puesto y
 * nada dentro. Un chequeo de código de estado lo daba por bueno tres veces
 * seguidas.
 *
 * Uso: node scripts/verificar-paginas.mjs [http://localhost:3000]
 */
const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')

// [ruta, qué tiene que aparecer, cuántas veces como mínimo]
const ESPERADO = [
  ['/',                    /href="\/trabajo\/[a-z-]+"/g, 3],
  ['/',                    /capturas\/[a-z0-9-]+\.jpg/g, 1],
  ['/trabajo',             /href="\/trabajo\/[a-z-]+"/g, 6],
  ['/trabajo',             /capturas\/[a-z0-9-]+\.jpg/g, 6],
  ['/trabajo/motila',      /capturas\/motila-reserva\.jpg/g, 1],
  ['/trabajo/recargo',     /capturas\/recargo-[a-z]+\.jpg/g, 4],
  ['/servicios',           /<h1/g, 1],
  ['/productos',           /<h1/g, 1],
  ['/contacto',            /campo-mensaje/g, 1],
  ['/en/trabajo',          /href="\/en\/trabajo\/[a-z-]+"/g, 6],
]

const fallos = []

for (const [ruta, patron, minimo] of ESPERADO) {
  let html
  try {
    const r = await fetch(base + ruta)
    if (!r.ok) { fallos.push(`${ruta}: HTTP ${r.status}`); continue }
    html = await r.text()
  } catch (e) {
    fallos.push(`${ruta}: no responde (${e.message})`)
    continue
  }

  const encontrados = new Set(html.match(patron) ?? []).size
  const marca = encontrados >= minimo ? 'ok ' : 'NO '
  console.log(`  ${marca}${ruta.padEnd(22)} ${encontrados}/${minimo}  ${patron.source.slice(0, 34)}`)
  if (encontrados < minimo) {
    fallos.push(`${ruta}: ${encontrados} de ${minimo} para /${patron.source}/`)
  }
}

if (fallos.length) {
  console.error(`\n  ${fallos.length} comprobación(es) fallan:\n`)
  for (const f of fallos) console.error(`  ✗ ${f}`)
  console.error('\n  Si las páginas responden pero salen vacías, la caché de contenido')
  console.error('  está rota: `pnpm dev` la reconstruye sola desde el primer arranque.\n')
  process.exit(1)
}
console.log('\n  Todas las páginas rinden su contenido.\n')
