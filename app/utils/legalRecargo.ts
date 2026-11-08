/**
 * Los documentos legales de Recargo, la app de recargos laborales.
 *
 * Viven aquí y no en `content/` por dos razones. La primera es práctica: el validador de
 * contenido aplica el esquema de fichas a todo `.md` bajo `content/`, y exigirle `orden`,
 * `estado` y `stack` a una política de privacidad no tiene sentido. La segunda es que esto
 * no es contenido del portafolio: es la letra pequeña de otro producto, que solo vive aquí
 * porque Google Play exige una URL pública y estable.
 *
 * SOLO EN ESPAÑOL, A PROPÓSITO. El sitio es bilingüe, pero estos textos no se traducen:
 * Recargo se distribuye únicamente en Colombia, se rige por la ley colombiana, y una
 * traducción no oficial de un documento legal crea el problema de cuál versión manda si las
 * dos divergen. La ruta en inglés muestra el mismo texto con una nota que lo explica.
 *
 * La fuente de verdad son `PRIVACIDAD.md` y `TERMINOS.md` en el repositorio de Recargo.
 * Al cambiarlos allá hay que traerlos aquí: la fecha de vigencia es lo que permite detectar
 * que se desincronizaron.
 */

import type { SeccionLegal } from './legal'
import { CORREO_LEGAL } from './legal'

export const VIGENCIA_RECARGO = '8 de noviembre de 2026'
export const CORREO_RECARGO = CORREO_LEGAL
export const REPO_RECARGO = 'https://github.com/lmilo/recargo'

// `SeccionLegal` vive en `./legal` desde que llegó la segunda app. NO se reexporta:
// con los auto-imports de Nuxt, el mismo tipo en dos módulos hace que uno gane en
// silencio y el aviso aparece en cada build.

