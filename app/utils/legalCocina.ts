import type { SeccionLegal } from './legal'
import { CORREO_LEGAL } from './legal'

/**
 * Los documentos legales de Cocina a Mano.
 *
 * Viven aquí y no en `content/` por lo mismo que los de Recargo: el validador aplica el
 * esquema de fichas a todo `.md` bajo esa carpeta, y esto no es contenido del portafolio
 * sino la letra pequeña de otro producto, que solo está aquí porque Google Play exige una
 * URL pública y estable.
 *
 * SOLO EN ESPAÑOL, A PROPÓSITO. La app se distribuye únicamente en Colombia y se rige por
 * la ley colombiana; una traducción no oficial crea el problema de cuál versión manda si
 * las dos divergen. La ruta en inglés muestra el mismo texto con una nota que lo explica.
 *
 * LO QUE HACE ESTA POLÍTICA DISTINTA A LA DE RECARGO: Recargo no manda nada a ningún lado y
 * su política puede decir "no sale nada de tu teléfono" sin matices. Aquí sí sale algo —la
 * foto de una factura y una lista de ingredientes— y eso obliga a explicar exactamente qué,
 * cuándo y a quién. Es la parte que más importa de este texto.
 *
 * La fuente de verdad son `PRIVACIDAD.md` y `TERMINOS.md` en el repositorio de la app. Al
 * cambiarlos allá hay que traerlos aquí; la fecha de vigencia es lo que permite detectar
 * que se desincronizaron.
 */

export const VIGENCIA_COCINA = '30 de agosto de 2026'
export const CORREO_COCINA = CORREO_LEGAL
export const REPO_COCINA = 'https://github.com/lmilo/CocinaMano'

export const PRIVACIDAD_COCINA: SeccionLegal[] = [
  {
    titulo: 'Lo corto',
    destacado: true,
    parrafos: [
      'Tu despensa, tus recetas y tu lista de compras viven solo en tu teléfono. No hay cuenta, no hay contraseña, no hay servidor donde se guarden. Nadie más puede verlas, ni siquiera quien hizo la app.',
      'Hay dos excepciones, y son las dos únicas veces que algo sale de tu teléfono. Las dos las activas tú, a propósito, tocando un botón: cuando le tomas la foto a una factura para que la app la lea, y cuando pides que te genere una receta con inteligencia artificial.',
      'Si desinstalas la app, se borra todo. No hay respaldo automático: es la consecuencia directa de no pedirte una cuenta. Por eso la app trae "Guardar un respaldo", y ese archivo queda donde tú lo pongas.'
    ]
  },
  {
    titulo: 'Qué se guarda en tu teléfono',
    parrafos: [
      'Todo lo pones tú, y todo se queda ahí:',
      '- Los productos de tu despensa: nombre, cantidad, precio si lo escribiste, y fecha de vencimiento.',
      '- Las recetas que escribas o generes, y cuáles marcaste como preparadas con su calificación.',
      '- Tu lista de compras.',
      '- Los códigos de barras que hayas escaneado y el nombre que les diste, para que la próxima vez la app ya los reconozca.',
      '- Tus preferencias: tema claro u oscuro, si quieres avisos y con cuántos días de anticipación.',
      'No se pide ni se guarda: cédula, teléfono, correo, dirección, ubicación, contactos ni nada relativo a la salud. La app no sabe quién eres.',
      'Todo eso se borra por completo al desinstalar la app, o desde Yo → Borrar todo.'
    ]
  },
  {
    titulo: 'Cuando le tomas foto a una factura',
    destacado: true,
    parrafos: [
      'La foto del recibo se manda a un servidor propio en Cloudflare, que la reenvía a la API de Google Gemini para sacar los productos. La foto no se almacena: se usa para leerla y se descarta.',
      'Un recibo de supermercado puede traer cosas que no son comida: el nombre del almacén, la fecha y la hora, el número de la caja, a veces los últimos dígitos de una tarjeta. Si eso te preocupa, tapa esa parte antes de la foto.',
      'Y si prefieres que nada salga del teléfono, la app tiene otros dos caminos para cargar el mercado que no usan internet: escanear el código de barras y dictarlo por voz.'
    ]
  },
  {
    titulo: 'Cuando pides una receta con IA',
    parrafos: [
      'Se manda la lista de nombres de los ingredientes que tienes y los parámetros que elegiste: para cuántas personas, tipo de plato, si la quieres vegana.',
      'No se manda tu despensa completa, ni los precios, ni las fechas de vencimiento, ni tus recetas guardadas.'
    ]
  },
  {
    titulo: 'El identificador de instalación',
    parrafos: [
      'En esos dos casos viaja también un número aleatorio que sirve para una sola cosa: limitar cuántas veces por hora se puede usar el servicio, para que no se agote la cuota.',
      'Ese número no está ligado a tu nombre, tu correo, tu teléfono ni tu cuenta de Google. Nace cuando instalas la app y muere cuando la desinstalas. No dice quién eres.',
      'No se manda tu ubicación, tus contactos, ni ningún identificador del dispositivo.'
    ]
  },
  {
    titulo: 'Cuando escaneas un código de barras',
    parrafos: [
      'Se consulta el código en Open Food Facts, una base de datos pública y abierta de productos. Solo viaja el número del código de barras, nada más.',
      'Si el producto no aparece —pasa seguido con marcas colombianas—, escribes el nombre y la app lo guarda en tu propio teléfono. De ahí en adelante lo reconoce sin consultar a nadie.'
    ]
  },
  {
    titulo: 'Publicidad',
    parrafos: [
      'La app muestra un banner de Google AdMob. Google puede usar el identificador de publicidad del dispositivo para escoger qué anuncio mostrar, según su propia política.',
      'Ese identificador no lleva nada de lo que tú escribiste: ni tu despensa, ni tus recetas, ni tu lista. Y lo controlas desde los ajustes de privacidad de Android.',
      'El banner no aparece mientras estás cocinando una receta: en esa pantalla tienes las manos ocupadas y un toque accidental en un anuncio te sacaría del paso en el peor momento.'
    ]
  },
  {
    titulo: 'Permisos, y qué pasa si los niegas',
    parrafos: [
      '- Cámara: para leer códigos de barras y fotografiar facturas. Si la niegas, puedes agregar los productos a mano o dictándolos.',
      '- Micrófono: para dictar el mercado con las manos ocupadas. Si lo niegas, puedes escribirlo.',
      '- Fotos: para elegir la foto de una factura que ya tomaste. Si la niegas, puedes tomarla en el momento.',
      '- Notificaciones: para avisarte antes de que algo se venza. Si las niegas, la app funciona igual, solo que sin avisos.',
      'Ninguno es obligatorio para usar la app.'
    ]
  },
  {
    titulo: 'Menores de edad',
    parrafos: [
      'La app no está dirigida a menores de 13 años y no recoge datos a sabiendas de ellos.'
    ]
  },
  {
    titulo: 'Cambios',
    parrafos: [
      'Si esta política cambia de forma que afecte lo que sale de tu teléfono, la app te la vuelve a mostrar antes de dejarte seguir. No basta con haber aceptado una versión anterior: se guarda cuál texto aceptaste, no una casilla.'
    ]
  }
]

