# BRAND — Portafolio de Camilo Rincón

> Dirección de diseño del sitio. Este documento define la INTENCIÓN.
> Los tokens viven en `TOKENS.md`, las pantallas en `LAYOUT.md`, las referencias y el
> checklist en `MOODBOARD.md`.

---

## 1. A quién le hablamos (son tres, y por eso el sitio se bifurca)

Este portafolio recibe a tres personas distintas que llegan por razones distintas:

| Quién | Qué viene a averiguar | Cuánto lee |
|---|---|---|
| **Lead técnico / reclutador** | si este desarrollador tiene criterio, no si conoce una lista de tecnologías | mucho, si el primer párrafo lo engancha |
| **Dueño de negocio** | si este tipo entiende un problema como el suyo | poco, y en diagonal |
| **Dueño de barbería** | cuánto cuesta al mes y si es fácil | casi nada; quiere el precio |

Un solo discurso no le sirve a los tres. Por eso la home no intenta convencer a
nadie: presenta la evidencia y **bifurca** en tres caminos declarados, para que cada
quien se autoseleccione en lugar de leer un argumento que no le corresponde.

De ahí sale la regla que gobierna el proyecto:

> **La evidencia manda sobre la afirmación.**
> Ninguna frase del sitio se sostiene sola. Cada una va pegada a la cosa concreta que
> la respalda: un constraint de Postgres, un artículo del Código Sustantivo del
> Trabajo, un número de commits, un link que abre.

Esto no es un principio decorativo: es lo que descarta el 90% de lo que un portafolio
de desarrollador suele contener. "Apasionado por la tecnología" no tiene evidencia
detrás y por lo tanto no entra. "Dos clientes reservan el mismo slot al mismo tiempo;
uno gana y el otro recibe 409, y la garantía es un `EXCLUDE USING gist`" sí entra,
porque cualquiera puede ir a verlo.

## 2. Concepto: EL BANCO DE PRUEBAS

> **Dirección revisada (2026-08-25).** La primera versión de este documento fijó
> «el cuaderno de ingeniería»: serif de titulares en itálica, rótulos mono en
> versalitas sobre cada sección, separadores de regla, cero imágenes. El cliente
> vio el resultado y dijo que «grita página genérica de IA». Tenía razón, y la
> razón concreta es que esa combinación —display serif itálico + etiquetas mono +
> reglas + monocromo sin imágenes— es **la familia estética más saturada de 2026**
> en superficies de marca. No estaba mal ejecutada: era el reflejo por defecto.
>
> Con ella cayeron las tres tipografías originales. Fraunces, IBM Plex Sans e IBM
> Plex Mono son las que salen primero por defecto, y por eso mismo producen
> monocultura.
>
> Lo que **no** cambió: la regla de la evidencia (§1), el latón sobre fondo
> profundo, y el hecho de que el sitio bifurca en tres caminos. Eso venía del
> problema, no del reflejo.

El registro ya no es el de un libro. Es el de un **banco de trabajo con los
instrumentos encima y las mediciones a la vista**: señalética industrial, cifras
tabulares, retícula de plano técnico. Grotesca ancha en mayúsculas donde antes
había serif itálica.

### Lo que se conserva del cuaderno

**La ventaja real de Camilo no es que construye software. Es que deja registro de
por qué lo construyó así.**

Sus README no son documentación: son cuadernos de decisiones. Explican por qué el
puerto de un proyecto es 5437 y no 5436 (para que los dos corran al tiempo), por qué
el sistema dice *entidades* y no *EPS* (porque ARL Sura no es una EPS y llamarla así
sería incorrecto frente al cliente), por qué Bricolage se usa solo en cifras y no en
el cuerpo. Ese hábito — dejar constancia del porqué — es exactamente lo que un lead
técnico busca y casi nunca encuentra en un portafolio.

El sitio adopta esa forma. **Cada caso es una entrada de cuaderno**: el problema, la
decisión difícil, el porqué, y el rastro para verificarlo.

**Frase-ancla (interna):** *"El registro de por qué está construido así."*

### El gesto memorable: la nota al margen

El contenido es denso y la densidad tiene un costo: si todo va en el mismo párrafo,
el lector en diagonal se pierde y el lector atento se cansa.

La solución es el gesto identitario del sitio: **las decisiones técnicas viven en el
margen**, en mono y en el color de acento, alineadas con el párrafo que las motiva.
No son notas al pie ni bloques de código: son anotaciones al lado, como el lápiz en
el margen de un cuaderno técnico.

```
                                    │
El motor de disponibilidad calcula  │  ── EXCLUDE USING gist
el horario del local menos las      │     sobre (barber_id, rango).
ausencias y las citas activas. Es   │     El motor pre-valida;
la pre-validación.                  │     el constraint garantiza.
                                    │
```

Esto le da al sitio dos velocidades de lectura reales: quien va rápido lee la prosa
y salta los márgenes; quien va a fondo lee ambos. Y visualmente crea una columna
irregular que ningún template de portafolio tiene.

