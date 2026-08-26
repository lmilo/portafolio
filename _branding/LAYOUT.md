# LAYOUT — Arquitectura y pantallas

> Rutas, rejilla, wireframes y estados. Tokens en `TOKENS.md`, intención en `BRAND.md`.
> Referencia de escritorio: 1440 px. Referencia de móvil: 390 px.

---

## 1. Rutas

```
/                     home
/trabajo              índice: 6 casos + archivo
/trabajo/[slug]       caso de estudio
/servicios            software a medida
/productos            SaaS en alquiler
/contacto
/en/*                 lo mismo, en inglés
```

El español vive en la raíz y el inglés bajo `/en` (`prefix_except_default`). Esto se
fija ahora y no se cambia después sin redirects: son las URLs que se indexan y las
que se comparten.

**No hay `/sobre-mi`.** La biografía relevante cabe en la home y en `/contacto`; una
página entera sobre uno mismo, sin evidencia al lado, es justo lo que el §1 de
`BRAND.md` prohíbe.

## 2. Rejilla

Contenedor máximo **1200 px**, con márgenes de 24 px en móvil y 48 px en escritorio.

Dentro del caso hay dos columnas asimétricas, y esa asimetría es el gesto:

```
escritorio (≥ 1024px)
┌──────────────────────────────┬──────────────┐
│  prosa                       │  margen      │
│  34rem (≈62 caracteres)      │  14rem       │
│                              │  notas       │
└──────────────────────────────┴──────────────┘
                    gap 32px

móvil (< 1024px)
┌────────────────────────────────┐
│  prosa                         │
│  ┃ nota (borde izq. de acento) │
│  prosa                         │
└────────────────────────────────┘
```

La nota al margen **no flota ni se pega al scroll**: está anclada al párrafo que la
motiva. Una nota que se despega de su párrafo deja de ser una anotación y pasa a ser
un widget.

**Puntos de quiebre:** 640 (sm) · 768 (md) · 1024 (lg) · 1280 (xl). El cambio real
ocurre en 1024, cuando aparece la columna de margen. Lo demás son ajustes de
espaciado.

## 3. Home

```
┌───────────────────────────────────────────────────────┐
│  CR        trabajo servicios productos contacto  ☾ ES │  ← cabecera, no sticky
├───────────────────────────────────────────────────────┤
│                                                       │
│  DESARROLLADOR FULLSTACK · MEDELLÍN                   │  rótulo
│                                                       │
│  CONSTRUYO SISTEMAS DONDE LA                          │  display-xl
│  REGLA DE NEGOCIO es el                               │  Archivo 800
│  problema difícil.                                    │
│                                                       │
│  Dos párrafos cortos: qué hace y qué lo distingue.    │  medida-ancha
│                                                       │
│  ● disponible            escríbeme →                  │
├───────────────────────────────────────────────────────┤
│  TRABAJO SELECCIONADO                            01/06│
│                                                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │  01                            EN PRODUCCIÓN    │  │
│  │  MOTILA                                         │  │  tarjeta de caso
│  │  [ captura ]                                    │  │
│  │  El gancho en una línea.                        │  │
│  │  fastapi · nuxt 4 · postgres        ver el caso →│  │
│  └─────────────────────────────────────────────────┘  │
│  ... tres casos en la home, el resto en /trabajo      │
├───────────────────────────────────────────────────────┤
│  ¿QUÉ NECESITAS?                                      │  los tres caminos
│  ┌──────────┬──────────┬──────────┐                   │
│  │ alguien  │ software │ un sistema│                  │
│  │ para tu  │ a medida │ ya listo  │                  │
│  │ equipo   │          │           │                  │
│  │    →     │    →     │     →     │                  │
│  └──────────┴──────────┴──────────┘                   │
├───────────────────────────────────────────────────────┤
│  pie: correo · github · linkedin · idioma · tema      │
└───────────────────────────────────────────────────────┘
```

**La cabecera no es sticky.** Una barra fija roba 64 px de alto en móvil durante toda
la lectura, y este sitio pide leer. El regreso a la navegación se resuelve con el pie
y con un salto al inicio, no ocupando pantalla de forma permanente.

**Tres casos en la home, seis en `/trabajo`.** La home no es el índice: es la
selección. Si están los seis, ninguno destaca.

## 4. Caso de estudio

