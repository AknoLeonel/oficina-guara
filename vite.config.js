import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { GTM_ID, GOOGLE_ADS_ID } from './src/siteConfig.js'

// Google Tag Manager em todas as páginas (o ID fica em src/siteConfig.js)
const gtm = () => ({
  name: 'gtm',
  transformIndexHtml() {
    if (!GTM_ID) return []
    return [
      {
        tag: 'script',
        injectTo: 'head-prepend',
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
      },
      {
        tag: 'noscript',
        injectTo: 'body-prepend',
        children: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      },
    ]
  },
})

// Tag do Google Ads (gtag.js) em todas as páginas (o ID fica em src/siteConfig.js)
const googleAds = () => ({
  name: 'google-ads',
  transformIndexHtml() {
    if (!GOOGLE_ADS_ID) return []
    return [
      {
        tag: 'script',
        attrs: { async: true, src: `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}` },
        injectTo: 'head',
      },
      {
        tag: 'script',
        injectTo: 'head',
        children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GOOGLE_ADS_ID}');`,
      },
    ]
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), gtm(), googleAds()],
})
