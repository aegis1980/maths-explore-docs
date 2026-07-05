## Sidebar activity bar and extension tabs [all] -> guides/sidebar (guides)
AREA: Sidebar extensions and tier gating
SUMMARY: The right-hand sidebar has a built-in Navigate tab plus one tab per active extension (Library, Physical constants, Mathew AI nerd), in a fixed order. Users switch tabs via the icon activity bar and can drag-resize the sidebar (450-650px).
ANCHORS: client/src/components/WorksheetSidebar.jsx, client/src/extensions/registry.js, client/src/extensions/ExtensionsProvider.jsx, docs/extensions.md
NOTES: Tabs appear/disappear live: disabling an extension or a plan downgrade removes its tab mid-session and the sidebar falls back to Navigate; re-enabling restores the last-viewed tab. Navigate is core (not an extension) and is always present. Mathew's tab has a pulse-glow icon (iconClassName sidebar-tab-mathew).

## Manage extensions (per-account on/off toggles) [all] -> guides/managing-extensions (guides)
AREA: Sidebar extensions and tier gating
SUMMARY: A gear button at the bottom of the sidebar activity bar opens the Manage extensions dialog, where users switch each sidebar extension on or off. Choices are saved to the account and follow the user across devices.
ANCHORS: client/src/components/ManageExtensionsModal.jsx, client/src/extensions/resolve.js, client/src/extensions/registry.js, client/src/App.jsx, client/src/hooks/useUserPreferences.js, docs/extensions.md
NOTES: The dialog lists the whole catalogue: extensions the plan allows get a toggle switch; paid-only ones a free user can't access appear with a 'Paid' badge and a locked 'Upgrade' button instead. Persistence is the disabled set (GET/PUT /api/auth/extension-settings, users.extension_settings), so newly shipped extensions are ON by default. The dialog shows a live save status line (saving / saved to your account / couldn't save).

## Library extension (saved variables, functions and snippets) [paid] -> guides/library (guides)
AREA: Sidebar extensions and tier gating
SUMMARY: Paid users can save definitions and multi-block snippets to personal libraries and reuse them in any worksheet: browse by library, fuzzy-search, and one-click insert (at the blue beacon or bottom of content). Right-click an item for Insert / Rename / add to another library / remove / Delete.
ANCHORS: client/src/extensions/library.jsx, client/src/components/LibraryPanel.jsx, client/src/components/LibrarySaveModalRoot.jsx, client/src/components/WorksheetSidebar.jsx, client/src/components/CanvasSheet.jsx, backend/app/api/routes/libraries.py, docs/extensions.md
NOTES: requiresPaid: true — free users don't get the tab at all; the two save entry points ('Save Snippet' on the canvas selection toolbar, 'Save to Library…' on a Navigate-tab definition's right-click menu) show an upgrade prompt instead. Items are grouped Variables / User Functions / Snippets; items with no library membership display under the default 'General' library. Panel links to a full 'Manage libraries' page at /libraries. Backend gates ALL library endpoints with require_paid_user: a downgraded user loses access but data is retained until re-subscribe.

## Physical constants extension [paid] -> guides/physical-constants (guides)
AREA: Sidebar extensions and tier gating
SUMMARY: A read-only, app-curated library of physical constants: browse by category, fuzzy-search, and insert one as an editable definition block (name := value units). While the extension is on, constants also work ambiently — formulas can use c, k_B, etc. with no definition block on the sheet, and they appear in math autosuggest while typing.
ANCHORS: client/src/extensions/physicalConstants.jsx, client/src/components/PhysicalConstantsPanel.jsx, client/src/hooks/useBuiltinLibraries.js, backend/app/libraries/builtin.py, backend/app/api/routes/libraries.py, docs/extensions.md
NOTES: requiresPaid: true, and the /api/libraries/builtin endpoint is also require_paid_user server-side. Ambient values are overridable defaults: a user's own definition of the same name wins because blocks evaluate after the seeded scope. Disabling the extension (or downgrading) removes the ambient scope and autosuggest entries immediately. Constants are static app data (backend/app/libraries/builtin_constants.json); users cannot rename/delete them — the panel is explicitly labelled Read-only. Inserts land at the blue beacon if set, else the default bottom-of-content point.

## Mathew AI extension (sidebar surface and free-tier availability) [all] -> guides/mathew (guides)
AREA: Sidebar extensions and tier gating
SUMMARY: Mathew ('Mathew AI nerd' tab) turns a natural-language prompt into worksheet blocks: type a prompt, review a pre-flight cost estimate in your local currency, hit Proceed, and blocks are inserted directly onto the sheet with a summary plus Undo / Next prompt. The panel shows remaining AI credit with a Top up link, a model picker (when multiple models are offered), and a Stop button during generation.
ANCHORS: client/src/extensions/mathew.jsx, client/src/components/MathewPanel.jsx, client/src/utils/tierLimits.js, docs/extensions.md
NOTES: The only extension available on the free tier (no requiresPaid). Free-tier worksheets are block-limited: the panel shows remaining block headroom, refuses to estimate at the limit, and clamps oversized generations with an upgrade notice. CAUTION for doc writers: client/src/utils/tierLimits.js currently sets FREE_TIER_BLOCK_LIMIT = 3 while its own comment and the panel fallback text say 30 — verify the real limit before publishing a number. Stopping a generation still charges for tokens used (credit refreshes after the backend settles). Switching model while an estimate is shown re-prices the estimate. Internal-only: the estimate/Proceed step can be skipped via build flag VITE_MATHEW_SHOW_ESTIMATE=false — not user-controllable, don't document. Deeper Mathew mechanics (credits, models, dialect) overlap with the AI/billing survey area.

## Extension availability by plan (tier gating) [all] -> reference/extensions-by-plan (reference)
AREA: Sidebar extensions and tier gating
SUMMARY: Which sidebar extensions a user gets is plan-derived: free accounts get Mathew only; paid plans (Individual/Teams) additionally get Library and Physical constants. Within that ceiling, each user can still switch any extension off in Manage extensions.
ANCHORS: client/src/extensions/resolve.js, client/src/extensions/registry.js, client/src/utils/tierLimits.js, client/src/components/ManageExtensionsModal.jsx, docs/extensions.md
NOTES: Good fit for a compact reference table (extension x plan x default state). Active set = tier ceiling (requiresPaid filter) minus the user's disabled ids; changes apply live in-session on upgrade/downgrade or toggle. Paid-only extensions are still listed (locked, with Upgrade) for free users so they're discoverable. isPaid means any tier other than 'free' (tierLimits.js isPaidTier).

## Variable assignments (:= and =) [all] -> guides/writing-math (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Define a variable by typing `name := value` (pressing the `:` key auto-inserts `:=`); a single `=` also assigns. Subscripted names (F_{cy} -> F_cy), multi-letter names (pythagoras), Greek letters (alpha), and accented variables (x-hat -> xhat, x-bar, x-vec, x-dot, x-tilde) all become single identifiers.
ANCHORS: client/src/utils/latexToMathjs.js, client/src/utils/cleanLatex.js, client/src/utils/mathDefinitions.js, client/src/components/MathBlock.jsx
NOTES: Key gotcha to document: a single `=` ASSIGNS, it does not check equality (equality checks need `==`). Names must match [A-Za-z_][A-Za-z0-9_]* after translation. \mathrm/\text styling is stripped and has no meaning. `!=` typed as ASCII is understood (rewritten to \ne internally).

## Expression evaluation and inline results (= display) [all] -> guides/writing-math (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Any plain expression block shows its computed result inline as `= value`; variable definitions with a computed right-hand side also show their result. Results can be hidden/shown per block (context menu) or by the worksheet defaults 'Show variable evaluations' / 'Show expression evaluations'.
ANCHORS: client/src/utils/mathDefinitions.js, client/src/utils/evaluateBlocks.js, client/src/utils/worksheetOptions.js
NOTES: Default visibility logic: function definitions never show a result; simple literal variable definitions (x := 3, x := 3.mm) hide the result by default; computed ones (x := 3+4) show it when 'showVariableEvaluations' is on. A per-block override always wins; blocks with errors always show. Booleans render as true/false.

## Function definitions f(x) := ... [all] -> guides/functions (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Define reusable functions with `f(x) := expression` (multiple comma-separated parameters allowed) and call them from any later block. Typing `#` in an empty math block inserts a function-definition template.
ANCHORS: client/src/utils/mathDefinitions.js, client/src/utils/functionDefinitions.js, client/src/utils/latexToMathjs.js, client/src/utils/evaluateBlocks.js, client/src/components/MathBlock.jsx
NOTES: Function definition blocks never display a result. A stored leading `#` is the internal function-shortcut/description marker (parseFunctionShortcut turns `#name(expr)` into a definition) — users mostly meet `#` as the template shortcut key. Parameter names shadow sheet variables inside the body.

## Convert expression to function [all] -> guides/functions (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: A variable definition whose right-hand side computes from other sheet variables (e.g. `A := b*h`) can be converted into a function in one action; the free variables become the parameters. A warning modal appears if other blocks read the name as a value.
ANCHORS: client/src/utils/definitionKind.js, client/src/utils/evaluateBlocks.js, client/src/App.jsx, client/src/components/ConfirmConvertFunctionModal.jsx
NOTES: Only offered when the definition is classified as an 'expression' (computed RHS) with at least one free variable — pure literals like `x := 3 + 4` or unit values like `x := 3.mm` cannot be converted. Unit attachment (3*mm, m/s^2, integer unit powers) counts as a literal value, not a computation.

## Assertions / checks (==, !=, <, >, <=, >=) [all] -> guides/assertions (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: A block containing a comparison (e.g. `sigma <= f_y`) evaluates as a pass/fail check against current values and renders a passed/failed state instead of a numeric result. Use `==` for equality checks (a single `=` would assign).
ANCHORS: client/src/utils/mathDefinitions.js, client/src/utils/evaluateBlocks.js, client/src/utils/latexToMathjs.js
NOTES: assertionPassed is strictly `value === true`. `!=` works (typed ASCII or \ne). Comparisons inside parentheses/function arguments are not treated as block-level assertions.

