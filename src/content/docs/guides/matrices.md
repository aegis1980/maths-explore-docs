---
title: Matrices
description: Write vectors and matrices in a maths block, read their elements, and do matrix arithmetic (products, transposes, inverses, determinants and lengths) with units carried through.
---

A maths block can hold a vector or a matrix as readily as a number: type one with the toolbar, name it, and the rest of the calcsheet can index it, multiply by it, and pass it to functions. Vectors and matrices are available on every plan.

## Writing a matrix

The maths toolbar has a **Matrices** group. Its first two buttons start a matrix:

- **[∷]** inserts a 2 × 2 matrix with empty cells.
- **[⋮]** inserts a two-row vector.

Fill the cells by typing, with **Tab** moving to the next cell. To change the shape, put the caret inside the matrix and use **+row**, **+col**, **−row** and **−col**, which add or remove a row or column next to the caret.

A matrix is a value like any other, so you name it the usual way:

$$
M := \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}
\qquad
v := \begin{pmatrix} 3 \\ 4 \end{pmatrix}
$$

A literal matrix definition like this shows no `= …` evaluation by default, just as a literal number doesn't. A computed one, such as $t := M^{\mathrm{T}}$, does.

You can also write a vector as a bracketed list, `[1, 2, 3]`, which is the same thing as a column.

### Vectors are columns

A matrix with one cell per row (what **[⋮]** gives you) is a **vector**: a plain list of values, shown as a column. A matrix with one *row* is different: it stays a $1 \times n$ matrix. This matters for indexing, below.

## Reading an element

Elements are read with **square brackets**, counting from 1, like SMath:

$$
\begin{aligned}
v[2] &= 4 \\
M[2, 1] &= 3
\end{aligned}
$$

Type the name, then an opening square bracket, or use the **vᵢ** and **Mᵢⱼ** buttons, which add the bracket after the name you've just typed and leave the caret on the index. The index can be any expression: with $i := 2$ and $j := 1$, $v[i] + M[j, 2]$ is $6$.

### A subscript is a name, not an index

This is the one rule worth remembering. Typing a subscript ($v_2$, $M_{12}$, $M_{1,2}$) gives you a **variable called that**, never an element. That is deliberate: Eurocode names like $N_{b,Rd}$ are everyday subscripts, and they must stay names.

So if you write $v_2$ meaning the second element of $v$, you get *Undefined symbol v_2*, and the message tells you how to write the element: `v[2]`. Rather than retyping, right-click the block and choose **Read v_2 as element of matrix v**. It respells every such subscript in the block as a bracket index in one go. The item only appears when the base really is a matrix and the subscript could be an index; a word subscript like $M_{max}$ is simply a name you haven't defined yet.

:::note
You can't assign to a single element. `v[2] := 5` reports *Assigning to one element of a matrix isn't supported — define the whole matrix instead*. The same goes for $M_{1,2} := 5$ while $M$ holds a matrix.
:::

## Arithmetic

The ordinary operators do what they do on paper:

| Written | Does | With $M$ and $v$ above |
| :-- | :-- | :-- |
| $M \cdot v$ | Matrix product | $\begin{pmatrix} 11 \\ 25 \end{pmatrix}$ |
| $v \cdot v$ | Dot product of two vectors | $25$ |
| $2 \cdot M$, $M / 2$ | Scales every element | $\begin{pmatrix} 2 & 4 \\ 6 & 8 \end{pmatrix}$, $\begin{pmatrix} 0.5 & 1 \\ 1.5 & 2 \end{pmatrix}$ |
| $M + M$, $M - 1$ | Element by element | $\begin{pmatrix} 2 & 4 \\ 6 & 8 \end{pmatrix}$, $\begin{pmatrix} 0 & 1 \\ 2 & 3 \end{pmatrix}$ |
| $M^2$ | Matrix power, $M \cdot M$ | $\begin{pmatrix} 7 & 10 \\ 15 & 22 \end{pmatrix}$ |
| $M^{-1}$ | Inverse, the **M⁻¹** button | $\begin{pmatrix} -2 & 1 \\ 1.5 & -0.5 \end{pmatrix}$ |
| $M^{\mathrm{T}}$ | Transpose, the **Mᵀ** button | $\begin{pmatrix} 1 & 3 \\ 2 & 4 \end{pmatrix}$ |

Sizes have to agree: multiplying a $2 \times 2$ by a $1 \times 3$, or adding vectors of different lengths, is reported as a dimension mismatch rather than guessed at.

