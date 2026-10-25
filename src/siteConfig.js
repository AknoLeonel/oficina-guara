// --- CONFIGURAÇÃO GERAL DO SITE ---
// Usado pelo app (React) e pelo build (vite.config.js e scripts/prerender.mjs).

// Domínio final do site: usado no canonical, no og:url e no sitemap.xml.
export const SITE_URL = 'https://www.oficinaguara.com.br';

// ID do Google Tag Manager (ex.: 'GTM-ABC1234'). Vazio = GTM não é carregado.
export const GTM_ID = 'GTM-PCNWNRT';

// Tags do Google (gtag.js): um script só, um gtag('config') por ID. Vazio = não carrega.
export const GOOGLE_ADS_ID = 'AW-18535552477';
export const GOOGLE_ANALYTICS_ID = 'G-GTRQ7E2Y9G';
export const GOOGLE_TAG_IDS = [GOOGLE_ADS_ID, GOOGLE_ANALYTICS_ID].filter(Boolean);

// Rótulos das conversões do Google Ads (parte depois da barra no send_to: 'AW-.../RÓTULO').
// Vazio = o clique não é enviado como conversão.
export const CONVERSION_LABELS = {
  whatsapp: 'xvsUCLek_KgdEN2ruIZF', // "Clique no WhatsApp"
  telefone: '',
};

// Telefone e WhatsApp oficiais (55 + DDD + número). A agência ainda vai confirmar o número.
export const WHATSAPP_NUMBER = '5561982079250';
export const PHONE_DISPLAY = '(61) 98207-9250';
export const PHONE_LINK = `tel:+${WHATSAPP_NUMBER}`;
export const WHATSAPP_DEFAULT_MESSAGE = 'Gostaria de informações oficina guara';

export const whatsappLink = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// SEO da home (mesmo texto do index.html).
export const HOME_META = {
  title: 'Oficina Guará - Especialista em 4x4 e Pick-ups | Guará DF',
  description: 'Centro automotivo no Guará II especializado em revisão de caminhonetes, 4x4, Toyota, Ford e GM. Diagnóstico completo, injeção eletrônica e mecânica de confiança.',
};

// Redes sociais: só aparecem no rodapé quando preenchidas (ex.: 'https://instagram.com/oficinaguara').
export const SOCIAL_LINKS = {
  instagram: '',
  facebook: '',
};

export const EMAIL = 'oficinadoeder@gmail.com';
export const MAPS_LINK = 'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Oficina do Éder, Área Especial 2A, Conjunto A, Lote 6, Guará II, Brasília - DF, 71070-625');
