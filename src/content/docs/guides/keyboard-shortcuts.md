---
title: Keyboard shortcuts
description: Every keyboard shortcut in Maths Explore, covering help, files, undo and selection, zoom, adding blocks at the beacon, and the keys inside maths, text, table and diagram blocks.
---

Maths Explore is built to be driven from the keyboard: add a maths block, write it, move on to the next, and never reach for the mouse. This page is the lot.

On a Mac, press <kbd>⌘</kbd> where <kbd>Ctrl</kbd> is shown and <kbd>⌥</kbd> where <kbd>Alt</kbd> is. The app's own menus show the Mac keys. Shortcuts pause while a dialog is open, except <kbd>F1</kbd>. The sheet-wide ones (undo, copy, delete) stand aside while you're typing inside a block – those keys keep their ordinary meaning in text. <kbd>Ctrl</kbd> + <kbd>A</kbd> is the exception: it selects every block, even from inside one.

## Help

| Keys | Does |
| :-- | :-- |
| <kbd>F1</kbd> | Opens these docs in a help window beside the sheet, at the page for what you're working on. Later presses reuse the same window. |

Where it lands depends on where you are:

- **Inside a built-in function's brackets**, such as `round(…)`: that function's entry in the reference. In nested calls the innermost one wins.
- **On a function highlighted in the suggestion menu**: its entry, before you've accepted it.
- **Anywhere else in a maths block**: [Built-in functions](/reference/functions/).
- **In a table**: [Tables](/guides/tables/). **In a text block**: [Text blocks](/guides/text-blocks/).
- **With calcsheet options open**: [Calcsheet options](/guides/calcsheet-options/).
- **Nothing in particular**: the docs home, which is also where the header's **Help** button goes.

Your own functions have no entry here, so a call to one opens the built-in functions reference. That holds even for one you've named `round`, which shadows the built-in on that sheet. On a Mac keyboard <kbd>F1</kbd> usually needs <kbd>fn</kbd> held down.

## Files

| Keys | Does |
| :-- | :-- |
| <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>N</kbd> | New calcsheet. The <kbd>Alt</kbd> is deliberate: browsers keep plain <kbd>Ctrl</kbd> + <kbd>N</kbd> for themselves. Not while typing in a block. |
| <kbd>Ctrl</kbd> + <kbd>O</kbd> | Open: goes to Home, where your calcsheets are listed. |
| <kbd>Ctrl</kbd> + <kbd>S</kbd> | Save. |
| <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Save as…, once the sheet is saved to a file. Before that it is the same as Save, which asks where to save. |
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | Print. The same dialog exports a PDF. |

## Editing the sheet

| Keys | Does |
| :-- | :-- |
| <kbd>Ctrl</kbd> + <kbd>Z</kbd> | Undo. |
| <kbd>Ctrl</kbd> + <kbd>Y</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> | Redo. |
| <kbd>Ctrl</kbd> + <kbd>A</kbd> | Select every block. |
| <kbd>Shift</kbd> + click or <kbd>Ctrl</kbd> + click | Add a block to the selection, or take it out again. A grouped block brings its whole group. |
| <kbd>Ctrl</kbd> + <kbd>C</kbd> / <kbd>Ctrl</kbd> + <kbd>X</kbd> | Copy or cut the selected blocks. They paste into any calcsheet, including one open in another tab. |
| <kbd>Ctrl</kbd> + <kbd>V</kbd> | Paste, just beside the selected blocks, or in the middle of the view when nothing is selected. With the insertion beacon showing, blocks paste at the beacon instead. |
| <kbd>Delete</kbd> | Remove the selected blocks. |

## Zoom

| Keys | Does |
| :-- | :-- |
| <kbd>Ctrl</kbd> + <kbd>=</kbd> or <kbd>Ctrl</kbd> + <kbd>+</kbd> | Zoom in. |
| <kbd>Ctrl</kbd> + <kbd>-</kbd> | Zoom out. |
| <kbd>Ctrl</kbd> + <kbd>0</kbd> | Back to 100 %. |
| <kbd>Ctrl</kbd> + scroll wheel | Zoom in and out. The browser's own page zoom never kicks in. |

The numpad's <kbd>+</kbd>, <kbd>-</kbd> and <kbd>0</kbd> work too. Zoom runs from 25 % to 250 % in steps of 20 %.

## Adding blocks at the beacon

Click an empty spot on a page and the insertion beacon appears there with its toolbar. While it is showing, the keyboard does the toolbar's job:

| Keys | Does |
| :-- | :-- |
| any letter, digit or symbol | A maths block that starts with that character. Just begin typing the maths. |
| <kbd>Enter</kbd> | An empty maths block. |
| <kbd>'</kbd> | A text block. |
| <kbd>#</kbd> | A user-function block. |
| <kbd>Delete</kbd> | Closes up one row of empty space below the beacon, pulling the blocks beneath it up. Press again to keep closing. |
| <kbd>Ctrl</kbd> + <kbd>V</kbd> | Paste at the beacon: copied blocks, an image (as a new diagram block) or plain text (prose as text blocks, LaTeX as maths blocks; see [Using LaTeX](/advanced/using-latex/#paste-a-document-onto-the-page)). |
| <kbd>Escape</kbd> | Dismiss the beacon. |

## In a maths block

| Keys | Does |
| :-- | :-- |
| <kbd>:</kbd> | Types the assignment `:=`. Inside a subscript it first hops out, so `A_3 :=` comes out right. |
| <kbd>#</kbd> | In an empty block, inserts a function-definition template. |
| <kbd>Enter</kbd> | Finishes the block and opens a new maths block below it. |
| <kbd>Space</kbd> | Inside a subscript or superscript: leaves the script. Anywhere else: a visible space, ignored when the maths is evaluated. |
| <kbd>^</kbd> then digits | The whole number goes into the exponent. Type `2^10` straight through, with no arrow key needed. |
| <kbd>"</kbd> or <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> | Switch to text mode, for a label such as a table key. The same keys switch back to maths. |

While the suggestion menu is open:

| Keys | Does |
| :-- | :-- |
| <kbd>↓</kbd> / <kbd>↑</kbd> | Move through the suggestions. |
| <kbd>Enter</kbd> or <kbd>Tab</kbd> | Accept the highlighted suggestion. |
| <kbd>Escape</kbd> | Close the menu. |

## In a text block

| Keys | Does |
| :-- | :-- |
| <kbd>Enter</kbd> | Finishes the text and opens a new maths block below it. |
| <kbd>Ctrl</kbd> + <kbd>Enter</kbd> | A new paragraph within the block. |
| <kbd>Shift</kbd> + <kbd>Enter</kbd> | A line break. |
| <kbd>Alt</kbd> + <kbd>1</kbd> … <kbd>Alt</kbd> + <kbd>4</kbd> | Heading level 1 to 4. |
| <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>1</kbd> … <kbd>4</kbd> | A numbered heading, level 1 to 4, numbered continuously through the sheet. |
| <kbd>Ctrl</kbd> + click a link | Opens it in a new tab. A plain click places the caret. |

Markdown typed into a text block formats as you go: a second <kbd>*</kbd> or <kbd>_</kbd> turns bold on and off, a second <kbd>~</kbd> strikethrough; and at the start of a line, `#`, `##` or `###` followed by a space makes a heading, `-` a bulleted list, `1.` a numbered list and `>` a quote.

In a description block under a maths block, <kbd>Ctrl</kbd> + <kbd>B</kbd> is bold and <kbd>Ctrl</kbd> + <kbd>I</kbd> italic.

## In a table

| Keys | Does |
| :-- | :-- |
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Next / previous cell, wrapping at row ends. <kbd>Tab</kbd> past the last cell appends a new row. |
| <kbd>Enter</kbd> | Down one row. On the last row, appends a new one. |
| <kbd>Escape</kbd> | Leave the cell. |
| <kbd>Tab</kbd> or <kbd>Enter</kbd> in the name field | Into the first cell. |
| <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>T</kbd> | Type the cell as text. A word in a body cell is otherwise read as maths. |

## In a diagram

| Keys | Does |
| :-- | :-- |
| <kbd>Escape</kbd> | Cancel the drawing tool, or the shape in progress. |
| <kbd>Enter</kbd> | Finish a multiline. |
| <kbd>Delete</kbd> or <kbd>Backspace</kbd> | While drawing a multiline: remove its last point. Otherwise: delete the selected shapes. |
| <kbd>←</kbd> <kbd>↑</kbd> <kbd>→</kbd> <kbd>↓</kbd> | Nudge the selected shapes by 1 px, or 10 px with <kbd>Shift</kbd>. Each nudge is one undo step. |
| <kbd>Shift</kbd> + drag | With the select tool: a selection box around several shapes. |
| <kbd>Shift</kbd> while drawing a line | Holds the segment to a multiple of 45°. |
| <kbd>Shift</kbd> while moving | Moves along a 45° line from where the drag began. |
| <kbd>Shift</kbd> while resizing | Crops instead of scaling. |
| <kbd>Ctrl</kbd> + <kbd>C</kbd> / <kbd>X</kbd> / <kbd>V</kbd> | Copy, cut and paste shapes between diagrams. |

## Menus and dialogs

<kbd>Escape</kbd> closes any dialog, dropdown or right-click menu.
