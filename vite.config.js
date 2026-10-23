import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { GTM_ID } from './src/siteConfig.js'

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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), gtm()],
})
