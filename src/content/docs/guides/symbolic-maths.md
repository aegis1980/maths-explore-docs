---
title: Symbolic maths
description: Rearrange and differentiate expressions instead of just evaluating them, with simplify, expand, derivative and solve, in both the function-call and Mathcad arrow spellings.
---

Most maths blocks produce a number. The four symbolic operations, `simplify`, `expand`, `derivative` and `solve`, produce **another expression** instead, so you can rearrange algebra, differentiate a formula, or find the roots of an equation without working them out by hand.

A symbolic result is shown after the usual $=$, as maths rather than a figure. Type `derivative(x^3 + 2x, x)` and the block reads:

$$
\operatorname{derivative}\left(x^3 + 2x,\; x\right) = 3x^2 + 2
$$

## The two rules

Nearly everything about symbolic maths follows from two rules. Both exist so that symbolic results behave like the rest of your calcsheet rather than as a separate world.

### 1. Names you have defined are substituted

Anything the sheet defines **above** the block is substituted into the expression before the operation runs: plain values as constants, and your own functions by their definitions.

So with $a := 3$ earlier on the sheet:

$$
\operatorname{derivative}\left(a \cdot x^2,\; x\right) = 6x
$$

The one exception is **the variable the operation is about**, the $x$ in `derivative(…, x)`. That one stays symbolic even if the sheet gives it a value, which is what makes the result meaningful.

### 2. The result becomes a number once nothing is unknown

While anything in the result is still unknown, the result stays an expression. As soon as every name in it is defined, it is evaluated and behaves exactly like any other numeric result.

That is why the shielded variable does not cost you anything. With $x := 5$ above the block:

$$
\operatorname{derivative}\left(x^3,\; x\right) = 75
$$

The differentiation still happens on $x^3$, giving $3x^2$ rather than the derivative of the constant $125$, and only then is $x := 5$ applied, to give $3 \times 25$.

The same block therefore changes character depending on what is defined. With only $b := 4$ on the sheet:

$$
\operatorname{derivative}\left(b \cdot y^2,\; y\right) = 8y
$$

Add $y := 3$ and the identical block reads $= 24$.

## simplify

Collects like terms and tidies an expression.

$$
\operatorname{simplify}\left(2x + 3x\right) = 5x
$$

## expand

Multiplies out brackets and powers of sums.

$$
\operatorname{expand}\left(\left(x + 1\right)^3\right) = x^3 + 3x^2 + 3x + 1
$$

## derivative

Differentiates an expression with respect to the variable you name last. The full chain rule applies:

$$
\operatorname{derivative}\left(\sin\left(x^2\right),\; x\right) = 2x\cos\left(x^2\right)
$$

### Reusing a derivative as a function

Because of rule 2, a derivative assigned to a function is a genuine, callable function: the variable is bound when you call it:

$$
\begin{aligned}
f(x) &:= x^3 + 2x \\
g(x) &:= \operatorname{derivative}\left(f(x),\; x\right) \\
g(2) &= 14
\end{aligned}
$$

This works through your own functions too, however deeply they are defined in terms of one another.

### Second derivatives

Differentiate a function that is itself a derivative, written exactly as you would expect:

$$
\begin{aligned}
f(x) &:= x^3 - 6x^2 + 9x \\
f_1(x) &:= \operatorname{derivative}\left(f(x),\; x\right) \\
f_2(x) &:= \operatorname{derivative}\left(f_1(x),\; x\right) \\
f_2(1) &= -6
\end{aligned}
$$

You can also nest the operations directly in one block, innermost first:

$$
\operatorname{simplify}\left(\operatorname{derivative}\left(x^3 + x^3,\; x\right)\right) = 6x^2
$$

## solve

Finds the roots of an equation in the variable you name last. Write it either as an expression that equals zero, or as an equation. Both give the same answer:

$$
\operatorname{solve}\left(x^2 - 4,\; x\right) \qquad \operatorname{solve}\left(x^2 = 4,\; x\right)
$$

Both return every root, as a vector, with the real roots in ascending order, $-2$ and $2$ here, so the result reads the same way each time.

:::note
`solve` handles **polynomials up to cubic** with a single remaining unknown. For anything else, such as a trigonometric equation, there is no closed form to give you, so `solve` says so and points you at `root(f, a, b)`, which finds a root numerically between two bounds you choose.
:::

