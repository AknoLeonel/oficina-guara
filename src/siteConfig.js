// --- CONFIGURAÇÃO GERAL DO SITE ---
// Usado pelo app (React) e pelo build (vite.config.js e scripts/prerender.mjs).

// Domínio final do site: usado no canonical, no og:url e no sitemap.xml.
export const SITE_URL = 'https://oficina-guara.vercel.app';

// ID do Google Tag Manager (ex.: 'GTM-ABC1234'). Vazio = GTM não é carregado.
export const GTM_ID = '';

export const WHATSAPP_NUMBER = '5561982079250';
export const WHATSAPP_DEFAULT_MESSAGE = 'Gostaria de informações oficina guara';

export const whatsappLink = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// SEO da home (mesmo texto do index.html).
export const HOME_META = {
  title: 'Oficina Guará - Especialista em 4x4 e Pick-ups | Guará DF',
  description: 'Centro automotivo no Guará II especializado em revisão de caminhonetes, 4x4, Toyota, Ford e GM. Diagnóstico completo, injeção eletrônica e mecânica de confiança.',
};
