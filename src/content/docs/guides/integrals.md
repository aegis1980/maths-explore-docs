---
title: Integrals
description: Work out definite integrals numerically and antiderivatives as formulas, written as integrate or as the integral sign, with units carried through, running integrals, double integrals and each method's limits.
---

A load that varies along a beam. The first moment of an odd-shaped area. The work done by a force that changes with distance. Engineering is full of definite integrals, and the honest ones rarely have a tidy closed form. Maths Explore works them out numerically:

$$
\int_0^2 x^2\, dx = 2.6667
$$

A **definite integral** is the area under a curve between two limits. **Numerically** means by sampling the curve, so the answer is always a number. Leave the limits off and you get the other kind: the antiderivative, as a formula (see [Without limits: the formula](#without-limits-the-formula)).

## Two ways to write it

The integral sign and the function are the same calculation:

$$
\int_0^2 x^2\, dx = \operatorname{integrate}(x^2,\, x,\, 0,\, 2) = 2.6667
$$

- **The integral sign.** In the maths toolbar's **Symbols** group, **∫** inserts an integral with four empty boxes. The caret starts in the upper limit, and **Tab** moves on to the lower limit, then the expression, then the variable after the *d*. (Top box first is the editor's order, not a typo.)
- **The function.** Type `integrate(` and the hint above the field reads `integrate(expression, variable, a, b)`. The **Built-in functions** group has an **integrate** button too, next to **root**, the other numerical method.

In LaTeX the integral is `\int_{0}^{2} x^2 \, dx`; `\mathrm{d}x` reads the same as `dx`. The *d* and its variable are required. Leave them off and the block asks for them.

## The variable belongs to the integral

The variable after the *d* is a **dummy variable**: it exists only inside the integral. Define $x$ above the block and the integral doesn't notice; read $x$ further down and it still holds its own value.

$$
\begin{aligned}
x &:= 5 \\
\int_0^2 x^2\, dx &= 2.6667
\end{aligned}
$$

Any plain name works as the variable: $x$, $t$, $s$. That includes $t$, which elsewhere on a calcsheet is the tonne. Everything else in the expression comes from the sheet in the usual way, so values and functions defined above the block can be used inside it.

## Units

The limits can carry units, as long as both are the same kind. The result's unit is the expression's unit times the limits' unit:

$$
\begin{aligned}
w &:= 3\ \mathrm{kN/m} \\
\int_{0\ \mathrm{m}}^{2\ \mathrm{m}} w\, dx &= 6\ \mathrm{kN} \\
\int_{0\ \mathrm{m}}^{2\ \mathrm{m}} w \cdot x\, dx &= 6\ \mathrm{kN\,m}
\end{aligned}
$$

A load per metre integrated over metres is a force; the same load times its lever arm is a moment. The units do the bookkeeping.

Two things are refused rather than guessed:

- **Limits of different kinds.** `0` to `2 m` won't run, and nor will metres to seconds.
- **An expression whose units change partway**, such as an `if` with a force in one branch and a pressure in the other.

## Running integrals

Make the upper limit a function's parameter and the integral becomes a **running integral**: the total accumulated up to any point. The limits are worked out where the integral is written, so the upper limit takes whatever value the call passes in.

The shear in a beam under a triangular load, rising from zero to $w_{max}$ over the span:

$$
\begin{aligned}
L_b &:= 6\ \mathrm{m} \\
w_{max} &:= 4\ \mathrm{kN/m} \\
w(x) &:= w_{max} \cdot \frac{x}{L_b} \\
V(s) &:= \int_{0\ \mathrm{m}}^{s} w(x)\, dx \\
V(3\ \mathrm{m}) &= 3\ \mathrm{kN} \\
V(L_b) &= 12\ \mathrm{kN}
\end{aligned}
$$

## Double and triple integrals

Nest the integral signs. Each *d* pairs with an integral sign from the inside out: in $\int_0^2 \int_0^1 x^2\, dy\, dx$, the $dy$ goes with the inner $0$ to $1$ and the $dx$ with the outer $0$ to $2$.

An inner limit can depend on the outer variable, which is what makes odd shapes possible. A triangle of base $b$ and height $h$ is $b(1 - y/h)$ wide at height $y$, so its second moment of area about its base is:

$$
\begin{aligned}
b &:= 0.3\ \mathrm{m} \\
h &:= 0.6\ \mathrm{m} \\
I_{base} &:= \int_{0\ \mathrm{m}}^{h} \int_{0\ \mathrm{m}}^{b(1 - y/h)} y^2\, dx\, dy = 0.0054\ \mathrm{m^4}
\end{aligned}
$$

That is $bh^3/12$, as the tables say. (Nobody needs an integral for a triangle. The same block works for the shape the tables don't have.)

The inner integral is worked out afresh at every sample of the outer one, so a double integral costs many times what a single one does, and a triple many times more. One that gets out of hand stops with *integrate stopped: these nested integrals need too many evaluations* rather than freezing the sheet.

## Without limits: the formula

Leave the limits off and the answer is a formula instead of a number: the **antiderivative**, the function whose derivative is the expression.

$$
\int 3x^2 + 2x + 1\, dx = x^3 + x^2 + x
$$

Three spellings, one calculation, all in the maths toolbar's **Symbolics** group:

- **The integral sign without limits.** **∫dx** inserts it: the expression first, then **Tab** to the variable after the *d*.
- **The function with two arguments**, `integrate(expression, x)`. **integrate()** inserts it.
- **Mathcad's arrow**, `expression → integrate, x`, from **→integrate**.

The limits decide which you get, never what the sheet happens to define: two arguments make a formula, four a number.

It is one of the [symbolic operations](/guides/symbolic-maths/) and follows their two rules. Names defined above the block are substituted, the variable stays symbolic, and the formula becomes a number once nothing in it is unknown:

$$
\begin{aligned}
a &:= 3 \\
\int a \cdot x^2\, dx &= x^3 \\
x &:= 2 \\
\int 3x^2\, dx &= 8
\end{aligned}
$$

Mind the contrast with a definite integral, whose variable belongs to the integral. Here the formula is worked out first and then evaluated at the sheet's $x$.

### No constant of integration

There is no $+\,C$ (Mathcad leaves it off too). That keeps the formula a working function, and the difference of two calls an exact definite integral:

$$
\begin{aligned}
F(x) &:= \int x \cdot e^x\, dx \\
F(1) - F(0) &= 1
\end{aligned}
$$

Right-click the definition and **Show Evaluation** reads $x \cdot e^x - e^x$. The numerical $\int_0^1 x \cdot e^x\, dx$ agrees.

### Units

A name holding a quantity stays a name in the formula, and brings its units with it once the formula is evaluated. The area under the shear diagram of a 4 m cantilever is the change in its bending moment:

$$
\begin{aligned}
w &:= 3\ \mathrm{kN/m} \\
L_c &:= 4\ \mathrm{m} \\
V(x) &:= w \cdot (L_c - x) \\
A(x) &:= \int V(x)\, dx \\
A(L_c) - A(0\ \mathrm{m}) &= 24\ \mathrm{kN\,m}
\end{aligned}
$$

$A$ works out as $-\frac{1}{2} \cdot w \cdot x^2 + w \cdot L_c \cdot x$, so the answer is $wL^2/2$.

### Checked before it is shown

The formula comes from a computer-algebra engine, and engines can be confidently wrong. So every formula is differentiated numerically and compared with the expression at a spread of points before it is shown. One that doesn't match is refused, never displayed. (A refusal you can work around with limits; a wrong formula you might never notice.)

### What it handles

| Expression | Formula |
| :-- | :-- |
| $\frac{1}{x}$ | $\ln\lvert x\rvert$ |
| $\ln(x)$ | $-x + x \cdot \ln(x)$ |
| $\log(x)$, base 10 | $\frac{-x + x \cdot \ln(x)}{\ln(10)}$ |
| $\cos(x)^2$ | $\frac{1}{2} \cdot x + \frac{1}{4} \cdot \sin(2 \cdot x)$ |
| $\frac{1}{1 + x^2}$ | $\tan^{-1}(x)$ |
| $e^{-x^2}$ | $\frac{1}{2} \cdot \operatorname{erf}(x) \cdot \sqrt{\pi}$ |

Some answers come back with decimal coefficients, where the exact form would need the roots of a cubic. $\int \frac{1}{x^3 + x + 1}\, dx$ starts $0.367649 \cdot \tan^{-1}(0.860925 \cdot (x - 0.341164)) + \dots$ The coefficients are shown to six significant figures; the formula keeps every digit, and it passed the same check as any other.

### What it refuses

Every refusal ends by pointing at the limits, because with limits the same integral is a number, worked out numerically:

- **No formula exists in ordinary functions.** $\int x^x\, dx$ gives *integrate found no formula for this integral in x — for its value over a range, give the limits: integrate(f, x, a, b)*.
- **The formula needs a special function Maths Explore can't evaluate.** $\int \frac{\sin(x)}{x}\, dx$ is the sine integral and $\int e^{x^2}\, dx$ the imaginary error function; the message names it: *integrate's formula for this needs the sine integral Si, which Maths Explore can't evaluate — for its value over a range, give the limits: integrate(f, x, a, b)*.
- **The search takes more than a second.** *integrate gave up looking for a formula for this integral in x after 1 s* and the same pointer. $\int x^{10} \cdot e^x\, dx$ is one, despite having a perfectly good formula; the engine is just slow to find it.
- **A function with no formula form**, such as `if` or a table lookup of the variable: *integrate can't work out a formula through if(…)* and the pointer.
- **A formula that fails the check**: *integrate couldn't find a formula for this integral in x that checks out* and the pointer.

## How it works, and when not to trust it

This is about the definite integral. The method is **adaptive Gauss–Kronrod quadrature**. It samples the expression at 15 points across each panel of the range, works the panel out two ways, and keeps halving the panels where the two answers disagree, until the whole integral agrees to about one part in $10^{10}$. A smooth expression is done in a little over a hundred samples; a difficult one gets as many as it needs at the trouble spot.

- **It never samples the limits themselves**, so an expression that is infinite at a limit but still integrable there works:

  $$
  \int_0^1 \frac{1}{\sqrt{x}}\, dx = 2
  $$

- **No answer beats a wrong one.** An integral that won't settle, such as $\int_0^1 \frac{1}{x}\, dx$ (which is infinite), shows *integrate did not converge* instead of a number.
- **Jumps cost samples.** An `if` that steps partway along is handled, but the method spends several hundred samples closing in on the step. Splitting the integral at the step is quicker and exact:

  $$
  \int_0^3 \operatorname{if}(x < 1.3,\, 1,\, 4)\, dx = \int_0^{1.3} 1\, dx + \int_{1.3}^{3} 4\, dx = 8.1
  $$

- **It can't see what it never samples.** A spike narrower than the gaps between samples can be missed entirely, and then the result is simply wrong, with no error. A spike a millionth wide at $x = 0.3337$ integrates to $0$. If you know where a sharp feature is, split the range there.
- **Finite limits only.** An $\infty$ limit is refused with *integrate expects b to be a finite real number*. (No limits at all is the formula, above.)
- **Limits the wrong way round give a negative result**, as they should: $\int_2^0 x^2\, dx = -2.6667$.

The integral shows to the sheet's decimal places like any other result; the figure behind it is good to about ten significant figures.

## See also

- [integrate](/reference/functions/#integrate): parameters, messages and examples at a glance
- [Symbolic maths](/guides/symbolic-maths/): the two rules the formula follows, and the other symbolic operations
- [Using LaTeX](/advanced/using-latex/): the integral sign as LaTeX
