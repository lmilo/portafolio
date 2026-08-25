---
titulo: Snap It Bella
cliente: Snap It Bella · through Estrateclab
resumen: Full redesign of a single-product Shopify store — a magnetic strap for dental loupes, sold in the US and Canada.
gancho: A one-product store where the page has to do all the selling. If it doesn't explain the mechanism, there's no sale.
orden: 5
estado: entregado
desde: '2026-08'
evidencia:
  - single product
  - 19 variants
  - US and Canada market
  - preview deployed on push
stack:
  - Shopify (Horizon theme)
  - Liquid
  - HTML/CSS
  - Netlify
enlaces:
  - etiqueta: See the proposal
    url: https://snapitbella-preview.netlify.app
    tipo: vivo
  - etiqueta: Current store
    url: https://snapitbella.com
    tipo: vivo
capturas:
  - archivo: snapitbella-home.jpg
    alt: The store homepage with the headline "Stop adjusting your loupes all day" beside a before-and-after comparison of the strap worn over clinical scrubs
    pie: The redesigned homepage. The before-and-after settles in one image what the copy cannot explain: how the mechanism works.
    url: snapitbella-preview.netlify.app
    ratio: 1559 / 784
---

Snap It™ is a silicone strap with a magnetic clasp that holds dental loupes behind the
head. It costs $29, weighs 45 grams and comes in 19 colours.

The buyer is mostly a **dental hygienist**: 12 to 13 patients a day, working at 2.5–3.5×
magnification on millimetre detail, gloved, with their hands inside someone's mouth.
The benefit isn't comfort. It's not having to break the procedure to reseat their
loupes.

There's no app here, no dashboard, no session. **The design is the product**: the page
is the only thing that sells.

## The problem

Three things collided in the existing site.

**The mechanism can't be understood by reading about it.** "Magnetic strap for loupes"
tells someone who's never seen one nothing. You have to show the temples going into the
terminals, the clasp opening, and the magnets finding each other when you put them back
on.

**The number-one objection went unanswered.** Every buyer wants to know whether it fits
*their* loupes — and some models need an adapter while some simply don't work. That
information appeared nowhere on the site. A clinical professional who can't confirm
compatibility doesn't buy.

**The content was scattered.** FAQ in one place, warranty in another, policies that
contradicted each other.

## The hard decision

The structure was settled as **progressive disclosure**, and that meant removing pages,
not adding them.

The home page carries the minimum needed to understand the product and buy it without
friction. Anyone who wants the full detail gets **one deep page** holding all of it,
with sticky sub-navigation — not five scattered pages where the visitor has to guess
which one holds their answer. `/pages/faq` and `/pages/warranty` disappeared as
standalone pages, with `301` redirects from the old URLs.

The second decision was about tone, and it cuts against commercial instinct:
**precision, not warmth**. A clinical professional buys on verifiable data, not
adjectives. The brand speaks the way instrument documentation speaks.

From that came the uncomfortable rule: **the facts that work against the sale are stated
plainly and early.** That it can't be autoclaved. That some loupe models are
incompatible. That pre-orders take weeks. Hiding it raises conversion today and
produces returns and bad reviews later, which in a small professional market cost more
than the sale.

## How it turned out

The deliverable wasn't only the site. It was also **a document to unblock the client**.

The meeting made clear that some information only he had: the compatibility table by
brand and model, and the copy from a pre-Shopify page that he said already explained the
product well. Asking for it as "send us the information" doesn't work — it asks the
client to write, and that gets postponed indefinitely.

So the request was built as a document where **almost everything is pre-filled and he
only ticks and corrects**. The compatibility table already had its columns: all that was
needed was an X. The asks are ordered by how much work each one unblocks, not by
logical sequence.

The proposal deploys itself on every push and is what gets shared with the client. It
publishes only the three pages and their assets — internal docs, the theme and meeting
notes stay out. It ships with `X-Robots-Tag: noindex` and a `robots.txt` blocking
everything: it's a copy of the real store's content and must not compete with it in
search.

## Status

Proposal delivered and deployed. Implementing it on the live store depends on the
compatibility table and the final photographs of the mechanism arriving.
