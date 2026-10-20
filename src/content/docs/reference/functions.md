---
title: Built-in functions
description: Every built-in function of a maths block — arithmetic, rounding, logarithms, trigonometry, statistics, if and root — one entry each with signature, parameters, returns, errors and an example.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 2
---

One entry per function, in the order autosuggest lists them. Matrix and vector functions, the symbolic operations and the table functions have pages of their own — [Matrix functions](/reference/matrix-functions/), [Symbolic functions](/reference/symbolic-functions/) and [Table functions](/reference/table-functions/) — and the [guides](/guides/getting-started/) cover units, angles and how results are shown.

## abs

```text
abs(x)
```

The absolute value of a number or quantity. On a matrix it applies to every element. The bars `|x|` are a different reading — the length of a vector or the determinant of a square matrix — see [Matrix functions](/reference/matrix-functions/).

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number, a quantity with units, or a matrix. |

### Returns

The magnitude, keeping the units; for a matrix, a matrix of magnitudes.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function abs* / *Too many arguments in function abs* | Not exactly one argument |
| *Unexpected type of argument in function abs* | The argument isn't numeric |

### Example

$$
\begin{aligned}
\operatorname{abs}(-3\ \mathrm{m}) &= 3\ \mathrm{m} \\
\operatorname{abs}\left(\begin{bmatrix} -1 & 2 & -3 \end{bmatrix}\right) &= \begin{bmatrix} 1 & 2 & 3 \end{bmatrix}
\end{aligned}
$$

## acos

```text
acos(x)
```

The inverse cosine. Returns an angle in radians as a plain number; set the block's result unit to `deg` to show it in degrees.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Outside $-1 \ldots 1$ the result is complex. |

### Returns

The angle in radians, as a number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function acos* / *Too many arguments in function acos* | Not exactly one argument |
| *Unexpected type of argument in function acos* | The argument carries units or isn't numeric |

### Example

$$
\operatorname{acos}(0.5) = 1.0472
$$

## acosh

```text
acosh(x)
```

The inverse hyperbolic cosine.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Below $1$ the result is complex. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function acosh* / *Too many arguments in function acosh* | Not exactly one argument |
| *Unexpected type of argument in function acosh* | The argument carries units or isn't numeric |

### Example

$$
\operatorname{acosh}(1) = 0
$$

## asin

```text
asin(x)
```

The inverse sine. Returns an angle in radians as a plain number; set the block's result unit to `deg` to show it in degrees.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Outside $-1 \ldots 1$ the result is complex. |

### Returns

The angle in radians, as a number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function asin* / *Too many arguments in function asin* | Not exactly one argument |
| *Unexpected type of argument in function asin* | The argument carries units or isn't numeric |

### Example

$$
\operatorname{asin}(0.5) = 0.5236
$$

With the block's result unit set to `deg`, the same value shows as $30°$.

## asinh

```text
asinh(x)
```

The inverse hyperbolic sine.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function asinh* / *Too many arguments in function asinh* | Not exactly one argument |
| *Unexpected type of argument in function asinh* | The argument carries units or isn't numeric |

### Example

$$
\operatorname{asinh}(1) = 0.8814
$$

## atan

```text
atan(x)
```

The inverse tangent. Returns an angle in radians as a plain number; set the block's result unit to `deg` to show it in degrees. For a full-circle angle from two coordinates, use `atan2`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |

### Returns

The angle in radians, between $-\pi/2$ and $\pi/2$.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function atan* / *Too many arguments in function atan* | Not exactly one argument |
| *Unexpected type of argument in function atan* | The argument carries units or isn't numeric |

### Example

$$
\operatorname{atan}(1) = 0.7854
$$

## atan2

```text
atan2(y, x)
```

The angle of the point $(x, y)$ from the positive $x$-axis, in the correct quadrant. Note the argument order: $y$ first.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `y` | A number without units. |
| `x` | A number without units. |

