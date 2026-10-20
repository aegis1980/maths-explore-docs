import type { APIRoute } from 'astro';

// robots.txt, built rather than static so the sitemap line always carries the
// real origin and base path (`site`/`base` are injected by the Pages workflow).
// Everything is indexable: the docs have no private routes.
export const GET: APIRoute = ({ site }) => {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const sitemap = site ? new URL(`${base}/sitemap-index.xml`, site).href : `${base}/sitemap-index.xml`;

	const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