## The arrow spelling

Every operation has a second spelling: Mathcad's symbolic arrow, written $\text{expression} \to \text{keyword}$. Type `->` in a maths block, or use the toolbar, and the operation goes **after** the expression:

$$
\begin{aligned}
\left(x + 1\right)^3 \to \operatorname{expand} &= x^3 + 3x^2 + 3x + 1 \\
2x + 3x \to \operatorname{simplify} &= 5x
\end{aligned}
$$

Where the operation needs a variable, it follows the keyword after a comma:

$$
\begin{aligned}
x^3 + 2x &\to \operatorname{derivative}, x &&= 3x^2 + 2 \\
x^2 - 4 &\to \operatorname{solve}, x
\end{aligned}
$$

This is only a different way of writing the same four operations, not a different feature, and both spellings behave identically. An arrow works on the right-hand side of a definition, and makes a callable function just as the function-call form does:

$$
\begin{aligned}
y &:= \left(x + 1\right)^3 \to \operatorname{expand} \\
g(x) &:= f(x) \to \operatorname{derivative}, x
\end{aligned}
$$

### A bare arrow means simplify

An arrow with no keyword after it asks for the expression to be worked out symbolically, which here means `simplify`:

$$
2x + 3x \to \;= 5x
$$

### Chaining arrows

Several arrows apply left to right, so this expands first and then simplifies the result:

$$
\left(x + 1\right)^2 \to \operatorname{expand} \to \operatorname{simplify} = x^2 + 2x + 1
$$

### What counts as an arrow

Only an arrow at the **top level** of the expression is the symbolic operator. An arrow inside brackets belongs to whatever you wrote it for and is left alone.

If you use a keyword the arrow does not recognise, the block tells you which four it does know: `simplify`, `expand`, `derivative` and `solve`.

## Inserting from the toolbar

The maths toolbar has a **Symbolics** group containing both spellings:

- **→** on its own, then **→simplify**, **→expand**, **→solve** and **→derivative** for the arrow form. Each keyword button writes the whole $\to \text{keyword}$, which also keeps the keyword upright rather than leaving it in the italic maths face.
- **derivative()**, **solve()**, **simplify()** and **expand()** for the function-call form: the spelling that nests inside another operation, and the one autosuggest offers as you type.

For **→solve** and **→derivative**, the variable is left as an empty placeholder for you to fill in.

## Switching between the two spellings

Right-click a maths block whose result is a symbolic operation and choose **Show as Arrow** or **Show as Function Call** to rewrite it the other way. Nested operations are unwrapped as it goes, so $\operatorname{simplify}(\operatorname{expand}(e))$ becomes the chain $e \to \operatorname{expand} \to \operatorname{simplify}$ rather than a half-converted mixture.

The toggle appears only when the operation is the whole expression, or the whole right-hand side of a definition. One buried inside a larger expression has no arrow spelling of its own. Switching is a normal edit: one undo step, and autosaved like any other change.

## Working with units

A name holding a value with units stays symbolic through the operation, then has its value worked back in once nothing else is unknown. The same goes for a name holding a matrix or another symbolic result: only plain numbers and your own functions are substituted into the expression itself. With `L := 3.m` on the sheet:

$$
\operatorname{derivative}\left(L \cdot x^2,\; x\right) = 2Lx
$$

Add $x := 2$ and the same block gives $= 12\ \mathrm{m}$, units and all.

## Things to know

- **A symbolic result is not a number.** If you use a name holding an expression where a number is wanted, the block tells you so, and names what the expression is still waiting to know. Define the remaining unknowns and it resolves itself.
- **Decimal places and result-unit overrides do not apply** while a result is still an expression: there is no figure to round and no value to convert. Both come back as soon as the result evaluates to a number.
- **Subscripted and Greek names are preserved** in the result, so typing `F_cy` comes back as $F_{cy}$, exactly as you typed it.
- **A definition that refers to itself**, or definitions nested more than eight deep, cannot be worked out symbolically; the block reports that rather than hanging.
- **A sheet variable named after an operation shadows it**, exactly as it does for any other built-in function.

## See also

- [Symbolic functions](/reference/symbolic-functions/): signatures, limits and messages at a glance
