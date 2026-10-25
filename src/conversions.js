// Conversões do Google Ads: clique em qualquer botão marcado com data-cta
// (whatsapp ou telefone) envia gtag('event', 'conversion') com o rótulo do siteConfig.
import { GOOGLE_ADS_ID, CONVERSION_LABELS } from './siteConfig';

export const trackConversions = () => {
  document.addEventListener('click', (event) => {
    const cta = event.target.closest?.('[data-cta]')?.dataset.cta;
    const label = CONVERSION_LABELS[cta];
    if (!label || !GOOGLE_ADS_ID || typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}`, value: 1.0, currency: 'BRL' });
  });
};
