# MOODBOARD — Referencias, tono y checklist

> De dónde salen las decisiones, cómo se siente el resultado, y la lista que hay que
> pasar antes de dar algo por bueno.

---

## 1. La sensación en una frase

**El cuaderno donde quedó escrito por qué está construido así.**

Se entra y no hay un saludo: hay una afirmación con evidencia detrás. Se baja y cada
caso abre con el problema real, no con el stack. Al lado de la prosa, en latón y en
mono, están las anotaciones — el `EXCLUDE USING gist`, el artículo del Código
Sustantivo del Trabajo, la razón por la que el puerto es 5437. Quien va rápido lee la
prosa. Quien va a fondo lee el margen. Los dos salen sabiendo algo.

Palabras de tono: **registro · decisión · evidencia · oficio · exacto.**

Anti-tono: agencia digital, "transformamos tu idea en realidad", contadores animados,
barras de habilidad, hero con foto grande y saludo, emojis en los títulos, terminal
falsa con prompt parpadeante.

**Y el anti-tono que costó una versión entera:** display serif en itálica, rótulos
mono en versalitas encima de cada sección, separadores de regla y cero imágenes.
Es la familia estética más saturada de 2026 y se lee de inmediato como generada a
máquina. Si el diseño empieza a derivar hacia ahí otra vez, es la señal de que se
está eligiendo por reflejo. Ver `BRAND.md` §2.

**Regla dura que salió de ahí:** una página que carga todo su peso visual solo con
tipografía sobre fondo liso es un fallo, no una decisión de restraint. Los
productos tienen que verse funcionando.

---

## 2. Referencias (descritas)

1. **El cuaderno de laboratorio con notas al margen** — la página densa de prosa con
   anotaciones a lápiz al lado, donde el margen guarda el porqué y el cuerpo guarda el
   qué. De aquí sale el gesto identitario del sitio.

2. **Los propios README de Camilo** — la referencia más importante y la más cercana.
   `gestion-glosas` explicando por qué se dice *entidad* y no *EPS*; `recargo`
   admitiendo que la primera versión era "inservible para su propio usuario". Esa voz
   ya existe, es suya, y es lo que el sitio traduce a pantalla.

3. **La documentación de Stripe y de Linear** — no por el color ni por el layout, sino
   por el principio: densidad técnica que se lee cómoda porque la jerarquía está
   resuelta y la medida de línea es corta. Prueba de que "técnico" no obliga a "árido".

4. **Los instrumentos de medición de latón** — un calibrador, un teodolito, la aguja de
   un manómetro. De aquí sale el acento: cálido sobre frío, preciso, sin estridencia.
   Es el color de la herramienta que mide, no el del botón que grita.

5. **edav.com.co** (la referencia que trajo el cliente) — se toma **una** cosa: que la
   oferta se entienda en segundos y que haya un camino evidente hacia la acción. Se
   dejan fuera el sidebar con foto y edad, los contadores de años de experiencia, el
   verde lima y las fotos de paisaje de stock, que son suyos y pertenecen a otro
   posicionamiento.

---

## 3. Lo que este sitio hace distinto

Tres cosas que ningún portafolio de plantilla tiene, y que hay que proteger cuando
aparezca la tentación de simplificar:

1. **La nota al margen.** Dos velocidades de lectura reales en la misma página.
2. **La cinta de evidencia.** Hechos verificables donde otros ponen adjetivos.
3. **La bifurcación en tres caminos.** El sitio admite que tiene tres audiencias en
   vez de fingir que tiene una.

---

## 4. Checklist antes de dar algo por bueno

**Contenido**
- [ ] Cada afirmación del sitio tiene su evidencia al lado (BRAND §1)
- [ ] Cero superlativos: nada es potente, robusto ni de última generación
- [ ] Los números van en cifra exacta, sin redondear hacia arriba
- [ ] Lo que no está terminado lo dice
- [ ] Ningún caso abre con el stack; todos abren con el problema
- [ ] El inglés está completo, no solo la interfaz

**Tipografía**
- [ ] El display en versales aparece solo en titulares: nunca en cuerpo de texto
- [ ] Ninguna sombra lleva desenfoque; ningún borde baja de 2px
- [ ] Ningún texto por debajo de 13 px
- [ ] La prosa no pasa de 68 caracteres por línea
- [ ] Las cifras usan `tabular-nums` donde se comparan en columna

**Color y contraste**
- [ ] `python3 scripts/contraste.py` sale en verde
- [ ] Ningún estado se comunica solo con color: siempre lleva su palabra
- [ ] El modo claro está resuelto, no es el oscuro con los colores invertidos a la fuerza

**Accesibilidad**
- [ ] Todo el sitio se recorre con teclado y el foco es visible siempre
- [ ] Cada imagen tiene `alt` que describe lo que se ve, no "captura de Motila"
- [ ] Hay `skip link` al contenido principal
- [ ] `prefers-reduced-motion` anula las animaciones de verdad, probado
- [ ] Los encabezados van en orden (`h1 → h2 → h3`), sin saltos por estética
- [ ] El selector de idioma es un enlace real con `hreflang`, no un botón con JS

**Layout**
- [ ] Sin scroll horizontal a 360 px en ninguna página
- [ ] La nota al margen sigue anclada a su párrafo, no flotando
- [ ] Nada salta al cargar: toda imagen reserva su relación de aspecto
- [ ] Las cuatro secciones del caso están en el mismo orden en los seis

**Honestidad**
- [ ] Los enlaces a Render advierten el arranque lento
- [ ] Ninguna captura muestra datos reales de clientes
- [ ] Ningún proyecto se presenta como terminado si no lo está
- [ ] Todo enlace externo del sitio responde
