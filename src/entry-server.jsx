// Renderização no build (scripts/prerender.mjs): gera o HTML das páginas com H1 e conteúdo.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppShell } from './App.jsx'

export const render = (url) =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppShell />
      </StaticRouter>
    </StrictMode>,
  )