### Returns

The angle in radians, between $-\pi$ and $\pi$, as a number; set the block's result unit to `deg` to show it in degrees.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function atan2* / *Too many arguments in function atan2* | Not exactly two arguments |
| *Unexpected type of argument in function atan2* | An argument carries units or isn't numeric |

### Example

$$
\begin{aligned}
\operatorname{atan2}(1,\, 1) &= 0.7854 \\
\operatorname{atan2}(-1,\, -1) &= -2.3562
\end{aligned}
$$

## atanh

```text
atanh(x)
```

The inverse hyperbolic tangent.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Outside $-1 \ldots 1$ the result is complex. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function atanh* / *Too many arguments in function atanh* | Not exactly one argument |
| *Unexpected type of argument in function atanh* | The argument carries units or isn't numeric |

### Example

$$
\operatorname{atanh}(0.5) = 0.5493
$$

## ceil

```text
ceil(x)
ceil(x, unit)
```

Rounds up, towards $+\infty$. A quantity with units must say which unit to round in.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number, or a quantity with units. |
| `unit` | Required when `x` has units: the unit to round in, as a bare unit such as `cm`. |

### Returns

The rounded value; for a quantity, in the unit named.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function ceil* | A quantity with units but no unit to round in |
| *Too many arguments in function ceil* | Too many arguments |
| *Unexpected type of argument in function ceil* | The argument isn't numeric |

### Example

$$
\begin{aligned}
\operatorname{ceil}(2.1) &= 3 \\
\operatorname{ceil}(-2.1) &= -2 \\
\operatorname{ceil}(3.241\ \mathrm{cm},\, \mathrm{cm}) &= 4\ \mathrm{cm}
\end{aligned}
$$

## cos

```text
cos(x)
```

The cosine. A plain number is taken as radians; write the angle with a unit — `60.deg` — to work in degrees.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | An angle: a plain number in radians, or a quantity in `deg` or `rad`. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unit in function cot is no angle* | The argument carries a unit that isn't an angle (the message names `cot` whichever trig function was used) |
| *Too few arguments in function cos* / *Too many arguments in function cos* | Not exactly one argument |

### Example

$$
\begin{aligned}
\cos(60°) &= 0.5 \\
\cos(\pi) &= -1
\end{aligned}
$$

## cosh

```text
cosh(x)
```

The hyperbolic cosine.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function cosh* / *Too many arguments in function cosh* | Not exactly one argument |
| *Unexpected type of argument in function cosh* | The argument carries units or isn't numeric |

### Example

$$
\cosh(0) = 1
$$

## cot

```text
cot(x)
```

The cotangent, $1 / \tan x$. A plain number is taken as radians.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | An angle: a plain number in radians, or a quantity in `deg` or `rad`. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unit in function cot is no angle* | The argument carries a unit that isn't an angle |
| *Too few arguments in function cot* / *Too many arguments in function cot* | Not exactly one argument |

### Example

$$
\cot(45°) = 1
$$

## csc

```text
csc(x)
```

The cosecant, $1 / \sin x$. A plain number is taken as radians.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | An angle: a plain number in radians, or a quantity in `deg` or `rad`. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unit in function cot is no angle* | The argument carries a unit that isn't an angle (the message names `cot` whichever trig function was used) |
| *Too few arguments in function csc* / *Too many arguments in function csc* | Not exactly one argument |

### Example

$$
\csc(90°) = 1
$$

## exp

```text
exp(x)
```

$e$ raised to the power $x$. Writing `e^x` is the same thing.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unexpected type of argument in function exp* | The argument carries units |
| *Cannot convert "…" to a number* | The argument is text |
| *Too few arguments in function exp* / *Too many arguments in function exp* | Not exactly one argument |

### Example

$$
\begin{aligned}
\exp(1) &= 2.7183 \\
\exp(0) &= 1
\end{aligned}
$$

