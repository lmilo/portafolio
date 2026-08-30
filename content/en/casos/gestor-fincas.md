---
titulo: Country House Trip Planner
resumen: Plans weekend house rentals with friends — compares candidates, sizes the groceries against confirmed guests, compares supermarket prices and settles what each person owes.
gancho: You can't see someone else's trip by changing the number in the URL. There's a test suite whose only job is proving that.
orden: 7
estado: produccion
desde: '2026-07'
evidencia:
  - 11 commits
  - 6 unit suites
  - isolation tests
  - 3 supermarket chains
stack:
  - Nuxt 4
  - Drizzle ORM
  - PostgreSQL
  - TypeScript
  - Zod
  - Vitest
# No public link: trips carry real people's phone numbers and IDs.
enlaces: []
capturas:
  - archivo: gestor-fincas-paseo.jpg
    alt: "A trip summary with totals for the house, groceries, drinks and transport, and on the right «each person owes $141,196 across 5 confirmed»"
    pie: "The calculation that settles the argument: what each person owes, over the people who actually confirmed. Above it, the trip's seven tabs. The name is changed."
    url: trip planner · restricted access
    ratio: 1458 / 812
---

> **Context.** A *finca* is a rented country house — the standard way a group of
> Colombian friends spends a long weekend. Someone always fronts the money, and someone
> always ends up paying more than their share. D1, Ara and Éxito are the supermarket
> chains the shopping gets priced against.

Organising one is five chained problems: which house works out cheapest, who's actually
coming, how much food and liquor to buy for that many people, where to buy it, and what
each person owes at the end.

All five are solved today in a WhatsApp group and a note on someone's phone.

## The problem

The hard part wasn't the arithmetic. It was **who gets to see what**.

Data that must stay private lives next to data that's only useful if it's shared:

| Data | Scope | Why |
|---|---|---|
| Trips, guests, ledgers | private to the trip | phone numbers and IDs live here |
| Houses | private to whoever added it, visible to their team | a listing carries a contact number and notes |
| Products and portions | global | a portion of rice is the same for everyone |
| Store prices | **global** | the price at Éxito is the same for everyone |

Global prices are the sharp edge: more people capturing prices means better information
for everyone, but it also means anyone with an account can enter a false one.

## The hard decision

**Prices stay global, and the control is provenance.** Every capture records who made
it, where it came from and when, and anyone can flag it as ignored without erasing the
trail. Traceability was chosen over restriction: a bad data point gets marked, not
hidden, and the history survives.

**Isolation between accounts isn't trusted to page code.** You can't reach someone
else's trip by changing the number in the URL, and that's proven by a dedicated suite —
`tests/api/aislamiento.spec.ts` — that actively tries to reach another account's
resources and asserts the server refuses. The test exists because "I forgot the guard on
this endpoint" is the most common and most expensive failure in a system like this.

**Collaborators are equal to the creator**, deliberately: they can add houses, confirm
guests, build the shopping list, keep the ledger and invite more people. The only thing
they can't do is remove the creator from the team. Finer-grained permissions would have
been more work and would have got in the way of the real situation, which is a group of
friends organising together. Deletion is soft and restorable for 30 days.

## How it turned out

Three things worth documenting turned up while building it:

**Error messages can't go in `statusMessage`.** The HTTP status line only accepts ASCII,
so h3 strips accents: "Ese teléfono ya está anotado" reached the screen as "Ese telfono
ya est anotado". Messages go in the body.

**An update schema can't carry `.default()`.** Zod's `.partial()` makes fields optional,
but a default still gets injected when the field is absent. A `PATCH` with a single
field came out of Zod with everything else at factory values, and Drizzle's `.set()`
wrote them over the top: confirming a guest erased whether they drink, and editing a
vehicle zeroed its cost. Fields are declared without defaults, and the default lives
only in the create variant.

**The chosen house isn't stored on the trips table.** It's derived from the `chosen`
state on the join table, with a partial unique index preventing two. Storing it on
`trips` as well would be the same truth in two places, free to drift apart.

And one product decision: **the budget warns, never blocks.** It distinguishes between
already over and about to go over buying what's left, but it prevents nothing. Nobody
gets stuck in a supermarket aisle because of a validation.

## Status

In production, with accounts, email verification and invitations working. Next is
capturing prices from a phone in the supermarket, which works today but takes too many
taps to do one-handed with a trolley.
