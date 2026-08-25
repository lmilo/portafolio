---
titulo: Sposito CRM
cliente: Sposito · through Estrateclab
resumen: Editorial calendar and content management for an agency. I joined a system already in production that was slow, measured it, and fixed it.
gancho: Six simultaneous requests took 6.18 seconds. Afterwards, 0.022. The cause wasn't the database.
orden: 4
estado: produccion
desde: '2026-08'
evidencia:
  - 6.18s → 0.022s
  - 100 of 244 commits
  - from 2 tests to 14
  - 7 phantom columns
  - 512 MB free tier
stack:
  - Laravel 12
  - PHP-FPM
  - nginx
  - PostgreSQL
  - React
  - TypeScript
  - Google Drive API
  - Docker
enlaces:
  - etiqueta: API reference
    url: https://crm-sposito-backend-1-v2.onrender.com
    tipo: documento
    duerme: true
capturas:
  - archivo: crm-sposito-dashboard.jpg
    alt: The CRM dashboard with six metric cards — users, clients, ideas, pillars, formats and comments — above a table of users and their roles
    pie: The admin panel. Personal data in the table is replaced with fictional values; the interface is the real one.
    url: crm-sposito-frontend-v2.onrender.com/dashboard
    ratio: 1559 / 784
---

This isn't a project I started. It's one I joined.

The Sposito CRM runs a content agency's editorial calendar: ideas, clients, content
pillars, videos, client approvals and files on Google Drive. A team of three built it,
and of its 244 commits **100 are mine**. Since August 2026 I own the system.

What's interesting isn't what I built from scratch. It's what I found.

## The problem

The system was slow and nobody knew why. "It's slow" isn't a diagnosis, so the first
step was measuring it from the outside — the application reported nothing about itself.

Six simultaneous requests to `/up`, an endpoint with no business logic that only
answers that the server is alive, produced this in production:

```
1.34s · 2.34s · 3.32s · 4.28s · 5.22s · 6.21s
```

::margen
Measured with `curl` from the outside and the browser Performance API.

The application exposed no metrics of its own — which is why `Server-Timing` was the first thing added afterwards.
::

A perfect one-second staircase. That pattern isn't a slow query or a missing index:
it's **one request at a time**, each paying a second of startup. Two stacked problems,
not one.

## The hard decision

The tempting move was to optimise queries, which is where everyone looks first. It
would have been wasted time: the endpoint being measured never touches the database.

**Problem one: the server.** It was running under `php artisan serve`, PHP's built-in
development server, which handles one request at a time. Replaced with php-fpm and
nginx under supervisor, 4 workers and a 256 MB limit — hand-sized for the 512 MB of the
free tier, and verified inside a container capped at 512 MB: it uses 129 MiB.

**Problem two: the toll.** `AppServiceProvider::boot()` contained a `runMigrations()`
call that ran on **every single HTTP request**: around 13 queries against the Postgres
catalogue plus a client backfill, against a database hosted at a different provider. It
was taken out.

Taking it out exposed what that startup had been hiding: six migrations marked pending
that had in fact already been applied hot, so `migrate --force` failed with "already
exists". They had to be made idempotent.

And the guard that should have prevented this, `hasIndex()`, used
`getDoctrineSchemaManager()`, removed in Laravel 11: it always threw, always returned
`false`, and guarded nothing.

**Measured result:** the same 6 parallel requests dropped from 6.18s to **0.022s** of
total wall clock.

## How it turned out

Opening the hood surfaced three more things failing silently:

**The cache never cached.** The code called `Cache::tags(['ideas'])`, but the actual
store was `file`, which doesn't support tags. It threw, a `try/catch` swallowed the
exception, and `/ideas/all` — the most expensive endpoint in the system — bypassed the
cache on every request. Replaced with key versioning.

**The queue dispatched into the void.** `QUEUE_CONNECTION=redis` with no Redis
installed: the video metadata extraction and Drive deletion jobs were queued nowhere.
Moved to the database driver.

**The frontend filtered in memory.** It downloaded all 3,382 ideas and filtered in the
browser. Filtering and sorting moved to SQL, with an allowlist of sortable columns.

Then came the part that makes performance measurable going forward: middleware that
exposes, on every response, how long the application took, how much of it was the
database and how many queries it ran — in the standard `Server-Timing` header that
browsers graph on their own. It also logs requests exceeding 30 queries (almost always
an N+1) and queries over 500 ms.

**And a time bomb.** Comparing the real production schema against the one the
migrations produce on an empty database surfaced **seven columns that existed in
production and that no migration created**. The code depends on all seven: without
`estados_idea.color`, *any* listing of ideas fails. Standing up a new environment, a
staging server or a restore from scratch produced an unusable application, and nobody
knew, because nobody had ever rebuilt the database from zero.

Tests went from 2 passing and 2 failing to **14 passing**. The two failures were caused
by the boot-time auto-migrator.

## Status

In production and in daily use. What's next on my list, in order:

1. **Rotate credentials.** The `.env` was inside the image and in the git index, with
   the database credentials and the Google secrets. It's out of both now, but it's
   still in the history, so the keys need rotating.
2. **Close off the panel**, which currently loads without asking for authentication.