export const PRIVACIDAD_RECARGO: SeccionLegal[] = [
  {
    titulo: 'Lo corto',
    destacado: true,
    parrafos: [
      'Tus turnos y tu sueldo no salen de este teléfono. No hay servidor, no hay cuenta, no hay analítica. Todo lo que escribes vive ahí y no sale, salvo cuando tú decides mandar un archivo por WhatsApp, correo o donde quieras.',
      'La app sí muestra publicidad, y eso es lo único que se conecta a internet. Para escoger qué anuncio mostrarte, Google recibe un identificador de tu celular y algunos datos técnicos, como la región aproximada desde donde te conectas. Nada de eso dice quién eres, no lleva tu nombre, y no viaja con nada de lo que tú escribiste: ni tus turnos, ni tu sueldo, ni el nombre de tu empresa.',
      'Si desinstalas la app, se borra. Si pierdes el teléfono sin haber exportado un archivo, se pierde. Nadie más tiene una copia, ni el autor de la app.'
    ]
  },
  {
    titulo: 'Qué datos guarda la app',
    parrafos: [
      'Todos los pone el usuario, en su propio teléfono:',
      '- Nombre, que es opcional: solo sirve para saludar y encabezar los documentos.',
      '- Sueldo mensual y horas de la jornada, para calcular el valor de la hora.',
      '- Turnos: entrada, salida y las notas que se les pongan.',
      '- Lo que dice el desprendible, si se escribe, para poder compararlo.',
      '- Cambios de turno con compañeros, incluido el nombre del compañero que se anote.',
      '- Días compensatorios ya tomados.',
      '- La clave de cuatro números, que no se guarda con lo demás: va en el llavero cifrado del sistema (Android Keystore).',
      '- Los últimos veinte fallos de la app, con el mensaje del error, para poder reportarlos. No se mandan solos.',
      'No se pide ni se guarda: cédula, teléfono, correo, dirección, ubicación, contactos, huella, cámara, ni nada relativo a la salud.',
      'Los permisos del sistema que usa la app son tres: mostrar avisos —solo si el usuario los activa—, acceso a internet, y el identificador de publicidad. Los dos últimos existen únicamente por la publicidad y no se usan para nada más.'
    ]
  },
  {
    titulo: 'Qué NO hace la app',
    parrafos: [
      '- No manda tus datos a ningún servidor. No hay backend propio, no hay API, no hay sincronización entre teléfonos. Tus turnos y tu sueldo no llegan a ninguna parte.',
      '- No usa analítica. Ni Google Analytics, ni Firebase: quien hizo la app no mide cuántas veces la abres ni qué pantallas miras. Lo único que se mide es el anuncio, y eso lo hace Google (ver «La publicidad»).',
      '- No comparte datos con terceros. Ni con empleadores, ni con el autor de la app.',
      '- No manda los fallos automáticamente. El registro se queda quieto hasta que el usuario toque «Si algo se dañó, mandar el detalle».',
      '- No crea cuentas ni pide iniciar sesión.'
    ]
  },
  {
    titulo: 'La publicidad',
    parrafos: [
      'La app muestra un anuncio pequeño encima de la barra de navegación. Es lo que la sostiene: no cuesta nada, no tiene versión de pago y no vende datos de nadie.',
      'Lo que Google recibe: el identificador de publicidad del celular —un número que Android le asigna al teléfono, no a la persona—; la dirección IP, de la que deduce la ciudad o la región aproximada, nunca la ubicación exacta; el tipo de dispositivo, el país y el idioma; si el anuncio se vio o se tocó, y datos técnicos de cómo funcionó, como cuánto tardó en cargar. Eso lo usa para escoger el anuncio, medir cómo le fue y detectar clics fraudulentos.',
      'Lo que Google NO recibe: turnos, sueldo, horas, notas, nombre, desprendibles ni compañeros. Nada de lo que se escribe en la app. La parte que calcula las horas y la parte que muestra el anuncio no se hablan entre ellas.',
      'Se puede controlar desde Android sin desinstalar nada:',
      '- Ajustes → Google → Anuncios → Restablecer el ID de publicidad: asigna un número nuevo y se pierde el historial anterior.',
      '- Ajustes → Google → Anuncios → Eliminar el ID de publicidad: los anuncios siguen apareciendo, pero dejan de personalizarse.',
      'Los anunciantes no reciben datos del usuario y no pueden escribirle. Además hay categorías bloqueadas a propósito, entre ellas las de «ganar dinero rápido», casinos, apuestas y alcohol: en una app que existe para revisar cuánto le deben a alguien, ese tipo de anuncio sobra.'
    ]
  },
  {
    titulo: 'La única vez que los datos salen del teléfono',
    parrafos: [
      'Cuando el usuario usa «Sacar mis horas» y comparte el PDF, el Excel, el Word, el CSV o la carta de reclamación. En ese momento el archivo pasa al menú de compartir de Android y va adonde el usuario lo mande.',
      'Eso es una decisión suya, cada vez. La app no comparte nada por su cuenta, y a partir de que el archivo sale, quien lo recibe hace con él lo que quiera: esta política ya no lo cubre. El archivo contiene el nombre, el sueldo y todos los turnos del periodo.'
    ]
  },
  {
    titulo: 'Cómo borrar todo',
    parrafos: [
      'Yo → Borrar todo y empezar de cero. Borra los turnos, el perfil, los cambios, los desprendibles y el registro de fallos. La clave de cuatro números se quita desde la misma pantalla. Desinstalar la app también borra todo.',
      'No hay nada que pedirle a nadie ni ningún trámite: los datos son del usuario y están en su teléfono, así que el derecho a conocerlos, actualizarlos, rectificarlos y suprimirlos (Ley 1581 de 2012, art. 8) se ejerce directamente en la app.',
      'No hay recuperación de la clave. Si el usuario la olvida, la única salida es borrar los datos y empezar de nuevo. La app lo advierte al momento de crearla.'
    ]
  },
  {
    titulo: 'Sobre la Ley 1581 de 2012',
    parrafos: [
      'Los datos laborales —turnos, sueldo, desprendibles, compañeros— no se tratan en el sentido de la ley: no se recolectan, no salen del dispositivo, no existe base de datos que registrar ante la SIC, y el artículo 2 literal a) excluye las bases de uso personal o doméstico.',
      'Los datos de la publicidad sí son distintos, y hay que decirlo con claridad: el identificador de publicidad, la IP y lo que pasa con el anuncio salen del teléfono y llegan a Google. No identifican al usuario por su nombre, pero tampoco son anónimos del todo, y Google los trata bajo sus propias políticas, no bajo esta. Se pueden consultar en policies.google.com/technologies/ads, y el identificador se puede cortar desde los ajustes de Android como se explica arriba.',
      'La distinción importa y no es un tecnicismo: lo que la app promete proteger son los datos laborales, que son los que pueden costarle el puesto a alguien. Esa promesa se sostiene entera. Nada de lo que recibe Google dice dónde trabajas ni cuánto ganas.'
    ]
  },
  {
    titulo: 'Un aviso que sí importa',
    destacado: true,
    parrafos: [
      'Recargo maneja el sueldo y la jornada de quien la usa, y existe para una discusión con su empleador. Si alguien más tiene acceso al teléfono, tiene acceso a esa información.',
      'Por eso la app trae la clave de cuatro números (Yo → Poner clave), que además vuelve a pedirla cuando la app pasa más de dos minutos cerrada. Se recomienda activarla, especialmente si el teléfono se deja en un puesto de trabajo.'
    ]
  },
  {
    titulo: 'Menores de edad',
    parrafos: [
      'La app no está dirigida a menores de catorce años: está hecha para trabajadores por turnos. No se recogen datos personales de nadie, y la publicidad no está dirigida a menores.'
    ]
  },
  {
    titulo: 'Cambios a esta política',
    parrafos: [
      'Si cambia, cambia la fecha de vigencia y queda en el historial del repositorio, que es público. Un cambio que afecte lo que la app hace con los datos se avisa dentro de la app y obliga a aceptarlo de nuevo.'
    ]
  }
]

