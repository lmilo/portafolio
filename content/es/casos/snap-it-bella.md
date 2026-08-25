---
titulo: Snap It Bella
cliente: Snap It Bella · vía Estrateclab
resumen: "Rediseño completo de una tienda Shopify de producto único: una correa magnética para lupas dentales que se vende en Estados Unidos y Canadá."
gancho: Una tienda de un solo artículo donde la página tiene que hacer todo el trabajo de venta. Si no explica el mecanismo, no hay compra.
orden: 5
estado: entregado
desde: '2026-08'
evidencia:
  - producto único
  - 19 variantes
  - mercado EE. UU. y Canadá
  - preview desplegado por push
stack:
  - Shopify (tema Horizon)
  - Liquid
  - HTML/CSS
  - Netlify
enlaces:
  - etiqueta: Ver la propuesta
    url: https://snapitbella-preview.netlify.app
    tipo: vivo
  - etiqueta: Tienda actual
    url: https://snapitbella.com
    tipo: vivo
capturas:
  - archivo: snapitbella-home.jpg
    alt: Portada de la tienda con el titular «Stop adjusting your loupes all day» junto a una comparación antes y después de la correa puesta sobre una bata clínica
    pie: La portada rediseñada. El antes y después resuelve en una imagen lo que el texto no puede explicar: cómo funciona el mecanismo.
    url: snapitbella-preview.netlify.app
    ratio: 1559 / 784
---

Snap It™ es una correa de silicona con broche magnético que sostiene las lupas
dentales por detrás de la cabeza. Cuesta 29 dólares, pesa 45 gramos y viene en 19
colores.

Quien la compra es sobre todo un **higienista dental**: ve entre 12 y 13 pacientes al
día, trabaja a 2,5–3,5 aumentos mirando detalle de milímetros, con guantes puestos y
las manos dentro de la boca de otra persona. El beneficio no es comodidad. Es no tener
que interrumpir el procedimiento para reacomodarse las lupas.

Aquí no hay app, ni panel, ni sesión. **El diseño es el producto**: la página es lo
único que vende.

## El problema

Tres cosas se cruzaban en el sitio existente.

**El mecanismo no se entiende leyéndolo.** «Correa magnética para lupas» no explica
nada a quien nunca la ha visto. Hay que mostrar cómo las patillas entran en los
terminales, cómo se abre el broche y cómo los imanes se juntan solos al volver a
ponérselas.

**La objeción número uno no estaba resuelta.** Todo comprador se pregunta si sirve con
*sus* lupas — y hay modelos que necesitan adaptador y modelos que sencillamente no
sirven. Esa información no aparecía en ninguna parte del sitio. Un profesional clínico
que no puede confirmar la compatibilidad no compra.

**El contenido estaba disperso.** FAQ por un lado, garantía por otro, políticas con
contradicciones entre sí.

## La decisión difícil

La estructura se decidió como **revelación progresiva**, y eso significó eliminar
páginas, no agregarlas.

El home carga lo mínimo necesario para entender el producto y comprarlo sin fricción.
Quien necesita el detalle completo tiene **una sola página profunda** que lo contiene
todo, con navegación pegajosa — no cinco páginas sueltas donde el visitante tiene que
adivinar en cuál está su respuesta. `/pages/faq` y `/pages/warranty` desaparecieron
como páginas independientes, con redirecciones `301` desde las URLs viejas.

La segunda decisión fue de tono, y va contra el instinto comercial: **precisión, no
calidez**. Un profesional clínico compra por datos verificables, no por adjetivos. La
marca habla como habla la documentación de un instrumento.

De ahí salió la regla incómoda: **los datos que juegan en contra se dicen de frente y
temprano.** Que no se puede esterilizar en autoclave. Que hay modelos incompatibles.
Que las pre-órdenes tardan semanas. Esconderlo aumenta la conversión hoy y produce
devoluciones y reseñas malas después, que en un mercado profesional pequeño cuestan más
que la venta.

## Cómo quedó

El entregable no fue solo el sitio. Fue también **un documento para desbloquear al
cliente**.

En la reunión quedó claro que faltaba información que solo él tenía: la tabla de
compatibilidad por marca y modelo, y el texto de una página anterior a Shopify que
según él ya explicaba bien el producto. Pedirlo como «mándanos la información» no
funciona: obliga al cliente a redactar, y eso se aplaza indefinidamente.

Se armó un documento donde **casi todo va prellenado y él solo marca y corrige**. La
tabla de compatibilidad ya tenía sus columnas: solo había que poner una X. Las
peticiones están ordenadas por cuánto trabajo desbloquea cada una, no por orden lógico.

La propuesta se despliega sola con cada push y es lo que se le comparte al cliente.
Publica únicamente las tres páginas y sus assets — la documentación interna, el tema y
las notas de reunión quedan fuera. Va con `X-Robots-Tag: noindex` y un `robots.txt` que
bloquea todo: es una copia del contenido de la tienda real y no puede competir con ella
en buscadores.

## Estado

Propuesta entregada y desplegada. La implementación sobre la tienda real depende de
que llegue la tabla de compatibilidad y las fotos definitivas del mecanismo.
