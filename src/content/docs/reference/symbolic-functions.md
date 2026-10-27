---
title: Symbolic functions
description: The symbolic operations simplify, expand, factor, derivative and solve, one entry each with signature, parameters, returns, errors and an example. Integrate, symbolic and numerical, is in the functions reference.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 2
---

For how these behave on a calcsheet, including the substitution rules, the arrow spelling and the toolbar, see [Symbolic maths](/guides/symbolic-maths/). The sixth, `integrate`, is a formula without limits and a number with them, so its entry is with the other functions: [integrate](/reference/functions/#integrate).

## simplify

```text
simplify(expression)
expression → simplify
expression →
```

Simplifies an expression: collects like terms, cancels factors common to a numerator and denominator, applies the trigonometric, exponential and logarithm identities, and keeps roots exact. Names the sheet defines above the block are substituted in first; the result stays an expression while anything in it is unknown, and becomes a value once nothing is.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `expression` | Any expression. Sheet-defined names in it are substituted: plain numbers as constants, your own functions by their bodies. A name holding units, a matrix or another symbolic result stays as a symbol. |

### Returns

The simplified expression, or its value once every name in it is defined. No sign is assumed for a name, so $\sqrt{x^2}$ simplifies to $\left|x\right|$, not $x$. The answer is checked numerically against the expression before it is shown; if the check fails, a plainer simplification that mostly collects like terms is shown instead.

### Errors

| Message | When |
| :-- | :-- |
| *simplify expects 1 argument: simplify(expression)* | Wrong number of arguments |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the expression refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{simplify}\left(2x + 3x\right) = 5x
$$

$$
\operatorname{simplify}\left(\frac{x^2 + 2x + 1}{x + 1}\right) = x + 1
$$

$$
\operatorname{simplify}\left(\sin^2 x + \cos^2 x\right) = 1
$$

## expand

```text
expand(expression)
expression → expand
```

Multiplies out brackets and powers of sums, and collects the terms that result. Substitution and evaluation behave as for `simplify`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `expression` | Any expression. Sheet-defined names are substituted as for `simplify`. |

### Returns

The expanded expression, or its value once every name in it is defined. The answer is checked numerically against the expression before it is shown; if the check fails, the brackets are multiplied out without collecting terms that mix two names.

### Errors

| Message | When |
| :-- | :-- |
| *expand expects 1 argument: expand(expression)* | Wrong number of arguments |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the expression refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{expand}\left(\left(x + 1\right)^3\right) = x^3 + 3x^2 + 3x + 1
$$

$$
\operatorname{expand}\left(\left(x + y\right)\left(x - y\right)\right) = x^2 - y^2
$$

## factor

```text
factor(expression)
expression → factor
```

Factorises a polynomial over the rational numbers: a common factor is taken out, a repeated factor is gathered into a power, and a factor with no real roots is kept as a quadratic. Substitution and evaluation behave as for `simplify`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `expression` | A polynomial. Sheet-defined names are substituted as for `simplify`. |

### Returns

The factorised expression, or its value once every name in it is defined. A leading coefficient is taken out in front, so $6x^2 - x - 2$ gives $6\left(x - \tfrac{2}{3}\right)\left(x + \tfrac{1}{2}\right)$. A polynomial with no factors over the rationals, such as $x^2 - 2$, is returned unfactored, as is anything that is not a polynomial. In more than one variable only a difference of two squares, a perfect square and a numeric common factor are found. A fraction is not factorised; `simplify` cancels its common factors instead. The answer is checked numerically against the expression before it is shown; if the check fails, the expression is returned as written.

### Errors

| Message | When |
| :-- | :-- |
| *factor expects 1 argument: factor(expression)* | Wrong number of arguments |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the expression refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{factor}\left(x^2 - 4\right) = \left(x - 2\right)\left(x + 2\right)
$$

$$
\operatorname{factor}\left(x^4 + 4\right) = \left(x^2 - 2x + 2\right)\left(x^2 + 2x + 2\right)
$$

$$
\operatorname{factor}\left(x^3 + 3x^2 + 3x + 1\right) = \left(x + 1\right)^3
$$

## derivative

```text
derivative(expression, variable)
expression → derivative, variable
```

Differentiates `expression` with respect to `variable`, applying the chain rule. The variable is shielded from substitution, staying symbolic even when the sheet defines it, and its definition, if any, is applied to the result afterwards.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `expression` | Any expression. Sheet-defined names are substituted as for `simplify`, except `variable`. |
| `variable` | A plain name. Shielded from substitution. |

### Returns

The derivative as an expression, or its value once nothing in it is unknown. Assigned to a function, $g(x) := \operatorname{derivative}(f(x),\, x)$, the result is a genuinely callable function.

### Errors

| Message | When |
| :-- | :-- |
| *derivative expects 2 arguments: derivative(expression, variable)* | Wrong number of arguments |
| *derivative expects a variable name as its last argument, as in derivative(expression, x)* | The last argument is not a plain name, or the toolbar's placeholder is still empty |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the expression refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{derivative}\left(\sin\left(x^2\right),\; x\right) = 2x\cos\left(x^2\right)
$$

With $x := 5$ defined above the block, the variable is still differentiated symbolically and the definition applied afterwards:

$$
\operatorname{derivative}\left(x^3,\; x\right) = 75
$$

## solve

```text
solve(equation, variable)
expression → solve, variable
```

Finds every root of a polynomial equation in `variable`. The equation may be written as an equation ($x^2 = 4$) or as an expression taken as equal to zero ($x^2 - 4$).

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `equation` | A polynomial in `variable` of degree 1, 2 or 3, with no other unknown left once sheet-defined names are substituted. |
| `variable` | A plain name. Shielded from substitution. |

### Returns

A vector of every root: the real roots in ascending order, followed by any complex roots.

### Errors

| Message | When |
| :-- | :-- |
| *solve expects 2 arguments: solve(equation, variable)* | Wrong number of arguments |
| *solve expects a variable name as its last argument, as in solve(expression, x)* | The last argument is not a plain name, or the toolbar's placeholder is still empty |
| *solve has no closed form for this equation in x — to find a root numerically over a bracket, use root(f, a, b)* | Not a polynomial of degree 1–3 |
| *solve can only work out x when it is the only unknown left* | Another unknown remains after substitution |
| *solve found no root for x* | The equation has no root |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the equation refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{solve}\left(x^2 - 4,\; x\right) = \begin{bmatrix} -2 & 2 \end{bmatrix}
$$

$\operatorname{solve}\left(x^2 = 4,\; x\right)$ gives the same result.
