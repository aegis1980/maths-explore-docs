// Site-wide SEO constants, mirroring the webapp's client/src/seo/site.js and
// jsonLd.js so the docs read as part of the same brand to a crawler.
//
// The docs are their own site (docs.mathsexplore.com), but they are published
// by the same organisation and are *about* the same web application, so the
// structured data here points at the app's own schema.org node ids rather than
// inventing a second organisation. Imported by astro.config.mjs (site-wide
// head tags) and src/components/Head.astro (per-page tags).

export const SITE_URL = 'https://docs.mathsexplore.com';
export const APP_URL = 'https://www.mathsexplore.com';

export const SITE_NAME = 'Maths Explore';
export const SITE_TITLE = 'Maths Explore Docs';
export const ORGANISATION_NAME = 'Techos Design Ltd.';

export const DEFAULT_DESCRIPTION =
	'The Maths Explore user guide: writing maths with units, symbolic maths, tables and every built-in function of the free browser-based calculation pad for engineers.';

// The app's one share image, copied into public/ so link previews of the docs
// match the product's. 1200 × 627.
export const OG_IMAGE = Object.freeze({
	path: '/og-image.png',
	width: 1200,
	height: 627,
	alt: 'An engineering calculation set out in Maths Explore, with its results shown in place.',
});

// Node ids the app's own JSON-LD declares (client/src/seo/jsonLd.js).
export const ORGANISATION_ID = `${APP_URL}/#organization`;
export const WEBAPP_ID = `${APP_URL}/#webapp`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function absoluteUrl(path = '/') {
	const relative = String(path ?? '/');
	return `${SITE_URL}${relative.startsWith('/') ? relative : `/${relative}`}`;
}

// JSON for an inline <script type="application/ld+json">: only `<` could end
// the element early, so it is the one character escaped.
export function jsonLdText(value) {
	return JSON.stringify(value).replaceAll('<', '\\u003c');
}

// The site-wide graph, emitted on every page: this WebSite, published by the
// app's Organization (restated with the same id and fields so the two merge)
// and about its WebApplication.
export function siteGraph() {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Organization',
				'@id': ORGANISATION_ID,
				name: ORGANISATION_NAME,
				url: `${APP_URL}/`,
				logo: {
					'@type': 'ImageObject',
					url: `${APP_URL}/favicon.png`,
					width: 512,
					height: 512,
				},
				brand: { '@type': 'Brand', name: SITE_NAME },
			},
			{
				'@type': 'WebSite',
				'@id': WEBSITE_ID,
				name: SITE_TITLE,
				url: `${SITE_URL}/`,
				description: DEFAULT_DESCRIPTION,
				inLanguage: 'en',
				publisher: { '@id': ORGANISATION_ID },
				about: { '@id': WEBAPP_ID },
			},
		],
	};
}
