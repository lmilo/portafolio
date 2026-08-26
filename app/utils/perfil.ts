/**
 * Datos personales del sitio, en un solo sitio.
 * Todo lo que aparezca en pantalla sobre Camilo sale de aquí — si algo cambia,
 * se cambia una vez. PENDIENTE DE CONFIRMAR: ciudad. Dominio: aún no hay.
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
  linkedin: 'https://www.linkedin.com/in/camilo-andres-rinc%C3%B3n-chavez-b18a2518a/',
  instagram: 'https://www.instagram.com/camilo_r.c_/',
  whatsapp: ''
} as const

export const enlacesSociales = () => [
  { etiqueta: 'GitHub', url: perfil.github },
  perfil.linkedin ? { etiqueta: 'LinkedIn', url: perfil.linkedin } : null,
  perfil.instagram ? { etiqueta: 'Instagram', url: perfil.instagram } : null,
  { etiqueta: perfil.correo, url: `mailto:${perfil.correo}` }
].filter(Boolean) as { etiqueta: string, url: string }[]
