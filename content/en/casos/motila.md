---
titulo: Motila
resumen: Multi-tenant booking for barbershops, with a public booking page, a barber panel and an owner panel across multiple locations.
gancho: Two clients ask for the same slot at the same time. One wins, the other gets a 409, and the guarantee doesn't live in the code.
orden: 1
estado: produccion
desde: '2026-03'
evidencia:
  - 54 commits
  - 14 tables
  - 3 panels
  - multi-tenant
  - concurrency tests
stack:
  - FastAPI
  - SQLAlchemy 2 (async)
  - Alembic
  - PostgreSQL 16
  - Nuxt 4
  - Tailwind CSS v4
  - Docker Compose
# PENDIENTE: ver la nota en la versión en español.
enlaces: []
capturas:
  - archivo: motila-reserva.jpg
    alt: A barbershop's public booking page, with the service list and prices on the left and the booking summary on the right
    pie: What the client sees. They pick services, see real availability and book without creating an account. The shop name is changed — this is the test shop.
    url: motila.onrender.com/b/la-70
    ratio: 1559 / 784
---

A barbershop doesn't lose money when the system goes down. It loses money when two
people show up for the same slot with the same barber, and somebody has to decide which
one gets sent home.

Motila gives every shop three surfaces: the public page where clients book without
creating an account, the panel where a barber sees their day, and the panel where the
owner manages prices, barbers and locations.

## The problem

Two clients open the page at the same time and request the same slot with the same
barber.

The availability engine takes the shop's opening hours, subtracts the barber's time off
and the appointments already booked, and returns the free slots in 15-minute blocks. It
tells both clients the slot is open — and it isn't lying. When it ran the calculation,
it was.

Between that calculation and the moment the booking is written there's a window. It's
small, but it exists, and a busy barbershop will find it on its own.

## The hard decision

The easy way out was to make the calculation faster, or lock the table while writing.
Both are patches: the first shrinks the window without closing it, the second turns
every booking into a queue.

The decision was to **accept that pre-validation will never be the guarantee**, and
split the two roles:

- The **availability engine** exists so the interface is usable. It shows what's free.
  It's a prediction, and it's treated as one.
- The **PostgreSQL exclusion constraint** is the guarantee. An `EXCLUDE USING gist` over
  `barber_id` plus the time range, restricted to appointments in `booked` state.

::margen
`EXCLUDE USING gist` over `(barber_id, tstzrange)`, with `WHERE status = 'booked'`.

A cancelled appointment frees the slot without deleting the record.
::

The database physically cannot hold two overlapping ranges for the same barber. When
both bookings arrive together, one is written and the other hits the constraint and
gets a 409. There is no third outcome, and it doesn't depend on the application code
being correct.

Concurrency tests fire simultaneous bookings at the same slot and assert that exactly
one survives.

## How it turned out

Four more decisions that came out of the same reasoning:

**Multi-tenancy in a single database**, with `tenant_id` on every table. Each location
is a tenant; one owner can have several and they share only the account. A barber
belongs to exactly one shop. Separate databases per client would have been cleaner on
paper and far more expensive to operate for a business charging barbershop-sized
subscriptions.

**Appointments store a snapshot of their services.** Each one freezes the name, price
and duration the services had the day it was booked. Raising prices in March doesn't
rewrite what was charged in February, or distort the year's statistics.

**Clients have no account.** Their identity is phone number plus name — one phone can
carry two people, like a father booking for his son. They manage the appointment
through a tokenized link: cancel or move it, with no password to forget.

**The barber sets how long it takes, the owner sets what it costs.** Two different
people deciding two different things, and the system doesn't conflate them.

## Status

In production, with a real barbershop using it alongside the demo. Next up is billing:
today the system books appointments, but each shop's subscription is handled outside it.
