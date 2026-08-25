# TOKENS — Sistema de diseño

> Fuente de verdad: `app/assets/css/main.css`. Este documento explica el porqué;
> el CSS manda sobre cualquier valor citado aquí.
> **Todos los ratios de esta página salen de `scripts/contraste.py`, que convierte
> OKLCH a sRGB y aplica la fórmula WCAG. Ninguno está estimado a ojo.**
> Si cambias un color, corre el script. Ya tumbó una decisión: `--linea-fuerte`
> estaba en `L 0.46` y daba 2.69 contra el fondo, por debajo del 3.0 que exige
> WCAG 1.4.11 para bordes de control. Subió a `L 0.53`.

---

## 1. Tipografía: tres familias, tres oficios

| Rol | Familia | Dónde |
|---|---|---|
| Display | **Fraunces** 600/700, variable | Titulares de página y de caso, y solo ahí |
| Cuerpo e interfaz | **IBM Plex Sans** 400/500/600 | Toda la prosa, botones, navegación |
| Metadatos | **IBM Plex Mono** 400/500 | Cinta de evidencia, notas al margen, stack, rótulos |

**Por qué Plex Sans y Plex Mono juntas.** Comparten esqueleto, proporciones y
tensión: los metadatos en mono y el cuerpo en sans se leen como la misma voz en dos
registros, no como dos fuentes peleando. Plex nació en Bold Monday para IBM, para
documentación técnica y producto de ingeniería — que es exactamente el contexto de
este sitio. Y tiene humanidad donde importa: la `a` de doble piso y la `g` con cola
abierta evitan la frialdad de una grotesca neutra.

**Por qué Fraunces en display.** Es variable con ejes `opsz`, `SOFT` y `WONK`. En
tamaños grandes y sobre fondo oscuro, una didona de alto contraste se afina y se
rompe; Fraunces con `opsz 120` engrosa las astas y aguanta. El eje `WONK` activa las
formas peculiares de la itálica, que es donde la fuente tiene voz propia — se usa
solo ahí, para acentuar una palabra dentro de un titular.

**Por qué NO Inter en cuerpo**, que sería la elección por defecto: es *la* fuente de
interfaz genérica de esta década, y por lo tanto justo el aspecto anónimo del que
esta dirección se aparta. Se descartó a propósito.

**Control de riesgo.** Fraunces tiene carácter fuerte. Por eso su alcance está
limitado por regla, no por criterio del momento: **titulares de página y de caso, y
nada más.** Nunca en cuerpo, nunca en botones, nunca en tablas.

### Escala

Nada por debajo de 13 px. El cuerpo arranca en 16. Los titulares llevan tracking
negativo para densidad editorial; los rótulos en versalitas son el único lugar con
tracking positivo amplio.

| Token | Tamaño | Familia | Para qué |
|---|---|---|---|
| `display-xl` | 3.5–4.5rem (fluido) | Fraunces 600 | Titular de la home |
| `display-l` | 2.5–3.25rem (fluido) | Fraunces 600 | Titular de caso |
| `display-m` | 1.75rem | Fraunces 600 | Títulos de sección |
| `titulo` | 1.25rem | Plex Sans 600 | Subtítulos dentro de un caso |
| `cuerpo` | 1rem / 1.65 | Plex Sans 400 | Prosa |
| `cuerpo-guia` | 1.125rem / 1.7 | Plex Sans 400 | Párrafo de entrada del caso |
| `mono` | 0.8125rem | Plex Mono 400 | Cinta de evidencia, notas al margen |
| `rotulo` | 0.6875rem, `0.14em` | Plex Mono 500, versalitas | Rótulos de sección |

**Medida de línea.** `.medida` = 34rem (≈62 caracteres) para prosa; `.medida-ancha`
= 42rem para el párrafo de entrada. Nada de texto corrido a todo el ancho del
contenedor: a más de 75 caracteres el ojo pierde el renglón al volver.

---

## 2. Color

Todo en OKLCH. La razón es práctica, no estética: la luminancia es perceptualmente
uniforme, así que generar la variante de un token es mover `L` y ajustar `C`, no
volver a adivinar el color.

**El oscuro es el canónico** (BRAND §5). El fondo no es negro puro: `#000` con texto
claro produce halación en pantallas OLED y cansa en textos largos, que es
exactamente lo que este sitio pide leer.

### Modo oscuro

