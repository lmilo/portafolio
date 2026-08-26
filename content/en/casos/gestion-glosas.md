---
titulo: Claims Objection Tracker
resumen: Tracking the objections insurers raise against medical invoices, with a review calendar the system enforces rather than displays.
gancho: Each insurer is reviewed on one fixed weekday. When a holiday lands on it, each one shifts differently — and the system enforces that.
orden: 2
estado: produccion
desde: '2026-06'
evidencia:
  - 43 commits
  - 820 invoices in the test set
  - unit + integration tests
  - deterministic seed
stack:
  - Nuxt 4
  - Drizzle ORM
  - PostgreSQL
  - TypeScript
  - Vitest
  - Docker Compose
enlaces:
  - etiqueta: Open the app
    url: https://gestion-glosas-412e.onrender.com
    tipo: vivo
    duerme: true
capturas:
  - archivo: glosas-cartera.jpg
    alt: "Claims portfolio with one card per insurer: ARL Sura, EPS Sura, Salud Total and EPS Sanitas, each with its type, tax ID and count of open objections"
    pie: "Each insurer shows its type next to the name. ARL Sura is a workers' compensation carrier, not a health insurer, and the system says so. The user name and the amount are changed."
    url: gestion-glosas-412e.onrender.com
    ratio: 1559 / 784
---

> **Context.** This runs in Colombia. A *glosa* is the formal objection a health
> insurer raises against part of a medical invoice. Someone has to answer it, with
> supporting documents, before the deadline. Unanswered, the money is never collected.
> The insurers named here — EPS Sura, Salud Total, Sanitas, ARL Sura — are real
> Colombian carriers, and their review rules are what makes this system hard.

The system keeps the full trail: what was objected, what was answered, with which
document, and who owns it.

## The problem

The hard part wasn't the invoice CRUD. It was the calendar.

Each insurer is reviewed on **one fixed weekday**, inside a Monday-to-Thursday window.
EPS Sura on Tuesdays, Salud Total on Wednesdays, Sanitas on Thursdays, ARL Sura on
Mondays. Outside its own day, that insurer's log is read-only.

Then a public holiday lands on it. Colombia has eighteen a year, many of them moved to
Monday by the Ley Emiliani, so Mondays are lost at a rate that isn't anecdotal.

And the shift rule **is not the same for all of them**. Each insurer declares its own:

- The three health insurers **postpone**: the review waits for their assigned day the
  following week. Only if their day falls on a holiday two weeks running do they
  recover on a fallback day, sharing it with whoever holds it.
- ARL Sura shifts **immediately**: a single holiday moves it to Wednesday that same
  week, alongside Salud Total. Never to Tuesday, because EPS Sura shares its day with
  nobody. And if Wednesday is also a holiday, then it does wait for the following
  Monday.

That last condition — EPS Sura being exclusive — is what turns a lookup table into an
engine with real edge cases.

## The hard decision

The temptation was to treat the calendar as presentation: show the suggested day and
let the case manager write whenever she wants. It's easier to build and breaks nothing.

The opposite was chosen: **the system enforces the rule, it doesn't just display it.**
Outside its valid day, an insurer accepts no new entries. The friction is deliberate,
because an entry written on the wrong day is exactly the error this system exists to
prevent.

That forced the calendar engine to be a pure, isolated, separately tested piece — not
logic scattered across interface components.

The consequence that paid off later: **the seed uses the same engine as the runtime.**
The 820 test invoices and 2,700 entries generate identically every time, and entries
only ever land on valid review days. If the engine had a bug, the test data would be
impossible and the failure would surface before production.

## How it turned out

**The system says *entity*, not *EPS*.** ARL Sura is a workers' compensation carrier,
not a health insurer, and calling it one would be wrong on screen and in the report the
client reads. Each entity declares its type and that type is shown next to the name.
Today the names happen to carry it inside, but that's coincidence, not design.

**Holidays are computed, not tabulated.** Some are derived from Easter and some are
moved to Monday by the Ley Emiliani. A hand-written table goes stale and nobody notices
until something has already been logged wrong.

**Two separate suites.** Unit tests exercise the calendar engine in milliseconds with
no infrastructure. Integration tests boot the app against Postgres in Docker. The split
matters: the engine runs on every save, and a suite that needs Docker doesn't get run
that often.

## Status

In production, used daily. Next are the month-end closing reports, which today are
assembled by exporting to Excel and finishing by hand.
