import { z } from 'zod'

/**
 * Contrato del formulario de contacto, compartido entre cliente y servidor.
 *
 * Uno solo a propósito: si el navegador validara con unas reglas y el servidor
 * con otras, el usuario vería "enviado" y el mensaje se caería en el camino, o
 * al revés. La validación del cliente es comodidad; la del servidor es la que
 * manda, porque el endpoint es público y cualquiera puede llamarlo sin pasar
 * por el formulario.
 */
export const esquemaContacto = z.object({
  nombre: z.string().trim().min(2).max(120),
  correo: z.string().trim().email().max(200),
  asunto: z.enum(['empleo', 'proyecto', 'producto', 'otro']),
  mensaje: z.string().trim().min(20).max(2000),
  // Campo trampa: invisible para las personas, irresistible para los bots que
  // rellenan todo lo que encuentran. Si viene con algo, se descarta el envío.
  web: z.string().max(0).optional()
})

export type DatosContacto = z.infer<typeof esquemaContacto>