export const TERMINOS_RECARGO: SeccionLegal[] = [
  {
    titulo: 'Qué es esta app, exactamente',
    destacado: true,
    parrafos: [
      'Recargo es una calculadora. Cuenta las horas que el usuario marca, las clasifica según la ley colombiana y dice cuánto valdrían.',
      'No es una liquidación de nómina. No es un desprendible, no es un documento oficial, no tiene valor probatorio por sí mismo y no reemplaza lo que liquide el empleador.'
    ]
  },
  {
    titulo: 'La app estima, y estima con lo que le dan',
    parrafos: [
      'Todas las cifras salen de dos cosas que escribe el usuario: su sueldo y sus turnos. Si el sueldo está mal escrito, todo lo demás está mal. Si un turno se registró de memoria tres días después, la cuenta vale lo que valga ese recuerdo — por eso la app marca cada turno según si fue marcado en el momento, escrito a mano después, o corregido.',
      'Cuando la app no puede calcular algo bien, lo dice: marca el turno como «falta revisarlo» y no lo suma. Preferimos un dato faltante a un dato inventado.'
    ]
  },
  {
    titulo: 'Lo que la app no sabe de tu contrato',
    parrafos: [
      'La app no conoce el contrato del usuario y no puede conocerlo. En particular no sabe:',
      '- Si el contrato es de salario integral. Si lo es, los recargos ya van incluidos en el pago y esta cuenta no aplica igual. La app avisa cuando el sueldo sugiere que podría serlo, pero hay que revisarlo en el contrato.',
      '- Los acuerdos de jornada de la empresa. El Código permite acordar jornadas de hasta diez horas sin recargo si la semana no pasa de cuarenta y dos, y eso depende de cada acuerdo concreto.',
      '- Los descuentos. Todo lo que la app muestra es devengado, antes de salud, pensión, retención en la fuente, préstamos, embargos o cooperativas. Lo que le consignan al usuario va a ser menos que la cifra que ve en pantalla.',
      '- Otros pagos: auxilio de transporte, primas, vacaciones, incapacidades, bonificaciones, comisiones.'
    ]
  },
  {
    titulo: 'Sobre la retención en la fuente',
    parrafos: [
      'La app no calcula la retención en la fuente y no va a hacerlo, porque no tiene los datos para hacerlo bien: no conoce las deducciones del usuario —personas a cargo, intereses de vivienda, medicina prepagada, aportes voluntarios— ni cuál de los dos procedimientos usa la empresa para liquidarla.',
      'Lo único que hace es avisar cuando el devengado del periodo llega al monto desde el cual la retención deja de ser cero (Estatuto Tributario, artículo 383), para que el usuario no confunda lo devengado con lo que le van a consignar. Ese aviso es informativo y aproximado: usa la depuración mínima de un asalariado sin deducciones adicionales, así que puede aparecerle a alguien a quien finalmente no le retengan.'
    ]
  },
  {
    titulo: 'Esto no es asesoría legal ni contable',
    destacado: true,
    parrafos: [
      'El autor de esta app no es abogado laboralista ni contador, y la app no presta ninguno de esos servicios. Los artículos del Código Sustantivo del Trabajo y las leyes que se citan están ahí para que el usuario pueda verificar de dónde sale cada porcentaje, no como opinión jurídica sobre su caso.',
      'Antes de un reclamo formal, de una demanda o de una renuncia, hay que consultar a un abogado laboralista, al Ministerio del Trabajo, al sindicato o a un consultorio jurídico universitario, que son gratuitos.'
    ]
  },
  {
    titulo: 'La responsabilidad de lo que se reclama es del usuario',
    parrafos: [
      'La app genera una carta de reclamación ya redactada. Entregarla, y con qué cifras, es una decisión del usuario y de nadie más.',
      'En la medida en que lo permita la ley, el autor no responde por los daños, perjuicios, sanciones o consecuencias laborales derivadas del uso de la app o de sus resultados, incluyendo un reclamo mal fundado, un cálculo equivocado, un turno mal registrado o la pérdida de los datos. El software se entrega «tal como está», sin garantía de ningún tipo, según los términos de la licencia MIT que acompaña al código.',
      'Esto no es una fórmula para escurrir el bulto: es la razón por la que la app marca lo que no puede calcular, cita la norma de cada cifra y repite en cada documento que es la estimación del trabajador. Un error aquí es peor que no tener la app, porque da falsa confianza en una discusión de plata.'
    ]
  },
  {
    titulo: 'Los datos y el respaldo son del usuario',
    parrafos: [
      'Todo vive en su teléfono. Como no hay servidor:',
      '- No hay respaldo automático. El respaldo es el archivo que el usuario exporta y se manda a sí mismo. La app le recuerda hacerlo al cerrar cada periodo.',
      '- Si pierde el teléfono, pierde los turnos. No hay copia en ninguna parte.',
      '- No hay recuperación de la clave de cuatro números. Olvidarla obliga a borrar los datos.',
      'El autor no puede recuperar datos de nadie, porque nunca los tuvo.'
    ]
  },
  {
    titulo: 'La base legal puede cambiar',
    parrafos: [
      'Los porcentajes están verificados contra la Ley 2466 de 2025, la Ley 2101 de 2021 y el Código Sustantivo del Trabajo, y viven versionados por fecha de vigencia: un turno de junio se liquida con los valores de junio. Pero las leyes cambian, y una app que no se actualice va a quedar desactualizada sin avisar. El usuario debe verificar que está usando una versión reciente antes de reclamar con estos números.'
    ]
  },
  {
    titulo: 'Costo y publicidad',
    parrafos: [
      'La app es gratuita y sin compras, y se sostiene con publicidad: un anuncio pequeño encima de la barra de navegación. No hay versión de pago ni forma de quitarlo.',
      'Los anuncios los sirve Google AdMob y sus contenidos no los elige ni los revisa el autor de esta app. Aparecer en un anuncio no significa que el producto o la empresa anunciada esté recomendada, avalada ni verificada por nadie relacionado con Recargo. Cualquier trato que el usuario haga con un anunciante es entre ellos dos.',
      'Sí hay categorías bloqueadas a propósito: «ganar dinero rápido», casinos, apuestas y alcohol. El bloqueo depende de que Google clasifique bien cada anuncio, así que no es una garantía absoluta: si aparece algo que no debería, se puede reportar al correo de contacto.',
      'El código es abierto bajo licencia MIT: cualquiera puede leerlo, verificar los cálculos y hacer su propia versión.'
    ]
  },
  {
    titulo: 'Ley aplicable',
    parrafos: [
      'Estos términos se rigen por las leyes de la República de Colombia.'
    ]
  }
]
