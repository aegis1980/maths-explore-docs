---
name: sync-docs
description: Populate or refresh this Starlight docs site from the Maths Explore app source at D:\math-explore. Use when asked to document a feature, write or update user docs, or sync docs after app changes. Optional argument - a page/feature name to (re)write, or a git range in the app repo (e.g. "since ccd5fed") for an incremental sync.
---

# Sync docs from the Maths Explore app

This skill maps user-facing features of the Maths Explore app (`D:\math-explore`) to pages in this docs site, and defines the process for writing them. The mapping below was produced by a full multi-agent survey of the app source and adversarially verified.

**Sync state:** last full survey at app commit `ccd5fedf4cfa3efb640d450a0100bb2d0f7b995b` (2026-07-05). Update this line after each sync.

> **The full survey is stale: 220 commits behind as of app HEAD `ca96a56` (2026-10-19).** A targeted re-verification at `3def0a9` corrected the tier/gating facts and traps below and published `guides/symbolic-maths`; tables were then documented at `ca96a56`. Still unreviewed at `ca96a56`: `9245d84` (matrices fix), `f3cd9a2` (diagram angle snapping) and `ca96a56` (dashed lines) — all touching features with no page yet. The 95 entries in [feature-map.md](feature-map.md) have **not** been re-surveyed, so treat any entry there as unverified until you read its anchors. Known-new since the survey, with no page-plan entry yet: matrices, sections and beams extensions, samples + guest `/try` mode, share links, `root()` numeric solving, multiline `if`, drag snapping, "Save as…", percent support, the public Contact page, and SEO routing. Features whose gating changed are flagged in the page plan.

The full raw survey (95 feature entries with summaries, source anchors, and gotcha notes) is in [feature-map.md](feature-map.md) in this directory — consult it before writing any page; the entry notes contain verified UI behavior details that belong in the docs.

## Ground rules

- **The app source is the only source of truth.** Read the anchor files before writing a page. Never write docs from memory or from this file alone. Start at `D:\math-explore\CLAUDE.md` for orientation.
- **Audience:** end users (engineers doing calculations), not developers. No source paths, component names, or API routes in published pages.
- **Terminology:** the UI says **calcsheet** (not worksheet) and the product is **Maths Explore** (with the "s"). Match UI labels exactly ("Manage extensions", "Save as template", "Mathew AI nerd").
- **Maths notation:** the site typesets LaTeX, so use it — "beautiful maths" is the product's point. `$inline$` and a **multi-line** `$$` fence for display:
  ```
  $$
  \operatorname{derivative}\left(x^3,\; x\right) = 3x^2
  $$
  ```
  A single-line `$$…$$` renders *inline*, not as a centred block — Sätteri parses it as math-text. Split it across three lines to get a display block.
  Split the two registers deliberately: **typeset** mathematical content (expressions, results, values with units, table contents, the `→` operator), but keep **code spans** for what the reader literally types or sees verbatim — signatures (`derivative(expression, variable)`), keystroke spellings (`->`, `:=`, `3.mm`, `\text{}`), UI labels and error messages. Rendering is build-time KaTeX via `src/plugins/satteri-katex.js`; see the comment in `astro.config.mjs`. Check `npm run build` output for `katex-error` after writing maths.
- **Tier badges:** mark paid-only features clearly (Starlight `<Badge text="Paid" />` in sidebar entries and an `:::note` in the page). Tier facts come from the extension manifests (`requiresPaid`, in `client/src/extensions/*.jsx`), `client/src/utils/featureGates.js`, and `client/src/data/tier-features.md`. **Verified at app `3def0a9`:** the plans are **Free**, **Professional** (what a trial entitles — reads "Professional (trial)") and **Enterprise**. *Individual* was renamed Professional and *Teams* was replaced by Enterprise on 2026-09-23 — never use the old names. Only **three** things are paid: cloud-stored personal **Libraries** (the sole extension with `requiresPaid: true`), **watermark-free PDF export**, and custom text styles (parked — see below). Physical constants, Beams, Sections and Mathew are all free, as are built-in libraries, background templates and archive import. Free is additionally **non-commercial use only**, which is worth stating on any page about plans. `client/src/utils/tierLimits.js` is now only `isPaidTier()` — there is **no block limit** in the app any more.
- **Don't document:** internal build flags (e.g. `VITE_MATHEW_SHOW_ESTIMATE`), disabled features (cloud-drive storage — all client UI commented out as of 2026-05-25), or empty placeholders (the Worksheet Options "Storage" page).

