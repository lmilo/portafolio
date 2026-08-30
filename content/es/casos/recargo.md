---
titulo: Recargo
resumen: App móvil para trabajadores por turnos en Colombia. Clasifica cada hora en su categoría legal y calcula cuánto vale.
gancho: Una hora trabajada a las 3 de la mañana de un domingo no es "una hora". Es una hora dominical nocturna y vale 125% más.
orden: 3
estado: desarrollo
desde: '2026-07'
evidencia:
  - 261 casos de prueba
  - 8 categorías legales
  - 5 formatos de salida
  - En uso con trabajadores reales
  - APK probado en dispositivo
stack:
  - React Native
  - Expo SDK 57
  - TypeScript
  - Expo Router
  - EAS Build
enlaces: []
capturas:
  - archivo: recargo-marcar.jpg
    dispositivo: movil
    alt: "Pantalla principal con el saludo del día, la banda de 24 horas del turno, el cronómetro en 00:03:39 y «Llevas ganado $714»"
    pie: "La banda de 24 horas es el turno dibujado en su hora real. Debajo, el recargo corriendo en vivo."
  - archivo: recargo-turno.jpg
    dispositivo: movil
    alt: "El turno en curso con el botón grande «Terminé mi turno», y debajo «Agregar un turno que olvidé» y «Cambios con mis compañeros»"
    pie: "Un botón que no se puede errar. Y las dos cosas que un cuaderno no resuelve: el turno olvidado y el cambio con un compañero."
  - archivo: recargo-exportar.jpg
    dispositivo: movil
    alt: "Pantalla «Sacar mis horas» con el mes elegido y lo que lleva el archivo: resumen por categoría, un renglón por turno, y la norma que sustenta cada franja"
    pie: "El archivo lleva el artículo que sustenta cada franja y la tabla de porcentajes con su fecha de vigencia. Sin eso no sirve para reclamar."
  - archivo: recargo-ajustes.jpg
    dispositivo: movil
    alt: "Ajustes de apariencia con tres opciones de tema y el interruptor de modo fácil, que agranda letra y botones"
    pie: "«Fondo azul noche. No encandila en el turno de la madrugada». El modo fácil agranda todo y deja en pantalla solo lo necesario."
---

La planilla de turnos siempre fue del empleador. Esta es la del trabajador, para
comparar contra el desprendible del día 30.

El usuario es un vigilante, un auxiliar de enfermería, un operario. Alguien que rota
turnos, que a veces marca a las dos de la mañana con una mano, y que puede no haber
usado nunca una app que no sea WhatsApp.

## El problema

Un cuaderno puede contar horas. Lo que no puede hacer es **clasificarlas**.

En Colombia una hora trabajada no vale lo mismo según cuándo ocurre. Hay ocho
categorías legales posibles, y se combinan entre sí:

| Concepto | Recargo | Norma |
|---|---|---|
| Día normal | 0% | CST art. 161 |
| Noche (7 p.m. a 6 a.m.) | 35% | CST arts. 160 y 168 |
| Extra de día | 25% | CST arts. 159 y 168 |
| Extra de noche | 75% | CST arts. 159 y 168 |
| Domingo o festivo | 90% | CST art. 179 |
| Domingo de noche | 125% | 90 + 35 |
| Extra en domingo | 115% | 90 + 25 |
| Extra, domingo y noche | 165% | 90 + 75 |

Un turno de 10 p.m. a 6 a.m. que cruza a domingo atraviesa tres categorías. Nadie hace
esa cuenta de cabeza, y por eso casi nadie revisa si le pagaron bien.

## La decisión difícil

**Los porcentajes cambian, y cambian con fecha.** En 2026 hubo dos que se confunden
todo el tiempo: el recargo dominical subió al 90% el 1 de julio, y la jornada bajó a 42
horas el 15 de julio. Esa segunda mueve el divisor de la hora de 220 a 210, así que la
misma hora pasa a valer más.

La decisión fue que **ningún porcentaje se escribe nunca en una pantalla**. Las tarifas
viven versionadas por fecha de vigencia en un solo archivo, y un turno se liquida con
los valores que estaban vigentes el día que ocurrió. Un turno de junio no se recalcula
porque en julio cambió la ley.

Los festivos tampoco se tabulan: se calculan, porque hay fechas móviles derivadas de la
Pascua y traslados al lunes por la Ley Emiliani.