## floor

```text
floor(x)
floor(x, unit)
```

Rounds down, towards $-\infty$. A quantity with units must say which unit to round in.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number, or a quantity with units. |
| `unit` | Required when `x` has units: the unit to round in, as a bare unit such as `m`. |

### Returns

The rounded value; for a quantity, in the unit named.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function floor* | A quantity with units but no unit to round in |
| *Too many arguments in function floor* | Too many arguments |
| *Unexpected type of argument in function floor* | The argument isn't numeric |

### Example

$$
\begin{aligned}
\operatorname{floor}(2.9) &= 2 \\
\operatorname{floor}(-2.9) &= -3 \\
\operatorname{floor}(3.7\ \mathrm{m},\, \mathrm{m}) &= 3\ \mathrm{m}
\end{aligned}
$$

## if

```text
if(condition, then, else)
```

A conditional value. Only the branch that is taken is evaluated, so an error in the other branch does no harm — `if(x > 0, 1/x, 0)` is safe at $x = 0$. Comparisons of text compare the text; a comparison of two matrices is true when every element matches.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `condition` | Anything that is true or false: a comparison such as `a > b`, comparisons joined with `and`, `or`, `not`, or a number — zero is false, anything else true. |
| `then` | The value when the condition holds. |
| `else` | The value otherwise. |

### Returns

Whichever of `then` or `else` applies, evaluated.

### Errors

| Message | When |
| :-- | :-- |
| *if expects 3 arguments: if(condition, then, else)* | Not exactly three arguments |

### Example

$$
\begin{aligned}
\operatorname{if}(3 > 2,\, 10,\, 20) &= 10 \\
\operatorname{if}(3 < 2,\, 10,\, 20) &= 20
\end{aligned}
$$

## ln

```text
ln(x)
```

The natural logarithm, base $e$. The `\ln` command and the typed letters are the same function. For base 10 use `log`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Zero gives $-\infty$; a negative number gives a complex result. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function log* | The argument carries units (the message names `log`, which `ln` is built on) |
| *Too few arguments in function ln* / *Too many arguments in function ln* | Not exactly one argument |

### Example

$$
\begin{aligned}
\ln(10) &= 2.3026 \\
\ln(e) &= 1
\end{aligned}
$$

## log

```text
log(x)
log(x, base)
```

The logarithm. With one argument it is **base 10**, as on paper and in Mathcad — not the natural log. With two arguments it is the log of `x` to `base`. The `\log` command is the same function; for the natural log use `ln`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Zero gives $-\infty$; a negative number gives a complex result. |
| `base` | Optional. The base; 10 when omitted. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function log* | The argument carries units |
| *Too many arguments in function log* | More than two arguments |

### Example

$$
\begin{aligned}
\log(100) &= 2 \\
\log(8,\, 2) &= 3
\end{aligned}
$$

## log10

```text
log10(x)
```

The base-10 logarithm, written out. Identical to one-argument `log`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. Zero gives $-\infty$; a negative number gives a complex result. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unexpected type of argument in function log10* | The argument carries units or isn't numeric |
| *Too few arguments in function log10* / *Too many arguments in function log10* | Not exactly one argument |

### Example

$$
\operatorname{log10}(1000) = 3
$$

## max

```text
max(a, b, c, …)
max(A)
max(A, dimension)
```

The largest of several values, or of all the values in a matrix. Quantities are compared after converting units, and the winner keeps the unit it was written in. On a matrix, `dimension` gives the maximum of each column (1) or of each row (2) instead.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | Two or more values to compare. All numbers, or all quantities of one kind. |
| `A` | A list or matrix of values. |
| `dimension` | Optional. `1` for the maximum down each column, `2` along each row. |

### Returns

The largest value — or, with `dimension`, a vector of them.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate max, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |
| *Cannot calculate max of an empty array* | An empty list |

### Example

