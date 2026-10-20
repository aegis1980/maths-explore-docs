// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { satteri } from '@astrojs/markdown-satteri';
import { satteriKatex } from './src/plugins/satteri-katex.js';
import { absoluteUrl, DEFAULT_DESCRIPTION, OG_IMAGE, SITE_URL, siteGraph } from './src/seo.mjs';

// https://astro.build/config
export default defineConfig({
	// The canonical origin. Setting it turns on everything Starlight derives from
	// it: <link rel="canonical">, og:url and the sitemap. The Pages workflow passes
	// the same value with --site (the repo's custom domain), so CI and local
	// builds agree.
	site: SITE_URL,
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
			description: DEFAULT_DESCRIPTION,
			// The app's own brand assets (client/public/): the balloon the header
			// shows at 30px, and the 512px favicon — also the apple-touch-icon, as in
			// the app's index.html. Keep both files in step with the app.
			logo: { src: './src/assets/balloon_white.png', alt: '' },
			favicon: '/favicon.png',
			// <html lang> and hreflang; the app's pages declare en_GB too.
			locales: { root: { label: 'English', lang: 'en-GB' } },
			// Real "last updated" dates from git (the Pages workflow checks out full
			// history for this) — shown on each page and used as dateModified.
			lastUpdated: true,
			editLink: { baseUrl: 'https://github.com/aegis1980/maths-explore-docs/edit/main/' },
			// Site-wide SEO tags, mirroring the webapp's (client/src/seo/). Per-page
			// structured data is added by src/components/Head.astro.
			head: [
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', href: absoluteUrl('/favicon.png') } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#212529' } },
				// Replaces Starlight's default og:locale (it emits the BCP 47 "en-GB";
				// Open Graph wants "en_GB", which is what the app emits).
				{ tag: 'meta', attrs: { property: 'og:locale', content: 'en_GB' } },
				{ tag: 'meta', attrs: { property: 'og:image', content: absoluteUrl(OG_IMAGE.path) } },
				{ tag: 'meta', attrs: { property: 'og:image:width', content: String(OG_IMAGE.width) } },
				{ tag: 'meta', attrs: { property: 'og:image:height', content: String(OG_IMAGE.height) } },
				{ tag: 'meta', attrs: { property: 'og:image:alt', content: OG_IMAGE.alt } },
				{ tag: 'meta', attrs: { name: 'twitter:image', content: absoluteUrl(OG_IMAGE.path) } },
				// Search Console HTML-tag verification, only when the repo variable is
				// set (the workflow passes vars.GOOGLE_SITE_VERIFICATION through).
				...(process.env.GOOGLE_SITE_VERIFICATION
					? [
							{
								tag: 'meta',
								attrs: {
									name: 'google-site-verification',
									content: process.env.GOOGLE_SITE_VERIFICATION,
								},
							},
						]
					: []),
				{
					tag: 'script',
					attrs: { type: 'application/ld+json' },
					content: JSON.stringify(siteGraph()).replaceAll('<', '\\u003c'),
				},
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/aegis1980/maths-explore-docs' },
			],
			// Fonts are the webapp's own self-hosted builds (Inter for body/UI, Sora
			// for headings — see client/src/main.jsx), so no Google Fonts request.
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/sora',
				// Keys on the keyboard-shortcuts page are set in Geist Mono (see custom.css).
				'@fontsource-variable/geist-mono',
				'katex/dist/katex.min.css',
				'./src/styles/custom.css',
			],
			components: {
				Footer: './src/components/Footer.astro',
				Head: './src/components/Head.astro',
				Header: './src/components/Header.astro',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting started', slug: 'guides/getting-started' },
						{ label: 'Symbolic maths', slug: 'guides/symbolic-maths' },
						{ label: 'Matrices', slug: 'guides/matrices' },
						{ label: 'Tables', slug: 'guides/tables' },
						{ label: 'Keyboard shortcuts', slug: 'guides/keyboard-shortcuts' },
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
