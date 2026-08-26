---
titulo: Gestor de Fincas
resumen: "Organizador de paseos de finca: compara candidatas, calcula el mercado según la gente confirmada, compara precios entre tiendas y liquida cuánto pone cada quien."
gancho: Un paseo ajeno no se ve ni cambiando el número en la URL. Hay una suite de pruebas dedicada exclusivamente a comprobarlo.
orden: 6
estado: produccion
desde: '2026-07'
evidencia:
  - 11 commits
  - 6 suites unitarias
  - pruebas de aislamiento
  - 3 cadenas de tiendas
stack:
  - Nuxt 4
  - Drizzle ORM
  - PostgreSQL
  - TypeScript
  - Zod
  - Vitest
# Sin enlace público: los paseos llevan teléfonos y documentos de gente real.
enlaces: []
capturas:
  - archivo: gestor-fincas-paseo.jpg
    alt: "Resumen de un paseo con los totales de finca, mercado, licor y transporte, y a la derecha «Le toca a cada uno $141.196 entre 5 confirmados»"
    pie: "El cálculo que resuelve la discusión: cuánto pone cada quien, sobre la gente que confirmó de verdad. Arriba, las siete pestañas del paseo. El nombre va cambiado."
    url: gestor de paseos · acceso restringido
    ratio: 1458 / 812
---

Organizar un paseo de finca con amigos son cinco problemas encadenados: cuál finca sale
más a cuenta, quién va de verdad, cuánto mercado y licor comprar para esa cantidad de
gente, dónde comprarlo más barato, y cuánto le toca poner a cada uno al final.

Todos se resuelven hoy en un grupo de WhatsApp y una nota del celular, y siempre queda
alguien que puso de más.

## El problema

El problema difícil no fue el cálculo. Fue **quién puede ver qué**.

Aquí conviven datos que deben ser privados y datos que solo sirven si son compartidos:

| Dato | Alcance | Por qué |
|---|---|---|
| Paseos, huéspedes, cuentas | privados del paseo | aquí viven los teléfonos y los documentos |
| Fincas | privadas de quien la agregó, visibles para su equipo | una finca lleva teléfono de contacto y notas |
| Productos y raciones | globales | una ración de arroz es la misma para todos |
| Precios de tiendas | **globales** | el precio en Éxito es el mismo para todos |

Los precios globales son los que tienen filo: más gente capturando precios es mejor
información para todos, pero también significa que cualquiera con cuenta puede meter un
precio falso.

## La decisión difícil

**Los precios siguen siendo globales, y el control es la procedencia.** Cada captura
guarda quién la hizo, de dónde vino y cuándo, y cualquiera puede marcarla como ignorada
sin borrar el rastro. Se prefirió trazabilidad sobre restricción: un dato malo se
señala, no se esconde, y el historial queda.

**El aislamiento entre cuentas no se confía al código de las páginas.** Un paseo ajeno
no se ve ni cambiando el número en la URL, y eso está comprobado por una suite dedicada
—`tests/api/aislamiento.spec.ts`— que intenta activamente acceder a recursos de otra
cuenta y verifica que el servidor los niegue. La prueba existe porque «se me olvidó
poner la guarda en este endpoint» es el fallo más común y más caro de este tipo de
sistema.

**Los colaboradores son iguales al creador**, a propósito: pueden anotar fincas,
confirmar gente, armar el mercado, llevar cuentas e invitar a más gente. Lo único que
no pueden es sacar al creador del equipo. Una jerarquía de permisos más fina habría
sido más trabajo y habría estorbado en el caso real, que es un grupo de amigos
organizando entre todos. El borrado es suave y se restaura durante 30 días.

## Cómo quedó

Tres cosas que aparecieron construyéndolo y que valían la pena documentar:

**Los mensajes de error no pueden ir en `statusMessage`.** El status line de HTTP solo
admite ASCII, así que h3 le quita los acentos: «Ese teléfono ya está anotado» llegaba a
pantalla como «Ese telfono ya est anotado». Los mensajes van en el cuerpo.

**Un esquema de actualización no puede llevar `.default()`.** El `.partial()` de Zod
vuelve los campos opcionales, pero un default se sigue inyectando cuando el campo no
viene. Un `PATCH` con un solo campo salía de Zod con todo lo demás en valores de
fábrica, y el `.set()` de Drizzle los escribía encima: confirmar a un huésped le borraba
si toma licor, y editar un vehículo le ponía el gasto en cero. Los campos se declaran
sin default, y el default vive solo en la variante de creación.

**La finca elegida no se guarda en la tabla de paseos.** Se deriva del estado `elegida`
en la tabla intermedia, con un índice único parcial que impide que haya dos. Guardarla
también en `paseos` sería la misma verdad en dos sitios, libre de desincronizarse.

Y una de producto: **el presupuesto avisa, nunca bloquea.** Distingue entre ya
pasarse y estar por pasarse comprando lo que falta, pero no impide nada. Nadie puede
quedar trabado en el supermercado por culpa de una validación.

## Estado

En producción, con cuentas, verificación por correo e invitaciones funcionando. El
siguiente paso es la captura de precios desde el celular en el supermercado, que hoy
funciona pero pide demasiados toques para hacerse con una mano y un carrito.
