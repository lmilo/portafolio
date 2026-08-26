---
titulo: Gestión de Glosas
resumen: Seguimiento de las objeciones que las aseguradoras hacen sobre facturas médicas, con un calendario de revisión que el sistema hace cumplir.
gancho: Cada aseguradora se revisa un día fijo de la semana. Cuando cae festivo, cada una se corre distinto — y el sistema lo impone, no lo sugiere.
orden: 2
estado: produccion
desde: '2026-06'
evidencia:
  - 43 commits
  - 820 facturas en el set de prueba
  - unitarios + integración
  - seed determinista
stack:
  - Nuxt 4
  - Drizzle ORM
  - PostgreSQL
  - TypeScript
  - Vitest
  - Docker Compose
# Sin enlace público: la aplicación lleva la facturación real de un cliente.
enlaces: []
capturas:
  - archivo: glosas-entidad.jpg
    alt: "Ficha de ARL Sura con la cinta de días de revisión arriba —lunes ARL Sura, martes EPS Sura, miércoles Salud Total resaltado como el día de hoy, jueves EPS Sanitas— y debajo sus facturas con el estado de vencimiento"
    pie: "La cinta de arriba es el calendario de revisión: cada entidad en su día y el de hoy resaltado. Bajo el nombre, «Revisión los lunes». Nombres de personas, números de factura y montos van cambiados; la entidad y su NIT son públicos."
    url: seguimiento de glosas · acceso restringido/entidades/arl-sura
    ratio: 1458 / 812
  - archivo: glosas-cartera.jpg
    alt: "Cartera de glosas con una tarjeta por entidad: ARL Sura, EPS Sura, Salud Total y EPS Sanitas, cada una con su tipo, su NIT y el conteo de glosas abiertas"
    pie: "Cada entidad muestra su tipo junto al nombre. ARL Sura es una ARL, no una EPS, y el sistema lo dice. El usuario y el monto van cambiados."
    url: gestion-glosas-412e.onrender.com
    ratio: 1559 / 784
---

Cuando una aseguradora recibe una factura médica y objeta parte de ella, eso es una
*glosa*. Alguien tiene que responderla, con soporte, antes de que venza el plazo. Si
nadie la responde, la plata no se cobra.

El sistema lleva el rastro completo: qué se objetó, qué se respondió, con qué documento
y quién quedó a cargo.

## El problema

Lo difícil no fue el CRUD de facturas. Fue el calendario.

Cada aseguradora se revisa **un día fijo de la semana**, dentro de una ventana de lunes
a jueves. EPS Sura los martes, Salud Total los miércoles, Sanitas los jueves, ARL Sura
los lunes. Fuera de su día, la bitácora de esa entidad es de solo lectura.

Y entonces cae un festivo. Colombia tiene dieciocho al año, muchos movidos al lunes por
la Ley Emiliani, así que los lunes se pierden con una frecuencia que no es anecdótica.

La regla de corrimiento **no es la misma para todas**. Cada entidad declara la suya:

- Las tres EPS **aplazan**: la revisión espera a su día asignado de la semana
  siguiente. Solo si su día cae festivo dos semanas seguidas se recuperan en un día de
  refugio, compartiéndolo con quien lo ocupe.
- ARL Sura se corre **de inmediato**: con un solo festivo pasa al miércoles de esa misma
  semana, junto a Salud Total. Nunca al martes, porque EPS Sura no comparte día con
  nadie. Y si el miércoles también es festivo, entonces sí espera al lunes siguiente.

Esa última condición —que EPS Sura sea exclusiva— es lo que convierte una tabla de
correspondencias en un motor con casos de borde reales.

## La decisión difícil

La tentación era tratar el calendario como presentación: mostrar el día sugerido y
dejar que la gestora escriba cuando quiera. Es más fácil de construir y no rompe nada.

Se decidió lo contrario: **el sistema hace cumplir la regla, no se limita a mostrarla.**
Fuera de su día válido, una entidad no admite observaciones nuevas. Se acepta la
fricción a propósito, porque un registro escrito el día equivocado es exactamente el
error que este sistema existe para prevenir.

Eso obligó a que el motor de calendario fuera una pieza pura, aislada y probada por
separado — no lógica repartida entre componentes de interfaz.

::margen
820 facturas, 2.700 observaciones y 1.400 PDFs de prueba, siempre idénticos.

Un seed aleatorio habría escondido justo el fallo que este seed hace imposible.
::

La consecuencia que más sirvió después: **el seed usa el mismo motor que el runtime**.
Las 820 facturas y las 2.700 observaciones de prueba se generan siempre iguales, y las
observaciones solo caen en días de revisión válidos. Si el motor tuviera un error, los
datos de prueba serían imposibles y el fallo saltaría antes de llegar a producción.

## Cómo quedó

**El sistema dice *entidad*, no *EPS*.** ARL Sura es una ARL, y llamarla EPS sería
incorrecto en pantalla y en el Excel que ve el cliente. Cada entidad declara su tipo y
ese tipo se muestra junto al nombre. Hoy los nombres lo traen dentro, pero eso es
coincidencia, no diseño.

**Los festivos se calculan, no se tabulan.** Hay fechas móviles derivadas de la Pascua
y traslados al lunes por la Ley Emiliani. Una tabla escrita a mano se desactualiza y
nadie se entera hasta que ya se registró mal.

**Dos suites separadas.** Los unitarios prueban el motor de calendario en
milisegundos, sin infraestructura. Los de integración levantan la aplicación contra
Postgres en Docker. La separación importa: el motor se corre en cada guardado, y una
suite que necesita Docker no se corre con esa frecuencia.

## Estado

En producción con la gestora usándolo a diario. Lo siguiente son los reportes de cierre
mensual, que hoy se arman exportando a Excel y terminando a mano.
