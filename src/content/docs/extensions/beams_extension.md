---
title: Beams
description: 32 standard beam cases, inserted as live functions for reactions, shear, bending moment and deflection.
---

32 standard beam cases: simple spans, cantilevers, propped cantilevers, overhangs, fixed ends and two-span continuous beams. Pick one and it lands on the calcsheet as a schematic plus live functions for its reactions, shears, moments and deflections.

Free on every plan; needs an account.

## Find a case

Click the beam icon in the activity bar.

![The Beams panel: a search box, the category menu reading Show all (32), and the first two cases with their schematics](../../../assets/beams/panel.png)

Two filters, stacked:

- **Category** (**Show all (32)**): Simple Beams, Cantilever Beams, Propped Cantilevers, Overhanging Beams, Fixed-End Beams or Continuous Beams.
- **Search**: the letters you type, in order, against name and summary; best match first. It ranks more than it filters – `udl` keeps 29 of the 32 but leads with the fully loaded spans, and `cant point` puts **Cantilever Beam – Concentrated Load at Any Point** on top.

## Insert a case

Click the page to place the beacon, then press **+**. With no beacon it goes below everything.

![A uniformly loaded simple beam on the calcsheet: the beam schematic with its name beside it, then R, M max and Delta max as function definitions, each with a description to its right](../../../assets/beams/inserted.png)

You get:

- **The schematic**, as a diagram block, with the case name beside it.
- **One function definition per formula**, with a line saying what it gives and where.

It arrives selected, so it drags as one. One **Undo** removes it. The definitions show no result; they wait to be called.

## Choose what comes in

The chevron under **+** opens the case's contents, all ticked.

![The expanded list for the uniformly loaded simple beam: Include beam diagram, then the typeset signatures R(w, L), M max(w, L) and Delta max(w, L, E, I), each with a ticked box](../../../assets/beams/expressions.png)

- **Include beam diagram**: untick it and the name comes in as a small unnumbered heading instead.
- **One box per formula**: hover over one for its description; untick what you don't need.

Don't untick a formula the others call. $L_1$, the total length, is the usual one: in **Simple Beam – Concentrated Load at Any Point**, $R_1$, $R_2$, $M_{max}$ and $\Delta_{max}$ all divide by $L_1(a, b)$. Leave it out and they fail with *Undefined function L_1*. The panel won't stop you.

## Use the formulas

Define the inputs, then call:

![w, L, E and I defined in a row, then R(w, L) = 30 kN, M max(w, L) = 45 kN·m and Delta max(w, L, E, I) = 10.5469 mm](../../../assets/beams/calls.png)

That's **Simple Beam – Uniformly Distributed Load** with $w = 10\ \mathrm{kN/m}$, $L = 6\ \mathrm{m}$, $E = 200\ \mathrm{GPa}$ and $I = 8000\ \mathrm{cm^4}$:

$$
R(w, L) = 30\ \mathrm{kN} \qquad M_{max}(w, L) = 45\ \mathrm{kN \cdot m} \qquad \Delta_{max}(w, L, E, I) = 10.5469\ \mathrm{mm}
$$

Change $w$ and all three move.

**Arguments go by position.** The first in the brackets is the load, whatever it's called: `M_max(w_d, L_s)` works, and so does `M_max(10.kN/m, 6.m)`. While you type, a hint names the argument under the caret and gives a typical value:

![The signature hint over a call to M max: M_max(w, L) with L highlighted, and the note that L is the span length, for example 6 m](../../../assets/beams/signature-hint.png)

For all of a formula's notes at once, right-click its description and choose **Detailed Description**.

