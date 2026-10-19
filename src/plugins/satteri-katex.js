import katex from 'katex';

// Typeset Sätteri's parsed maths with KaTeX, at build time.
//
// Sätteri's `features.math` turns `$x$` into `<code class="language-math
// math-inline">` and `$$x$$` into a `<pre>` wrapping `<code class=
// "language-math math-display">`. Both are replaced here with KaTeX's own
// markup, so the page ships typeset HTML and no maths JS. The display case
// has to swallow the `<pre>`: left in place it would also be claimed by
// Expressive Code and rendered as a syntax-highlighted code block.
//
// This is a Sätteri hast visitor, not a unified/rehype plugin — Sätteri's
// pipeline has its own plugin shape (`{ name, element: { filter, visit } }`),
// so rehype-katex cannot be dropped in directly.

const INLINE_CLASS = 'math-inline';
const DISPLAY_CLASS = 'math-display';

function classNames(node) {
	const value = node?.properties?.className ?? node?.properties?.class;
	if (Array.isArray(value)) return value.map(String);
	return String(value ?? '')
		.split(/\s+/)
		.filter(Boolean);
}

// A node's text, including through any nested elements the parser produced.
function textOf(node) {
	if (node?.type === 'text') return String(node.value ?? '');
	return (node?.children ?? []).map(textOf).join('');
}

function mathKind(node) {
	if (node?.tagName !== 'code') return null;
	const classes = classNames(node);
	if (classes.includes(DISPLAY_CLASS)) return 'display';
	if (classes.includes(INLINE_CLASS)) return 'inline';
	return null;
}

// The single <code> a <pre> wraps, ignoring whitespace-only text nodes.
function wrappedCode(node) {
	const children = (node?.children ?? []).filter(
		(child) => !(child.type === 'text' && !String(child.value ?? '').trim())
	);
	return children.length === 1 ? children[0] : null;
}

function render(latex, displayMode, options) {
	return katex.renderToString(latex, {
		...options,
		displayMode,
		throwOnError: false,
		output: 'html',
	});
}

export function satteriKatex(options = {}) {
	return {
		name: 'satteri-katex',
		element: {
			filter: ['code', 'pre'],
			visit(node) {
				if (node.tagName === 'pre') {
					const code = wrappedCode(node);
					if (mathKind(code) !== 'display') return;
					return {
						type: 'raw',
						value: render(textOf(code).trim(), true, options),
					};
				}

				const kind = mathKind(node);
				if (!kind) return;
				return {
					type: 'raw',
					value: render(textOf(node).trim(), kind === 'display', options),
				};
			},
		},
	};
}
