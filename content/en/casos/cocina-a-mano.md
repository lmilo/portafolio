---
titulo: Cocina a Mano
resumen: A mobile app for not throwing food away. It tracks what's in the pantry, warns before anything spoils, and ranks recipes by what you can already cook.
gancho: It doesn't list recipes — it measures what you can already cook. A cookbook can't know you're one ingredient short of three dishes, and that one you already have expires Thursday.
orden: 4
estado: desarrollo
desde: '2026-05'
evidencia:
  - 90 tests on the pure logic
  - 4 ways to load the pantry
  - Own Worker deployed
  - Zero data server
  - Signed APK built
stack:
  - React Native
  - Expo SDK 57
  - TypeScript
  - Cloudflare Workers
  - Gemini
  - EAS Build
enlaces: []
---

This app gets used **standing in the kitchen, with the groceries still in hand**. That's a
phone, not a browser — which is why it stopped being a PWA.

The user isn't a foodie. It's someone who just got home with six bags and nowhere to put
them, or who opens the fridge at seven with no plan. And it's someone who finds a pound of
tomatoes gone bad at the back of the drawer, and it stings, because they paid for it.

## The problem

The declared enemy isn't a shortage of recipes. It's **waste**.

Anyone can ship a recipe catalogue, and Google has more of them. What a cookbook can't do
is cross the two things only this app knows: **what you have** and **how long it has left**.
That crossing produces the one moment that justifies the whole product:

> *You have everything for ajiaco, and it uses the tomatoes that expire tomorrow.*

But that only works if the pantry is loaded, and there's the real friction: **nobody types
in forty products**. That — not the interface — was the problem worth solving on mobile.

## The hard decision

**The server was removed.** The web version used Supabase anonymous auth, which had the
worst of both worlds: it depended on a server yet gave no real recovery —delete the app and
you lost everything anyway— and a free project pauses on inactivity, so an installed app
could simply stop opening after a couple of months.

Now everything lives on the phone. The trade-off is honest and the app says it out loud:
with no server there's no automatic backup, so **exporting *is* the backup**.

**The only thing left on the network is the AI**, because the Gemini key can't ship inside
the APK. It lives in a Cloudflare Worker rather than a Supabase Edge Function, for the same
reason as above: a Worker doesn't go to sleep.

**Four ways to load the pantry, all of them visible.** Photograph the receipt, scan a
barcode, dictate it, or type it. Hiding them behind a floating `+` would have buried the
very thing that makes this app worth having on a phone.

Dictation is parsed **on the device, without AI**: turning "two pounds of rice" into a
quantity and a unit is a job for a lookup table, not a model, and sending it over the
network would cost a wait and break the feature with no signal — exactly when someone is
putting the groceries away.

## What testing turned up

**The match ignored quantities.** Having 5 grams of rice scored the same as having 5
kilos, and the app said "you have enough" when it didn't. It now compares whenever the
units are convertible, and **admits when it can't**: mass and volume don't convert without
densities, and an invented table would produce numbers that look exact and aren't.

**A Colombian pound is 500 grams, not 453.592.** That's a domain decision, not an
oversight: the avoirdupois pound belongs to another system, and the one used at the market
here is half a kilo. The "technically correct" value would inject a 10% error into every
purchase.

**And the finding that only shows up in testing.** Fed a real receipt, the invoice reader
saw `PECHUGA POLLO BAND X500G` with a 1 in the quantity column and returned **1 gram of
chicken**: it took the unit from the package size and the number from the column, which
counts packages. One gram of chicken in the pantry makes the app say "not enough" when
there's plenty — the same error as before, arriving from the opposite direction.

Hence the rule governing everything the AI touches: **the app may get it wrong reading, but
it may not get it wrong saving.** Nothing from a model enters the inventory without passing
a review screen, with the uncertain lines flagged.

## How it looks

Colour encodes two axes and neither one decorates: **basil green** for what you can already
cook, and an **amber → terracotta → red** scale for the food's clock. Anything with time to
spare stays stone-coloured, unaccented, because it isn't asking for anything.

Unlike the other app in this portfolio, **money carries no accent here**. There the product
is about money; here the problem isn't what the tomato cost, it's that it's going bad.

There's a **cooking mode** that exists on exactly one screen: the one you follow while
cooking. It doesn't enlarge the whole app —the user can see fine— just what has to be read
standing a metre away, and it keeps the screen awake. Having it lock mid-sauté, forcing you
to unlock with oil on your hands, is the most expensive failure that screen can have.

## Status

Built, signed, and with the Worker deployed and tested against receipts. **What's missing
is the one thing that can't be simulated**: loading a full week of groceries through the
three new paths and seeing whether the match holds up. "Chicken breast" in a recipe and
`POLLO PECHUGA BAND 500G` on a receipt don't match on words, and none of the 90 tests can
tell you whether that works in real life.