$$
\begin{aligned}
\max(1,\, 5,\, 3) &= 5 \\
\max(2\ \mathrm{m},\, 300\ \mathrm{cm}) &= 300\ \mathrm{cm} \\
\max\left(\begin{bmatrix} 1 & 5 \\ 3 & 2 \end{bmatrix},\, 1\right) &= \begin{bmatrix} 3 & 5 \end{bmatrix}
\end{aligned}
$$

## mean

```text
mean(a, b, c, …)
mean(A)
mean(A, dimension)
```

The arithmetic mean. Quantities are converted to one unit first. On a matrix, `dimension` gives the mean of each column (1) or of each row (2) instead.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. All numbers, or all quantities of one kind. |
| `A` | A list or matrix of values. |
| `dimension` | Optional. `1` for the mean down each column, `2` along each row. |

### Returns

The mean, in the unit of the first value.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate the mean of an empty array* | An empty list |
| *Cannot calculate mean, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |

### Example

$$
\begin{aligned}
\operatorname{mean}(1,\, 2,\, 3,\, 4) &= 2.5 \\
\operatorname{mean}\left(\begin{bmatrix} 2\ \mathrm{m} & 4\ \mathrm{m} \end{bmatrix}\right) &= 3\ \mathrm{m}
\end{aligned}
$$

## median

```text
median(a, b, c, …)
median(A)
```

The middle value once the values are sorted; the average of the two middle values when there is an even number of them.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. All numbers, or all quantities of one kind. |
| `A` | A list or matrix of values — every element counts. |

### Returns

The median.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate median of an empty array* | An empty list |
| *Cannot calculate median, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |

### Example

$$
\begin{aligned}
\operatorname{median}(3,\, 1,\, 2) &= 2 \\
\operatorname{median}\left(\begin{bmatrix} 4 & 1 & 3 & 2 \end{bmatrix}\right) &= 2.5
\end{aligned}
$$

## min

```text
min(a, b, c, …)
min(A)
min(A, dimension)
```

The smallest of several values, or of all the values in a matrix. Quantities are compared after converting units, and the winner keeps the unit it was written in. On a matrix, `dimension` gives the minimum of each column (1) or of each row (2) instead.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | Two or more values to compare. All numbers, or all quantities of one kind. |
| `A` | A list or matrix of values. |
| `dimension` | Optional. `1` for the minimum down each column, `2` along each row. |

### Returns

The smallest value — or, with `dimension`, a vector of them.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate min, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |
| *Cannot calculate min of an empty array* | An empty list |

### Example

$$
\begin{aligned}
\min(1,\, 5,\, 3) &= 1 \\
\min\left(\begin{bmatrix} 4\ \mathrm{kg} & 500\ \mathrm{g} \end{bmatrix}\right) &= 500\ \mathrm{g}
\end{aligned}
$$

## mod

```text
mod(x, y)
```

The remainder of $x / y$. The result takes the sign of `y`, so `mod(-7, 3)` is $2$, not $-1$. A divisor of zero returns `x` unchanged.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |
| `y` | A number without units. |

### Returns

A number with the sign of `y`.

### Errors

| Message | When |
| :-- | :-- |
| *Unexpected type of argument in function mod* | An argument carries units or isn't numeric |
| *Too few arguments in function mod* / *Too many arguments in function mod* | Not exactly two arguments |

### Example

$$
\begin{aligned}
\operatorname{mod}(7,\, 3) &= 1 \\
\operatorname{mod}(-7,\, 3) &= 2
\end{aligned}
$$

## mode

```text
mode(a, b, c, …)
mode(A)
```

The most frequent value. The result is always a vector, because there may be several — and when every value occurs equally often, all of them are returned.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. |
| `A` | A list or matrix of values. |

### Returns

A vector of the most frequent values.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function mode* | No arguments |

### Example

