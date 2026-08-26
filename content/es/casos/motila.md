---
titulo: Motila
resumen: Agendamiento multi-tenant para barberías, con página pública de reservas, panel de barbero y panel administrativo por dueño.
gancho: Dos clientes piden el mismo turno al mismo tiempo. Uno gana, el otro recibe 409, y la garantía no está en el código.
orden: 1
estado: produccion
desde: '2026-03'
evidencia:
  - 54 commits
  - 14 tablas
  - 3 paneles
  - multi-tenant
  - pruebas de concurrencia
stack:
  - FastAPI
  - SQLAlchemy 2 (async)
  - Alembic
  - PostgreSQL 16
  - Nuxt 4
  - Tailwind CSS v4
  - Docker Compose
# PENDIENTE: la instancia de producción no tiene ninguna barbería sembrada
# (todos los slugs dan 404 en /api/public/{slug}). El enlace vuelve en cuanto
# se siembre la demo: etiqueta "Abrir la barbería demo", tipo vivo, duerme true.
enlaces: []
capturas:
  - archivo: motila-reserva.jpg
    alt: Página pública de reservas de una barbería, con la lista de servicios y precios a la izquierda y el resumen de la reserva a la derecha
    pie: "La página que ve el cliente. Elige servicios, ve la disponibilidad real y agenda sin crear cuenta. El nombre del local está cambiado: es la barbería de prueba."
    url: motila.onrender.com/b/la-70
    ratio: 1559 / 784
---

Una barbería no pierde plata cuando el sistema se cae. La pierde cuando dos personas
llegan a la misma hora por el mismo barbero, y alguien tiene que decidir a cuál de las
dos se le dice que se devuelva.

Motila es un sistema de agendamiento donde cada barbería tiene tres superficies: la
página pública donde el cliente reserva sin crear cuenta, el panel donde el barbero ve
su día, y el panel donde el dueño maneja precios, barberos y sedes.

## El problema

Dos clientes abren la página al mismo tiempo y piden el mismo turno con el mismo
barbero.

El motor de disponibilidad calcula el horario del local, le resta las ausencias del
barbero y las citas ya activas, y devuelve los espacios libres en bloques de 15
minutos. A los dos clientes les dice que ese turno está libre — y no está mintiendo:
cuando hizo el cálculo, lo estaba.

Entre ese cálculo y el momento en que la reserva se escribe hay una ventana. Es
pequeña, pero existe, y una barbería con movimiento la encuentra sola.

## La decisión difícil

La salida fácil era hacer el cálculo más rápido, o bloquear la tabla mientras se
escribe. Las dos son parches: la primera achica la ventana sin cerrarla, la segunda
convierte cada reserva en una fila de espera.

La decisión fue **aceptar que la pre-validación nunca va a ser la garantía**, y separar
los dos papeles:

- El **motor de disponibilidad** existe para que la interfaz sea usable. Muestra lo que
  está libre. Es una predicción, y se la trata como tal.
- El **constraint de exclusión de PostgreSQL** es la garantía. Un `EXCLUDE USING gist`
  sobre `barber_id` más el rango horario, restringido a las citas en estado `booked`.

::margen
`EXCLUDE USING gist` sobre `(barber_id, tstzrange)`, con `WHERE estado = 'booked'`.

Una cita cancelada libera el espacio sin borrar el registro.
::

La base de datos no permite físicamente que dos rangos se solapen para el mismo
barbero. Cuando las dos reservas llegan al mismo tiempo, una se escribe y la otra choca
contra el constraint y recibe un 409. No hay tercera opción, y no depende de que el
código de la aplicación esté bien escrito.

Hay pruebas de concurrencia que disparan reservas simultáneas contra el mismo espacio y
verifican que exactamente una sobreviva.

## Cómo quedó

Cuatro decisiones más que salieron del mismo razonamiento:

::margen
14 tablas, todas con `tenant_id`.

La disponibilidad se calcula en la zona horaria del tenant, no en la del servidor.
::

**Multi-tenancy en una sola base**, con `tenant_id` en cada tabla. Cada sede es un
tenant; un dueño puede tener varias y solo comparten su cuenta. Un barbero pertenece a
una sola barbería. Separar bases por cliente habría sido más limpio en el papel y
mucho más caro de operar para un negocio que cobra mensualidades de barbería.

**Las citas guardan una foto de sus servicios.** Cada cita congela el nombre, el precio
y la duración que tenían los servicios el día que se agendó. Subir los precios en marzo
no reescribe lo que se cobró en febrero, ni deforma las estadísticas del año.

**El cliente no tiene cuenta.** Su identidad es el celular más el nombre — un mismo
celular puede llevar a dos personas, como un padre que agenda para su hijo. Gestiona su
cita por un enlace con token: cancela o la mueve sin contraseñas que olvidar.

**El barbero define cuánto se demora, el dueño define cuánto cuesta.** Son dos personas
distintas decidiendo dos cosas distintas, y el sistema no las mezcla.

## Estado

En producción, con una barbería real usándolo además de la demo. Lo que sigue es
cobro y facturación: hoy el sistema agenda, pero la mensualidad de cada barbería se
gestiona por fuera.