:::note
**Use the Mᵀ button for a transpose.** It writes an upright T. A T you type yourself is italic, and an italic $T$ is a *variable*: $x^T$ is $x$ to the power $T$. With no $T$ defined on the sheet, $M^T$ reports *Undefined symbol T* and points you at the button.
:::

Most scalar functions don't apply to a matrix element by element (`sqrt(M)` tells you so), but `abs` does, and the statistics functions (`sum`, `mean`, `max` and the rest) take a matrix and work over every element.

## The bars

Vertical bars read as they do in a formula, and the **|M|** button writes them:

| Around | Means | Example |
| :-- | :-- | :-- |
| A square matrix | The determinant, sign and all | $\lvert M \rvert = -2$ |
| A vector | Its length | $\lvert v \rvert = 5$ |
| A number | Its absolute value | $\lvert -2.5 \rvert = 2.5$ |

A matrix that is neither square nor a vector has no bars reading, and says so.

## Matrix functions

The remaining buttons in the group, **a×b**, **a·b**, **‖v‖**, **[i⋯]** and **[⋮j]**, write `cross`, `dot`, `norm`, `row` and `column`. With `det`, `inv` and `transpose`, those are the eight matrix functions; each has a full entry on the [Matrix functions](/reference/matrix-functions/) reference page.

$$
\begin{aligned}
\operatorname{row}(M,\, 2) &= \begin{pmatrix} 3 & 4 \end{pmatrix} \\
\operatorname{column}(M,\, 2) &= \begin{pmatrix} 2 \\ 4 \end{pmatrix} \\
\operatorname{cross}\left(\begin{pmatrix} 1 \\ 0 \\ 0 \end{pmatrix},\, \begin{pmatrix} 0 \\ 1 \\ 0 \end{pmatrix}\right) &= \begin{pmatrix} 0 \\ 0 \\ 1 \end{pmatrix}
\end{aligned}
$$

One gotcha: a row or column pulled out with `row` or `column` is still two-dimensional (a $1 \times n$ or $n \times 1$ matrix, not a vector) – index it with two numbers, `r[1, 2]`.

## Units

Units work inside a matrix exactly as they do in a scalar, and carry through the arithmetic:

$$
\begin{aligned}
d &:= \begin{pmatrix} 3\ \mathrm{mm} \\ 4\ \mathrm{mm} \end{pmatrix} & \lvert d \rvert &= 5\ \mathrm{mm} \\
\begin{pmatrix} 1\ \mathrm{N} \\ 2\ \mathrm{N} \end{pmatrix} \cdot \begin{pmatrix} 1\ \mathrm{m} \\ 2\ \mathrm{m} \end{pmatrix} &= 5\ \mathrm{J} \\
\begin{pmatrix} 1\ \mathrm{m} \\ 2\ \mathrm{m} \end{pmatrix} + \begin{pmatrix} 50\ \mathrm{cm} \\ 1\ \mathrm{m} \end{pmatrix} &= \begin{pmatrix} 1.5\ \mathrm{m} \\ 3\ \mathrm{m} \end{pmatrix}
\end{aligned}
$$

The length of a vector needs every element in one kind of unit: $(3\ \mathrm{mm},\ 4\ \mathrm{kg})$ has no length, and the block says so plainly.

## How a matrix is shown

A matrix result is set out as a matrix, a vector as a column and a matrix row by row, with every element rounded to the block's decimal places.

When every element shares a unit, that unit is **factored out** and shown once after the matrix, and it becomes the block's result unit: a column of $1\ \mathrm{mm}$ and $1500\ \mathrm{mm}$ shows as $\begin{pmatrix} 1.00 \\ 1500.00 \end{pmatrix}\ \mathrm{mm}$, never as a mix of millimetres and metres, and typing `cm` in the result-unit field converts the whole column. When the elements' units differ in kind, each keeps its own and there is no unit field.

A comparison of two vectors gives a vector of true/false values, and as an assertion $v == w$ passes only when every element matches.

## Elsewhere in the app

- **The Navigate sidebar** lists every matrix-valued definition under **Matrices & Tables**, so you can jump to one.
- **A table block is a matrix.** Its name holds the whole grid, header row and key column included, indexed exactly as above: $T[2, 1]$ is the first key. See [Tables](/guides/tables/).
- **Functions take matrices.** A function you define, $g(w) := \operatorname{sum}(w)$, can be called with a matrix or a vector, literal or named.

## See also

- [Matrix functions](/reference/matrix-functions/): `column`, `cross`, `det`, `dot`, `inv`, `norm`, `row` and `transpose` at a glance
- [Tables](/guides/tables/): a grid of values read by key or by interpolation
