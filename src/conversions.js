// Conversões do Google Ads: clique em qualquer botão marcado com data-cta
// (whatsapp ou telefone) envia gtag('event', 'conversion') com o rótulo do siteConfig.
// Também envia ao GA4 o evento clique_whatsapp / clique_ligar com a posição do botão (data-posicao).
import { GOOGLE_ADS_ID, CONVERSION_LABELS } from './siteConfig';

export const trackConversions = () => {
  document.addEventListener('click', (event) => {
    const el = event.target.closest?.('[data-cta]');
    const cta = el?.dataset.cta;
    if (!cta || typeof window.gtag !== 'function') return;
    window.gtag('event', cta === 'whatsapp' ? 'clique_whatsapp' : 'clique_ligar', {
      posicao: el.dataset.posicao || 'nao-informada',
      pagina: window.location.pathname,
      transport_type: 'beacon',
    });
    const label = CONVERSION_LABELS[cta];
    if (!label || !GOOGLE_ADS_ID) return;
    // Os links abrem em nova aba; beacon garante o envio mesmo se a página mudar.
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/${label}`,
      value: 1.0,
      currency: 'BRL',
      transport_type: 'beacon',
    });
  });
};