export const TERMINOS_COCINA: SeccionLegal[] = [
  {
    titulo: 'Qué es esta app',
    parrafos: [
      'Cocina a Mano lleva la cuenta de lo que tienes en la despensa, te avisa antes de que algo se venza, y te dice qué recetas te alcanzan con eso. Es una herramienta de organización doméstica.'
    ]
  },
  {
    titulo: 'La app avisa, tu criterio decide',
    destacado: true,
    parrafos: [
      'La fecha de vencimiento que la app maneja es la que tú escribiste o la que se leyó de un empaque. La app no sabe cómo guardaste el producto, si se rompió la cadena de frío, ni si el empaque estaba abierto.',
      'Antes de comer algo, míralo, huélelo y usa tu criterio. La app dice cuándo tocaba revisarlo, no si está bueno.'
    ]
  },
  {
    titulo: 'No es asesoría nutricional ni médica',
    parrafos: [
      'No considera alergias, intolerancias, condiciones de salud ni requerimientos nutricionales.',
      'Si tienes una alergia alimentaria, lee siempre los ingredientes del empaque. Ni el catálogo de recetas ni la generación con IA son una fuente confiable para eso.'
    ]
  },
  {
    titulo: 'Lo que hace la IA puede estar mal',
    parrafos: [
      'Las recetas generadas pueden proponer combinaciones malas, tiempos de cocción incorrectos o cantidades desproporcionadas. Trátalas como la sugerencia de alguien que no está en tu cocina, no como una receta probada.',
      'La lectura de facturas también se equivoca: un recibo trae abreviaturas que ningún sistema acierta siempre. Por eso la app te muestra lo que entendió y te deja corregirlo antes de guardar nada.',
      'Los precios y costos que muestra son estimaciones basadas en lo que tú registraste. No sirven para contabilidad.'
    ]
  },
  {
    titulo: 'Tus datos son tuyos',
    parrafos: [
      'Todo vive en tu teléfono. La política de tratamiento de datos explica en detalle las dos únicas cosas que salen de él, y cuándo.',
      'No hay respaldo automático. Guardar respaldos es tu responsabilidad, y la app te da la herramienta en Yo → Guardar un respaldo.'
    ]
  },
  {
    titulo: 'Responsabilidad',
    parrafos: [
      'La app se ofrece como está. Quien la hizo no responde por comida que se dañe, por una receta que no salga bien, ni por datos que se pierdan al perder o formatear el teléfono.',
      'Esto no pretende limitar responsabilidades que la ley colombiana no permita limitar.'
    ]
  },
  {
    titulo: 'Publicidad',
    parrafos: [
      'La app muestra publicidad de Google AdMob. Los anuncios los sirve Google y no implican que quien hizo la app respalde lo anunciado.'
    ]
  },
  {
    titulo: 'Uso aceptable',
    parrafos: [
      'No uses la app para nada ilegal, ni intentes abusar del servicio de lectura de facturas o de generación de recetas más allá de su uso normal.'
    ]
  },
  {
    titulo: 'Ley aplicable',
    parrafos: ['Colombia.']
  }
]
