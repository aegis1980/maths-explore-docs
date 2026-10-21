---
title: Symbolic functions
description: The four symbolic operations (simplify, expand, derivative and solve), one entry each with signature, parameters, returns, errors and an example.
tableOfContents:
  minHeadingLevel: 2
  maxHeadingLevel: 2
---

For how these behave on a calcsheet, including the substitution rules, the arrow spelling and the toolbar, see [Symbolic maths](/guides/symbolic-maths/).

## simplify

```text
simplify(expression)
expression → simplify
expression →
```

Collects like terms and tidies an expression. Names the sheet defines above the block are substituted in first; the result stays an expression while anything in it is unknown, and becomes a value once nothing is.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `expression` | Any expression. Sheet-defined names in it are substituted: plain numbers as constants, your own functions by their bodies. A name holding units, a matrix or another symbolic result stays as a symbol. |

### Returns

The simplified expression, or its value once every name in it is defined.

### Errors

| Message | When |
| :-- | :-- |
| *simplify expects 1 argument: simplify(expression)* | Wrong number of arguments |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the expression refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{simplify}\left(2x + 3x\right) = 5x
$$

## expand

```text
expand(expression)
expression → expand
```

Multiplies out brackets and powers of sums. Substitution and evaluation behave as for `simplify`.

### Parameters

| Parameter | Meaning |
| :-- | :-- |
| `expression` | Any expression. Sheet-defined names are substituted as for `simplify`. |

### Returns

The expanded expression, or its value once every name in it is defined.

### Errors

| Message | When |
| :-- | :-- |
| *expand expects 1 argument: expand(expression)* | Wrong number of arguments |
| *A definition used here refers to itself, so it cannot be worked out symbolically* | A function in the expression refers to itself, or definitions nest more than eight deep |

### Example

$$
\operatorname{expand}\left(\left(x + 1\right)^3\right) = x^3 + 3x^2 + 3x + 1
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
