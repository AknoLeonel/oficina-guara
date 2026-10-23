// Roda depois do `vite build`:
// - cria dist/<slug>/index.html para cada landing page com title, description, canonical,
//   Open Graph e preload do banner já no HTML (o Google e o WhatsApp leem sem rodar JS);
// - gera dist/sitemap.xml, dist/robots.txt e dist/spa.html (fallback das outras rotas).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { LANDING_PAGES } from '../src/landingPages.js';
import { SITE_URL, HOME_META } from '../src/siteConfig.js';

const DIST = 'dist';
const SERVICE_PATHS = ['mecanica-motor', 'eletrica-tecnologia', 'suspensao-freios', 'conforto-clima'].map((id) => `/servicos/${id}`);

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const replaceOrFail = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender: padrão não encontrado no index.html: ${pattern}`);
  return html.replace(pattern, replacement);
};

const renderPage = ({ title, description, path, banner }) => {
  const url = SITE_URL + path;
  let html = template;
  html = replaceOrFail(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrFail(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceOrFail(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = replaceOrFail(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);

  const extra = [`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`];
  if (banner) {
    html = replaceOrFail(html, /<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${SITE_URL}${banner.desktop}" />`);
    extra.push(
      `<link rel="preload" as="image" type="image/webp" href="${banner.mobile}" media="(max-width: 767px)" fetchpriority="high" />`,
      `<link rel="preload" as="image" type="image/webp" href="${banner.desktop}" media="(min-width: 768px)" fetchpriority="high" />`,
    );
  }
  return html.replace('</head>', `  ${extra.join('\n    ')}\n  </head>`);
};

for (const page of LANDING_PAGES) {
  const dir = join(DIST, page.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, 'index.html'),
    renderPage({
      title: page.title,
      description: page.description,
      path: page.path,
      banner: { mobile: page.bannerMobile, desktop: page.bannerDesktop },
    }),
  );
}

// Fallback da SPA (vercel.json) para as demais rotas: sem canonical, o React define na página.
writeFileSync(join(DIST, 'spa.html'), template);
// A home também ganha canonical no HTML.
writeFileSync(join(DIST, 'index.html'), renderPage({ ...HOME_META, path: '/' }));

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...LANDING_PAGES.map((page) => page.path), ...SERVICE_PATHS];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((path) => `  <url><loc>${SITE_URL}${path}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log(`prerender: ${LANDING_PAGES.length} landing pages, sitemap com ${urls.length} URLs`);
