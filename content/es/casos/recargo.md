---
titulo: Recargo
resumen: App móvil para trabajadores por turnos en Colombia. Clasifica cada hora en su categoría legal y calcula cuánto vale.
gancho: Una hora trabajada a las 3 de la mañana de un domingo no es "una hora". Es una hora dominical nocturna y vale 125% más.
orden: 3
estado: desarrollo
desde: '2026-07'
evidencia:
  - 39 commits
  - 172 casos frontera
  - 8 categorías legales
  - APK probado en dispositivo
  - 5 formatos de salida
stack:
  - React Native
  - Expo (SDK 53+)
  - TypeScript
  - Expo Router
  - EAS Build
enlaces: []
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
Sustantivo del Trabajo, y cubierto por 172 casos de prueba en las fronteras — que es
donde el cálculo se rompe: el turno que cruza medianoche, el que empieza en festivo y
termina en día hábil, el que cae justo en la fecha de cambio de norma.

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

Instalada y probada en un teléfono real: los avisos llegan, los cinco formatos se
generan y se comparten, el modo fácil funciona. **Falta lo único que no se puede
simular**: que alguien la use en sus propios turnos durante un mes completo y compare
contra su desprendible real. Hasta que eso pase, no se le entrega a un trabajador.
