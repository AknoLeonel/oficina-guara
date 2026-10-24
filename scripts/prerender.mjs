// Roda depois do `vite build` e do build SSR (dist-ssr/entry-server.js):
// - cria dist/<slug>/index.html para cada landing page com o conteúdo (H1, banner, textos) já no HTML,
//   mais title, description, canonical, Open Graph, dados estruturados e preload do banner;
// - pré-renderiza a home e o dist/404.html (servido pela Vercel com status 404);
// - gera dist/sitemap.xml, dist/robots.txt e dist/spa.html (fallback de /servicos/*).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { LANDING_PAGES } from '../src/landingPages.js';
import { SITE_URL, HOME_META } from '../src/siteConfig.js';

const DIST = 'dist';
const SERVICE_PATHS = ['mecanica-motor', 'eletrica-tecnologia', 'suspensao-freios', 'conforto-clima'].map((id) => `/servicos/${id}`);

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const jsonLd = (data) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Oficina do Éder',
  alternateName: 'Oficina Guará',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/logo-oficina-guara.png`,
  telephone: '+55-61-98207-9250',
  email: 'oficinadoeder@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Área Especial 2A, Conjunto A, Lote 6',
    addressLocality: 'Guará II, Brasília',
    addressRegion: 'DF',
    postalCode: '71070-625',
    addressCountry: 'BR',
  },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '18:00',
  }],
};

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

const replaceOrFail = (html, search, replacement) => {
  const found = typeof search === 'string' ? html.includes(search) : search.test(html);
  if (!found) throw new Error(`prerender: trecho não encontrado no index.html: ${search}`);
  return html.replace(search, replacement);
};

const renderPage = ({ title, description, path, banner, breadcrumb, noindex = false, renderPath = path }) => {
  const url = SITE_URL + path;
  let html = template;
  html = replaceOrFail(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrFail(html, /<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceOrFail(html, /<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = replaceOrFail(html, /<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);

  const extra = [];
  if (noindex) {
    extra.push('<meta name="robots" content="noindex" />');
  } else {
    extra.push(`<link rel="canonical" href="${url}" />`, `<meta property="og:url" content="${url}" />`, jsonLd(BUSINESS));
  }
  if (breadcrumb) {
    extra.push(jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: breadcrumb, item: url },
      ],
    }));
  }
  if (banner) {
    html = replaceOrFail(html, /<meta property="og:image" content="[^"]*"\s*\/>/, `<meta property="og:image" content="${SITE_URL}${banner.desktop}" />`);
    extra.push(
      `<link rel="preload" as="image" type="image/webp" href="${banner.mobile}" media="(max-width: 767px)" fetchpriority="high" />`,
      `<link rel="preload" as="image" type="image/webp" href="${banner.desktop}" media="(min-width: 768px)" fetchpriority="high" />`,
    );
  }
  html = html.replace('</head>', `  ${extra.join('\n    ')}\n  </head>`);
  return replaceOrFail(html, '<div id="root"></div>', `<div id="root">${render(renderPath)}</div>`);
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
      breadcrumb: page.name,
    }),
  );
}

// Fallback de /servicos/* (vercel.json): sem canonical nem conteúdo, o React monta a página.
writeFileSync(join(DIST, 'spa.html'), template);
// Qualquer outra URL: página 404 de verdade (status 404 na Vercel).
writeFileSync(join(DIST, '404.html'), renderPage({
  title: 'Página não encontrada | Oficina Guará',
  description: HOME_META.description,
  path: '/404',
  noindex: true,
}));
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

console.log(`prerender: ${LANDING_PAGES.length} landing pages + home + 404, sitemap com ${urls.length} URLs`);