## Units: attaching with the dot separator (2.mm, N.m) [all] -> guides/units (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Attach units to numbers with a dot: `2.mm`, `9.81.m/s^2`, and multiply units together the same way: `N.m`, `kN.m`. The dot between a value and a letter means 'times the unit'; a dot between digits stays a decimal point (3.14). Ordinary `*` and mathjs unit syntax also work.
ANCHORS: client/src/utils/latexToMathjs.js, client/src/utils/formatResult.js, client/src/utils/evaluateBlocks.js
NOTES: The `.` is normalised to `*` before parsing (latexToMathjs preprocessLatex and formatResult normalizeUnitSeparators). Unit arithmetic, conversion, and dimensional checking are mathjs's unit system. Big documented gotcha: defining a variable named like a unit symbol shadows the unit for the whole sheet (`m := 12` breaks the metre) — use subscripts (m_1) instead.

## Unit recovery (full unit names and unit-like words) [all] -> guides/units (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: If an expression fails to evaluate, the app retries treating bare words as units: full names and plurals are recognised (`3 metres` -> 3 m, `5 newtons` -> 5 N), and a number adjacent to a known unit token is read as a quantity.
ANCHORS: client/src/utils/evaluateBlocks.js, client/src/utils/mathFieldHighlighting.js
NOTES: tryUnitRecovery runs only on evaluation error, using UNIT_FULL_NAMES aliases (case-insensitive, pluralised, punctuation-stripped). Recognised unit tokens are highlighted (blue italic) while typing. Behaviour worth a doc note: recovery is best-effort — if the retried parse also fails, the original error is shown.

## Result display unit override (per-block unit field) [all] -> guides/units (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Each math block with a unit result has an editable unit field after the result: type a target unit (e.g. `kN.m`, `MPa`) and the displayed value converts to it. An incompatible unit shows a conversion error.
ANCHORS: client/src/components/MathBlock.jsx, client/src/utils/formatResult.js
NOTES: The dot separator works here too (N.m); the field renders separators as a center dot. Stored as block.resultUnit; conversion errors surface as resultUnitError without breaking the calculation.

## Units environment (worksheet option) [all] -> guides/units (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: A worksheet-level 'units environment' re-prioritises which unit results display in when no per-block unit is set — e.g. Structural shows a force-times-length result as N·m / kN·m / MN·m instead of joules, picking the prefix that keeps the magnitude under 1000.
ANCHORS: client/src/utils/unitEnvironments.js, client/src/utils/formatResult.js, client/src/utils/worksheetOptions.js
NOTES: PARTIALLY BUILT: only SI (default, mathjs behaviour) and Structural (N·m and N/m families) do anything today; US Customary, Electrical, and Thermal appear in the option list but have empty unit sets — document only SI and Structural, or flag the rest as coming soon.

## Supported units reference [all] -> reference/units (reference)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: All mathjs units plus their metric prefixes are accepted (length, area, volume, mass, time, force, pressure/stress, energy, power, temperature, electrical, light, angle, amount, data, speed), with engineering symbols like kN, MPa, ksi, kip, psi, N·m recognised and syntax-highlighted.
ANCHORS: client/src/utils/mathFieldHighlighting.js
NOTES: UNIT_NAMES is generated from mathjs Unit.UNITS x prefixes; UNIT_FULL_NAMES is the curated ~190-entry table (symbol -> full name) that also powers full-name recovery. A reference page can be generated from UNIT_FULL_NAMES grouped by its category comments.

## Mathematical constants (pi, e, Euler gamma, phi, Catalan, i) [all] -> reference/constants (reference)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Standard constants typed as symbols resolve to their mathjs values: \pi -> pi, e, \gamma -> gamma (Euler-Mascheroni), golden ratio -> phi, Catalan constant -> catalan, imaginary unit i, machine epsilon eps.
ANCHORS: client/src/utils/latexToMathjs.js
NOTES: Only these well-known constants are folded during LaTeX translation (CONSTANTS map); other Greek letters stay as ordinary variable names (alpha, beta...). Constants are never merged into identifier runs, so `2pi r` stays 2*pi*r.

## Ambient physical constants (Physical Constants extension) [paid] -> reference/constants (reference)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: With the Physical Constants sidebar extension active, curated physical constants (c, k_B, etc., with units) resolve in formulas without any definition block on the sheet, appear in autosuggest, and can be inserted as blocks from the panel.
ANCHORS: client/src/extensions/physicalConstants.jsx, client/src/utils/ambientConstants.js, client/src/utils/evaluateBlocks.js
NOTES: requiresPaid: true — free users get neither the tab nor the ambient scope. Ambient constants are overridable defaults: a user's own `c := ...` wins. Constant list comes from the backend /api/libraries/builtin.

## Built-in functions (trig, logs, rounding, etc.) [all] -> reference/functions (reference)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Standard functions work in LaTeX or plain form: sin/cos/tan/cot/sec/csc and inverses, sinh-family, ln (\ln -> natural log), log10, log2, exp, sqrt, nth roots (\sqrt[n]{}), abs, floor, ceil, round, sign, max, min, gcd, lcm, factorial, plus the wider mathjs library (mean, median, mod, random, atan2...).
ANCHORS: client/src/utils/latexToMathjs.js, client/src/utils/mathFieldHighlighting.js
NOTES: \ln maps to mathjs `log` (natural), \lg -> log10, \lb -> log2. Built-in function names are syntax-highlighted green, user-defined functions purple. Anything mathjs exposes will evaluate even if not in the highlight list.

## Conditionals: if(condition, then, else) with logical operators [all] -> guides/conditionals (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: A Mathcad/SMath-style `if(condition, then, else)` evaluates lazily — only the taken branch runs, so an error in the untaken branch is harmless. Conditions can combine comparisons with and/or/not/xor (\land, \lor, or the ∧ ∨ symbols).
ANCHORS: client/src/utils/mathEngine.js, client/src/utils/latexToMathjs.js
NOTES: Compound conditions: the translator auto-parenthesises each comparison around \land/\lor (so `x>0 ∧ x<10` works), but docs should still recommend writing `(x>0) and (x<10)` explicitly. if() requires exactly 3 arguments.

## Decimal places (worksheet default and per-block override) [all] -> guides/formatting-results (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Results are rounded to a configurable number of decimal places: a worksheet-wide default (4) set in Worksheet Options, overridable per block. Accepted range is 0-10; plain numbers get locale thousands separators, unit results use fixed notation.
ANCHORS: client/src/utils/formatResult.js, client/src/utils/evaluateBlocks.js, client/src/utils/worksheetOptions.js
NOTES: Non-integer/out-of-range settings fall back to 4; values are clamped to 0-10. Plain numbers use maximumFractionDigits (trailing zeros dropped); unit quantities use fixed precision.

## Cross-block variables: shared scope and evaluation order [all] -> guides/variables-and-scope (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: All math blocks on the worksheet share one scope: define a variable or function in one block and use it in any block evaluated later. Blocks evaluate in reading order — top to bottom, then left to right (by y, then x position), across all pages.
ANCHORS: client/src/utils/evaluateBlocks.js, client/src/utils/blockSort.js
NOTES: Redefining a name later in reading order overwrites it from that point on (last write wins during the pass). Moving a block changes its evaluation order. Errors in one block don't stop later blocks. This page is also the right home for the unit-shadowing warning (m := 12 vs metres).

## Rename a variable or function across the sheet [all] -> guides/renaming (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Rename a defined variable or function from its block and every reference across the worksheet updates, with a preview showing how many references in how many blocks will change. For a variable defined more than once, choose 'this definition only' (renames uses up to the next redefinition) or all.
ANCHORS: client/src/utils/mathRename.js, client/src/components/RenameDefinitionModal.jsx, client/src/App.jsx
NOTES: Validation: letters/digits/underscores, starting with a letter or underscore. Conflict warnings when the new name is already a variable, function, function parameter, or appears in existing math. Function renames only touch call sites (name followed by parentheses); blocks where the name is shadowed by a function parameter are left alone. Renaming is undoable.

## Rename function parameters [all] -> guides/renaming (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: Rename the parameters of a function definition in place; occurrences inside that definition's body update, and any parameter descriptions attached to the function's description block are re-keyed to the new names.
ANCHORS: client/src/utils/mathRename.js, client/src/components/RenameFunctionParametersModal.jsx, client/src/utils/functionDefinitions.js
NOTES: Scoped to the single definition block only — other blocks are untouched since parameters are local.

## Math-field typing shortcuts [all] -> guides/writing-math (guides)
AREA: Math language (syntax users type in math blocks): assignments, functions, assertions, units, constants, formatting, scope, rename
SUMMARY: In a math block: pressing `:` inserts the assignment operator `:=`; pressing `#` in an empty block inserts a function-definition template; starting with `'` converts the block to a text block; Enter finishes the block and creates the next math block below.
ANCHORS: client/src/components/MathBlock.jsx
NOTES: An emptied math block is removed on blur. Recognised tokens are colour-coded while typing: built-in functions green, user functions purple, units blue italic (mathFieldHighlighting.js).

## Paginated canvas and pages [all] -> guides/pages-and-layout (guides)
AREA: Canvas and block UX
SUMMARY: The worksheet is a vertical stack of fixed-size pages (A4 or US Letter) on a zoomable canvas; pages grow automatically as content extends downward, and a '+' button below the sheet adds a blank page manually. A footer status bar shows page count, paper size, math/text block counts, spell-check language, and unit system.
ANCHORS: client/src/components/CanvasSheet.jsx, client/src/utils/pageLayout.js, client/src/components/WorksheetFooter.jsx, client/src/App.jsx
NOTES: Paper sizes are exactly two: A4 (794x1123px) and US Letter (816x1056px), chosen in Worksheet Options. Trailing blank pages added manually are auto-trimmed by Reflow/whitespace-collapse down to what content needs. The Add Page button is hidden in template-edit mode (templates are single-page).