| Token | OKLCH | Hex | Uso | Contraste |
|---|---|---|---|---|
| `--fondo` | `0.17 0.012 250` | `#0B1015` | Fondo de página | — |
| `--superficie` | `0.21 0.014 250` | `#13191F` | Tarjetas, bloques de caso | — |
| `--hundido` | `0.13 0.010 250` | `#05080B` | Pie, bloques de código | — |
| `--tinta` | `0.95 0.008 85` | `#F1EEE9` | Texto principal | **16.52** sobre fondo |
| `--tinta-media` | `0.76 0.014 85` | `#B5B1A7` | Texto secundario | **8.90** |
| `--tinta-tenue` | `0.64 0.014 85` | `#908C83` | Metadatos, **a cualquier tamaño** | **5.68** |
| `--linea` | `0.30 0.012 250` | `#292E34` | Separadores decorativos | — |
| `--linea-fuerte` | `0.53 0.018 250` | `#646D76` | **Bordes de control** | **3.63** (mín. 3.0) |
| `--acento` | `0.80 0.130 75` | `#EEB154` | Latón: enlaces, notas al margen | **10.06** |
| `--acento-fg` | `0.20 0.040 75` | `#201301` | Texto sobre botón de acento | **9.56** sobre acento |
| `--exito` | `0.78 0.110 160` | `#73CD9F` | Estado *en producción* | **10.00** |
| `--aviso` | `0.76 0.140 40` | `#FB906A` | Estado *en desarrollo* | **8.47** |

### Modo claro

| Token | OKLCH | Hex | Contraste |
|---|---|---|---|
| `--fondo` | `0.98 0.005 85` | `#FAF8F5` | — |
| `--superficie` | `1 0 0` | `#FFFFFF` | — |
| `--tinta` | `0.22 0.015 250` | `#151B21` | **16.33** |
| `--tinta-media` | `0.45 0.015 250` | `#4F565E` | **7.01** |
| `--tinta-tenue` | `0.52 0.015 250` | `#636A71` | **5.19** |
| `--linea-fuerte` | `0.62 0.014 250` | `#80878E` | **3.43** |
| `--acento` | `0.48 0.110 65` | `#874E00` | **6.36** |
| `--exito` | `0.48 0.090 160` | `#256D4C` | **5.89** |
| `--aviso` | `0.50 0.140 40` | `#A24019` | **6.03** |

**El acento cambia de valor, no de rol.** En oscuro el latón es claro
(`L 0.80`); en claro baja a `L 0.48` y se desatura levemente. Un latón claro sobre
papel daría 1.9 de contraste — ilegible. El rol («esto es acción, esto es
anotación») es idéntico en los dos modos; lo que cambia es la luminancia necesaria
para sostenerlo.

**Por qué latón y no verde.** El verde lima es el acento del portafolio de
freelancer genérico (la referencia que trajo el cliente lo usa) y el azul ya es de
`gestion-glosas`. El latón/ámbar tiene tres cosas a favor: es el color de los
instrumentos de medición, encaja con el concepto de cuaderno, y es cálido sobre un
fondo frío, lo que hace que cada anotación al margen salte sin gritar.

**Los estados no dependen solo del color.** *En producción* y *en desarrollo* llevan
siempre su palabra escrita, no solo un punto de color. Un daltónico deuteranope no
distingue el verde eucalipto del naranja óxido, y el estado de un proyecto es
información, no decoración.

---

## 3. Espaciado y ritmo

Múltiplos de 4 px. La escala útil: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`.

| Uso | Valor |
|---|---|
| Interlínea de párrafo | `1.65` |
| Entre párrafos | `16px` |
| Entre bloques de un caso | `48px` |
| Entre secciones de página | `96px` (móvil) / `128px` (escritorio) |
| Margen de página | `24px` móvil / `48px` escritorio |
| Columna de nota al margen | `14rem`, separada `32px` del cuerpo |

---

## 4. Bordes, radios y sombras

- **Radios:** `2px` para etiquetas y campos, `8px` para tarjetas y capturas, `0` para
  los separadores. Nada de esquinas muy redondeadas: la blandura visual pertenece a
  la app amable genérica, que es anti-tono declarado.
- **Bordes:** `1px solid var(--linea)` para separación decorativa;
  `1px solid var(--linea-fuerte)` para cualquier cosa que se pueda clicar o enfocar.
- **Sombras:** casi inexistentes. En oscuro una sombra no se ve, así que la
  elevación se comunica con `--superficie` sobre `--fondo`, no con sombra. La sombra
  declarada existe solo para el modo claro.

---

## 5. Movimiento

El movimiento aquí es **confirmación, no espectáculo**.

| Gesto | Duración | Curva |
|---|---|---|
| Hover de enlace y botón | `120ms` | `ease-out` |
| Aparición de sección al entrar en viewport | `400ms`, desplazamiento de `8px` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Cambio de tema | `200ms` sobre color y fondo | `ease` |

Nada se mueve en bucle. Nada aparece con retardo escalonado de más de `60ms` entre
elementos: un stagger largo se siente lento, no elegante.

`prefers-reduced-motion: reduce` anula todas las animaciones y transiciones —
implementado en `main.css`, no opcional. Y el `scroll-behavior: smooth` está dentro
de `prefers-reduced-motion: no-preference`, no al revés: se activa para quien no
pidió menos movimiento, en vez de activarse siempre y desactivarse después.
