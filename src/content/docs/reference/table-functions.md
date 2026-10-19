---
title: Table functions
description: The three functions that read a table — lookup, interp and interp2 — one entry each with signature, parameters, returns, errors and an example.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 2
---

For building a table, the grid rules, editing keys and the toolbar, see [Tables](/guides/tables/).

## lookup

```text
lookup(T, key)
lookup(T, key, col)
```

Finds the row of `T` whose key-column cell equals `key`, and returns the row — or one cell of it when `col` is given. The header row is never searched.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `T` | A table: a table block's name, or any matrix with a header row (row 1) and a key column (column 1). |
| `key` | The value to find in the key column. Text matches text exactly; a number or quantity matches by value, converting units — a key of $10\ \mathrm{minute}$ is found by $600\ \mathrm{s}$. Text and numbers never match each other. |
| `col` | Optional. Which cell of the row: a 1-based position counting the key column, or a header label as text. |

### Returns

Without `col`, the matching row as a vector, key included. With `col`, that one cell.

### Errors

| Message | When |
| :-- | :-- |
| *lookup needs a table with a header row and a key column (a matrix with rows and columns)* | `T` is not a 2-D grid |
| *No row of T has key M24 — keys: M12, M16, M20* | No key matches; the keys the table has are listed |
| *5 kg can't be compared with T's keys* | `key` is of a type that can't be compared with the keys |
| *T's columns are numbered from 1* | `col` is not a positive whole number |
| *T has only 3 columns* | `col` is beyond the last column |
| *No column of T is labelled p — columns: size, d, A_s* | No header matches `col` |
| *Say which column of T by its position (a number) or its header (a text label)* | `col` is neither a number nor text |

### Example

With this table named $T$:

| size | $d$ | $A_s$ |
| :-- | :-- | :-- |
| M12 | $12\ \mathrm{mm}$ | $84.3\ \mathrm{mm^2}$ |
| M16 | $16\ \mathrm{mm}$ | $157\ \mathrm{mm^2}$ |
| M20 | $20\ \mathrm{mm}$ | $245\ \mathrm{mm^2}$ |

$$
\begin{aligned}
\operatorname{lookup}(T,\, \text{M16}) &= \begin{bmatrix} \text{M16} & 16\ \mathrm{mm} & 157\ \mathrm{mm^2} \end{bmatrix} \\
\operatorname{lookup}(T,\, \text{M16},\, 3) &= 157\ \mathrm{mm^2} \\
\operatorname{lookup}(T,\, \text{M16},\, \text{A\_s}) &= 157\ \mathrm{mm^2}
\end{aligned}
$$

## interp

```text
interp(T, x)
interp(T, x, col)
```

Interpolates linearly down the key column at `x` and returns the value from `col` — or from the second column when `T` has exactly two columns. An exact key returns that cell unchanged. Never extrapolates.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `T` | A table whose keys are numbers or quantities, at least two rows of them, in strictly increasing or strictly decreasing order. |
| `x` | A number or quantity comparable with the keys, within their range. |
| `col` | Optional unless `T` has more than two columns. A 1-based position counting the key column, or a header label as text. The column must be numeric with no blank cells. |

### Returns

The interpolated value, carrying the column's units.

### Errors

| Message | When |
| :-- | :-- |
| *interp needs a table with a header row and a key column (a matrix with rows and columns)* | `T` is not a 2-D grid |
| *T has 3 columns — say which column: interp(T, x, col)* | More than two columns and no `col` |
| *keys of T must be numbers (or quantities with units) to interpolate* | A text key |
| *keys of T must be in increasing or decreasing order* | Jumbled or repeated keys |
| *keys of T must all share one unit* | Mixed units in the key column |
| *T needs at least two rows of keys to interpolate* | Only one data row |
| *T's column 2 holds text, which can't be interpolated* | A text cell in the chosen column |
| *T's column 2 has a blank cell* | A gap in the chosen column |
| *x = 11 is outside T's keys (0 … 10)* | `x` is out of range — no extrapolation |
| *5 kg can't be compared with T's keys* | `x` is of a type that can't be compared with the keys |
| *T's columns are numbered from 1*, *T has only 3 columns*, *No column of T is labelled p — …* | `col` problems, as for `lookup` |

### Example

$$
\begin{aligned}
\operatorname{interp}\left(\begin{bmatrix} x & y \\ 0 & 0 \\ 10 & 1 \end{bmatrix},\; 5\right) &= 0.5 \\
\operatorname{interp}\left(\begin{bmatrix} x & y \\ 0 & 0 \\ 10 & 1 \\ 20 & 5 \end{bmatrix},\; 15\right) &= 3 \\
\operatorname{interp}\left(\begin{bmatrix} x & y \\ 0 & 0 \\ 10 & 1 \end{bmatrix},\; 10\right) &= 1 \quad \text{(exact key)}
\end{aligned}
$$

On a wider table, name the column by position or header: $\operatorname{interp}(T,\, 5,\, 3)$ or $\operatorname{interp}(T,\, 5,\, \text{b})$.

## interp2

```text
interp2(T, x, y)
```

Interpolates bilinearly: `x` down the key column and `y` across the numeric header row. Each column is interpolated at `x`, then the results are interpolated across the headers at `y`. Never extrapolates on either axis.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `T` | A table whose keys are numeric, ordered and at least two, as for `interp`, and whose column headers after the key column are at least two numbers, also in order. |
| `x` | A number or quantity within the range of the keys. |
| `y` | A number or quantity within the range of the column headers. |

### Returns

The interpolated value.

### Errors

| Message | When |
| :-- | :-- |
| *interp2 needs a table with a header row and a key column (a matrix with rows and columns)* | `T` is not a 2-D grid |
| *interp2 needs numeric column headers (T's are size, d, A_s)* | A text header, or fewer than two headers after the key column |
| *keys of T must be numbers (or quantities with units) to interpolate* | A text key |
| *keys of T must be in increasing or decreasing order* | Jumbled or repeated keys |
| *column headers of T must be in increasing or decreasing order* | Jumbled or repeated headers |
| *T needs at least two rows of keys to interpolate* | Only one data row |
| *T's column 2 holds text, which can't be interpolated* / *…has a blank cell* | A text or blank cell in the body |
| *x = 2 is outside T's keys (0 … 1)* | `x` out of range — no extrapolation |
| *y = 2 is outside T's column headers (0 … 1)* | `y` out of range — no extrapolation |
| *keys of T must all share one unit* / *column headers of T must all share one unit* | Mixed units on an axis |

### Example

$$
T = \begin{bmatrix} p & 0 & 1 \\ 0 & 0 & 10 \\ 1 & 100 & 110 \end{bmatrix}
$$

$$
\begin{aligned}
\operatorname{interp2}(T,\, 0.5,\, 0.5) &= 55 \\
\operatorname{interp2}(T,\, 1,\, 0.25) &= 102.5
\end{aligned}
$$
