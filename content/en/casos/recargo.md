---
titulo: Recargo
resumen: Mobile app for shift workers in Colombia. It sorts every hour into its legal category and works out what it's worth.
gancho: An hour worked at 3 a.m. on a Sunday isn't "an hour". It's a Sunday night hour and it's worth 125% more.
orden: 3
estado: desarrollo
desde: '2026-07'
evidencia:
  - 261 test cases
  - 8 legal categories
  - 5 export formats
  - In use by real workers
  - APK tested on device
stack:
  - React Native
  - Expo SDK 57
  - TypeScript
  - Expo Router
  - EAS Build
enlaces: []
capturas:
  - archivo: recargo-marcar.jpg
    dispositivo: movil
    alt: "Main screen with the day's greeting, the 24-hour band of the shift, a running timer at 00:03:39 and «earned so far $714»"
    pie: "The 24-hour band is the shift drawn at its real hour. Below it, the premium running live."
  - archivo: recargo-turno.jpg
    dispositivo: movil
    alt: "The shift in progress with a large «I finished my shift» button, and below it «Add a shift I forgot» and «Swaps with my coworkers»"
    pie: "A button you can't miss. And the two things a notebook can't handle: the forgotten shift and the swap with a coworker."
  - archivo: recargo-exportar.jpg
    dispositivo: movil
    alt: "The «Export my hours» screen with the chosen month and what the file contains: a summary by category, one row per shift, and the statute behind each band"
    pie: "The file carries the article backing each band and the rate table with its effective date. Without that it's no use for a claim."
  - archivo: recargo-ajustes.jpg
    dispositivo: movil
    alt: "Appearance settings with three theme options and the easy-mode switch, which enlarges text and buttons"
    pie: "«Night blue background. It doesn't glare on the small-hours shift». Easy mode enlarges everything and leaves only what's needed on screen."
---

> **Context.** Colombian labour law pays a premium — a *recargo* — for hours worked at
> night, on Sundays and on public holidays, and the premiums stack. The rates come from
> the Código Sustantivo del Trabajo and are amended by acts of congress, sometimes
> mid-year. The user is checking the app against the payslip their employer hands them
> on the 30th.

The shift roster always belonged to the employer. This one belongs to the worker.

The user is a security guard, a nursing assistant, a factory operator. Someone who
works rotating shifts, who sometimes clocks in at two in the morning one-handed, and
who may never have used an app that isn't WhatsApp.

## The problem

A notebook can count hours. What it can't do is **classify** them.

In Colombia an hour worked isn't worth the same depending on when it happens. There are
eight possible legal categories, and they combine:

| Category | Premium | Statute |
|---|---|---|
| Regular day | 0% | CST art. 161 |
| Night (7 p.m. to 6 a.m.) | 35% | CST arts. 160, 168 |
| Daytime overtime | 25% | CST arts. 159, 168 |
| Night overtime | 75% | CST arts. 159, 168 |
| Sunday or holiday | 90% | CST art. 179 |
| Sunday night | 125% | 90 + 35 |
| Sunday overtime | 115% | 90 + 25 |
| Sunday night overtime | 165% | 90 + 75 |

A 10 p.m. to 6 a.m. shift crossing into Sunday passes through three categories. Nobody
does that in their head, which is why almost nobody checks whether they were paid
correctly.

## The hard decision

**The rates change, and they change with a date.** Two 2026 amendments get confused
constantly: the Sunday premium rose to 90% on 1 July, and the working week dropped to
42 hours on 15 July. That second one moves the hourly divisor from 220 to 210, so the
same hour becomes worth more.

The decision was that **no percentage is ever written on a screen**. The rates live
versioned by effective date in a single file, and a shift is settled with the values in
force on the day it happened. A June shift isn't recalculated because the law changed
in July.

Holidays aren't tabulated either — they're computed, because some are derived from
Easter and some are moved to Monday by the Ley Emiliani.

All of it is checked against Ley 2466 of 2025, Ley 2101 of 2021 and the Código
Sustantivo del Trabajo, and covered by 172 boundary test cases — because boundaries are
where this breaks: the shift crossing midnight, the one starting on a holiday and
ending on a workday, the one landing exactly on the date a rate changed.

## How it turned out

**An earlier version was thrown away entirely.** It was designed as a payroll document:
continuous-feed paper, time-clock purple ink, 11-pixel small-caps labels, no icons at
all. It had a defensible art direction and it was unusable for its own user — the
navigation was indistinguishable and the legal weight drowned the only two things that
matter, which are clocking the shift and seeing the money.

That produced the rule that governs the project: **ease of use outranks visual
distinction.** If an aesthetic decision puts a single barrier in front of the user, the
aesthetic decision loses.

**Mobile only, on purpose.** It compiles for web and most of it works, but web is not a
supported target. `expo-secure-store` and `expo-file-system` don't exist in a browser,
so the PIN and every export would be dead. Worse, `localStorage` is per browser and not
per person: on a shared computer the second person to sign in would see the first
one's hours and salary. The privacy model depends on each person having this on their
own phone.

**It exports in five formats** — PDF, Excel, Word, CSV — and generates a **ready-written
claim letter** to hand the employer. That last one is what makes the app useful:
knowing you were underpaid isn't enough, you have to be able to contest it.

## Status

Installed and tested on a real phone: notifications arrive, all five formats generate
and share, the simplified mode works. **What's missing is the one thing that can't be
simulated**: someone using it across their own shifts for a full month and comparing
against a real payslip. Until that happens, it doesn't go out to a worker.
