# Google Ads · Importação no Google Ads Editor

Planilhas geradas a partir do *Briefing Google Ads · Oficina Guará* (out/2026) por
`scripts/google-ads/gerar_planilha.py`. Para alterar algo, edite o script e rode de novo:
ele confere os limites de caracteres e se as URLs existem no site antes de gravar.

```bash
python3 scripts/google-ads/gerar_planilha.py
```

## Como importar (Google Ads Editor)

1. Baixe a conta: **Contas › Abrir › Baixar** (conta da Oficina Guará).
2. Para cada arquivo, **na ordem dos números**, use **Conta › Importar › Do arquivo** e confira a prévia.
   O Editor reconhece as colunas automaticamente.
3. Revise e clique em **Publicar**. As campanhas entram **pausadas**.

| Arquivo | O que cria |
|---|---|
| `01-campanhas.csv` | 5 campanhas de Pesquisa, orçamento diário, Maximizar cliques, português, pausadas |
| `02-grupos-de-anuncios.csv` | 25 conjuntos (um por página) |
| `03-palavras-chave.csv` | Palavras em frase e exata, com a URL de cada página |
| `04-negativas-dos-conjuntos.csv` | Negativas anti-canibalização de cada conjunto |
| `05-negativas-da-conta.csv` | Lista "NEG \| Conta \| Geral" aplicada às 5 campanhas |
| `06-anuncios-rsa.csv` | 1 RSA por conjunto: 3 títulos exclusivos fixados na posição 1 + 12 do banco, 4 descrições |
| `07-sitelinks.csv` | Sitelinks por campanha + 2 da conta (linha sem campanha) |
| `08-frases-de-destaque.csv` | Frases de destaque da conta |
| `09-snippets-estruturados.csv` | Snippets: Serviços, Modelos, Marcas |
| `10-programacao.csv` | Seg a Sex, 05:00–19:00 (1h antes do fechamento às 20h) |

Orçamento diário (meio da faixa do briefing): C01 R$ 49 · C02 R$ 28 · C03 R$ 41 · C04 R$ 14 · C05 R$ 7 = **R$ 139/dia**.

## Depois de importar (no Google Ads, uma vez)

- [ ] **Local:** Distrito Federal em todas as campanhas; opção **"Presença"** (não "interesse").
- [ ] **Redes:** desmarcar **Parceiros de pesquisa** e **Rede de Display**.
- [ ] **Teto de CPC** (fase 1, Maximizar cliques): definir pelo Planejador de palavras-chave (faixa baixa do lance de topo de página no DF).
- [ ] **Recomendações automáticas:** desativar a aplicação automática.
- [ ] **Recursos automáticos e expansão de URL final:** desativar.
- [ ] **Ligação:** (61) 98207-9250, com relatório de chamadas e programação Seg a Sex, 05:00–20:00.
- [ ] **Local (recurso):** vincular o Perfil da Empresa no Google.
- [ ] **Nome da empresa** "Oficina Guará", **logotipo** e **imagens** reais da oficina.
- [ ] **Conversões principais:** "Clique no WhatsApp" (já enviada pelo site) e "Chamadas a partir de anúncios" (≥ 60s). "Visualização de página" como secundária.
- [ ] Conferir orçamentos e ativar as campanhas.

## Adaptações em relação ao briefing

- **Título do banco nº 5** "Ligue (61) 98207-9250" virou **"Ligue e Agende Hoje"**: o Google reprova número de telefone no texto do anúncio. O telefone aparece pelo recurso de ligação.
- **Sitelinks "Fale Conosco" e "Sobre a Oficina"**: as páginas `/contato` e `/sobre` foram criadas no site.
- **Clique no WhatsApp**: medido direto no código do site (`src/conversions.js`), não pelo GTM. Não configurar a mesma conversão no GTM.
- **Chamada pelo site com número de encaminhamento do Google**: não implementada (o site mostraria outro número). Mede-se a ligação pelo anúncio.
- **Formulário**: o site não tem formulário.
- **Afirmações com \*** (scanner, garantia, peças, retífica): confirmadas pela oficina e mantidas.
- **Horário**: a oficina atende das 05h às 20h; dias considerados **segunda a sexta**. Se abrir aos sábados, ajustar `HOURS` em `src/siteConfig.js` e `DIAS` no script.
