import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const esquemaCaso = z.object({
  titulo: z.string(),
  cliente: z.string().optional(),
  resumen: z.string(),
  // La frase que aparece en la tarjeta: el problema en una línea, sin adjetivos.
  gancho: z.string(),
  orden: z.number(),
  estado: z.enum(['produccion', 'desarrollo', 'entregado']),
  desde: z.string(),
  // Hechos duros de la cinta de evidencia. Datos, no adjetivos (BRAND §2).
  evidencia: z.array(z.string()),
  stack: z.array(z.string()),
  enlaces: z.array(z.object({
    etiqueta: z.string(),
    url: z.string(),
    tipo: z.enum(['vivo', 'codigo', 'documento']),
    // Render gratuito duerme ~50 s: el botón lo advierte en vez de parecer roto.
    duerme: z.boolean().optional()
  })).default([]),
  portada: z.string().optional(),
  capturas: z.array(z.object({
    archivo: z.string(),
    alt: z.string(),
    pie: z.string().optional(),
    dispositivo: z.enum(['escritorio', 'movil']).default('escritorio')
  })).default([])
})

const esquemaFicha = z.object({
  titulo: z.string(),
  resumen: z.string(),
  orden: z.number(),
  estado: z.enum(['produccion', 'desarrollo', 'entregado']),
  stack: z.array(z.string()),
  enlaces: z.array(z.object({
    etiqueta: z.string(),
    url: z.string(),
    tipo: z.enum(['vivo', 'codigo', 'documento']),
    duerme: z.boolean().optional()
  })).default([])
})

export default defineContentConfig({
  collections: {
    casos_es: defineCollection({ type: 'page', source: 'es/casos/**.md', schema: esquemaCaso }),
    casos_en: defineCollection({ type: 'page', source: 'en/casos/**.md', schema: esquemaCaso }),
    archivo_es: defineCollection({ type: 'data', source: 'es/archivo/**.md', schema: esquemaFicha }),
    archivo_en: defineCollection({ type: 'data', source: 'en/archivo/**.md', schema: esquemaFicha })
  }
})