$$
\begin{aligned}
\operatorname{mode}\left(\begin{bmatrix} 1 & 2 & 2 & 3 \end{bmatrix}\right) &= \begin{bmatrix} 2 \end{bmatrix} \\
\operatorname{mode}\left(\begin{bmatrix} 1 & 1 & 2 & 2 \end{bmatrix}\right) &= \begin{bmatrix} 1 & 2 \end{bmatrix}
\end{aligned}
$$

## prod

```text
prod(a, b, c, …)
prod(A)
```

The product of all the values. Units multiply through.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. |
| `A` | A list or matrix of values — every element counts. |

### Returns

The product, with the product of the units.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate prod of an empty array* | An empty list |
| *Too few arguments in function prod* | No arguments |

### Example

$$
\begin{aligned}
\operatorname{prod}(2,\, 3,\, 4) &= 24 \\
\operatorname{prod}\left(\begin{bmatrix} 2\ \mathrm{m} & 3\ \mathrm{m} \end{bmatrix}\right) &= 6\ \mathrm{m^2}
\end{aligned}
$$

## random

```text
random()
random(max)
random(min, max)
random(size)
random(size, max)
random(size, min, max)
```

A random number, uniformly distributed. The sheet re-evaluates whenever anything changes, so the value changes too — it is not fixed once drawn.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `max` | Optional. Upper limit, excluded; `1` when omitted. |
| `min` | Optional. Lower limit, included; `0` when omitted. |
| `size` | Optional. A list such as `[2, 3]` giving the rows and columns of a matrix to fill. |

### Returns

A number $\ge$ `min` and $<$ `max`, or a matrix of them.

### Errors

| Message | When |
| :-- | :-- |
| *Too many arguments in function random* | Three arguments where the first isn't a size |

### Example

$$
\operatorname{random}(5,\, 6) = 5.4713 \quad \text{(a different value each evaluation, always } 5 \le x < 6 \text{)}
$$

## root

```text
root(f, a, b)
```

A numerical root of $f(x) = 0$ between `a` and `b`, found by Brent's method. The bracket must straddle the root — $f(a)$ and $f(b)$ of opposite sign — and the root is returned in the bracket's units. This is the fallback `solve` points you at when an equation has no closed form.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `f` | A function of one variable, defined above — `f(x) := …` — and passed by name. Its value only matters by sign, so it may carry units. |
| `a` | One end of the bracket. A number, or a quantity. |
| `b` | The other end, in the same units as `a`. |

### Returns

The root, as a number or in the bracket's units. If an end of the bracket is itself a root, that end is returned.

### Errors

| Message | When |
| :-- | :-- |
| *root(f, a, b) needs a sign change: f(a) and f(b) have the same sign, so no root is bracketed* | The bracket doesn't straddle a root |
| *root expects its first argument to be a function, as in root(f, a, b)* | `f` isn't a function |
| *root expects a and b to share the same units* | One end has units and the other doesn't, or they differ in kind |
| *root expects a to be a real number* / *root expects b to be a real number* | An end isn't numeric |
| *root expects f(x) to return a finite real value across the bracket* | `f` gives infinity or an error somewhere in the bracket |
| *root(f, a, b) did not converge within 128 iterations* | No root found within the iteration cap |

### Example

$$
\begin{aligned}
f(x) &:= x^2 - 2 \\
\operatorname{root}(f,\, 0,\, 2) &= 1.4142
\end{aligned}
$$

$$
\begin{aligned}
f(x) &:= \cos(x) - x \\
\operatorname{root}(f,\, 0,\, 1) &= 0.7391
\end{aligned}
$$

$$
\begin{aligned}
g(d) &:= d - 3\ \mathrm{mm} \\
\operatorname{root}(g,\, 1\ \mathrm{mm},\, 5\ \mathrm{mm}) &= 3\ \mathrm{mm}
\end{aligned}
$$

## round

```text
round(x)
round(x, n)
round(x, unit)
round(x, n, unit)
```

