---
title: Matrix functions
description: The functions that work on vectors and matrices — column, cross, det, dot, inv, norm, row and transpose — one entry each with signature, parameters, returns, errors and an example.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 2
---

The functions that work on vectors and matrices, one entry each. The table functions, which read a matrix as a table, are on [Table functions](/reference/table-functions/); everything else is on [Built-in functions](/reference/functions/).

## column

```text
column(M, j)
```

One column of a matrix, counting from 1.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `M` | A matrix with rows and columns. A table block's name works too — see [Tables](/guides/tables/). |
| `j` | The column number, from 1. |

### Returns

The column, as an $n \times 1$ matrix.

### Errors

| Message | When |
| :-- | :-- |
| *Only two dimensional matrix is supported* | `M` is a plain list rather than a matrix with rows and columns |
| *Index out of range* | `j` is below 1 or past the last column |
| *Index must be an integer* | `j` isn't a whole number |

### Example

$$
\operatorname{column}\left(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix},\, 2\right) = \begin{bmatrix} 2 \\ 4 \end{bmatrix}
$$

## cross

```text
cross(a, b)
```

The cross product of two three-dimensional vectors.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a` | A vector of exactly three elements. |
| `b` | A vector of exactly three elements. |

### Returns

The vector $a \times b$.

### Errors

| Message | When |
| :-- | :-- |
| *Vectors with length 3 expected* | Either vector doesn't have three elements |
| *Too few arguments in function cross* / *Too many arguments in function cross* | Not exactly two arguments |

### Example

$$
\operatorname{cross}\left(\begin{bmatrix} 1 & 2 & 3 \end{bmatrix},\, \begin{bmatrix} 4 & 5 & 6 \end{bmatrix}\right) = \begin{bmatrix} -3 & 6 & -3 \end{bmatrix}
$$

## det

```text
det(M)
```

The determinant of a square matrix. The bars `|M|` around a square matrix mean the same thing.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `M` | A square matrix. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Matrix must be square* | `M` isn't square, or is a plain list |
| *Too few arguments in function det* / *Too many arguments in function det* | Not exactly one argument |

### Example

$$
\begin{aligned}
\det\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} &= -2 \\
\det\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 10 \end{bmatrix} &= -3
\end{aligned}
$$

## dot

```text
dot(a, b)
```

The dot product of two vectors of the same length. Units multiply through.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a` | A vector — a plain list or a column matrix. |
| `b` | A vector of the same length. |

### Returns

A number, or a quantity whose units are the product of the two vectors' units.

### Errors

| Message | When |
| :-- | :-- |
| *Vectors must have equal length* | The two vectors differ in length |
| *Too few arguments in function dot* / *Too many arguments in function dot* | Not exactly two arguments |

### Example

$$
\begin{aligned}
\operatorname{dot}\left(\begin{bmatrix} 1 & 2 & 3 \end{bmatrix},\, \begin{bmatrix} 4 & 5 & 6 \end{bmatrix}\right) &= 32 \\
\operatorname{dot}\left(\begin{bmatrix} 1\ \mathrm{m} & 2\ \mathrm{m} \end{bmatrix},\, \begin{bmatrix} 3\ \mathrm{N} & 4\ \mathrm{N} \end{bmatrix}\right) &= 11\ \mathrm{J}
\end{aligned}
$$

## inv

```text
inv(M)
```

The inverse of a square matrix. Of a plain number, its reciprocal.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `M` | A square, non-singular matrix, or a number. |

### Returns

The inverse matrix, or $1/x$ for a number.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate inverse, determinant is zero* | `M` is singular |
| *Matrix must be square* | `M` isn't square |
| *Too few arguments in function inv* / *Too many arguments in function inv* | Not exactly one argument |

### Example

$$
\operatorname{inv}\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} -2 & 1 \\ 1.5 & -0.5 \end{bmatrix}
$$

## norm

```text
norm(v)
norm(v, p)
norm(M)
```

The length of a vector — the everyday case — including a vector of quantities, as long as they share a unit. Of a matrix, the Frobenius norm; of a number, its magnitude. The bars `|v|` around a vector mean the same thing, and also accept a column written as a matrix, which `norm` itself does not.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `v` | A vector written as a plain list, of numbers or of quantities with one unit. |
| `p` | Optional. The kind of norm: `2` (default, Euclidean), `1` (sum of magnitudes), `Infinity` (largest magnitude), or `'fro'`. |
| `M` | A matrix with rows and columns. |

### Returns

The length, in the unit of the first element; a number for plain values.

### Errors

| Message | When |
| :-- | :-- |
| *The length of a vector needs every element in the same unit* | Some elements carry a unit and others don't, or the units differ in kind |
| *Invalid matrix dimensions* | A column vector written as an $n \times 1$ matrix — use the bars, or a plain list |
| *Too few arguments in function norm* / *Too many arguments in function norm* | No argument, or more than two |

### Example

$$
\begin{aligned}
\operatorname{norm}\left(\begin{bmatrix} 3 & 4 \end{bmatrix}\right) &= 5 \\
\operatorname{norm}\left(\begin{bmatrix} 3\ \mathrm{mm} & 4\ \mathrm{cm} \end{bmatrix}\right) &= 40.1123\ \mathrm{mm} \\
\operatorname{norm}\left(\begin{bmatrix} 1 & 2 & 3 \end{bmatrix},\, \infty\right) &= 3
\end{aligned}
$$

## row

```text
row(M, i)
```

One row of a matrix, counting from 1.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `M` | A matrix with rows and columns. A table block's name works too — see [Tables](/guides/tables/). |
| `i` | The row number, from 1. |

### Returns

The row, as a $1 \times n$ matrix.

### Errors

| Message | When |
| :-- | :-- |
| *Only two dimensional matrix is supported* | `M` is a plain list rather than a matrix with rows and columns |
| *Index out of range* | `i` is below 1 or past the last row |
| *Index must be an integer* | `i` isn't a whole number |

### Example

$$
\operatorname{row}\left(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix},\, 2\right) = \begin{bmatrix} 3 & 4 \end{bmatrix}
$$

## transpose

```text
transpose(M)
```

Swaps a matrix's rows and columns. The toolbar's $M^\mathrm{T}$ is the same function. A plain list has no second dimension, so it comes back unchanged; write a column as a matrix to transpose it into a row.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `M` | A matrix. |

### Returns

The transposed matrix.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function transpose* / *Too many arguments in function transpose* | Not exactly one argument |

### Example

$$
\operatorname{transpose}\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} = \begin{bmatrix} 1 & 3 \\ 2 & 4 \end{bmatrix}
$$