## Process

**Incremental sync (default when docs already exist):**
1. `git -C D:\math-explore log --stat <last-synced-commit>..HEAD` — list changed files.
2. Map changed files to pages via the anchors in [feature-map.md](feature-map.md); a changed anchor means its page(s) need review.
3. Re-read the changed source, update the affected pages, and update the "Sync state" line above to the new HEAD commit.

**Full populate / new page:**
1. Pick the page from the plan below; read its entry (or entries) in [feature-map.md](feature-map.md) including NOTES.
2. Read every anchor file listed for it. Resolve any "verify before publishing" item that touches the page.
3. Write the page to `src/content/docs/<slug>.md` with Starlight frontmatter (`title`, `description`).
4. Guides pages: add a sidebar entry in `astro.config.mjs` (Reference pages are autogenerated from `reference/`).
5. Verify: `npm run build` must pass; check the rendered page with `astro dev --background`.

**Screenshots:** the app repo has Playwright configured. Start the app (`npm run dev:client` from `D:\math-explore`, 127.0.0.1:5173), drive it with Playwright to capture UI states, and save images to `src/assets/` here. Note most flows require a signed-in (Clerk) beta-approved account — ask the user for a test login before attempting authenticated screenshots.

## Verify before publishing (known traps)

Entries marked **[re-verified 3def0a9]** were checked at app HEAD on 2026-10-15. The rest were confirmed only at the `ccd5fed` survey — re-check them against source before relying on them.

- **[re-verified 3def0a9] There is no block limit.** The old `FREE_TIER_BLOCK_LIMIT = 3` vs **30** discrepancy is resolved by deletion: no block limit exists anywhere in the client. Don't publish one, and don't ask the user about it.
- **[re-verified 3def0a9] Trial length is deployment-configurable** — `TRIAL_PERIOD_DAYS`, defaulting to **14** in `get_settings()`. `backend/app/core/config.py` also carries a dead field default of `28` on the `Settings` dataclass; 14 is the live value. Say "14-day" only as the default.
- **[re-verified 3def0a9] Background templates and archive import are FREE** — both are in the Free list in `tier-features.md` and neither has a gate. The survey's `svgBackground` paid gate is gone.
- **[re-verified 3def0a9] Physical constants is a FREE standalone extension** — still its own extension (not part of Library), but no longer paid.
- **[re-verified 3def0a9] Custom text styles are parked** — the UI is commented out in `LibrariesPage.jsx` as of 2026-09-16, and the `customStyles` gate entry is kept only so re-enabling needs no gate work. Per the "don't document disabled features" rule, **drop `guides/custom-text-styles` until it returns.**
- **[re-verified 3def0a9] Header labels are Sign in / Sign up / Open workspace** (lower-case "workspace"). The survey's "Login" and "Create Account" no longer exist, and **"Try Maths Explore" now goes to `/try`** — a signed-out guest demo, not a sign-up path.
- **Units environments:** only **SI** and **Structural** actually work; US Customary, Electrical, and Thermal appear in the dropdown with empty unit sets. Document only SI and Structural.
- **"Save as template"** is gated on sign-in only — NOT paid.
- **There is no separate "Export" menu item** — "Save" IS the .mez file export. Don't document an export command. Note a **"Save as…"** has since been added alongside the bound-file Save; verify both before writing the saving pages.
- **No app-level dark mode** — the only "themes" are text-block themes (Classic/Human/Droid + custom).
- **Spell check is English-only** even though the footer shows the browser locale.
- **Browser-save entry menu** actions are exactly: Rename, Make a copy, Remove, Open in new tab (no Download).
- **Stale internal doc:** `docs/ai_integration.md` says there's no credit top-up path — superseded; the Top up button and credit packs are live.
- A single `=` in a math block **assigns** (equality checks need `==`) — the single most important syntax gotcha to surface.
- Defining a variable named like a unit **shadows the unit sheet-wide** (`m := 12` breaks the metre) — recommend subscripts.

