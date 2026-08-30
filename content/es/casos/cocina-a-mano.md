---
titulo: Cocina a Mano
resumen: App móvil para no botar comida. Lleva la cuenta de lo que hay en la despensa, avisa antes de que algo se venza, y ordena las recetas por lo que ya alcanza.
gancho: "No lista recetas: mide lo que te alcanza. Un recetario no puede saber que te falta un solo ingrediente para tres platos, y que uno de los que ya tienes se vence el jueves."
orden: 4
estado: desarrollo
desde: '2026-05'
evidencia:
  - 90 pruebas de la lógica pura
  - 4 formas de cargar la despensa
  - Worker propio desplegado
  - Cero servidor de datos
  - APK compilado y firmado
stack:
  - React Native
  - Expo SDK 57
  - TypeScript
  - Cloudflare Workers
  - Gemini
  - EAS Build
enlaces: []
---

La app se usa **de pie en la cocina, con el mercado en la mano**. Ese es un lugar de
teléfono, no de navegador — y por eso dejó de ser una PWA.

El usuario no es un *foodie*. Es quien llegó del mercado con seis bolsas y no sabe dónde
meter nada, o quien abre la nevera a las siete de la noche sin plan. Y es quien encuentra
al fondo del cajón una libra de tomates que ya no sirve, y le duele, porque los pagó.

## El problema

El enemigo declarado no es la falta de recetas: es **el desperdicio**.

Un catálogo de recetas lo tiene cualquiera y Google tiene más. Lo que un recetario no
puede hacer es cruzar dos cosas que solo la app sabe: **qué tienes** y **cuánto le queda**.
De ese cruce sale el único momento que justifica todo el producto:

> *El ajiaco te alcanza completo, y usa los tomates que se vencen mañana.*

Pero eso solo funciona si la despensa está cargada, y ahí está la fricción real: **nadie
teclea cuarenta productos**. Ese, y no la interfaz, era el problema a resolver al pasar a
móvil.

## La decisión difícil

**Se quitó el servidor.** La versión web usaba login anónimo de Supabase, que tenía lo peor
de los dos mundos: dependía de un servidor pero no daba recuperación real —borrabas la app
y perdías todo igual— y un proyecto gratuito se pausa por inactividad, así que la app
instalada podía dejar de abrir al tercer mes.

Ahora todo vive en el teléfono. La contrapartida es honesta y la app la dice en voz alta:
sin servidor no hay respaldo automático, así que **la exportación es el respaldo**.

**Lo único que quedó en red es la IA**, porque la clave de Gemini no puede viajar dentro
del APK. Vive en un Worker de Cloudflare y no en una Edge Function de Supabase, por la
misma razón de antes: un Worker no se duerme.

**Cuatro caminos para cargar la despensa, todos visibles.** Foto de la factura, código de
barras, dictado por voz, o a mano. Esconderlos tras un botón flotante con un `+` habría
enterrado justo lo que hace que la app valga la pena en un teléfono.

El dictado **se interpreta en el propio teléfono, sin IA**: de "dos libras de arroz" a la
cantidad y la unidad no hay nada que un modelo haga mejor que una tabla, y mandarlo a la
red costaría una espera y que la función deje de servir sin señal — justo cuando alguien
está guardando el mercado.

## Lo que salió al probarlo

**El match ignoraba las cantidades.** Tener 5 gramos de arroz puntuaba igual que tener 5
kilos, y la app decía "te alcanza" cuando no alcanzaba. Ahora compara cuando las unidades
son convertibles, y **admite que no puede** cuando no lo son: masa y volumen no se
convierten sin densidades, y una tabla inventada daría cifras que parecen exactas y no lo
son.

**La libra son 500 gramos, no 453,592.** Es una decisión de dominio, no un descuido: la
imperial es la del otro sistema, y la de la plaza de mercado en Colombia es medio kilo. El
valor "técnicamente correcto" metería un 10% de error en cada compra.

**Y el hallazgo que solo aparece probando.** Al pasarle un recibo real al lector de
facturas, con `PECHUGA POLLO BAND X500G` y un 1 en la columna de cantidad, devolvía **1
gramo de pollo**: tomaba la unidad del tamaño del envase y la cantidad de la columna, que
son cuántos envases se llevaron. Un gramo de pollo en la despensa hace que la app diga "no
te alcanza" cuando sobra — el mismo error de antes, entrando por la otra punta.

De ahí sale la regla que gobierna todo lo que toca la IA: **la app puede equivocarse
leyendo, pero no puede equivocarse guardando.** Nada de lo que sale de un modelo entra al
inventario sin pasar por una pantalla de revisión, con lo dudoso marcado.

## Cómo se ve

El color codifica dos ejes y ninguno decora: **verde albahaca** para lo que te alcanza, y
la escala **ámbar → terracota → rojo** para el reloj de la comida. Lo que tiene tiempo de
sobra queda en piedra, sin acento, porque no pide nada.

A diferencia de la otra app de este portafolio, **el dinero no lleva acento**. Allá el
producto es sobre dinero; aquí el problema no es cuánto costó el tomate, es que se está
dañando.

Hay un **modo cocina** que existe en una sola pantalla: la de preparar. No agranda la app
entera —el usuario ve bien— sino lo que se lee de pie y a un metro, y mantiene la pantalla
encendida. Que se apague a mitad de un sofrito y toque desbloquear con las manos llenas de
aceite es el fallo más caro que puede tener esa pantalla.

## Estado

Compilada, firmada y con el Worker desplegado y probado contra recibos. **Falta lo único
que no se puede simular**: cargar el mercado de una semana por los tres caminos nuevos y
ver si el match aguanta. "Pechuga de pollo" en la receta contra `POLLO PECHUGA BAND 500G`
en la factura no coinciden por palabras, y ninguna de las 90 pruebas puede decir si eso
funciona en la vida real.
