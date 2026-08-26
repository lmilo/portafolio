import nodemailer from 'nodemailer'
import { esquemaContacto } from '#shared/contacto'

/**
 * Recibe el formulario y lo envía por correo.
 *
 * El endpoint es público: valida siempre, aunque el navegador ya haya validado.
 * Y limita por IP, porque un formulario de contacto sin límite es un relé de
 * spam esperando a que alguien lo encuentre.
 */

// Ventana de memoria por instancia. No es un límite fuerte —una función
// serverless puede escalar a varias instancias— pero corta el abuso trivial
// sin añadir una dependencia de almacenamiento.
const envios = new Map<string, number[]>()
const VENTANA_MS = 15 * 60 * 1000
const MAXIMO = 5

function limitado(ip: string): boolean {
  const ahora = Date.now()
  const previos = (envios.get(ip) ?? []).filter(t => ahora - t < VENTANA_MS)
  if (previos.length >= MAXIMO) return true
  previos.push(ahora)
  envios.set(ip, previos)
  return false
}

export default defineEventHandler(async (event) => {
  const ip = getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || getRequestHeader(event, 'x-real-ip')
    || 'desconocida'

  if (limitado(ip)) {
    throw createError({ statusCode: 429, data: { motivo: 'limite' } })
  }

  const cuerpo = await readBody(event)
  const analisis = esquemaContacto.safeParse(cuerpo)

  if (!analisis.success) {
    // Los mensajes van en el cuerpo, no en statusMessage: el status line de
    // HTTP solo admite ASCII y h3 le quita los acentos.
    throw createError({
      statusCode: 400,
      data: { motivo: 'invalido', campos: analisis.error.flatten().fieldErrors }
    })
  }

  const { nombre, correo, asunto, mensaje, web } = analisis.data

  // El campo trampa venía relleno: es un bot. Se responde 200 a propósito para
  // no darle señal de que fue detectado.
  if (web) return { ok: true }

  const config = useRuntimeConfig()
  const { smtpHost, smtpPuerto, smtpUsuario, smtpClave, correoDestino, correoRemitente } = config

  if (!smtpHost || !smtpUsuario || !smtpClave) {
    throw createError({ statusCode: 503, data: { motivo: 'sin-configurar' } })
  }

  const transporte = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPuerto) || 587,
    secure: Number(smtpPuerto) === 465,
    auth: { user: smtpUsuario, pass: smtpClave }
  })

  const asuntos: Record<string, string> = {
    empleo: 'Vacante',
    proyecto: 'Proyecto a medida',
    producto: 'Alquiler de sistema',
    otro: 'Consulta'
  }

  await transporte.sendMail({
    // El remitente TIENE que ser una dirección verificada en el proveedor. Con
    // el login SMTP en su lugar, Brevo acepta la conexión, devuelve éxito y
    // descarta el mensaje en silencio: no aparece ni en los logs de la cuenta.
    from: `"Portafolio · ${nombre}" <${correoRemitente || correoDestino}>`,
    to: correoDestino || smtpUsuario,
    // replyTo y no from: poner la dirección de quien escribe en el remitente
    // hace que SPF y DKIM no cuadren y el correo acabe en spam.
    replyTo: `"${nombre}" <${correo}>`,
    subject: `[${asuntos[asunto]}] ${nombre}`,
    text: [
      `Nombre:  ${nombre}`,
      `Correo:  ${correo}`,
      `Asunto:  ${asuntos[asunto]}`,
      '',
      mensaje
    ].join('\n')
  })

  return { ok: true }
})