## Page plan (target information architecture)

Sidebar sections and pages, each with the source-of-truth anchors (paths relative to `D:\math-explore`).

**Pages already published:** `guides/getting-started` (written at `ccd5fed`; labels, plan name and the `/try` on-ramp corrected at `3def0a9`), `guides/symbolic-maths` and `reference/symbolic-functions` (both written at `3def0a9`), and `guides/tables` and `reference/table-functions` (both written at `ca96a56`), and `reference/functions`, `reference/matrix-functions`, `guides/matrices` and `guides/keyboard-shortcuts` (all written at **dev** `968b903`).

**Not yet in this plan** — each needs its own entry after the anchors are read. Listed so a sync doesn't mistake them for covered ground:

- **Sections extension** — section properties catalogue, instances, outline. Anchors: `client/src/extensions/sections.jsx`, `client/src/components/SectionsPanel.jsx`, `client/src/utils/sectionProps.js`
- **Beams extension** — beam design formulae, diagram checkbox, description-led insert. Anchors: `client/src/extensions/beams.jsx`, `client/src/components/BeamsPanel.jsx`, `client/src/utils/beamCases.js`
- **Samples and guest `/try`** — public samples pages, "Try without an account", one guest browser-save slot, adoption of the guest sheet on sign-up. Anchors: `client/src/utils/tryDemo.js`, `client/src/utils/sampleManifest.js`, `client/src/components/SamplesPage.jsx`, `client/src/publicRoutes.js`
- **Share links** — Anchors: `client/src/utils/shareLink.js`
- **Numeric root finding** — `root(f, a, b)`, the fallback `solve` points at. Anchors: `client/src/utils/rootFinding.js`
- **Multiline `if`** — the if-array spelling and its display toggle. Anchors: `client/src/utils/multilineIf.js`, `client/src/utils/conditionalDisplay.js`
- **Drag snapping** — snapping and its options. Anchors: `client/src/utils/dragSnap.js`
- **"Save as…"** — alongside the bound-file Save; "the file is the document, autosave is the safety net". Anchors: `client/src/utils/boundFileHandles.js`, `client/src/hooks/useWorksheetPersistence.js`
- **Contact page** — public page relaying to support. Anchors: `client/src/components/ContactPage.jsx`
- **Percent support** — toolbar symbol and the unit field on unitless results.

### Getting started
- **guides/getting-started** — sign in (Clerk modals), private-beta waitlist, country onboarding (sets billing currency), 14-day auto trial, creating a calcsheet (New maths sheet / New from template / worksheet-menu New). Anchors: `client/src/main.jsx`, `client/src/components/SplashPage.jsx`, `client/src/components/BetaPendingScreen.jsx`, `client/src/components/CountryOnboardingScreen.jsx`, `backend/app/users/trial.py`, `client/src/components/HomePage.jsx`, `client/src/components/AppHeader.jsx`

