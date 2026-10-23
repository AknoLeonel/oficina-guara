# Oficina Guará

Site da oficina especialista em 4x4 e pick-ups no Guará II, Brasília.

[![Ver site no ar](https://img.shields.io/badge/Ver%20site%20no%20ar-00F5FF?style=for-the-badge&labelColor=0D1117)](https://oficina-guara.vercel.app) [![Portfólio](https://img.shields.io/badge/Portfólio-FF00E4?style=for-the-badge&labelColor=0D1117)](https://aknoleonel.github.io)

## Sobre o projeto

Site de um centro automotivo que começou na garagem de casa e hoje atende Toyota, Nissan, GM, Ford, VW, Mitsubishi e outras marcas. O destaque é um diagnóstico rápido em que o cliente escolhe o sintoma do carro e já é direcionado para o atendimento certo.

## Destaques

- Seletor interativo de sintomas: barulho estranho, luz no painel, carro falhando, freio ruim ou revisão
- Menu de serviços por área: motor, elétrica, suspensão e freios, conforto e clima
- História da oficina e contato direto por WhatsApp e telefone
- Navegação entre páginas com React Router

## Landing pages (anúncios)

As 12 páginas do guia da Agência Empatia (out/2026) ficam em `src/landingPages.js`: H1, title, meta description, alt do banner e mensagem de WhatsApp de cada uma. No `npm run build`, o `scripts/prerender.mjs` gera um HTML por página com o SEO já preenchido, além do `sitemap.xml` e do `robots.txt`.

- Banners: `public/banners/banner-<página>-mobile.webp` (1080×1350, até 200 KB) e `-desktop.webp` (1920×700, até 250 KB). Para trocar pela foto da produtora, basta substituir o arquivo com o mesmo nome.
- Domínio, GTM e WhatsApp: `src/siteConfig.js`.

## Tecnologias

React · Vite · React Router · Lucide Icons

## Rodando localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção: `npm run build`.

---

Desenvolvido por [Leonel Paiva](https://github.com/AknoLeonel) · [Instagram](https://www.instagram.com/muvageof) · [Mais projetos](https://aknoleonel.github.io)