En móvil, donde no hay margen, la nota se convierte en un bloque con borde izquierdo
de acento entre párrafos. Se conserva la jerarquía, se pierde la lateralidad.

### El segundo gesto: la cinta de evidencia

Bajo el título de cada caso, una fila en mono con hechos duros y verificables:

```
54 commits · 14 tablas · multi-tenant · en producción · pruebas de concurrencia
```

Datos, no adjetivos. Es la traducción visual de la regla del §1 y reemplaza los
contadores animados de "5 años de experiencia" que usa el portafolio de freelancer
genérico, que son moneda devaluada y no se pueden auditar.

## 3. Voz

Escribimos como escribe él en sus README, porque esa voz ya existe y es buena:
directa, específica, sin adornos, con las decisiones argumentadas y los errores
admitidos.

- **Frases cortas antes que subordinadas largas.**
- **El sujeto es el sistema, no el autor.** "El sistema hace cumplir la regla" antes
  que "Yo implementé un sistema que...".
- **Los números van en cifra y sin redondear hacia arriba.** 43 commits, no "más de 40".
- **Lo que no está terminado se dice.** Un caso que aún no tiene un usuario real lo
  declara. La honestidad sobre el estado es parte de la evidencia: quien miente sobre
  lo pequeño no es creíble sobre lo grande.
- **Cero superlativos.** Nada es "potente", "robusto" ni "de última generación".

Palabras de tono: **registro · decisión · evidencia · oficio · exacto.**

Anti-tono: agencia digital, growth, "transformamos tu idea en realidad", emojis
en los títulos, "¡Hola! Soy...", contadores animados, testimonios inventados.

## 4. Qué NO es este sitio

Se descarta a propósito, y conviene dejarlo escrito para no recaer:

- **No es una tarjeta de presentación de freelancer.** Sin sidebar con foto grande,
  edad, país y "disponible" parpadeando. Esa forma señala *me contratas por hora*, y
  aquí se ofrecen sistemas.
- **No es un dashboard.** Sin tarjetas con métricas de vanidad ni gráficas de barras
  de "nivel de dominio de React: 90%". Esas barras son ficción y todos lo saben.
- **No es una terminal.** Mono en todo, prompt parpadeante y verde sobre negro es el
  cliché más gastado del gremio, y además penaliza la lectura de textos largos, que
  es justamente lo que este sitio necesita que ocurra.
- **No es oscuro por moda.** Es oscuro porque las capturas de producto — que son casi
  todas de interfaces claras — recortan mejor sobre un fondo profundo, y porque el
  concepto de cuaderno de trabajo nocturno le queda bien a alguien que construyó
  todo esto fuera del horario laboral.

## 5. Los dos modos

**Oscuro es el canónico.** El sitio se diseña en oscuro y ahí se toman las
decisiones. Es donde vive la identidad.

**Claro existe y está bien resuelto**, no es una concesión a medias. Se respeta
`prefers-color-scheme` y hay control manual. Un portafolio que ignora la preferencia
del sistema está declarando que su gusto importa más que el del visitante, lo cual
contradice todo lo demás que dice el sitio.

En claro el acento baja de luminancia y sube en saturación para conservar el
contraste (`oklch(0.48 0.11 65)` en vez de `oklch(0.80 0.13 75)`): el latón claro
sobre papel sería ilegible. Los roles no cambian, los valores sí.

## 6. Bilingüe: qué se traduce y qué no

El sitio existe en español e inglés, con el español como canónico.

**Se traduce todo el texto**, incluida la prosa de los casos. Una traducción a medias
—interfaz en inglés y contenido en español— es peor que no tener inglés.

**No se traducen** los nombres propios de dominio: *glosa*, *EPS*, *recargo
dominical*, *finca*. Se dejan en español y se explican en una línea de contexto,
porque traducirlos como "medical claim objection" o "Sunday surcharge" pierde
precisión y además desconecta el caso de la ley que lo respalda. El lector en inglés
tiene que entender que esto ocurre en Colombia y que las reglas son colombianas: eso
no es un defecto del caso, es su contexto.

## 7. Decisiones ya tomadas (para no volver a discutirlas)

| Decisión | Por qué |
|---|---|
| Sin foto de perfil grande en el hero | La evidencia son los sistemas, no la cara. Una foto pequeña va en `/contacto`, donde sí sirve para poner cara al correo |
| Sin contadores de "años de experiencia" | Moneda devaluada, no auditable, y él tiene evidencia mejor |
| Sin barras de nivel de habilidad | Ficción medible por nadie |
| Sin blog | Aumenta el mantenimiento y compite con los casos por la atención. Si algún día hay notas, van dentro del caso al que pertenecen |
| Sin testimonios | No los hay reales todavía. Cuando existan, con nombre y cargo o no van |
| Fraunces solo en titulares | Tiene carácter fuerte; en cuerpo cansaría. El riesgo se controla con el alcance |
| Los links a Render avisan del arranque | Los servicios gratuitos duermen ~50 s. Un botón que parece roto es peor que un botón con una advertencia honesta |