Rounds to the nearest whole number, or to `n` decimal places. Halves round away from zero. A quantity with units must say which unit to round in.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number, or a quantity with units. |
| `n` | Optional. Decimal places, a whole number from 0 to 15. |
| `unit` | Required when `x` has units: the unit to round in, as a bare unit such as `cm`. |

### Returns

The rounded value; for a quantity, in the unit named.

### Errors

| Message | When |
| :-- | :-- |
| *Number of decimals in function round must be an integer from 0 to 15 inclusive* | `n` is negative, fractional or too large |
| *Too few arguments in function round* | A quantity with units but no unit to round in |
| *Too many arguments in function round* | Too many arguments |

### Example

$$
\begin{aligned}
\operatorname{round}(2.567,\, 2) &= 2.57 \\
\operatorname{round}(2.5) &= 3 \\
\operatorname{round}(2.5\ \mathrm{m},\, 1,\, \mathrm{cm}) &= 250\ \mathrm{cm}
\end{aligned}
$$

## sec

```text
sec(x)
```

The secant, $1 / \cos x$. A plain number is taken as radians.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | An angle: a plain number in radians, or a quantity in `deg` or `rad`. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unit in function cot is no angle* | The argument carries a unit that isn't an angle (the message names `cot` whichever trig function was used) |
| *Too few arguments in function sec* / *Too many arguments in function sec* | Not exactly one argument |

### Example

$$
\sec(0) = 1
$$

## sin

```text
sin(x)
```

The sine. A plain number is taken as **radians**; write the angle with a unit — `30.deg` — to work in degrees.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | An angle: a plain number in radians, or a quantity in `deg` or `rad`. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Unit in function cot is no angle* | The argument carries a unit that isn't an angle (the message names `cot` whichever trig function was used) |
| *Too few arguments in function sin* / *Too many arguments in function sin* | Not exactly one argument |

### Example

$$
\begin{aligned}
\sin(30°) &= 0.5 \\
\sin(\pi / 6) &= 0.5 \\
\sin(90) &= 0.8940 \quad \text{(90 radians, not degrees)}
\end{aligned}
$$

## sinh

```text
sinh(x)
```

The hyperbolic sine.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |

### Returns

A number.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function sinh* / *Too many arguments in function sinh* | Not exactly one argument |
| *Unexpected type of argument in function sinh* | The argument carries units or isn't numeric |

### Example

$$
\sinh(1) = 1.1752
$$

## sqrt

```text
sqrt(x)
```

The square root. The toolbar's radical and the `\sqrt` command are the same function. Units come through: $\sqrt{4\ \mathrm{m^2}} = 2\ \mathrm{m}$.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number or a quantity. A negative number gives a complex result, not an error. |

### Returns

The principal square root, with the square root of the units.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function sqrt* / *Too many arguments in function sqrt* | Not exactly one argument |
| *Unexpected type of argument in function sqrt* | The argument isn't numeric |

### Example

$$
\begin{aligned}
\sqrt{16} &= 4 \\
\sqrt{4\ \mathrm{m^2}} &= 2\ \mathrm{m} \\
\sqrt{-4} &= 2i
\end{aligned}
$$

## std

```text
std(a, b, c, …)
std(A)
std(A, normalization)
```

The standard deviation — by default the sample standard deviation, dividing by $n - 1$. Quantities keep their unit.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. |
| `A` | A list or matrix of values — every element counts. |
| `normalization` | Optional, as text: `"unbiased"` (default, divide by $n-1$), `"uncorrected"` (divide by $n$) or `"biased"` (divide by $n+1$). |

### Returns

The standard deviation, in the values' unit.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate variance of an empty array* | An empty list |
| *Cannot calculate std, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |

### Example

