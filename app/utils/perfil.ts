/**
 * Datos personales del sitio, en un solo sitio.
 * Todo lo que aparezca en pantalla sobre Camilo sale de aquí — si algo cambia,
 * se cambia una vez. PENDIENTE DE CONFIRMAR: ciudad y LinkedIn.
 */
export const perfil = {
  nombre: 'Camilo Rincón',
  iniciales: 'CR',
  titulo: {
    es: 'Desarrollador fullstack',
    en: 'Full-stack developer'
  },
  ciudad: {
    es: 'Medellín, Colombia',
    en: 'Medellín, Colombia'
  },
  disponible: true,
  correo: 'camiloarinconc@gmail.com',
  github: 'https://github.com/lmilo',
  githubUsuario: 'lmilo',
  linkedin: '',
  whatsapp: ''
} as const

export const enlacesSociales = () => [
  { etiqueta: 'GitHub', url: perfil.github },
  perfil.linkedin ? { etiqueta: 'LinkedIn', url: perfil.linkedin } : null,
  { etiqueta: perfil.correo, url: `mailto:${perfil.correo}` }
].filter(Boolean) as { etiqueta: string, url: string }[]