### The canvas
- **guides/adding-blocks** — insertion beacon + toolbar (Math/Diagram/Text/Function/Break), keyboard-first creation (type to start math, Enter, `'` text, `#` function template, Escape, Delete closes whitespace). Anchors: `client/src/components/CanvasSheet.jsx`, `client/src/components/BeaconToolbar.jsx`, `client/src/hooks/useBlocks.js`
- **guides/arranging-blocks** — drag-move, collision pushing (12px margin, on drop), selection (click/Shift/Ctrl/marquee/Ctrl+A), grouping, Align Left, copy/cut/paste (incl. cross-tab `MATH_EXPLORE_BLOCKS_V1` payload, image→diagram, text→text block), Reflow. Anchors: `client/src/hooks/useDragBlock.js`, `client/src/utils/collision.js`, `client/src/utils/blockClipboard.js`, `client/src/components/CanvasSheet.jsx`, `client/src/components/WorksheetFooter.jsx`
- **guides/pages-and-layout** — paginated canvas (A4/US Letter), auto page growth, page breaks (one per page, hatched area), zoom (25–250%, Ctrl+scroll, fit width/page), footer bar. Anchors: `client/src/utils/pageLayout.js`, `client/src/components/PageBreakBlock.jsx`, `client/src/components/WorksheetFooter.jsx`, `client/src/hooks/useKeyboardShortcuts.js`
- **guides/navigating** — Navigate sidebar tab (headings/variables/expressions/functions/assertions, click-to-jump, `+` insert reference, right-click actions), undo/redo (100 snapshots). Anchors: `client/src/components/WorksheetSidebar.jsx`, `client/src/utils/worksheetNavigation.js`, `client/src/hooks/useHistory.js`