## Placing blocks with the insertion beacon [all] -> guides/adding-blocks (guides)
AREA: Canvas and block UX
SUMMARY: Clicking empty page space drops a blue insertion beacon with a floating toolbar offering Math, Diagram, Text, Function, and (page) Break block types at that point. Keyboard-first creation at the beacon: typing any character starts a math block seeded with that character, Enter creates an empty math block, apostrophe (') a text block, hash (#) a function template, Escape dismisses, and Delete closes up a block's worth of whitespace below the beacon.
ANCHORS: client/src/components/CanvasSheet.jsx, client/src/components/BeaconToolbar.jsx, client/src/hooks/useBlocks.js
NOTES: The beacon toolbar fades after 5s of mouse inactivity and returns on movement. Pasting while the beacon is active inserts at the beacon (blocks payload, image -> diagram block, plain text -> text block). With a strict template editable area, clicks in the non-editable margins do not place a beacon. Empty math/text/diagram blocks are auto-pruned when a new block is added.

## Block types overview [all] -> reference/block-types (reference)
AREA: Canvas and block UX
SUMMARY: Five block types live on the canvas: math (LaTeX evaluated live), text (Markdown with numbered headings), diagram (vector drawing/image canvas), description (an annotation anchored to a math block), and page-break. All blocks are absolutely positioned rectangles you can select, move, and delete.
ANCHORS: client/src/hooks/useBlocks.js, client/src/components/BlockItem.jsx
NOTES: New math blocks start at 180x42px, diagrams at 360x240, text at minimum width (auto-grows with content). Heights are auto-measured from rendered content, and a block that grows taller pushes overlapping blocks below it down.

## Math block (canvas behaviour) [all] -> guides/math-blocks (guides)
AREA: Canvas and block UX
SUMMARY: The core block: a MathLive equation editor whose LaTeX is evaluated with mathjs and whose result renders inline. Typing a digit followed by a unit name auto-inserts a multiply (30kN reads as 30*kN), and Enter creates the next math block directly below the current one.
ANCHORS: client/src/components/MathBlock.jsx, client/src/components/BlockItem.jsx, client/src/App.jsx
NOTES: Deep math syntax/evaluation belongs to the math-engine area; document here only canvas-level behaviour: Enter-to-chain (2px gap), autosuggest for defined variables/functions/units, per-block Show/Hide Evaluation and Decimal Rounding (0-10 places) via right-click, and the raw-LaTeX fallback input if the math editor crashes.

## Text block [all] -> guides/text-blocks (guides)
AREA: Canvas and block UX
SUMMARY: A Markdown text block: headings, formatting via the text format toolbar, spell check with suggestions, and worksheet-property tokens (title, author, page number, etc.) that resolve to live values. Heading numbers run continuously across all text blocks in reading order, and the block's width can be dragged while height auto-sizes to content.
ANCHORS: client/src/components/TextBlock.jsx, client/src/components/CanvasSheet.jsx, client/src/components/BlockItem.jsx
NOTES: Text width is capped at the space between the block's x position and the right page edge. Text theme and heading colour come from Worksheet Options (worksheet-wide). Spell-check language follows the browser locale (shown in the footer).

## Diagram block [all] -> guides/diagram-blocks (guides)
AREA: Canvas and block UX
SUMMARY: A drawing canvas block with vector tools (line, rectangle, oval, polyline, scribble), image insertion (file or clipboard paste), per-object stroke colour (5 swatches) and line weight (1-12), object selection with copy/cut/paste/delete, bring-to-front/send-to-back, and drag-resize of the whole block.
ANCHORS: client/src/components/DiagramBlock.jsx, client/src/components/BlockItem.jsx
NOTES: Resize grips scale the drawing contents by default; holding Shift crops the canvas instead (cursor changes). An empty diagram block is auto-removed on blur. Image objects cannot be styled (no stroke). A DiagramToolbar (top chrome) drives the same tools. Diagram blocks can be marked as a template's 'editable area' when authoring templates.

## Description blocks anchored to math [all] -> guides/descriptions (guides)
AREA: Canvas and block UX
SUMMARY: Right-click a math block and choose Show Description to attach a rich-text annotation that stays glued to the block: it sits above, left, or right of its math block (arrow buttons on the description switch position) and follows the block whenever it moves. Descriptions can be hidden without losing their text, and deleting the math block removes its description.
ANCHORS: client/src/hooks/useBlocks.js, client/src/components/DescriptionBlock.jsx, client/src/components/BlockItem.jsx, client/src/App.jsx
NOTES: Position falls back automatically (e.g. requested left -> right -> top) if the description would overlap the block or run off the page. Descriptions cannot be dragged independently. Supports Ctrl+B/Ctrl+I formatting; an emptied description auto-deletes on blur. For function definitions, a Detailed Description mode adds per-parameter descriptions edited in a dedicated modal (also reachable from the Navigate sidebar); only detailed mode prints parameter entries. One description per math block.

## Page break block [all] -> reference/block-types (reference)
AREA: Canvas and block UX
SUMMARY: A page-break block forces everything below it on a page onto the next page; the area beneath the break renders hatched. Drop it via the beacon toolbar's Break button and drag it vertically to reposition.
ANCHORS: client/src/components/PageBreakBlock.jsx, client/src/hooks/useBlocks.js, client/src/components/CanvasSheet.jsx, client/src/utils/pageLayout.js
NOTES: Only one page break per page: adding a second on the same page moves the existing one instead; drags that would land on a page that already has one are ignored. Page breaks are always full-width (fixed x/width) and only move vertically. Not available in template-edit mode.

## Moving blocks and collision pushing [all] -> guides/arranging-blocks (guides)
AREA: Canvas and block UX
SUMMARY: Drag any block (except descriptions) by its edge to move it; dragging a selected block moves the whole selection together, clamped to the page (and to the template's editable area if strict). On drop, overlapping blocks are pushed downward chain-style with a 12px margin so nothing ever overlaps.
ANCHORS: client/src/hooks/useDragBlock.js, client/src/utils/collision.js, client/src/hooks/useBlocks.js, client/src/App.jsx, client/src/components/BlockItem.jsx
NOTES: Collision push works in rendered space, so pushed blocks respect page breaks. A multi-selection containing a page break drags vertically only. The push happens on drag end, not during the drag.

## Selection: click, marquee, and the selection toolbar [all] -> guides/selecting-blocks (guides)
AREA: Canvas and block UX
SUMMARY: Click a block to select it; Shift/Ctrl-click to add or remove from the selection; drag on empty space to marquee-select every intersecting block; Ctrl+A selects all. With 2+ blocks selected a floating toolbar appears with Align Left, Copy, Cut, Paste, Delete, Group/Ungroup, and (with the Library extension) Save Snippet.
ANCHORS: client/src/components/CanvasSheet.jsx, client/src/App.jsx, client/src/hooks/useKeyboardShortcuts.js
NOTES: Selecting one member of a group selects the whole group. Align Left snaps all selected blocks to the leftmost selected edge. Save Snippet appears only when the Library extension is active (paid tier).

## Grouping blocks [all] -> guides/selecting-blocks (guides)
AREA: Canvas and block UX
SUMMARY: Select two or more blocks and click Group to make them a unit: clicking any member selects the whole group and they move together. Ungroup is available from the selection toolbar or a grouped block's right-click menu.
ANCHORS: client/src/App.jsx, client/src/components/CanvasSheet.jsx, client/src/components/BlockItem.jsx

## Copy, cut, and paste blocks [all] -> guides/copy-paste (guides)
AREA: Canvas and block UX
SUMMARY: Copy/cut selected blocks with Ctrl+C/Ctrl+X (or the selection toolbar / right-click menu) and paste with Ctrl+V, a block's right-click Paste Blocks, or the page right-click menu. Pasting a clipboard image creates a diagram block and pasting plain text creates a text block; block payloads paste as full blocks offset from the target point.
ANCHORS: client/src/components/CanvasSheet.jsx, client/src/components/BlockItem.jsx, client/src/hooks/useKeyboardShortcuts.js, client/src/App.jsx
NOTES: Keyboard paste targets 24px below the selection, or the viewport centre when nothing is selected. Right-clicking empty page space opens a Paste / Select All menu. Paste is all-or-nothing against the free-tier block limit.

## Block right-click context menu [all] -> reference/context-menus (reference)
AREA: Canvas and block UX
SUMMARY: Right-clicking a block opens a context menu: Copy/Cut/Paste/Delete Block(s), Ungroup, Show/Hide Description, Show/Hide Evaluation, Rename Variable/Function, Rename Local Parameters, Convert to User Function, Detailed Description (on descriptions of functions), and per-block Decimal Rounding (0-10).
ANCHORS: client/src/components/BlockItem.jsx
NOTES: Menu entries are contextual: rename options appear only on definition blocks, Convert to User Function only on expression blocks with free variables (flag set during evaluation), decimal rounding only on math blocks. Acting on a selected block applies the action to the whole selection.

## Undo and redo [all] -> guides/undo-redo (guides)
AREA: Canvas and block UX
SUMMARY: Every mutating action (add/move/edit/delete blocks, options, name, background changes) is undoable via Ctrl+Z and redoable via Ctrl+Y or Ctrl+Shift+Z, with header toolbar buttons too. History holds up to 100 snapshots covering blocks, selection, page count, worksheet name, options, and properties.
ANCHORS: client/src/hooks/useHistory.js, client/src/App.jsx, client/src/hooks/useKeyboardShortcuts.js
NOTES: History is snapshot-based and cleared when a worksheet is loaded/opened. Shortcuts are suppressed while typing in an input, math field, or contenteditable.

## Zoom controls [all] -> guides/zoom-and-view (guides)
AREA: Canvas and block UX
SUMMARY: Zoom from 25% to 250% in 20% steps: footer buttons (zoom in/out, 100% reset, Fit Width, Fit Page), Ctrl+scroll wheel, and Ctrl+= / Ctrl+- / Ctrl+0 keyboard shortcuts (numpad included).
ANCHORS: client/src/App.jsx, client/src/hooks/useKeyboardShortcuts.js, client/src/components/WorksheetFooter.jsx

## Reflow and whitespace collapse [all] -> guides/arranging-blocks (guides)
AREA: Canvas and block UX
SUMMARY: The footer's Reflow button tidies the whole sheet in one click: closes oversized vertical gaps, separates overlaps, flows blocks that straddle a page foot onto the next page, and trims freed-up blank trailing pages. Pressing Delete at an insertion beacon closes up one row (50px) of whitespace below that point, pulling blocks up.
ANCHORS: client/src/components/WorksheetFooter.jsx, client/src/App.jsx, client/src/hooks/useBlocks.js, client/src/utils/collision.js
NOTES: Repeated Delete presses at the beacon keep closing the gap. Reflow respects a template's editable area when one is applied.

## Navigate sidebar tab [all] -> guides/navigate-sidebar (guides)
AREA: Canvas and block UX
SUMMARY: The built-in Navigate tab lists everything defined on the sheet in five collapsible sections — Calcsheet headings (with continuous numbering), Variables, Expressions, User Functions (with parameter lists), and Assertions (with pass/fail status). Clicking an item scrolls to and selects its block; a '+' button inserts a variable/expression/function reference into the currently active math block; right-click offers Go to Block, Rename Variable/Function, Rename Local Parameters, Edit Function Description, and Save to Library.
ANCHORS: client/src/components/WorksheetSidebar.jsx, client/src/utils/worksheetNavigation.js, client/src/App.jsx
NOTES: The sidebar is resizable (450-650px). Variables vs Expressions is display-only: literal-value definitions vs computed ones; both rename/insert like variables. Duplicate names get a '(1)' suffix. Extension tabs (Mathew, Library) follow Navigate in the activity bar; Save to Library only appears with the Library extension active (paid). The gear icon opens Manage Extensions.

## Free-tier block limit [free] -> reference/plan-limits (reference)
AREA: Canvas and block UX
SUMMARY: On the free plan, a worksheet holds a limited number of counted blocks (math, text, diagram — page breaks and descriptions don't count). Hitting the limit shows a banner with a 'See plans' upgrade link; adds and pastes beyond the cap are refused (paste is all-or-nothing).
ANCHORS: client/src/utils/tierLimits.js, client/src/App.jsx
NOTES: DISCREPANCY: code constant FREE_TIER_BLOCK_LIMIT is 3, but its own comment references '30-block document limit' in client/src/data/tier-features.md — confirm the intended production number before documenting. Unknown/not-yet-synced tiers are treated as unlimited so enforcement only starts once the free tier is confirmed.

## Template editable area on the canvas [all] -> guides/templates-and-backgrounds (guides)
AREA: Canvas and block UX
SUMMARY: When an applied background template defines an editable area, block placement is constrained to that region on every page (with 'Strictly follow editable area' on), the region is drawn as an overlay toggleable from the footer, and double-clicking the non-editable margin enters a mode to edit the background template locally for this calcsheet.
ANCHORS: client/src/App.jsx, client/src/components/CanvasSheet.jsx, client/src/components/WorksheetFooter.jsx, client/src/utils/pageLayout.js
NOTES: Belongs jointly to the templates area — coordinate with that survey. With strict mode off (Worksheet Options), the area still renders but blocks may sit anywhere. Background edits made this way apply to the current calcsheet only, never to the stored template. In-area content reflows across pages as it overflows.

## Autosave to browser storage [all] -> guides/saving-your-work (guides)
AREA: Saving, loading, and the file format
SUMMARY: Every change is automatically saved to the browser about 0.7 seconds after you stop editing — no save button needed. The header shows a live save status ("Unsaved changes" → "Saved to browser").
ANCHORS: client/src/hooks/useWorksheetPersistence.js, client/src/utils/worksheetStorage.js, client/src/components/AppHeader.jsx
NOTES: Debounced 700ms; writes a full .mez blob to IndexedDB (primary store, max 20 worksheets — oldest evicted when a NEW sheet exceeds the cap), falling back to localStorage (max 5, status reads "Saved locally"). The app requests persistent storage (navigator.storage.persist) so the browser won't purge saves. Pending changes are flushed on in-app navigation away and before in-place swaps like "New". Autosave is disabled while editing a template (templates are saved explicitly via "Save template"). A one-time silent migration pulls old OPFS saves into IndexedDB. Docs should warn: browser saves are per-browser/per-device and capped; use Save to a .mez file for durable/portable copies.

## Session recovery (emergency save on tab close) [all] -> guides/saving-your-work (guides)
AREA: Saving, loading, and the file format
SUMMARY: If you close or refresh the tab with unsaved changes, a synchronous emergency snapshot is written on the way out; next launch restores it automatically with a "Session recovered" status if it is newer than the latest normal save.
ANCHORS: client/src/hooks/useWorksheetPersistence.js, client/src/utils/worksheetStorage.js
NOTES: Written on beforeunload as plain worksheet YAML to localStorage key math-explore-emergency-save (best-effort, never blocks unload). Consumed (and cleared) only when the workspace opens WITHOUT an explicit worksheet id — opening a specific saved sheet from the home page skips it. Skipped entirely in template edit mode. Document as an automatic behavior in the same saving guide rather than its own page.

## Save to a .mez file (manual save/export) [all] -> guides/saving-your-work (guides)
AREA: Saving, loading, and the file format
SUMMARY: The worksheet menu's "Save" writes the whole calcsheet as a portable .mez file to your device via a native save dialog; the filename defaults to the worksheet name.
ANCHORS: client/src/hooks/useWorksheetPersistence.js, client/src/components/AppHeader.jsx, client/src/utils/worksheetArchive.js
NOTES: Three-level fallback chain: File System Access API save picker (Chromium — remembers the file in "Recent local files") → Web Share sheet (mobile Safari etc., status "Shared") → plain <a download> (status "Download started"). Statuses: Saved to file / Shared / Download started / Save cancelled / Save failed. NOTE: a separate handleExportWorksheetFile flow exists and App.jsx passes onExportWorksheetFile to AppHeader, but AppHeader has no such prop/menu item — there is currently no distinct "Export file" menu entry; "Save" IS the file export. Don't document a separate export-.mez command.

## Opening worksheets from the home page [all] -> guides/opening-worksheets (guides)
AREA: Saving, loading, and the file format
SUMMARY: The home ("Open") page lets you resume any browser-saved calcsheet with one click, open a .mez/.zip/.yaml file from your local drive, or reopen a recently used local file.
ANCHORS: client/src/components/HomePage.jsx, client/src/utils/recentFileSystemFiles.js, client/src/hooks/useWorksheetPersistence.js
NOTES: "Open from local drive" uses showOpenFilePicker where available (accepts .mez/.zip and .yaml/.yml), falling back to a hidden <input type=file>. The workspace menu's "Open" item just navigates back to the home page — there is no in-canvas open dialog. Statuses on load: Loaded / Loaded browser save / Loaded local save / Session recovered / Load failed.

## Browser saves list and management [all] -> guides/opening-worksheets (guides)
AREA: Saving, loading, and the file format
SUMMARY: The home page's "Browser save" section lists autosaved calcsheets (newest first) with a storage-quota readout; each entry expands to show saved date, block/page counts, author and project, and has Rename, Make a copy, Remove, and Open in new tab actions.
ANCHORS: client/src/components/HomePage.jsx, client/src/utils/worksheetStorage.js
NOTES: Quota line shows "X used · Y available" from navigator.storage.estimate(). Copy generates name_copy / name_copy(n). Remove asks for confirmation. Open in new tab opens /workspace?worksheetId=<id> in a fresh tab. Worth a warning callout: max 20 browser saves — oldest is silently evicted when a new sheet is autosaved past the cap.

## Recent local files list [all] -> guides/opening-worksheets (guides)
AREA: Saving, loading, and the file format
SUMMARY: Files you open or save via the native file dialog appear under "Recent local files" on the home page; clicking one reopens it directly from disk (the browser may ask to re-grant read permission).
ANCHORS: client/src/utils/recentFileSystemFiles.js, client/src/components/HomePage.jsx, client/src/hooks/useWorksheetPersistence.js
NOTES: Chromium-only in practice — requires window.showOpenFilePicker (File System Access API); Firefox/Safari users won't see this section populate. Stores up to 12 FileSystemFileHandles in IndexedDB; entries can be removed via the row menu (with confirm). Permission is queried/re-requested per open.

## The .mez calcsheet file format [all] -> reference/mez-file-format (reference)
AREA: Saving, loading, and the file format
SUMMARY: A calcsheet file (.mez) is a standard ZIP archive containing a human-readable worksheet.yaml plus extracted diagrams/ (JSON canvases) and images/ assets, making worksheets fully self-contained and portable across machines and browsers.
ANCHORS: client/src/utils/worksheetArchive.js, client/src/utils/worksheetYaml.js, client/src/utils/zipArchive.js
NOTES: worksheet.yaml: kind MathExploreWorksheet, yamlVersion 1; top-level name, savedAt, properties (title/project/projectNumber/author/checker), settings (blockSize, decimalPlaces, paperSize, pageTemplate, show*Evaluations, strictEditableArea, text theme, unitEnvironment, optional pageBackgroundSvg), pages {count,width,height,gap}, blocks (each with id, type ∈ math|text|diagram|description|page-break, layout {page,x,y,width,height} with y page-relative, plus type-specific fields like decimalPlaces/hideEvaluation/resultUnit). An applied background template is embedded as a base64 .mez under background, so it survives template deletion. Written as a stored (uncompressed) zip; on read, deflate entries are also accepted, a .zip extension or PK signature is recognized, and any *.yaml entry is used if worksheet.yaml is missing. Import guards: max 10,000 entries, 100 MB/entry, 500 MB total (zip-bomb protection); description-block HTML is sanitized on import. Templates and Library items reuse the same archive format internally.

## Opening plain YAML worksheets [all] -> reference/mez-file-format (reference)
AREA: Saving, loading, and the file format
SUMMARY: A bare worksheet.yaml file (not zipped) can be opened directly — any non-zip file picked in the open dialogs is parsed as raw worksheet YAML, so hand-edited or version-controlled YAML sheets load fine.
ANCHORS: client/src/utils/worksheetArchive.js, client/src/utils/worksheetYaml.js, client/src/components/HomePage.jsx
NOTES: Open pickers explicitly accept .yaml/.yml. Parsing is strict: the YAML must have yamlVersion: 1, kind: MathExploreWorksheet, and a blocks array or it is rejected. Diagram image assets referenced by diagrams/ or images/ entries obviously can't resolve outside an archive, so YAML-only files suit math/text sheets. There is no YAML export button — users get YAML by extracting worksheet.yaml from a .mez (or via the emergency-save mechanism internally). Best documented as a subsection of the file-format reference.

## Import from SMath Studio and Mathcad Prime [paid] -> guides/importing-worksheets (guides)
AREA: Saving, loading, and the file format
SUMMARY: "Import from…" in the worksheet menu converts an SMath Studio (.sm) or Mathcad Prime (.mcdx) worksheet into a Maths Explore calcsheet and opens it in a new tab; math that can't be converted is preserved as text so nothing is lost.
ANCHORS: client/src/components/ImportWorksheetModal.jsx, client/src/hooks/useWorksheetImport.js, client/src/components/AppHeader.jsx
NOTES: Paid-tier feature: the menu item is visible to free users with a Paid badge but triggers an upgrade prompt instead (runGatedAction("import")). Conversion runs on the backend (POST /api/import/mathcad | /api/import/smath); the resulting .mez is saved to browser storage under a fresh id and opened at /workspace?worksheetId=<id> in a new tab.

## Cloud drive storage (Google Drive, Dropbox, OneDrive, Box) [all] -> guides/saving-your-work (guides)
AREA: Saving, loading, and the file format
SUMMARY: Saving/loading calcsheets to connected cloud drives — currently not available to users.
ANCHORS: client/src/App.jsx, client/src/components/HomePage.jsx, client/src/components/AppHeader.jsx
NOTES: DISABLED — all client wiring (useCloudStorage hook usage, Cloud header button, home-page cloud file sections) is commented out with dated "2026-05-25" notes; the backend routes remain. Do NOT document as available; at most a docs FAQ line that files are stored locally/in-browser. Revisit if the client code is re-enabled.

## Signing in and account management (Clerk) [all] -> guides/signing-in (guides)
AREA: Accounts, tiers, and billing
SUMMARY: Users create an account or sign in via Clerk modal dialogs from the splash page (Login / Create Account / Try Maths Explore buttons) or the /plans page header; once signed in they are redirected to /home, and the account avatar (Clerk UserButton) opens the Manage account modal with profile settings, sign-out, and a custom Manage plan tab.
ANCHORS: client/src/main.jsx, client/src/components/SplashPage.jsx, client/src/components/PlansPage.jsx, client/src/components/AccountMenu.jsx, client/src/App.jsx
NOTES: Auth is entirely Clerk-hosted (modal mode, no dedicated sign-in route). Sign-out returns to the splash page (afterSignOutUrl="/"). On sign-in the client syncs GET /api/auth/me (backend/app/api/routes/auth.py) which creates the user row, grants the trial, and returns tier/access status. Home, Libraries, and Workspace routes all require sign-in (signed-out visitors are redirected to the splash page).

## Private beta access gate [all] -> guides/beta-access (guides)
AREA: Accounts, tiers, and billing
SUMMARY: The app is in private beta: sign-up is controlled via Clerk waitlist/invitations, and a signed-in account that is not approved sees a full-screen 'You're on the beta waitlist' (or 'Access not available' if denied) screen instead of the app, with only a sign-out action. Approved beta users also get a floating ReviseFlow feedback button.
ANCHORS: docs/beta.md, client/src/components/BetaPendingScreen.jsx, client/src/App.jsx, backend/app/api/routes/auth.py, client/src/components/ReviseFlowWidget.jsx
NOTES: BETA STATUS: whole product is gated. New accounts currently default to access_status='approved' (gating is done up-front by Clerk waitlist/invite); pending/denied is per-user via DB only — no admin UI. Enforcement is server-side (require_approved_user, 403) as well as the client screen. Docs should set expectations about waitlist approval emails.

## Country onboarding (billing currency) [all] -> guides/signing-in (guides)
AREA: Accounts, tiers, and billing
SUMMARY: A required one-time step after beta approval: the user picks their country, which sets the local currency used for all displayed prices (plans, credit packs, Mathew credit balance). Until it is set, the app shows the 'Where are you based?' screen instead of the workspace.
ANCHORS: client/src/components/CountryOnboardingScreen.jsx, client/src/App.jsx, backend/app/api/routes/auth.py, backend/app/users/country.py
NOTES: Country drives preferred_currency returned by /api/auth/me (USD until set). Screen copy notes 'You can change how you pay at checkout.' There is no in-app UI to change country later (PUT /api/auth/country exists but no settings surface found). Fold into the signing-in guide as the onboarding step.

## Free trial (auto-granted Individual trial) [all] -> guides/plans-and-pricing (guides)
AREA: Accounts, tiers, and billing
SUMMARY: Every new account automatically gets a free trial of the Individual plan on first sign-in — no card required and nothing to activate. During the trial the plan shows as 'Individual (trial)' and all Individual features are unlocked; when it expires the account reverts to Free automatically.
ANCHORS: backend/app/users/trial.py, backend/app/users/tiers.py, backend/app/api/routes/auth.py, backend/app/core/config.py, client/src/components/ManagePlanContent.jsx
NOTES: Default length is 14 days (TRIAL_PERIOD_DAYS, backend/app/core/config.py). The trial window is keyed to the verified email (email_trials table), so deleting the account and re-registering with the same email does NOT restart the trial. A trial is not a Stripe subscription — the Manage plan tab shows its dates but offers no Cancel button. Upgrade prompts reference it ('included on the Individual plan (and the free trial)').

## Plan tiers: Free vs Individual (vs Teams) [all] -> reference/plan-comparison (reference)
AREA: Accounts, tiers, and billing
SUMMARY: Free includes full maths functionality, 3 built-in text styles, local file save, watermarked PDF export, a limited document block count, cloud-saved user defaults, and pay-as-you-go Mathew AI. Individual adds unlimited blocks, SVG background templates, watermark-free PDF export, personal libraries, custom text styles, and SMath/Mathcad file import. Hitting a paid-only control on Free shows an upgrade modal linking to /plans.
ANCHORS: client/src/data/tier-features.md, client/src/utils/featureGates.js, client/src/utils/tierLimits.js, backend/app/users/tiers.py, client/src/components/UpgradeModal.jsx, client/src/components/TierProvider.jsx, client/src/components/PaidBadge.jsx
NOTES: DISCREPANCY to resolve before documenting: marketing copy (client/src/data/tier-features.md, splash, license) says a '30-block document limit' on Free, but code has FREE_TIER_BLOCK_LIMIT = 3 (client/src/utils/tierLimits.js — its own comment cites the 30-block doc). Only math/text/diagram blocks count (page-breaks and auto description blocks are free). Mathew generations and pastes are clamped to remaining capacity on Free. Teams tier is display-only: the card shows 'POA' with a Contact us mailto (placeholder sales@mathsexplore.com) — Teams checkout is not wired. Enterprise exists in the backend enum only. Free-tier SVG-background block is also enforced server-side (403 on save).

## Plans page and Individual subscription purchase [all] -> guides/upgrading (guides)
AREA: Accounts, tiers, and billing
SUMMARY: A public /plans page (viewable signed out) shows Free / Individual / Teams cards with the live monthly price in the user's local currency, marks the user's current plan, and starts a hosted Stripe Checkout for the Individual subscription via 'Buy now' (prompting sign-in first if needed). After payment the browser returns to the app with a one-time success/cancelled banner.
ANCHORS: client/src/components/PlansPage.jsx, client/src/components/PlansContent.jsx, client/src/hooks/useBilling.js, docs/stripe_billing.md, client/src/components/HomePage.jsx
NOTES: Prices come live from Stripe (currencies: USD/NZD/AUD/EUR/GBP in the example deployment); the shown currency is the user's country default with no manual switcher — 'change how you pay at checkout'. Buying again while already subscribed is rejected (409, no double-billing). Checkout returns to /home?billing=success or /plans?billing=cancelled (one-time banner, useBillingNotice). The same PlansContent renders inside the Clerk account modal. If Stripe is unconfigured on the server the price shows as unavailable and packs hide.

## Manage plan: view subscription, cancel, resume [paid] -> guides/managing-your-subscription (guides)
AREA: Accounts, tiers, and billing
SUMMARY: The 'Manage plan' tab in the account modal shows the current plan, its start date, and its period-end date labelled by state ('Next payment' with an Autopay badge for an active plan, 'Subscription ends' when cancellation is scheduled, 'Access ends' for a manually granted plan). Users can cancel at period end (keeping access until then) and resume (undo) a scheduled cancellation.
ANCHORS: client/src/components/ManagePlanContent.jsx, client/src/components/AccountMenu.jsx, docs/stripe_billing.md, client/src/hooks/useBilling.js, backend/app/api/routes/auth.py
NOTES: Cancel/Resume appears only for a real Stripe-managed subscription (stripe_managed flag) — trials and manually granted/comped plans show dates or 'Active' status but no billing actions. Cancellation is always at period end (no immediate refund path in-app). The scheduled-cancel state persists across sessions (cancel_at_period_end from /api/auth/me). The tab also embeds the credit-pack purchase section and a 'Change plan'/'View all plans' link to /plans.

## Mathew AI credit packs (pay-as-you-go top-up) [all] -> guides/mathew-credit (guides)
AREA: Accounts, tiers, and billing
SUMMARY: All tiers use Mathew (the AI assistant) pay-as-you-go against a prepaid credit balance. Users buy one-time credit packs (with a 1-99 quantity stepper) in their local currency via Stripe Checkout, from the /plans page or the Manage plan tab; credit never expires and the remaining balance is shown in the Mathew panel in local currency.
ANCHORS: client/src/components/CreditPacks.jsx, docs/ai_billing.md, docs/stripe_billing.md, client/src/hooks/useBilling.js, client/src/data/tier-features.md
NOTES: Mathew is NOT bundled into the subscription — paid users also top up. Each generation shows a pre-flight cost estimate and is blocked (402) if the balance can't cover the worst case, so the balance never goes negative; cancelling mid-generation settles a partial charge. Only packs in the buyer's own currency are shown. The pack section renders signed-out (buying prompts sign-in) and hides entirely when billing isn't configured. Free-tier users still can't exceed their block limit via Mathew (generations are clamped).

## Cloud-drive storage (Google Drive, Dropbox, OneDrive, Box) [all] -> guides/cloud-storage (guides)
AREA: Accounts, tiers, and billing
SUMMARY: Saving/loading worksheets to Google Drive, Dropbox, OneDrive, or Box via a Cloud button and connections modal. The backend OAuth/file-proxy is fully implemented, but the entire client UI is intentionally disabled, so end users currently see no cloud storage anywhere in the product.
ANCHORS: docs/cloud-storage-setup.md, client/src/App.jsx, client/src/components/AppHeader.jsx, client/src/components/HomePage.jsx
NOTES: VERIFIED DISABLED on the client: the cloud wiring, handlers, and CloudStorageModal in client/src/App.jsx, the header Cloud button in AppHeader.jsx, and the cloud-drives home section in HomePage.jsx are all commented out with dated '2026-05-25:' notes explaining how to re-enable. Do NOT publish a user-facing page for this until re-enabled; keep this entry as a placeholder. Backend routes remain mounted at /api/cloud-storage (beta-gated).

## Mathew AI assistant — generate worksheet blocks from natural language [all] -> guides/mathew (guides)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: From the sidebar tab labelled 'Mathew AI nerd' (bot icon), the user types a plain-English request (e.g. 'weight of a 12 kg mass on Earth') and Mathew inserts ready-made math/text/page-break blocks onto the worksheet. Mathew is a translator only: it writes LaTeX in the app's dialect and the worksheet's own math engine (mathjs) computes every result, so generated math is live and editable like hand-made blocks.
ANCHORS: client/src/extensions/mathew.jsx, client/src/components/MathewPanel.jsx, client/src/hooks/useMathew.js, docs/ai_integration.md
NOTES: Requires sign-in (Clerk) AND a beta-approved account: all /api/assistant endpoints sit behind the beta gate (backend/app/main.py mounts the assistant router with require_approved_user). Mathew reads the worksheet's existing variable definitions (a 'variable manifest'), decimal-places setting, and unit environment as context, so prompts can reference variables already on the sheet. Worksheet variable content is sent to the AI provider as model input — worth a privacy note in docs. Mathew can be switched off per-user via the Manage Extensions modal (it is in the extension catalogue with no requiresPaid flag, so it is available on free and paid tiers). Per-user rate and concurrency limits exist server-side (RateLimiter/ConcurrencyLimiter in backend/app/api/routes/assistant.py).

## Pre-flight cost estimate with Proceed / Cancel [all] -> guides/mathew-credits (guides)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: Pressing Generate first shows a free cost estimate — 'Uses up to ~$X of credit', the typical expected charge, and the token figures — and waits for the user to click Proceed (generate and insert) or Cancel (edit the prompt). Nothing is charged until Proceed.
ANCHORS: client/src/extensions/mathew.jsx, client/src/components/MathewPanel.jsx, docs/ai_integration.md, docs/ai_billing.md
NOTES: The estimate step can be disabled by the deployment via VITE_MATHEW_SHOW_ESTIMATE=false (Generate then runs immediately with no confirm step) — document the default confirm flow, flag that some deployments may skip it. The 'up to' figure is the worst case that gets reserved; the actual charge settles to real usage and can never exceed it. The 'typical' figure comes from history averages and may be absent (panel then shows token-only wording). If the user switches model while an estimate is showing, the estimate automatically re-runs at the new model's pricing.

## Insert-with-summary, Undo, and Next prompt [all] -> guides/mathew (guides)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: On Proceed, Mathew's blocks are inserted straight onto the sheet as a single undo step (with automatic reflow and collision handling), and the panel shows a numbered summary of what was added — each block's content plus any explanatory comment. Two buttons follow: Undo (removes the whole insertion) and Next prompt (clears the panel for another request).
ANCHORS: client/src/extensions/mathew.jsx, client/src/components/MathewPanel.jsx, docs/ai_integration.md
NOTES: There is no preview/ghost-accept step — that earlier design was replaced; blocks land directly and Undo is the escape hatch. Undoing does NOT refund credit (the generation already happened). Mathew can also attach descriptions to definition blocks and per-parameter notes to function definitions, which become normal worksheet description annotations.

## Stop an in-flight generation [all] -> guides/mathew-credits (guides)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: While the panel shows 'Mathew is thinking…', a Stop button halts the generation. The user is charged only for tokens already used up to the stop; the panel warns 'Stopping won't refund tokens Mathew has already used' and confirms 'Generation stopped — you're charged for any tokens Mathew already used.'
ANCHORS: client/src/components/MathewPanel.jsx, client/src/extensions/mathew.jsx, client/src/hooks/useMathew.js, docs/ai_billing.md
NOTES: The displayed balance may briefly show the worst-case hold after stopping, then refresh a few seconds later once the backend settles the charge down to actual usage (full refund if nothing had streamed). On the DeepSeek model the partial charge for a cancelled run is estimated rather than exact (still capped at the reserved worst case).

## AI credit balance and top-up [all] -> guides/mathew-credits (guides)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: Mathew runs on prepaid AI credit: the panel shows 'Credit remaining: $X.XX' in the user's own currency, the balance drops with each generation, and a 'Top up' link goes to the Plans page where one-time Stripe credit packs add credit. A generation the balance can't cover the worst case of is refused up front, so the balance can never go negative.
ANCHORS: client/src/components/MathewPanel.jsx, client/src/hooks/useMathew.js, docs/ai_billing.md, docs/stripe_billing.md
NOTES: Balances start at $0, so a brand-new user must buy a credit pack before the first generation (the server returns 402 'insufficient credit' otherwise). Credit is money (micro-USD internally), not a token allowance — displayed in local currency, sub-cent balances read as '<$0.01'. Charges may include an operator markup over raw provider cost. Credit packs are one-time purchases separate from the Individual subscription; both live on the Plans page. Note: docs/ai_integration.md contains a stale 'no top-up path yet' caveat — stripe_billing.md and the live Top up button supersede it.

## Model selection (Claude / DeepSeek) [all] -> reference/mathew-models (reference)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: When the server offers more than one AI model, the panel shows a Model dropdown (e.g. 'Claude' vs the much cheaper 'DeepSeek'); estimates and charges are priced for the chosen model, and the choice is remembered between sessions.
ANCHORS: client/src/components/MathewPanel.jsx, client/src/hooks/useMathew.js, client/src/extensions/mathew.jsx, docs/ai_integration.md
NOTES: The picker is hidden entirely when only one model is available — availability is server configuration (DeepSeek appears only if the deployment sets DEEPSEEK_API_KEY), so docs should describe it conditionally. Choice persists in localStorage ('mathew.model') and falls back to the server default (Claude) if the stored model is no longer offered. Output quality contract is identical across models (same prompt and block schema); differences are price and speed, plus DeepSeek's pre-flight input-token figure being a local estimate rather than an exact count (the final charge is always from real usage).

## Free-plan block-limit awareness [free] -> guides/mathew (guides)
AREA: Mathew AI assistant (sidebar extension)
SUMMARY: On the free plan, the Mathew panel shows how many blocks remain ('N blocks left on the free plan'), tells Mathew to self-limit its output to that headroom, and blocks generation entirely at the limit with an Upgrade link — so users can't spend credit on blocks that won't fit.
ANCHORS: client/src/extensions/mathew.jsx, client/src/components/MathewPanel.jsx
NOTES: Free-plan-only behaviour (paid/unlimited plans see none of these messages). If a generation still returns more blocks than fit, the batch is clamped and a notice explains 'Only some of Mathew's blocks were added — the free plan is limited to N blocks.' Panel fallback text implies a 30-block default limit; confirm the exact number against the tier-limits source (client/src/utils/tierLimits.js) when writing the page, as this survey did not open that file.

## Keyboard shortcuts [all] -> reference/keyboard-shortcuts (reference)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Global shortcuts on the worksheet: Ctrl/Cmd+A select all blocks, Ctrl/Cmd+C/X copy/cut selected blocks, Delete removes them, Ctrl/Cmd+Z undo, Ctrl/Cmd+Y or Ctrl/Cmd+Shift+Z redo, Ctrl/Cmd +/-/0 (and Ctrl+scroll wheel) zoom in/out/reset.
ANCHORS: client/src/hooks/useKeyboardShortcuts.js
NOTES: Shortcuts are skipped while typing in inputs, math fields, or contenteditable areas so normal text editing still works. Numpad +/-/0 also zoom (checked by event.code, layout-independent). Ctrl+scroll always zooms the sheet, suppressing browser zoom.

## Zoom, fit and reflow controls (worksheet footer) [all] -> guides/navigating-the-worksheet (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Footer bar shows page/block/paper stats and offers Fit Width, Fit Page, reset to 100%, and +/-20% zoom buttons, plus a Reflow button that tidies block spacing and page breaks. Also shows spell-check language and the active units environment.
ANCHORS: client/src/components/WorksheetFooter.jsx, client/src/hooks/useKeyboardShortcuts.js
NOTES: When a background template with an editable area is applied, the footer also gets an 'Editable area' show/hide toggle.

## Printing and PDF export [all] -> guides/printing-and-pdf-export (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Menu items Print and Export PDF both open the browser print dialog against a dedicated print layout that matches the on-screen pages (paper size via @page, backgrounds, heading numbering, per-page property tokens). PDF export is 'print to PDF' via the browser.
ANCHORS: client/src/components/PrintWorksheet.jsx, client/src/components/AppHeader.jsx, client/src/utils/featureGates.js
NOTES: Print and Export PDF are the same handler (window.print(), App.jsx handlePrintWorksheet). Free tier prints/exports carry a 'Made with Maths Explore' diagonal watermark on every page (showWatermark={!isPaid}); watermark-free export is a paid feature (featureGates.js watermarkFreeExport).

## Spell check in text blocks [all] -> guides/text-blocks (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Text blocks are spell-checked with an English (nspell/dictionary-en) checker; right-clicking a misspelled word shows up to 3 suggestions in a context menu and clicking one replaces the word.
ANCHORS: client/src/utils/spellCheck.js, client/src/components/TextBlock.jsx, client/src/components/WorksheetFooter.jsx
NOTES: Gotcha: the footer displays the browser locale as 'Spell check: <navigator.language>' (App.jsx), but the dictionary is English-only regardless. There is an ignoreWord API in spellCheck.js; capitalisation of suggestions follows the typed word.

## Worksheet naming and document properties [all] -> guides/worksheet-properties (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: The calcsheet filename is editable inline in the header and in Calcsheet options > Properties, alongside document metadata: title, project, project number, author, checker. These metadata fields can be referenced anywhere via tokens.
ANCHORS: client/src/components/AppHeader.jsx, client/src/components/WorksheetOptionsModal.jsx, client/src/utils/worksheetProperties.js
NOTES: Token syntax is {name} with tokens: title, project, projectNumber, author, checker, currentDate (dd/mm/yy), pageNumber, pageCount. Text blocks offer an autocomplete suggestion menu for tokens; tokens resolve per page in print layouts and background templates. UI copy says 'calcsheet', not 'worksheet'.

## Calcsheet options - Maths settings [all] -> reference/calcsheet-options (reference)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Per-worksheet math display settings: a units environment that re-prioritises displayed units (e.g. Structural shows N·m instead of J), global decimal places (0-10), and defaults for whether variable/expression '= result' evaluations are shown.
ANCHORS: client/src/components/WorksheetOptionsModal.jsx, client/src/utils/unitEnvironments.js
NOTES: Units environments: SI (default) and Structural work; US Customary, Electrical, and Thermal appear in the dropdown but currently have empty unit lists (behave like SI) - scaffolded for a follow-up. Per-block evaluation visibility can still be toggled via the block's right-click menu.

## Page layout and styling options [all] -> guides/page-layout-and-styling (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Choose paper size (A4 or US Letter), page background pattern (Plain, Grid, Ruled, Dot Grid, or an uploaded SVG file), block size (Normal or Small = 80% scale), text block theme (Classic/Human/Droid plus user styles), and heading colour (black/red/blue).
ANCHORS: client/src/components/WorksheetOptionsModal.jsx, client/src/utils/pageLayout.js, client/src/utils/textThemes.js
NOTES: 'From SVG file' page background is paid (Individual) - free users get an upgrade prompt. When a saved background template is applied it replaces the pattern picker. The Storage settings page ('Browser save behaviour') exists in the modal nav but is currently an empty placeholder - do not document it yet.

## Save settings as personal defaults [all] -> reference/calcsheet-options (reference)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: A 'Save as default settings' button in Calcsheet options stores the current option set to the user's account so every new calcsheet starts with them.
ANCHORS: client/src/components/WorksheetOptionsModal.jsx, client/src/hooks/useUserPreferences.js
NOTES: Requires sign-in (stored via PUT /api/auth/default-options). Button only appears when current options differ from the saved defaults.

## Insert-block beacon toolbar [all] -> guides/adding-blocks (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Clicking empty canvas drops a beacon marker with a floating toolbar to create a Math, Diagram, Text, or User Function block, or a Page Break at that point.
ANCHORS: client/src/components/BeaconToolbar.jsx, client/src/components/CanvasSheet.jsx
NOTES: Toolbar fades after 5s of mouse inactivity (beacon stays); pasting while a beacon is active inserts clipboard blocks, an image, or text at that point. Transient UI generally fades after 10s idle (useInactivity hook adds body.user-inactive).

## Text formatting toolbar [all] -> guides/text-blocks (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: While editing a text block, a context toolbar offers bold, italic, strikethrough, a heading dropdown (H1-H4 as auto-numbered 1 / 1.1 / 1.1.1 headings or plain, plus back to normal text), bulleted/numbered lists, and links.
ANCHORS: client/src/components/TextFormatToolbar.jsx, client/src/components/TextBlock.jsx
NOTES: Numbered headings share one continuous hierarchical numbering across the whole sheet in reading order (also honoured in print). Text blocks are Markdown under the hood.

## Diagram drawing tools [all] -> guides/diagrams (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Diagram blocks have a full drawing toolbar: select, line, multiline (click points, Enter to finish), rectangle, oval, freehand scribble, and insert image from file; with line weight (1-12px), colour swatches or custom colour, copy/cut/paste/delete of objects, arrowheads on lines, and z-order controls in the right-click menu.
ANCHORS: client/src/components/DiagramToolbar.jsx, client/src/components/DiagramBlock.jsx
NOTES: Right-click a diagram for a style menu (line weight, colour picker + swatches, arrowhead options, bring-to-front/send-to-back). In template-authoring mode the same menu offers 'Set as editable area'. Shift-drag in select mode selects multiple objects.

## Image insertion (paste or file) [all] -> guides/images (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Paste an image from the clipboard onto empty canvas (creates a diagram block containing it) or into an existing diagram; or use the diagram toolbar's 'Insert image from file' button.
ANCHORS: client/src/utils/clipboardImages.js, client/src/components/CanvasSheet.jsx, client/src/components/DiagramBlock.jsx, client/src/components/DiagramToolbar.jsx
NOTES: Images are stored as data URLs in the block and extracted into images/ entries inside the .mez archive on save. Pasting plain text on empty canvas creates a text block.

## Copy, paste, multi-select and grouping of blocks [all] -> guides/selecting-and-arranging-blocks (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Select multiple blocks (Ctrl/Cmd+A or drag), then copy/cut/paste them - including across sheets and browser tabs via a text clipboard payload - and group/ungroup them from the selection toolbar; right-click a page for Paste / Select All.
ANCHORS: client/src/utils/blockClipboard.js, client/src/components/CanvasSheet.jsx, client/src/components/BlockItem.jsx
NOTES: Clipboard format is a MATH_EXPLORE_BLOCKS_V1-prefixed text payload, so blocks survive paste into another Maths Explore tab; a memory fallback covers clipboard-permission failures. The selection toolbar also offers 'Save Snippet' when the Library extension is active. Pasted blocks offset by 24px and reuse collision pushing.

## Block right-click context menu [all] -> reference/block-context-menu (reference)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Right-clicking a block gives copy/cut/paste/delete, Ungroup, Show/Hide Description, Show/Hide Evaluation, Rename Variable/Function (sheet-wide rename with preview), Rename Local Parameters, Convert to User Function, and per-block Decimal Rounding (0-10 places).
ANCHORS: client/src/components/BlockItem.jsx
NOTES: Decimal Rounding defaults to 4 and overrides the sheet-wide 'Global decimal places' option for that block. Rename actions open the rename modals (RenameDefinitionModal / RenameFunctionParametersModal) which update every reference on the sheet.

## Navigate sidebar [all] -> guides/navigating-the-worksheet (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: The built-in Navigate tab lists the sheet's headings, variables, expressions, user functions, and assertions; clicking an item jumps to its block, and a context menu offers rename, edit function description, insert into the active math block, and Save to Library.
ANCHORS: client/src/components/WorksheetSidebar.jsx
NOTES: Sidebar is resizable by dragging its edge (450-650px). Sections collapse individually. Extension tabs (Library, Mathew) appear after Navigate.

## Manage sidebar extensions [all] -> guides/managing-extensions (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: A 'Manage extensions' modal lets users switch sidebar extensions (Library, Mathew) on or off per account; paid-only extensions the user can't access appear locked with an upgrade button.
ANCHORS: client/src/components/ManageExtensionsModal.jsx, client/src/hooks/useUserPreferences.js
NOTES: Choices persist to the account via PUT /api/auth/extension-settings; toggling updates the UI optimistically with a save-status line.

## Home page: opening and managing calcsheets [all] -> guides/opening-and-managing-files (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: The Home page lists calcsheets saved in browser storage (with a storage usage estimate), recent files opened from disk, and saved templates; each entry has a menu (open, duplicate, download, delete etc.) and there's a file picker/upload for opening .mez, .zip, or .yaml files.
ANCHORS: client/src/components/HomePage.jsx, client/src/utils/recentFileSystemFiles.js
NOTES: 'Recent files' uses the File System Access API (Chromium-only; feature-detected, up to 12 remembered handles in IndexedDB). Browser-stored sheets with zero blocks are auto-pruned from the list. Cloud drives (Google Drive/Dropbox/OneDrive/Box) are fully commented out as of 2026-05-25 - do not document.

## Autosave, save status and emergency recovery [all] -> guides/saving-your-work (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Work autosaves to browser storage (debounced ~700ms) with a live save-status indicator in the header; closing or refreshing the tab writes a synchronous emergency snapshot so nothing is lost. Manual Save writes a .mez file to disk via the file picker.
ANCHORS: client/src/hooks/useWorksheetPersistence.js, client/src/components/AppHeader.jsx
NOTES: Manual save uses the File System Access API, falling back to Web Share then <a download>. Saved files are .mez ZIP archives (worksheet.yaml + diagrams/ + images/); plain YAML files also open. Autosave is disabled in template-edit mode.

## Import from SMath and Mathcad [paid] -> guides/importing-worksheets (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: 'Import from…' in the worksheet menu converts an SMath Studio (.sm) or Mathcad Prime (.mcdx) worksheet into a Maths Explore calcsheet and opens it in a new tab; math that can't be converted is preserved as text.
ANCHORS: client/src/components/ImportWorksheetModal.jsx, client/src/components/AppHeader.jsx, client/src/utils/featureGates.js
NOTES: Paid (Individual) feature - the menu item stays visible to free users with a Paid badge and triggers an upgrade prompt. Conversion runs on the backend.

## Templates and page background stationery [paid] -> guides/templates-and-backgrounds (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Save the current worksheet as a named reusable template ('Save as template'), then apply a template as background stationery drawn behind every page of any calcsheet ('Background…'), with per-page tokens like {pageNumber}. Templates can define an editable area that constrains where blocks go.
ANCHORS: client/src/components/SaveTemplateModal.jsx, client/src/components/TemplatePickerModal.jsx, client/src/components/AppHeader.jsx, client/src/utils/backgroundEditMode.js, client/src/components/WorksheetOptionsModal.jsx, client/src/components/WorksheetFooter.jsx
NOTES: Saving a template requires sign-in and is only offered for single-page sheets (canSaveAsTemplate = pageCount === 1). Applying backgrounds is gated behind the paid svgBackground feature. Double-clicking the page margins (or a background block) enters background-edit mode to tweak the applied template in place; double-click the work area to exit. The 'Strictly follow editable area' option can be turned off to place blocks anywhere; the footer can show/hide the editable-area outline. Templates are also managed (rename/delete) on the Libraries page, and a template-edit mode ('Save template' / 'Save as new template') opens from there.

## Custom text styles (CSS) [paid] -> guides/custom-text-styles (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Paid users can create and edit named CSS styles for text blocks on the Libraries page, seeded from a built-in theme (Classic/Human/Droid) as a starting point; saved styles appear alongside built-ins in the worksheet's text theme selector.
ANCHORS: client/src/components/StyleEditorModal.jsx, client/src/components/LibrariesPage.jsx, client/src/utils/textThemes.js
NOTES: Styles live in the backend per account and are referenced as style:<id> theme ids. The editor is a raw CSS textarea - worth documenting the selectors the built-in themes use. Gated by the customStyles paid feature.

## Math input toolbar (symbols, functions, Greek) [all] -> reference/math-toolbar (reference)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: While editing a math block, a context toolbar inserts common constructs: roots, powers, subscripts, fractions, pi, degrees/radians; comparison and boolean operators including if(condition, then, else), and/or/not; a library of function names (log, trig, rounding, min/max, mean, mod, random); and full lower/upper-case Greek alphabets.
ANCHORS: client/src/components/MathToolbar.jsx
NOTES: Comparison buttons insert the assertion operators (== for equality checks, since a single = assigns). Compound conditions must parenthesise each comparison, e.g. (x>0)∧(x<10). Autocomplete suggestions for defined variables/functions also pop up while typing (SuggestionMenu).

## Physical constants panel [paid] -> guides/physical-constants (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: A read-only, app-curated catalogue of physical constants in the sidebar (part of the Library extension) with a category filter and fuzzy search; clicking Insert drops a constant onto the sheet as an editable definition.
ANCHORS: client/src/components/PhysicalConstantsPanel.jsx
NOTES: Lives inside the Library sidebar extension, which is paid-only (requiresPaid). Constants insert as copies - editing the sheet copy never changes the catalogue.

## Function and variable descriptions [all] -> guides/describing-your-math (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Math blocks can show an attached description block ('Show Description' in the right-click menu) that stays anchored to its math source; function definitions additionally get a detailed-description modal with a note per input parameter.
ANCHORS: client/src/components/DescriptionBlock.jsx, client/src/components/ParameterDetailsModal.jsx, client/src/components/BlockItem.jsx
NOTES: The parameter-details modal opens from a function description block ('Detailed Description') or the Navigate sidebar's 'Edit Function Description'. Parameter description lists auto-sync when parameters are renamed/added.

## Account menu and plan management [all] -> guides/account-and-plans (guides)
AREA: Cross-cutting UI sweep: toolbars, modals, keyboard shortcuts, printing, files, settings (client/src/components + client/src/hooks + client/src/utils)
SUMMARY: Signed-in users get the account button in every header with a custom 'Manage plan' page (current plan, dates, cancel, link to /plans); the header also shows trial days remaining and backend sync status.
ANCHORS: client/src/components/AccountMenu.jsx, client/src/components/AppHeader.jsx
NOTES: Auth is Clerk (modal sign-in/sign-up). Billing/plans specifics (Stripe, credit packs) are a separate subsystem - this entry covers only the header/account surface. Note for docs framing: there is no app-level dark mode; the only 'themes' are text block themes.

# ===== CRITIQUE: MISSING =====
## Creating a new calcsheet (blank or from a template) -> guides/creating-worksheets
SUMMARY: Users start new worksheets two ways: the home page has a 'New maths sheet' button (opens a blank workspace with the options dialog pre-opened via createNew/openOptions navigation state) and a 'New from template' dropdown listing saved templates (empty state explains to use 'Save as template' in the worksheet menu first). Inside the workspace, the worksheet menu has a 'New' item that swaps the current sheet in place (flushing pending autosave first). The Libraries page also offers 'New worksheet from this template' per template.
ANCHORS: client/src/components/HomePage.jsx, client/src/components/AppHeader.jsx, client/src/components/LibrariesPage.jsx

## Libraries page (/libraries): manage libraries, items, templates, and styles -> guides/managing-libraries
SUMMARY: A full management page reachable from the home page's 'Manage libraries and templates' link and the Library panel. Four sections: Libraries (create via 'New library', rename, delete — 'General' is special-cased), Library items (rename, remove from a library, delete), Templates (new worksheet from template, edit template in the workspace, rename, delete), and Text styles (new/edit/delete, opening the style editor). Library sections are paid-gated with an in-page upgrade message ('Your saved items are kept and return when you re-subscribe'); the merged list only covers the styles section (Custom text styles entry) and mentions the page in passing in notes.
ANCHORS: client/src/components/LibrariesPage.jsx, client/src/components/HomePage.jsx

## Terms and licence access (site footer) -> reference/legal-and-licensing
SUMMARY: Every marketing/management page (splash, plans, home, libraries) carries a shared footer with a Plans link and a 'Terms' button that opens a 'Licence & terms' modal rendering markdown from client/src/content/legal/license.md (loaded lazily; a 3rd_party_notices.md file exists but is not currently surfaced anywhere). Minor feature — a docs FAQ line or a mention on an about/legal page suffices.
ANCHORS: client/src/components/Footer.jsx, client/src/components/LegalModal.jsx, client/src/components/HomePage.jsx

# ===== CRITIQUE: CORRECTIONS =====
- Physical constants panel (cross-cutting UI sweep entry): Wrong attribution: it claims the panel is 'part of the Library extension' and paid-only via Library. Verified in client/src/extensions/registry.js and client/src/extensions/physicalConstants.jsx: Physical Constants is its own standalone extension (id 'physical-constants', label 'Physical constants', its own requiresPaid: true flag), listed separately from the 'library' extension. This entry also duplicates the dedicated 'Physical constants extension' entry — merge them and drop the Library-extension claim.
- Templates and page background stationery: Tier 'paid' is overbroad. Verified in client/src/components/AppHeader.jsx: 'Save as template' (lines 178-191) is gated only on sign-in (disabled={!isSignedIn}, title 'Sign in to save templates') with no paid gate; only 'Background…' (applying a background template) goes through runGatedAction('svgBackground') with a PaidBadge. Tier should be 'all' with the paid gate noted specifically for applying backgrounds.
- Home page: opening and managing calcsheets: Minor inaccuracy: the summary says each entry menu offers 'open, duplicate, download, delete etc.' — verified in client/src/components/HomePage.jsx renderFileMenu: the actions are Rename, Make a copy, Remove, and Open in new tab. There is no per-entry Download action for browser saves (getting a file requires opening the sheet and using Save).
- Cloud drive storage (both duplicate entries): Entries are correct (verified disabled: the header Cloud button in client/src/components/AppHeader.jsx sits inside a dated '2026-05-25' comment block at lines 248-258, and the HomePage cloud-drives section is inside a JSX comment ending at line 996), but the same disabled feature appears twice in the merged list ('Cloud drive storage' and 'Cloud-drive storage') — deduplicate to one placeholder entry.
- Merged list duplicates (general): Several features appear twice from different surveyors and should be merged before doc planning: Navigate sidebar (x2), block right-click context menu (x2), Manage extensions (x2), Import from SMath/Mathcad (x2), Physical constants (x2 + panel entry), copy/cut/paste blocks (x2), autosave/save status (x2), beacon toolbar (x2), descriptions (x2), zoom/footer controls (x2). Content is consistent between pairs; only the Physical constants pair conflicts (see separate correction).
- Free-tier block limit / Mathew block-limit entries: Confirming (not contradicting) the flagged discrepancy: client/src/utils/tierLimits.js line 5 really is 'export const FREE_TIER_BLOCK_LIMIT = 3;' while its own comment cites the '30-block document limit' in client/src/data/tier-features.md. The 3 looks like a dev/test value; do not publish either number without confirming with the app owner. Also verified: unknown/unsynced tiers are treated as unlimited (getBlockLimit returns Infinity for anything but 'free').
- Units environment (worksheet option) / Calcsheet options - Maths settings: Verified correct as flagged: client/src/utils/unitEnvironments.js defines only Structural with actual units (['N m','kN m','MN m','N/m','kN/m','MN/m']); si, us_customary, electrical, thermal all have empty unit lists. Keep the 'document only SI and Structural' guidance. Also verified: the Worksheet Options 'Storage' page (client/src/components/WorksheetOptionsModal.jsx lines 611-614) renders a completely empty settings-page div — do not document it.
- Save to a .mez file (manual save/export): Verified correct: the AppHeader worksheet menu contains exactly Open, Import from…, New, Save (label 'Save template' in template mode), Save as template (conditional), Background…, Print, Export PDF — there is no separate 'Export file' item, confirming the note that Save IS the file export. No change needed beyond keeping that note.