Todo eso está verificado contra la Ley 2466 de 2025, la Ley 2101 de 2021 y el Código
Sustantivo del Trabajo, y cubierto por 261 casos de prueba en las fronteras — que es
donde el cálculo se rompe: el turno que cruza medianoche, el que empieza en festivo y
termina en día hábil, el que cae justo en la fecha de cambio de norma.

## Lo que enseñó el uso real

Todo lo anterior salió de leer la ley. Lo que vino después salió de que la usaran
trabajadores de verdad, y ninguna de estas tres cosas se le habría ocurrido a nadie
frente a un Código Sustantivo del Trabajo:

**A media Colombia le pagan quincenal.** Un total del 1 al 31 no le sirve a quien cobra
el 15: le muestra una cifra que no va a coincidir con ningún desprendible que reciba, y
la app existe justamente para que coincidan. El corte de pago se volvió una pieza propia
que manda en toda la app — sin tocar el cálculo, porque la jornada se cuenta por día y el
tope de extras por semana, y eso no depende de cuándo corte la nómina.

**Hay empresas que pagan los recargos vencidos.** Lo trabajado del 16 al 31 de agosto
llega con el pago del 15 de septiembre. Sin saberlo, la app comparaba contra un
desprendible que todavía no incluía esas horas, mostraba una diferencia grande, y el
trabajador concluía que le estaban robando. Ese error empuja a reclamar antes de tiempo,
que es la forma más fácil de que la empresa desestime el reclamo entero — incluida la
parte que sí era cierta.

**Los porcentajes del Código son un piso, no un techo.** Hay convenciones colectivas que
pagan la extra al 50% en vez del 25%. Y hacia abajo la ley es tajante: un acuerdo que
pague menos del mínimo no rebaja nada aunque esté firmado. De ahí que la app maneje tres
niveles separados —el mínimo legal, lo pactado y lo pagado— y dé los dos faltantes por
aparte: el que se reclama con el Código en la mano no es el mismo que el que exige
mostrar la convención.

El patrón se repite: **el motor de cálculo nunca falló.** Lleva 261 casos de prueba y no
ha fallado uno. Lo que fallaba era siempre un supuesto sobre cómo funciona la nómina de
verdad.

## Cómo quedó

**Hubo una versión anterior que se descartó entera.** Estaba diseñada como un documento
de nómina: papel de formulario continuo, tinta violeta de reloj marcador, rótulos de 11
píxeles en versalitas, cero iconos. Tenía una dirección de arte defendible y era
inservible para su propio usuario — la navegación resultaba indistinguible y la carga
legal ahogaba lo único que importa, que es marcar el turno y ver la plata.

De ahí salió la regla que gobierna el proyecto: **la facilidad de uso manda sobre la
distinción visual**. Si una decisión estética le pone una sola barrera al usuario, la
decisión estética se cae.

**Solo móvil, a propósito.** Compila para web y casi todo funciona, pero no es un
destino soportado. `expo-secure-store` y `expo-file-system` no existen en navegador, así
que la clave y las exportaciones quedarían muertas. Peor: `localStorage` es por
navegador y no por persona, así que en un computador compartido el segundo que entra
vería las horas y el sueldo del primero. El modelo de privacidad depende de que cada
quien tenga la suya en su propio teléfono.

**Sale en cinco formatos** — PDF, Excel, Word, CSV — y genera una **carta de reclamación
ya redactada** para entregarle a la empresa. Ese último es el que convierte la app en
algo útil: no basta con saber que te pagaron mal, hay que poder reclamarlo.

## Estado

**En uso con trabajadores reales**, que es de donde salen los requisitos que importan.
Los avisos llegan, los cinco formatos se generan y se comparten, el modo fácil funciona,
y el APK está probado en dispositivo.

Va camino a Google Play. Eso trajo dos cosas: la letra pequeña que la tienda exige
—abajo—, y publicidad, porque el proyecto tiene que sostenerse solo. El banner obligó a
reescribir la promesa de privacidad en vez de borrarla: ya no dice *«la app no recoge
nada»* sino *«tus turnos y tu sueldo no salen de este teléfono»*, que es más estrecho y
es verdad. Una promesa amplia y falsa no sirve en un producto cuyo valor es la
confianza.
