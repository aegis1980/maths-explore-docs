// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import { satteriKatex } from './src/plugins/satteri-katex.js';

// https://astro.build/config
export default defineConfig({
	// Maths in docs pages: `$inline$` and `$$display$$`. Sätteri (Astro 7's default
	// Markdown processor) parses the dollar runs natively via `features.math`, and
	// satteriKatex typesets them at BUILD time, so pages ship plain HTML with no
	// client-side maths JS. rehype-katex can't be used directly: Sätteri's plugin
	// pipeline takes its own visitor shape, not unified plugins.
	//
	// KaTeX is the right renderer for this site: the webapp's own static maths
	// (MathLive's convertLatexToMarkup) is laid out with the KaTeX fonts, so
	// typeset maths here matches the product. Its stylesheet is loaded through
	// Starlight's `customCss` below.
	markdown: {
		processor: satteri({
			features: { math: true },
			hastPlugins: [satteriKatex()],
		}),
	},
	integrations: [
		starlight({
			title: 'Maths Explore',
			logo: { src: './src/assets/balloon_white_h30px.png', alt: '' },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/aegis1980/maths-explore-docs' },
			],
			customCss: ['katex/dist/katex.min.css', './src/styles/custom.css'],
			components: {
				Footer: './src/components/Footer.astro',
			},
			// Sora — the webapp's UI font (see client/index.html)
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap',
					},
				},
			],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting started', slug: 'guides/getting-started' },
						{ label: 'Symbolic maths', slug: 'guides/symbolic-maths' },
						{ label: 'Tables', slug: 'guides/tables' },
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
});