### Writing math
- **guides/writing-math** — math blocks, `:=` assignment (`:` key shortcut), `=` also assigns (gotcha!), inline `= result` display, identifier rules (subscripts, multi-letter, Greek, accents), typing shortcuts, autosuggest, token colour-coding. Anchors: `client/src/utils/latexToMathjs.js`, `client/src/utils/mathDefinitions.js`, `client/src/components/MathBlock.jsx`, `client/src/utils/mathFieldHighlighting.js`
- **guides/functions** — `f(x) := ...`, `#` template, convert-expression-to-function, parameter shadowing. Anchors: `client/src/utils/functionDefinitions.js`, `client/src/utils/definitionKind.js`, `client/src/components/ConfirmConvertFunctionModal.jsx`
- **guides/tables** — table blocks: creating one (beacon toolbar → Table, blank 3 × 3, must be named), the row-1-header / column-1-key reading, labels vs body cells (a key `d` is text, never the variable or the day unit; a bare word in a BODY cell needs `	ext{}` via the abc button / Shift+Alt+T), Tab/Shift+Tab/Enter/Escape grid navigation, the insert/delete row/column context menu, reading with lookup/interp/interp2, units, the grid as a 1-based matrix including headers, display/rounding, Navigate sidebar "Matrices & Tables", rename both ways, copy-as-TSV. Free on every plan. Published at app commit `ca96a56`. Anchors: as for `reference/table-functions`, plus `client/src/hooks/useBlocks.js` and `client/src/utils/worksheetNavigation.js`
- **guides/matrices** — the Matrices toolbar group (`[∷]`, `[⋮]`, `|M|`, `Mᵀ`, `M⁻¹`, `vᵢ`, `Mᵢⱼ`, cross/dot/norm/row/column, MathLive's +row/+col/−row/−col on the matrix under the caret); a column pmatrix is a flat vector, a single row a 1×n matrix, vmatrix a determinant; **a subscript is a name, an index is bracketed** (`v_2` is the variable `v_2`; `v[2]` the element; Eurocode `N_{b,Rd}` stays a name) with the right-click "Read v_2 as element of matrix v" respelling and the no-single-element-assignment refusal; the upright-T transpose rule (an italic `T` is a variable, and `M^T` hints at the button); `·` is the matrix product / dot product; scalar functions don't map over a matrix but `abs` and the statistics functions do; the bars reading; units carried through, a shared unit factored out behind the matrix with the result-unit field converting the whole column, mixed units kept per element; literal definitions hide their evaluation; Navigate's "Matrices & Tables". Every value is a `matrixSupport.test.js` assertion or an engine run. Published at **dev** `968b903`. Anchors: `client/src/utils/matrixIndexing.js`, `client/src/utils/latexToMathjs.js` (`emitMatrix`, transpose rewrite), `client/src/utils/formatResult.js` (`formatMatrixResult`), `client/src/components/MathToolbar.jsx` (`MATRIX_BUTTONS`), `client/src/components/BlockItem.jsx` (element toggle), `client/src/utils/worksheetNavigation.js`, tests `matrixSupport`, `matrixIndexing`.
- **guides/symbolic-maths** — simplify/expand/derivative/solve; the two rules (substitute-like-Mathcad, evaluate-when-bound); Mathcad arrow spelling (bare arrow = simplify, chains left to right, variable after comma, top-level only); Symbolics toolbar group; right-click Show as Arrow / Show as Function Call; solve limited to polynomials up to cubic (points at `root(f, a, b)`); symbolic results carry no decimal-places or result-unit field. Not tier-gated. Published at app commit `3def0a9`. Anchors: `client/src/utils/symbolicMath.js`, `client/src/utils/symbolicArrow.js`, `client/src/utils/symbolicDisplay.js`, `client/src/components/MathToolbar.jsx` (`SYMBOLIC_BUTTONS`), `client/src/components/BlockItem.jsx`, `client/src/utils/formatResult.js` (`isNode` branch)
- **guides/units** — dot separator (`2.mm`, `N.m`), unit recovery (full names/plurals on error), per-block result-unit override field, units environment (SI/Structural only), unit-shadowing warning. Anchors: `client/src/utils/latexToMathjs.js`, `client/src/utils/evaluateBlocks.js`, `client/src/utils/formatResult.js`, `client/src/utils/unitEnvironments.js`
- **guides/assertions** — pass/fail checks (`==`, `!=`, `<`, `>`, `<=`, `>=`), `==` vs `=`. Anchors: `client/src/utils/mathDefinitions.js`, `client/src/utils/evaluateBlocks.js`
- **guides/conditionals** — `if(condition, then, else)` (lazy branches), and/or/not/xor, parenthesise each comparison. Anchors: `client/src/utils/mathEngine.js`, `client/src/utils/latexToMathjs.js`
- **guides/variables-and-scope** — one shared scope, reading-order evaluation (y then x, across pages), redefinition semantics, errors don't cascade. Anchors: `client/src/utils/evaluateBlocks.js`, `client/src/utils/blockSort.js`
- **guides/renaming** — sheet-wide rename with preview, "this definition only" scoping, parameter renames. Anchors: `client/src/utils/mathRename.js`, `client/src/components/RenameDefinitionModal.jsx`, `client/src/components/RenameFunctionParametersModal.jsx`
- **guides/formatting-results** — decimal places (worksheet default 4, per-block 0–10), show/hide evaluations (defaults + per-block override). Anchors: `client/src/utils/formatResult.js`, `client/src/utils/worksheetOptions.js`
- **guides/describing-your-math** — description blocks (anchored, repositionable, auto-fallback), detailed function descriptions with per-parameter notes. Anchors: `client/src/components/DescriptionBlock.jsx`, `client/src/components/ParameterDetailsModal.jsx`

### Text, diagrams, images
- **guides/text-blocks** — Markdown, format toolbar (bold/italic/strike, H1–H4 with continuous auto-numbering, lists, links), spell check (English-only), property tokens `{title}` etc. Anchors: `client/src/components/TextBlock.jsx`, `client/src/components/TextFormatToolbar.jsx`, `client/src/utils/spellCheck.js`, `client/src/utils/worksheetProperties.js`
- **guides/diagrams** — drawing tools (line/multiline/rect/oval/scribble), images (paste or file), stroke colour/weight, arrowheads, z-order, resize-vs-crop (Shift). Anchors: `client/src/components/DiagramBlock.jsx`, `client/src/components/DiagramToolbar.jsx`, `client/src/utils/clipboardImages.js`

### Saving & files
- **guides/saving-your-work** — autosave to browser (~0.7s debounce, IndexedDB, 20-sheet cap with eviction), save statuses, emergency recovery on tab close, manual Save to .mez (picker → share → download fallbacks); note files are local/in-browser only (no cloud). Anchors: `client/src/hooks/useWorksheetPersistence.js`, `client/src/utils/worksheetStorage.js`
- **guides/opening-worksheets** — home page browser-saves list (quota readout, Rename/Make a copy/Remove/Open in new tab), open from disk (.mez/.zip/.yaml), recent local files (Chromium only). Anchors: `client/src/components/HomePage.jsx`, `client/src/utils/recentFileSystemFiles.js`
- **guides/importing-worksheets** — SMath Studio (.sm) and Mathcad Prime (.mcdx) import; unconvertible math preserved as text. Anchors: `client/src/components/ImportWorksheetModal.jsx`, `client/src/hooks/useWorksheetImport.js`
- **guides/printing-and-pdf-export** — Print / Export PDF (both browser print), free-tier watermark. Anchors: `client/src/components/PrintWorksheet.jsx`, `client/src/utils/featureGates.js`

### Templates & styling
- **guides/templates-and-backgrounds** — Save as template (sign-in only, single-page sheets), apply background stationery (free as of 2026-09; the old paid gate is gone), editable area (strict mode, footer toggle), in-place background edit mode. Anchors: `client/src/components/SaveTemplateModal.jsx`, `client/src/components/TemplatePickerModal.jsx`, `client/src/utils/backgroundEditMode.js`
- **guides/page-layout-and-styling** — paper size, background patterns (Plain/Grid/Ruled/Dot Grid/SVG), block size, text themes, heading colour; save-as-default settings. Anchors: `client/src/components/WorksheetOptionsModal.jsx`, `client/src/utils/textThemes.js`, `client/src/hooks/useUserPreferences.js`
- ~~**guides/custom-text-styles**~~ — **DO NOT WRITE.** Parked 2026-09-16: the CSS style editor's UI is commented out in `LibrariesPage.jsx`. Restore this entry (with a Paid badge) only once the UI returns. Anchors for then: `client/src/components/StyleEditorModal.jsx`, `client/src/components/LibrariesPage.jsx`
- **guides/worksheet-properties** — inline name edit, title/project/projectNumber/author/checker metadata, `{token}` reference syntax. Anchors: `client/src/utils/worksheetProperties.js`, `client/src/components/WorksheetOptionsModal.jsx`
- **guides/managing-libraries** — the /libraries page: libraries CRUD, items, templates, text styles; paid gating with data retained across downgrades. Anchors: `client/src/components/LibrariesPage.jsx`

### Extensions & Mathew AI
- **guides/sidebar** — activity bar, Navigate + extension tabs, live add/remove, resize. Anchors: `client/src/components/WorksheetSidebar.jsx`, `client/src/extensions/registry.js`, `client/src/extensions/ExtensionsProvider.jsx`
- **guides/managing-extensions** — gear → Manage extensions dialog, per-account toggles, Paid badges/locks. Anchors: `client/src/components/ManageExtensionsModal.jsx`, `client/src/extensions/resolve.js`
- **guides/library** [Paid] — personal libraries of variables/functions/snippets, save entry points, insert at beacon, item management. Anchors: `client/src/extensions/library.jsx`, `client/src/components/LibraryPanel.jsx`, `backend/app/api/routes/libraries.py`
- **guides/physical-constants** — standalone FREE extension: browse/search/insert constants, ambient resolution in formulas (user definitions win), read-only catalogue. Anchors: `client/src/extensions/physicalConstants.jsx`, `client/src/components/PhysicalConstantsPanel.jsx`, `client/src/utils/ambientConstants.js`
- **guides/mathew** — natural-language prompt → live blocks, insert-with-summary + Undo + Next prompt, free-tier block-limit awareness, privacy note (sheet variables sent to the AI provider). Anchors: `client/src/extensions/mathew.jsx`, `client/src/components/MathewPanel.jsx`, `client/src/hooks/useMathew.js`, `docs/ai_integration.md`
- **guides/mathew-credits** — pre-flight estimate + Proceed/Cancel, Stop (partial charge), prepaid credit balance, top-up via credit packs, 402 refusal protects balance. Anchors: `client/src/components/MathewPanel.jsx`, `client/src/components/CreditPacks.jsx`, `docs/ai_billing.md`

### Account & billing
- **guides/plans-and-pricing** — free trial, /plans page, local currency, Professional purchase via Stripe Checkout (monthly/annual), Enterprise = contact us, non-commercial-use limit on Free. Anchors: `client/src/components/PlansPage.jsx`, `client/src/components/PlansContent.jsx`, `client/src/hooks/useBilling.js`, `docs/stripe_billing.md`
- **guides/managing-your-subscription** — Manage plan tab, cancel at period end, resume, trial vs Stripe-managed states. Anchors: `client/src/components/ManagePlanContent.jsx`, `client/src/components/AccountMenu.jsx`

### Reference (autogenerated sidebar)

> **Pages documenting built-in functions** (`reference/*-functions.md`, and `reference/functions` below) follow the docstring pattern in `CLAUDE.md` → "Function reference pages": one `##` per function, `###` Parameters/Returns/Errors/Example, `tableOfContents` capped at level 2, nothing else on the page — the entries are meant to be lifted into the app as per-function help. The other pages below are lookup tables and are not bound by that shape.

- **reference/block-types** — the five block types, default sizes, auto-height. Anchors: `client/src/hooks/useBlocks.js`, `client/src/components/BlockItem.jsx`
- ~~**reference/keyboard-shortcuts**~~ — **published as `guides/keyboard-shortcuts`** (the user asked for it under Guides) at **dev** `968b903`: files, undo/selection, zoom, the beacon keys, and the keys inside maths, text, table and diagram blocks, each key a `<kbd>` keycap. Anchors: `client/src/hooks/useKeyboardShortcuts.js`, `client/src/utils/platform.js`, `client/src/components/AppHeader.jsx` (menu labels), `client/src/components/CanvasSheet.jsx` (beacon keys, keyboard paste), `client/src/components/MathBlock.jsx` (`:`/`#`/Enter/Space/exponent run), `client/src/utils/mathFieldSetup.js`, `client/src/components/MathToolbar.jsx` (text-mode toggles), `client/src/hooks/useSuggestionNavigation.js`, `client/src/components/TextBlock.jsx` (Enter variants, Alt+digit headings, typed Markdown), `client/src/components/DescriptionBlock.jsx`, `client/src/components/TableBlock.jsx`, `client/src/components/DiagramBlock.jsx`, `client/src/App.jsx` (selection modifiers, zoom range)
- **reference/math-toolbar** — toolbar constructs (roots, Greek, operators, function library). Anchors: `client/src/components/MathToolbar.jsx`
- **reference/block-context-menu** — right-click actions and when each appears. Anchors: `client/src/components/BlockItem.jsx`
- **reference/calcsheet-options** — every Worksheet Options setting (skip the empty Storage page). Anchors: `client/src/components/WorksheetOptionsModal.jsx`
- **reference/units** — supported units table; can be generated from `UNIT_FULL_NAMES` (~190 entries, grouped by category comments). Anchors: `client/src/utils/mathFieldHighlighting.js`
- **reference/constants** — math constants (pi, e, gamma, phi, catalan, i, eps) + ambient physical constants. Anchors: `client/src/utils/latexToMathjs.js`, `backend/app/libraries/builtin_constants.json`
- **reference/functions** — docstrings for the 38 names in `BUILT_IN_FUNCTION_NAMES` (`mathFieldHighlighting.js`) that are not symbolic, table or matrix functions, alphabetical as autosuggest lists them. App-specific behaviour the mathjs docs get wrong: `log(x)` is base 10 and `ln` natural (`mathEngine.js`); `norm` is unit-aware; the bars `|x|` are `mezAbs` (vector length / determinant / abs), separate from `abs`; `root(f, a, b)` is Brent's method with a sign-change bracket and unit-carrying ends (`rootFinding.js`); `if` is lazy; `row`/`column` are 1-based; rounding a quantity needs the unit as an extra argument; `mode` always returns a vector; trig on a non-angle unit says *Unit in function cot is no angle* whichever function was called. Every example was executed on the real engine (import `mathEngine.js` from Node — it has no browser deps) and shown at the worksheet's 4 dp; messages are given in the concise form `errorDisplay.js` shows. **Written against the app's `dev` branch at `968b903`** ("some extra functions": `mode`, `prod`, `std`, `variance` and the dev's `functions.md` at the repo root) — those four are not on `main` yet. Anchors: `client/src/utils/mathFieldHighlighting.js`, `client/src/utils/mathEngine.js`, `client/src/utils/rootFinding.js`, `client/src/utils/errorDisplay.js`, `functions.md`, and the tests `logFunctions`, `rootFunction`, `statisticsFunctions`, `angleResultUnit`.
- **reference/matrix-functions** — docstrings for the vector/matrix names: `column`, `cross`, `det`, `dot`, `inv`, `norm`, `row`, `transpose` (`norm` sits here as the length of a vector, not under arithmetic as mathjs files it). Same verification and dev commit as `reference/functions`; the entries were split out of that page verbatim. Anchors: `client/src/utils/mathEngine.js` (unit-aware `norm`, the `mezAbs` bars), `client/src/utils/matrixIndexing.js`, test `matrixSupport`.
- **reference/table-functions** — docstrings for `lookup`, `interp` and `interp2`: signatures, parameters (`T`, `key`/`x`/`y`, `col`), returns, each function's own messages, and a typeset example. Grid rules, editing, toolbar and cell-level messages live in `guides/tables`. Free on every plan. Published at app commit `ca96a56`. Anchors: `client/src/utils/tableLookup.js`, `client/src/utils/tableEvaluation.js`, `client/src/utils/tableCells.js`, `client/src/utils/tableDisplay.js`, `client/src/components/TableBlock.jsx`, `client/src/components/BlockItem.jsx` (table context menu), `client/src/components/BeaconToolbar.jsx`, `client/src/components/MathToolbar.jsx` (`TABLE_BUTTONS`)
- **reference/symbolic-functions** — docstrings for `simplify`, `expand`, `derivative` and `solve`: signatures in both spellings, parameters, returns (incl. `solve`'s degree 1–3 limit and root order), each function's own messages, and a typeset example. Substitution rules, arrow behaviour, toolbar, display toggle and the general messages live in `guides/symbolic-maths`. Published at app commit `3def0a9`. Anchors: as for `guides/symbolic-maths`, plus `client/src/utils/rootFinding.js` for the `root()` fallback.
- **reference/plan-comparison** — Free vs Professional vs Enterprise feature table (no block limit exists; Free is non-commercial only). Anchors: `client/src/data/tier-features.md`, `client/src/utils/featureGates.js`, `backend/app/users/tiers.py`
- **reference/extensions-by-plan** — extension × plan × default-state table. Anchors: `client/src/extensions/resolve.js`, `client/src/extensions/registry.js`
- **reference/mez-file-format** — .mez ZIP structure, worksheet.yaml schema, plain-YAML opening, import guards. Anchors: `client/src/utils/worksheetArchive.js`, `client/src/utils/worksheetYaml.js`, `client/src/utils/zipArchive.js`
- **reference/mathew-models** — model picker (Claude/DeepSeek), pricing/persistence behavior; conditional on server config. Anchors: `client/src/components/MathewPanel.jsx`, `client/src/hooks/useMathew.js`