**Units look after themselves.** The result carries its unit; change it in the unit box, as in [Your first calcsheet](/guides/your-first-calcsheet/#8-show-it-in-feet).

**Assign a result to carry it forward.** $M_{Ed} := 1.5 \cdot M_{max}(w, L)$ gives $67.5\ \mathrm{kN \cdot m}$.

(Mind $L$: it's also the litre. Define $L := 6\ \mathrm{m}$ and every litre below becomes six metres. Only matters if the sheet measures volumes; call the span $L_s$ there.)

## The catalogue

Inputs: $w$ a uniform load per unit length, $W$ a total load, $P$ a point load, $L$ a span, $a$, $b$ and $c$ distances along the beam (the schematic shows from where), $E$ the modulus of elasticity, $I$ the second moment of area. Subscripts number the first and second of a kind. **Inputs** says what a case needs, not the order; the hint gives the order.

### Simple Beams

| Case | Gives | Inputs |
| :-- | :-- | :-- |
| Simple Beam – Uniformly Distributed Load | $R$, $M_{max}$, $\Delta_{max}$ | $w, L, E, I$ |
| Simple Beam – Uniform Load Partially Distributed | $L_{1}$, $R_{1}$, $R_{2}$, $M_{max}$ | $w, a, b, c$ |
| Simple Beam – Uniform Load Partially Distributed at One End | $R_{1}$, $R_{2}$, $x$, $M_{max}$ | $w, L, a$ |
| Simple Beam – Uniform Load Partially Distributed at Each End | $L_{1}$, $R_{1}$, $R_{2}$, $M_{1}$, $M_{2}$ | $w_{1}, w_{2}, a, b, c$ |
| Simple Beam – Load Increasing Uniformly to One End | $R_{1}$, $R_{2}$, $x_{m}$, $M_{max}$, $\Delta_{max}$ | $W, L, E, I$ |
| Simple Beam – Load Increasing Uniformly to Centre | $R$, $M_{max}$, $\Delta_{max}$ | $W, L, E, I$ |
| Simple Beam – Concentrated Load at Centre | $R$, $M_{max}$, $\Delta_{max}$ | $P, L, E, I$ |
| Simple Beam – Concentrated Load at Any Point | $L_{1}$, $R_{1}$, $R_{2}$, $M_{max}$, $\Delta_{max}$ | $P, a, b, E, I$ |
| Simple Beam – Two Equal Concentrated Loads Symmetrically Placed | $R$, $M_{max}$, $\Delta_{max}$ | $P, L, a, E, I$ |
| Simple Beam – Two Equal Concentrated Loads Unsymmetrically Placed | $R_{1}$, $R_{2}$, $M_{1}$, $M_{2}$ | $P, L, a, b$ |
| Simple Beam – Two Unequal Concentrated Loads Unsymmetrically Placed | $R_{1}$, $R_{2}$, $M_{1}$, $M_{2}$ | $P_{1}, P_{2}, L, a, b$ |

### Cantilever Beams

| Case | Gives | Inputs |
| :-- | :-- | :-- |
| Cantilever Beam – Uniformly Distributed Load | $R$, $M_{max}$, $\Delta_{max}$ | $w, L, E, I$ |
| Cantilever Beam – Concentrated Load at Free End | $R$, $M_{max}$, $\Delta_{max}$ | $P, L, E, I$ |
| Cantilever Beam – Concentrated Load at Any Point | $R$, $M_{max}$, $\Delta_{max}$ | $P, L, b, E, I$ |

### Propped Cantilevers

| Case | Gives | Inputs |
| :-- | :-- | :-- |
| Beam Fixed at One End, Supported at Other – Uniformly Distributed Load | $R_{1}$, $R_{2}$, $M_{max}$, $M$, $\Delta_{max}$ | $w, L, E, I$ |
| Beam Fixed at One End, Supported at Other – Concentrated Load at Centre | $R_{1}$, $R_{2}$, $M_{max}$, $M$, $x$, $\Delta_{max}$ | $P, L, E, I$ |
| Beam Fixed at One End, Supported at Other – Concentrated Load at Any Point | $L_{1}$, $R_{1}$, $R_{2}$, $M_{1}$, $M_{2}$ | $P, a, b$ |

### Overhanging Beams

| Case | Gives | Inputs |
| :-- | :-- | :-- |
| Beam Overhanging One Support – Uniformly Distributed Load | $R_{1}$, $R_{2}$, $V_{max}$, $x$, $M_{1}$, $M_{2}$ | $w, L, a$ |
| Beam Overhanging One Support – Uniformly Distributed Load on Overhang | $R_{1}$, $R_{2}$, $V_{max}$, $M_{max}$, $\Delta_{max}$ | $w, L, a, E, I$ |
| Beam Overhanging One Support – Concentrated Load at End of Overhang | $R_{1}$, $R_{2}$, $V_{max}$, $M_{max}$, $\Delta$, $\Delta_{2}$ | $P, L, a, E, I$ |
| Beam Overhanging One Support – Concentrated Load at Any Point Between Supports | $L_{1}$, $R_{1}$, $R_{2}$, $M_{max}$ | $P, a, b$ |
| Beam Overhanging Both Supports – Unequal Overhangs – Uniformly Distributed Load | $L_{1}$, $R_{1}$, $R_{2}$, $M_{1}$, $M_{2}$, $X$, $M_{3}$, $V_{max}$ | $w, a, b, c$ |

### Fixed-End Beams

| Case | Gives | Inputs |
| :-- | :-- | :-- |
| Beam Fixed at Both Ends – Uniformly Distributed Load | $R$, $M_{max}$, $M$, $\Delta_{max}$ | $w, L, E, I$ |
| Beam Fixed at Both Ends – Concentrated Load at Centre | $R$, $M_{max}$, $\Delta_{max}$ | $P, L, E, I$ |
| Beam Fixed at Both Ends – Concentrated Load at Any Point | $L_{1}$, $R_{1}$, $R_{2}$, $M_{1}$, $M_{2}$, $M_{a}$, $\Delta_{max}$, $\Delta_{a}$ | $P, a, b, E, I$ |

### Continuous Beams

| Case | Gives | Inputs |
| :-- | :-- | :-- |
| Continuous Beam – Two Equal Spans – Uniform Load on One Span | $R_{1}$, $R_{2}$, $R_{3}$, $V_{max}$, $M_{max}$, $x$, $M$ | $w, L$ |
| Continuous Beam – Two Equal Spans – Concentrated Load at Centre of One Span | $R_{1}$, $R_{2}$, $R_{3}$, $V_{max}$, $M_{max}$, $M$ | $P, L$ |
| Continuous Beam – Two Equal Spans – Concentrated Load at Any Point | $L_{1}$, $R_{1}$, $R_{2}$, $R_{3}$, $M_{1}$, $M_{2}$ | $P, a, b$ |
| Continuous Beam – Two Equal Spans – Uniformly Distributed Load | $R_{1}$, $R_{2}$, $V_{max}$, $M_{max}$, $M_{span}$, $\Delta_{max}$ | $w, L, E, I$ |
| Continuous Beam – Two Equal Spans – Two Equal Concentrated Loads Symmetrically Placed | $R_{1}$, $R_{2}$, $V_{max}$, $M_{1}$, $M_{2}$ | $P, L$ |
| Continuous Beam – Two Unequal Spans – Uniformly Distributed Load | $M$, $R_{1}$, $R_{3}$, $R_{2}$, $V_{2}$, $V_{3}$, $M_{x1}$, $M_{x2}$ | $w, L_{1}, L_{2}$ |
| Continuous Beam – Two Unequal Spans – Concentrated Load on Each Span Symmetrically Placed | $M$, $R_{1}$, $R_{3}$, $R_{2}$, $V_{2}$, $V_{3}$, $M_{m1}$, $M_{m2}$ | $P_{1}, P_{2}, L_{1}, L_{2}$ |