```
┌───────────────────────────────────────────────────────┐
│  ← trabajo                                            │
│                                                       │
│  CASO 01                              EN PRODUCCIÓN   │
│  Motila                                               │  display-l
│  54 commits · 14 tablas · multi-tenant · desde 2026-03│  cinta de evidencia
│                                                       │
│  Párrafo de entrada, 1.125rem, medida-ancha.          │
│                                                       │
│  [ captura de portada, ancho completo del contenedor ]│
│                                                       │
│  ── El problema ─────────────────────────────────────│
│  prosa                          │  nota al margen     │
│                                 │                     │
│  ── La decisión difícil ────────────────────────────  │
│  prosa                          │  nota al margen     │
│                                 │                     │
│  ── Cómo quedó ─────────────────────────────────────  │
│  [ capturas, en marco de dispositivo si es móvil ]    │
│                                                       │
│  ── Estado ──────────────────────────────────────────│
│  qué falta, dicho sin adornos                         │
│                                                       │
│  stack completo (mono, en fila)                       │
│  [ abrir en vivo ]  [ código ]                        │
│  ⓘ el servidor gratuito duerme ~1 min                 │
│                                                       │
│  ← caso anterior            caso siguiente →          │
└───────────────────────────────────────────────────────┘
```

Las cuatro secciones son fijas y en ese orden en los seis casos. La consistencia es
lo que convierte seis páginas en un cuaderno; si cada caso inventa su estructura, el
lector tiene que reorientarse cada vez.

## 5. Estados

| Estado | Cómo se ve |
|---|---|
| **En producción** | punto `--exito` + la palabra escrita. Nunca solo el punto |
| **En desarrollo** | punto `--aviso` + la palabra. Se usa sin vergüenza: es información |
| **Enlace que duerme** | el botón lleva ⓘ y una línea en mono debajo advirtiendo el arranque |
| **Sin captura todavía** | bloque con borde punteado `--linea` y el texto de lo que irá ahí. **No** un placeholder gris genérico: si falta, se dice |
| **Foco** | `outline: 2px solid var(--acento)` con `offset: 3px`, en todo lo enfocable |
| **Hover de tarjeta** | el borde pasa de `--linea` a `--linea-fuerte` en 120 ms. Sin elevación ni escala |

## 6. Imágenes

- Servidas por `@nuxt/image` en avif con respaldo webp, `loading="lazy"` salvo la
  portada del primer caso visible.
- **Toda captura lleva `alt` descriptivo real**, no "captura de pantalla de Motila".
  El `alt` dice qué se ve: "panel del barbero con los cortes del día y las próximas
  citas".
- **Marco sobrio con la URL real.** Las capturas de escritorio van en un marco con una
  barra fina de 32 px que muestra la URL en mono, y nada más: sin semáforos de macOS,
  sin barra de direcciones dibujada, sin pestañas. Ese cromo es el recurso más repetido
  del gremio y compite con la interfaz que se quiere enseñar.

  La URL **sí** se conserva, y no como adorno: `motila.onrender.com/b/la-70` dice "esto
  está en producción y aquí" mejor que cualquier frase. Es la regla de `BRAND.md` §1
  aplicada a una imagen.

  > Decisión revisada. La versión anterior de este documento descartaba todo marco de
  > escritorio. Se corrigió porque una captura suelta flotando en la página se lee como
  > sin terminar, y porque el argumento de la URL como evidencia no se había considerado.

- Las capturas de móvil van en **marco de teléfono**: bisel redondeado y nada más. Sin
  notch ni isla dibujada, que son detalles de un modelo concreto y envejecen en un año.

- **Composición escritorio + móvil** donde el responsive sea parte de lo que se cuenta
  (Motila, Glosas, Gestor de Fincas): el teléfono superpuesto sobre la esquina inferior
  derecha. Por debajo de 768 px el solape se deshace y el teléfono baja a su propia fila
  — encogido dentro de un escritorio ya pequeño no se leería, y el solape se comería la
  esquina de la captura principal.

- **Mientras una captura no exista**, su hueco lo ocupa un bloque con borde punteado que
  dice qué irá ahí. No un rectángulo gris: un rectángulo vacío parece un error de carga.
- Relación de aspecto reservada siempre (`aspect-ratio` en el contenedor) para que
  nada salte al cargar.

## 7. Responsive: lo que se rompe primero

Orden en que se degrada al bajar de ancho:

1. **1024 →** desaparece la columna de margen; las notas pasan a bloques con borde.
2. **768 →** la rejilla de casos pasa de dos columnas a una.
3. **640 →** los tres caminos se apilan; la cinta de evidencia envuelve en dos líneas.
4. **390 →** mínimo soportado. Márgenes de 24 px, display-xl baja a 2.5rem.

Regla dura: **ninguna página produce scroll horizontal a 360 px**. La cinta de
evidencia y el stack envuelven; las tablas de un caso, si las hay, scrollean dentro
de su propio contenedor y no arrastran la página.