$$
\begin{aligned}
\operatorname{std}\left(\begin{bmatrix} 2 & 4 & 4 & 4 & 5 & 5 & 7 & 9 \end{bmatrix}\right) &= 2.1381 \\
\operatorname{std}\left(\begin{bmatrix} 2 & 4 & 4 & 4 & 5 & 5 & 7 & 9 \end{bmatrix},\, \text{"uncorrected"}\right) &= 2 \\
\operatorname{std}\left(\begin{bmatrix} 2\ \mathrm{m} & 4\ \mathrm{m} \end{bmatrix}\right) &= 1.4142\ \mathrm{m}
\end{aligned}
$$

## sum

```text
sum(a, b, c, …)
sum(A)
sum(A, dimension)
```

The total of all the values. Quantities are converted to one unit first. On a matrix, `dimension` gives the total of each column (1) or of each row (2) instead. An empty list sums to zero.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. All numbers, or all quantities of one kind. |
| `A` | A list or matrix of values. |
| `dimension` | Optional. `1` for the total down each column, `2` along each row. |

### Returns

The total, in the unit of the first value.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate sum, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |

### Example

$$
\begin{aligned}
\operatorname{sum}(1,\, 2,\, 3) &= 6 \\
\operatorname{sum}\left(\begin{bmatrix} 1\ \mathrm{m} & 2\ \mathrm{m} & 50\ \mathrm{cm} \end{bmatrix}\right) &= 3.5\ \mathrm{m} \\
\operatorname{sum}\left(\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix},\, 2\right) &= \begin{bmatrix} 3 & 7 \end{bmatrix}
\end{aligned}
$$

## tan

```text
tan(x)
```

The tangent. A plain number is taken as radians; write the angle with a unit — `45.deg` — to work in degrees.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | An angle: a plain number in radians, or a quantity in `deg` or `rad`. |

### Returns

A number. At $90°$ the result is a very large number rather than an error.

### Errors

| Message | When |
| :-- | :-- |
| *Unit in function cot is no angle* | The argument carries a unit that isn't an angle (the message names `cot` whichever trig function was used) |
| *Too few arguments in function tan* / *Too many arguments in function tan* | Not exactly one argument |

### Example

$$
\tan(45°) = 1
$$

## tanh

```text
tanh(x)
```

The hyperbolic tangent.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `x` | A number without units. |

### Returns

A number between $-1$ and $1$.

### Errors

| Message | When |
| :-- | :-- |
| *Too few arguments in function tanh* / *Too many arguments in function tanh* | Not exactly one argument |
| *Unexpected type of argument in function tanh* | The argument carries units or isn't numeric |

### Example

$$
\tanh(1) = 0.7616
$$

## variance

```text
variance(a, b, c, …)
variance(A)
variance(A, normalization)
```

The variance — by default the sample variance, dividing by $n - 1$. For quantities the unit is squared.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `a, b, c, …` | The values. |
| `A` | A list or matrix of values — every element counts. |
| `normalization` | Optional, as text: `"unbiased"` (default, divide by $n-1$), `"uncorrected"` (divide by $n$) or `"biased"` (divide by $n+1$). |

### Returns

The variance, in the values' unit squared.

### Errors

| Message | When |
| :-- | :-- |
| *Cannot calculate variance of an empty array* | An empty list |
| *Cannot calculate variance, unexpected type of argument* | A plain number is mixed with a quantity, or the values aren't numeric |

### Example

$$
\begin{aligned}
\operatorname{variance}\left(\begin{bmatrix} 1 & 2 & 3 & 4 \end{bmatrix}\right) &= 1.6667 \\
\operatorname{variance}\left(\begin{bmatrix} 1 & 2 & 3 & 4 \end{bmatrix},\, \text{"uncorrected"}\right) &= 1.25 \\
\operatorname{variance}\left(\begin{bmatrix} 2\ \mathrm{m} & 4\ \mathrm{m} \end{bmatrix}\right) &= 2\ \mathrm{m^2}
\end{aligned}
$$
