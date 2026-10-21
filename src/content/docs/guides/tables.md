---
title: Tables
description: Build a table block of values, then read it from your maths with lookup, interp and interp2, by key, by linear interpolation, or bilinearly across a grid.
---

A **table block** holds a grid of values (bolt sizes, section properties, a modification factor against duration) that the rest of your calcsheet can read by key or by interpolation. It's the sixth block type, alongside maths, text, diagram, function and page-break blocks.

Tables are available on every plan.

## Create a table

Click where you want it, then choose **Table** on the beacon toolbar. You get a blank **3 × 3** grid and a name field above it.

**Give the table a name.** The name is how your maths refers to it, and a table without one reports *"Give the table a name"*. Names follow the same rules as any variable, so `T`, `bolts` and `k_mod` all work. A table you leave both unnamed and blank is simply discarded when you move on, like an empty maths block.

## How the grid is read

One reading applies everywhere, in the block itself and in every function that reads it:

- **The first row is the header row.** Column labels.
- **The first column is the key column.** The value you look a row up by.
- **Everything else is the body**: the values you're after.

So a bolt table looks like this:

| size | $d$ | $A_s$ |
| :-- | :-- | :-- |
| M12 | $12\ \mathrm{mm}$ | $84.3\ \mathrm{mm^2}$ |
| M16 | $16\ \mathrm{mm}$ | $157\ \mathrm{mm^2}$ |
| M20 | $20\ \mathrm{mm}$ | $245\ \mathrm{mm^2}$ |

`size`, `d` and `A_s` are headers; `M12`, `M16` and `M20` are the keys.

## Filling cells in

What a cell may hold depends on where it sits.

### Headers and keys

Cells in the first row and first column are **labels**, and are never evaluated against the rest of your sheet. That's deliberate: a key written `d` is the text "d", not your variable `d` and not the day unit.

Type them however reads best:

- **A word**: `M12`, `size`, `steel`. Just type it; no quoting needed.
- **A number**, optionally with units: `0.5`, `-3`, `3.s`, `20.degC`, `1/2`. A numeric label doubles as the **axis value** that `interp` and `interp2` interpolate along, so a table you intend to interpolate needs numbers down the key column.

### Body cells

Body cells are ordinary maths expressions, evaluated against the shared scope in reading order. They can hold:

- a number, with or without units: `157.mm^2`
- an expression using anything defined **above** the table, so a table can present computed results, not just constants
- a text value, typed as text (see below)

A blank body cell is simply empty.

Two things a body cell can't be: a definition (no `:=`, giving *"A table cell holds a value, not a definition"*), or something that isn't a single value, like a matrix or a function.

:::note
Typing a bare word such as `M12` in a **body** cell is an error, because there it reads as maths. The message tells you how to fix it: type it as text. Use the **abc** button in the toolbar's **Tables** group, or press **Shift+Alt+T**, to switch into text mode. In header and key cells you don't need this.
:::

## Moving around and resizing

While you're in the grid:

| Key | Does |
| :-- | :-- |
| **Tab** / **Shift+Tab** | Next / previous cell, wrapping at row ends. Tab past the last cell appends a new row. |
| **Enter** | Down one row. On the last row, appends a new one. |
| **Escape** | Leave the cell. |

To change the shape deliberately, right-click the block: **Insert Row Above**, **Insert Row Below**, **Insert Column Left**, **Insert Column Right**, **Delete Row**, **Delete Column**. These act on the cell you were last in. A table never shrinks below one row and one column.

## Reading a table

Three functions read tables. All three are in the toolbar's **Tables** group and are offered by autosuggest.

### lookup: by exact key

`lookup(T, key)` returns the whole matching row; add a column to get a single cell:

$$
\begin{aligned}
\operatorname{lookup}(T,\, \text{M16}) &= \begin{bmatrix} \text{M16} & 16\ \mathrm{mm} & 157\ \mathrm{mm^2} \end{bmatrix} \\
\operatorname{lookup}(T,\, \text{M16},\, 3) &= 157\ \mathrm{mm^2} \\
\operatorname{lookup}(T,\, \text{M16},\, \text{A\_s}) &= 157\ \mathrm{mm^2}
\end{aligned}
$$

Name the column either by its **position**, counting from 1 including the key column, or by its **header label**.

Keys match exactly. Text matches text; numbers and quantities match **by value**, converting units as needed, so a key of `10.minute` is found by asking for `600.s`. The header row is never searched, and if nothing matches, the message lists the keys the table does have.

### interp: linear interpolation

On a two-column table, `interp(T, x)` interpolates down the key column:

```text
interp(K, 5.minute)
```

On a wider table, say which column, by position or header:

```text
interp(T, 5, 3)
interp(T, 5, "b")
```

The keys must be numbers or quantities, and must run in order. Increasing or decreasing is fine, but not jumbled. An exact key returns that cell as it stands.

:::note
`interp` **never extrapolates.** Ask for a value outside the key range and it refuses, and tells you the range it covers – better a blunt no than a number you'd have to distrust.
:::

### interp2: bilinear interpolation

For a grid of values varying two ways, `interp2(T, x, y)` interpolates on the key column (`x`) and the numeric header row (`y`). Here the headers must be numbers too:

| $p$ | $0$ | $1$ |
| :-- | :-- | :-- |
| $0$ | $0$ | $10$ |
| $1$ | $100$ | $110$ |

$$
\begin{aligned}
\operatorname{interp2}(T,\, 0.5,\, 0.5) &= 55 \\
\operatorname{interp2}(T,\, 1,\, 0.25) &= 102.5
\end{aligned}
$$

This is the shape most two-way design tables come in: a coefficient tabulated against one parameter down the side and another across the top.

## Units in tables

Units work throughout. A key column in seconds can be read with a value in minutes; a value column in millimetres interpolates to a result in millimetres. The usual unit rules apply, so the interpolation axis must be consistent, with all keys sharing one unit.

## Using a table as a matrix

The table's name holds its whole grid as a matrix, **header row and key column included**, indexed positionally from 1:

$$
\begin{aligned}
T[1, 2] &\quad \text{the second header} \\
T[2, 1] &\quad \text{the first key} \\
T[3, 2] &\quad \text{the second column of the second data row}
\end{aligned}
$$

This is the same indexing as any matrix you type by hand (see [Matrices](/guides/matrices/)). Conversely, `lookup`, `interp` and `interp2` work just as well on a matrix typed directly in a maths block, as long as it has a header row and a key column.

## Display and rounding

A cell you typed as a plain value shows exactly as you typed it. A computed cell shows its result, rounded to the block's decimal places, set per table and falling back to the calcsheet default.

A cell that fails is marked in the grid, and the error also stops the table defining its name, in the same way a bad maths block does.

## Elsewhere in the app

- **The Navigate sidebar** lists tables under **Matrices & Tables**, each shown as its size, `T := 3 × 3 table`, so you can jump to one.
- **Renaming** works on tables both ways round: rename the table and its readers follow; rename something the table uses and its cells follow.
- **Copying** a table and pasting it as text gives tab-separated rows, which paste straight into a spreadsheet.
- **Mathew** knows about your tables and can work with them.

## See also

- [Table functions](/reference/table-functions/): signatures, rules and messages at a glance
