"""Gera os CSVs de importação do Google Ads Editor a partir do briefing
"Briefing Google Ads · Oficina Guará" (outubro/2026).

Uso: python3 scripts/google-ads/gerar_planilha.py
Saída: docs/google-ads/*.csv (UTF-8 com BOM, abre certo no Excel e no Editor).

O script falha se algum texto passar do limite do Google ou se alguma URL final
não existir no site (src/landingPages.js + /sobre e /contato).
"""
import csv
import json
import os
import re
import subprocess

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SAIDA = os.path.join(RAIZ, 'docs', 'google-ads')
SITE = 'https://www.oficinaguara.com.br'

# --- Banco comum (seção 8). Título 5 adaptado: o Google reprova telefone no texto do anúncio.
BANCO_TITULOS = [
    'Oficina Guará – Guará II', 'Especialista em Diesel', 'Caminhonetes e 4x4', 'Diagnóstico com Scanner',
    'Ligue e Agende Hoje', 'Orçamento pelo WhatsApp', 'Mecânicos Especializados', 'Atendemos Todo o DF',
    'Fale com um Especialista', 'Agende Sua Avaliação', 'Oficina do Éder', 'Hilux, Ranger, S10 e Amarok',
]
BANCO_DESCRICOES = [
    'Especialistas em caminhonetes diesel e 4x4 no Guará II. Diagnóstico preciso. Fale já!',
    'Atendemos Hilux, Ranger, S10, Amarok, RAM e mais. Peça seu orçamento pelo WhatsApp.',
    'Oficina especializada em diesel com mecânicos experientes. Ligue e agende a avaliação.',
]

# --- Negativas reaproveitadas pelos conjuntos (seção 9)
NEG_MODELO = ('dpf arla injeção injecao injetor bico câmbio cambio tração tracao transferência transferencia '
              'diferencial retífica retifica').split() + ['perdendo força', 'sem força', 'concessionária',
              'concessionaria', 'seminova', 'seminovo', '0km', 'nova', 'usada', 'à venda']
MODELOS = 'hilux sw4 amarok ranger s10 trailblazer toro compass renegade l200 triton frontier dodge rampage'.split() + ['ram 2500', 'ram 3500']
SERVICOS = ('dpf arla injeção injecao injetor bico câmbio cambio tração tracao transferência transferencia '
            'diferencial retífica retifica').split() + ['perdendo força', 'sem força']
NEG_INSTITUCIONAL = ['diesel', 'caminhonete', '4x4', 'pick up', 'picape', 'moto', 'bicicleta'] + MODELOS + SERVICOS

# --- Campanhas (seção 2): orçamento diário no meio da faixa do briefing
CAMPANHAS = [
    ('C01 | Pesquisa | Diesel & Motor', 49),
    ('C02 | Pesquisa | Câmbio & Tração', 28),
    ('C03 | Pesquisa | Modelos de Caminhonete', 41),
    ('C04 | Pesquisa | Caminhonete & 4x4', 14),
    ('C05 | Pesquisa | Institucional & Marca', 7),
]


def conj(campanha, codigo, nome, url, caminho, palavras, negativas, titulos, descricao):
    return dict(campanha=CAMPANHAS[campanha][0], grupo=f'{codigo} | {nome}', url=url, caminho=caminho,
                palavras=palavras, negativas=negativas, titulos=titulos, descricao=descricao)


CONJUNTOS = [
    # C01 · Diesel & Motor
    conj(0, 'C01.01', 'Oficina Diesel', '/oficina-diesel', ('diesel', 'oficina'),
         ['"oficina diesel brasília"', '"oficina diesel df"', '"oficina diesel guará"', '"mecânico diesel brasília"',
          '"mecânica diesel"', '"oficina de carro diesel"', '"oficina diesel perto de mim"',
          '[oficina diesel brasília]', '[oficina diesel]', '[mecânico diesel]'],
         MODELOS + SERVICOS + ['motor'],
         ['Oficina Diesel em Brasília', 'Oficina Diesel no Guará', 'Mecânico Diesel no DF'],
         'Oficina especializada em veículos diesel. Diagnóstico completo no Guará II. Ligue já!'),
    conj(0, 'C01.02', 'Motor Diesel', '/motor-diesel', ('motor-diesel', 'conserto'),
         ['"conserto motor diesel"', '"retífica motor diesel"', '"manutenção motor diesel"', '"mecânico motor diesel"',
          '"motor diesel fumaçando"', '"motor diesel batendo"', '"motor diesel esquentando"',
          '[conserto motor diesel]', '[retífica motor diesel]'],
         ['dpf', 'arla', 'injetor', 'bico', 'câmbio', 'cambio', 'tração', 'tracao', 'gerador', 'estacionário',
          'estacionario', 'barco', 'náutico', 'nautico'],
         ['Conserto de Motor Diesel', 'Retífica de Motor Diesel', 'Motor Diesel com Problema?'],
         'Motor fumaçando, batendo ou esquentando? Diagnóstico e conserto de motor diesel no DF.'),
    conj(0, 'C01.03', 'Injeção Eletrônica', '/injecao-eletronica', ('injecao', 'diesel'),
         ['"injeção eletrônica diesel"', '"bico injetor diesel"', '"limpeza bico injetor diesel"', '"teste bico injetor"',
          '"injeção eletrônica caminhonete"', '"injeção eletrônica guará"', '"luz da injeção acesa"',
          '[injeção eletrônica diesel]', '[bico injetor diesel]'],
         ['gasolina', 'flex', 'gnv', 'carburador', 'dpf', 'arla', 'câmbio', 'cambio'],
         ['Injeção Eletrônica Diesel', 'Bico Injetor Diesel', 'Luz da Injeção Acesa?'],
         'Teste e limpeza de bicos injetores diesel para caminhonetes. Fale com a oficina!'),
    conj(0, 'C01.04', 'Limpeza de Filtro DPF', '/limpeza-de-filtro-dpf', ('filtro-dpf', 'limpeza'),
         ['"limpeza filtro dpf"', '"limpeza de dpf"', '"filtro dpf entupido"', '"regeneração dpf"', '"luz dpf acesa"',
          '"filtro de partículas diesel"', '"dpf caminhonete"', '[limpeza filtro dpf]', '[limpeza dpf]'],
         ['anular', 'anulação', 'anulacao', 'retirar', 'remover', 'remoção', 'remocao', 'desativar', 'chip',
          'emulador', 'arla', 'câmbio', 'cambio'],
         ['Limpeza de Filtro DPF', 'Filtro DPF Entupido?', 'Luz do DPF Acesa?'],
         'Luz do DPF acesa no painel? Limpeza e diagnóstico do filtro de partículas no Guará II.'),
    conj(0, 'C01.05', 'Sistema Arla 32', '/sistema-arla-32', ('arla-32', 'reparo'),
         ['"conserto sistema arla 32"', '"falha arla 32"', '"sensor arla 32"', '"bomba arla 32"', '"luz arla acesa"',
          '"arla 32 caminhonete"', '"defeito arla 32"', '[conserto arla 32]', '[falha arla 32]'],
         ['comprar', 'preço', 'galão', 'litro', 'posto', 'distribuidor', 'anular', 'anulação', 'emulador',
          'desativar', 'dpf', 'câmbio', 'cambio'],
         ['Reparo no Sistema Arla 32', 'Falha no Arla 32?', 'Sensor e Bomba Arla 32'],
         'Falha no Arla 32? Diagnóstico de sensor, bomba e sistema com scanner. Ligue agora!'),
    conj(0, 'C01.06', 'Caminhonete Perdendo Força', '/caminhonete-perdendo-forca', ('diagnostico', 'sem-forca'),
         ['"caminhonete perdendo força"', '"caminhonete sem força"', '"caminhonete diesel sem força"',
          '"caminhonete em modo de emergência"', '"caminhonete falhando"', '"perda de potência diesel"',
          '"caminhonete não sobe"', '[caminhonete perdendo força]', '[caminhonete sem força]'],
         ['dpf', 'arla', 'câmbio', 'cambio', 'moto', 'caminhão'],
         ['Caminhonete Sem Força?', 'Perdendo Potência?', 'Modo de Emergência?'],
         'Caminhonete perdendo força ou em modo de emergência? Diagnóstico completo no Guará.'),
    # C02 · Câmbio & Tração
    conj(1, 'C02.01', 'Câmbio Automático', '/cambio-automatico', ('cambio', 'automatico'),
         ['"conserto câmbio automático"', '"câmbio automático caminhonete"', '"câmbio automático patinando"',
          '"câmbio automático dando tranco"', '"troca de óleo câmbio automático"', '"especialista câmbio automático"',
          '"câmbio automático brasília"', '[conserto câmbio automático]', '[câmbio automático brasília]'],
         ['toro', 'dólar', 'dolar', 'euro', 'cotação', 'cotacao', 'moeda', 'casa de câmbio'],
         ['Conserto Câmbio Automático', 'Câmbio Patinando?', 'Especialista em Câmbio Auto'],
         'Câmbio patinando ou dando tranco? Diagnóstico e conserto de câmbio automático no DF.'),
    conj(1, 'C02.02', 'Câmbio Toro', '/cambio-toro', ('cambio', 'toro'),
         ['"câmbio fiat toro"', '"conserto câmbio toro"', '"câmbio toro diesel"', '"câmbio toro trancando"',
          '"câmbio toro dando tranco"', '"óleo câmbio toro"', '[câmbio toro]', '[câmbio fiat toro]'],
         ['dólar', 'dolar', 'euro', 'cotação', 'cotacao', 'moeda', 'casa de câmbio'],
         ['Câmbio da Fiat Toro', 'Câmbio Toro Dando Tranco?', 'Especialista em Toro Diesel'],
         'Câmbio da Toro trancando ou dando tranco? Oficina especializada em Toro diesel no Guará.'),
    conj(1, 'C02.03', 'Tração 4x4', '/tracao-4x4', ('tracao-4x4', 'reparo'),
         ['"conserto tração 4x4"', '"tração 4x4 não engata"', '"4x4 não engata"', '"caixa de transferência"',
          '"reparo diferencial caminhonete"', '"luz 4x4 piscando"', '"tração 4x4 caminhonete"',
          '[conserto tração 4x4]', '[4x4 não engata]'],
         ['trator', 'quadriciclo', 'jogo', 'brinquedo', 'controle remoto', 'rc', 'bicicleta'],
         ['Conserto de Tração 4x4', '4x4 Não Engata?', 'Caixa de Transferência'],
         'Tração 4x4 não engata? Reparo de caixa de transferência e diferencial no Guará II.'),
    # C03 · Modelos de Caminhonete
    conj(2, 'C03.01', 'RAM', '/ram', ('oficina', 'ram'),
         ['"oficina dodge ram"', '"oficina ram brasília"', '"mecânico ram 2500"', '"manutenção ram 3500"',
          '"oficina ram rampage"', '"revisão ram diesel"', '[oficina ram brasília]', '[oficina dodge ram]'],
         NEG_MODELO + ['memória', 'memoria', 'ddr4', 'ddr5', 'notebook', 'computador', 'pc'],
         ['Oficina para RAM no DF', 'Mecânico Especialista RAM', 'RAM 2500, 3500 e Rampage'],
         'Manutenção e diagnóstico de RAM 2500, 3500 e Rampage com especialistas em diesel.'),
    conj(2, 'C03.02', 'Toyota Hilux', '/toyota-hilux', ('oficina', 'hilux'),
         ['"oficina hilux brasília"', '"oficina hilux"', '"mecânico hilux"', '"revisão hilux"', '"manutenção hilux diesel"',
          '"oficina especializada hilux"', '[oficina hilux brasília]', '[mecânico hilux]'],
         NEG_MODELO + ['sw4'],
         ['Oficina para Hilux no DF', 'Mecânico Especialista Hilux', 'Revisão de Hilux Diesel'],
         'Revisão e manutenção de Hilux diesel com mecânicos especializados no Guará II.'),
    conj(2, 'C03.03', 'Toyota SW4', '/toyota-sw4', ('oficina', 'sw4'),
         ['"oficina sw4 brasília"', '"oficina sw4"', '"mecânico sw4"', '"revisão sw4"', '"manutenção sw4 diesel"',
          '[oficina sw4 brasília]', '[mecânico sw4]'],
         NEG_MODELO + ['hilux'],
         ['Oficina para SW4 no DF', 'Mecânico Especialista SW4', 'Revisão de SW4 Diesel'],
         'Revisão e manutenção de SW4 diesel com mecânicos especializados no Guará II.'),
    conj(2, 'C03.04', 'Amarok', '/amarok', ('oficina', 'amarok'),
         ['"oficina amarok brasília"', '"oficina amarok"', '"mecânico amarok"', '"revisão amarok"', '"manutenção amarok v6"',
          '"oficina especializada amarok"', '[oficina amarok brasília]', '[mecânico amarok]'],
         NEG_MODELO,
         ['Oficina para Amarok no DF', 'Mecânico Especialista Amarok', 'Amarok 2.0 e V6'],
         'Manutenção de Amarok 2.0 e V6 com especialistas em diesel. Fale com a Oficina Guará.'),
    conj(2, 'C03.05', 'Ford Ranger', '/ford-ranger', ('oficina', 'ranger'),
         ['"oficina ford ranger"', '"oficina ranger brasília"', '"mecânico ranger"', '"revisão ranger 3.2"',
          '"manutenção ford ranger diesel"', '[oficina ford ranger]', '[mecânico ranger]'],
         NEG_MODELO + ['power rangers', 'power', 'rangers'],
         ['Oficina para Ranger no DF', 'Mecânico Especialista Ranger', 'Revisão de Ranger Diesel'],
         'Revisão e manutenção de Ford Ranger diesel com mecânicos especializados no Guará II.'),
    conj(2, 'C03.06', 'S10 e Trailblazer', '/s10-e-trailblazer', ('oficina', 's10'),
         ['"oficina s10 brasília"', '"mecânico s10 diesel"', '"revisão s10 2.8"', '"oficina trailblazer"',
          '"mecânico trailblazer"', '"manutenção s10 diesel"', '[oficina s10 brasília]', '[oficina trailblazer]'],
         NEG_MODELO + ['samsung', 'galaxy', 'celular', 'tela', 'bateria celular'],
         ['Oficina para S10 no DF', 'Especialista S10 e Trailblazer', 'Revisão de S10 Diesel'],
         'Manutenção de S10 e Trailblazer diesel com mecânicos especializados no Guará II.'),
    conj(2, 'C03.07', 'Fiat Toro Diesel', '/fiat-toro-diesel', ('oficina', 'toro'),
         ['"oficina fiat toro"', '"oficina toro diesel"', '"mecânico fiat toro"', '"revisão toro diesel"',
          '"manutenção toro diesel brasília"', '[oficina fiat toro]', '[mecânico fiat toro]'],
         NEG_MODELO,
         ['Oficina para Toro Diesel', 'Mecânico Especialista Toro', 'Revisão de Fiat Toro Diesel'],
         'Revisão e manutenção de Fiat Toro diesel com mecânicos especializados no Guará II.'),
    conj(2, 'C03.08', 'Jeep Compass Diesel', '/jeep-compass-diesel', ('oficina', 'compass'),
         ['"oficina jeep compass diesel"', '"mecânico compass diesel"', '"revisão compass diesel"',
          '"oficina compass brasília"', '"manutenção jeep compass"', '[oficina compass diesel]', '[mecânico compass diesel]'],
         NEG_MODELO + ['renegade', 'bússola', 'bussola'],
         ['Oficina para Compass Diesel', 'Mecânico Especialista Jeep', 'Revisão Compass Diesel'],
         'Revisão e manutenção de Jeep Compass diesel com especialistas no Guará II. Ligue!'),
    conj(2, 'C03.09', 'Jeep Renegade', '/jeep-renegade', ('oficina', 'renegade'),
         ['"oficina jeep renegade"', '"mecânico renegade"', '"revisão renegade diesel"', '"oficina renegade brasília"',
          '"manutenção jeep renegade"', '[oficina jeep renegade]', '[mecânico renegade]'],
         NEG_MODELO + ['compass'],
         ['Oficina para Renegade no DF', 'Mecânico Especialista Jeep', 'Revisão de Jeep Renegade'],
         'Revisão e manutenção de Jeep Renegade com mecânicos especializados no Guará II.'),
    conj(2, 'C03.10', 'L200 Triton', '/l200-triton', ('oficina', 'l200'),
         ['"oficina l200 triton"', '"oficina l200 brasília"', '"mecânico l200"', '"revisão l200 triton"',
          '"manutenção triton diesel"', '[oficina l200]', '[mecânico l200]'],
         NEG_MODELO,
         ['Oficina para L200 no DF', 'Mecânico Especialista L200', 'Revisão de L200 Triton'],
         'Revisão e manutenção de Mitsubishi L200 Triton diesel com especialistas no Guará.'),
    conj(2, 'C03.11', 'Nissan Frontier', '/nissan-frontier', ('oficina', 'frontier'),
         ['"oficina nissan frontier"', '"oficina frontier brasília"', '"mecânico frontier"', '"revisão frontier diesel"',
          '"manutenção nissan frontier"', '[oficina nissan frontier]', '[mecânico frontier]'],
         NEG_MODELO,
         ['Oficina para Frontier no DF', 'Mecânico Especialista Nissan', 'Revisão de Frontier Diesel'],
         'Revisão e manutenção de Nissan Frontier diesel com mecânicos especializados no DF.'),
    # C04 · Caminhonete & 4x4
    conj(3, 'C04.01', 'Caminhonete 4x4', '/caminhonete-4x4', ('oficina', '4x4'),
         ['"oficina 4x4 brasília"', '"oficina 4x4"', '"mecânico 4x4"', '"oficina para 4x4"', '"revisão caminhonete 4x4"',
          '"oficina off road"', '[oficina 4x4 brasília]', '[oficina 4x4]'],
         ['engata', 'acessórios', 'acessorios', 'lift', 'pneu', 'pneus', 'guincho', 'snorkel'] + MODELOS + SERVICOS,
         ['Oficina 4x4 em Brasília', 'Mecânico de 4x4 no DF', 'Especialista em Off-Road'],
         'Oficina especializada em veículos 4x4 e caminhonetes no Guará II. Fale com a gente!'),
    conj(3, 'C04.02', 'Oficina de Caminhonete', '/oficina-de-caminhonete', ('oficina', 'caminhonete'),
         ['"oficina de caminhonete"', '"oficina de caminhonete brasília"', '"mecânico de caminhonete"', '"oficina pick up"',
          '"oficina para picape"', '"revisão caminhonete diesel"', '[oficina de caminhonete]', '[mecânico de caminhonete]'],
         ['4x4', 'acessórios', 'acessorios', 'capota', 'santo antônio', 'lona marítima'] + MODELOS + SERVICOS,
         ['Oficina de Caminhonete no DF', 'Mecânico de Caminhonete', 'Especialista em Picapes'],
         'Oficina especializada em caminhonetes e picapes diesel. Diagnóstico completo no Guará.'),
    # C05 · Institucional & Marca
    conj(4, 'C05.01', 'Oficina do Éder', '/oficina-do-eder', ('oficina', 'do-eder'),
         ['"oficina do éder"', '"oficina do eder guará"', '"oficina guará"', '"oficina guará brasília"',
          '[oficina do eder]', '[oficina guará]'],
         [],
         ['Oficina do Éder – Guará II', 'Oficina Guará – Site Oficial', 'Fale com a Oficina do Éder'],
         'Oficina do Éder – Oficina Guará. Especialistas em diesel e 4x4 no Guará II. Ligue já!'),
    conj(4, 'C05.02', 'Oficina Mecânica', '/oficina-mecanica', ('oficina', 'mecanica'),
         ['"oficina mecânica guará"', '"mecânico guará"', '"oficina mecânica guará 2"', '"oficina mecânica guará ii"',
          '"mecânico no guará"', '[oficina mecânica guará]', '[mecânico guará]'],
         NEG_INSTITUCIONAL,
         ['Oficina Mecânica no Guará', 'Mecânico no Guará II', 'Oficina de Confiança no Guará'],
         'Oficina mecânica no Guará II com mecânicos experientes. Ligue e agende sua avaliação.'),
    conj(4, 'C05.03', 'Centro Automotivo', '/centro-automotivo', ('centro', 'automotivo'),
         ['"centro automotivo guará"', '"centro automotivo brasília"', '"centro automotivo guará 2"',
          '[centro automotivo guará]'],
         NEG_INSTITUCIONAL,
         ['Centro Automotivo no Guará', 'Centro Automotivo Completo', 'Centro Automotivo em Brasília'],
         'Centro automotivo no Guará II especializado em caminhonetes. Peça seu orçamento!'),
]

# --- Lista negativa compartilhada (seção 5): aplicada a cada campanha como negativa de campanha
NEG_CONTA = ('curso cursos apostila aula emprego empregos vaga vagas salário salario').split() + [
    'trabalhe conosco', 'estágio', 'como fazer', 'sozinho', 'tutorial', 'passo a passo', 'vídeo', 'youtube', 'pdf',
    'manual do proprietário', 'download', 'esquema elétrico', 'comprar', 'à venda', 'venda', 'fipe', 'tabela fipe',
    'consórcio', 'financiamento', 'seguro', 'aluguel', 'locadora', 'peça usada', 'peças usadas', 'ferro velho',
    'desmanche', 'mercado livre', 'olx', 'shopee', 'grátis', 'gratis', 'barato', 'baratinho', 'o que é',
    'o que significa', 'significado', 'reclame aqui', 'recall', 'moto', 'motos', 'caminhão', 'caminhao', 'ônibus',
    'onibus', 'trator', 'van escolar', 'funilaria', 'lanternagem', 'pintura', 'martelinho', 'insulfilm',
    'som automotivo', 'lava jato', 'estética automotiva', 'guincho', 'goiânia', 'goiania', 'anápolis', 'anapolis',
    'são paulo', 'belo horizonte']

# --- Recursos (seção 7)
def sl(texto, url, d1, d2):
    return dict(texto=texto, url=url, d1=d1, d2=d2)

SL_DPF = sl('Limpeza de Filtro DPF', '/limpeza-de-filtro-dpf', 'Luz do DPF acesa no painel?', 'Limpeza e diagnóstico completo')
SL_DIESEL = sl('Oficina Diesel', '/oficina-diesel', 'Especialistas em diesel', 'Caminhonetes e utilitários')
SL_CAMBIO = sl('Câmbio Automático', '/cambio-automatico', 'Câmbio patinando ou com tranco?', 'Diagnóstico e conserto')
SL_TRACAO = sl('Tração 4x4', '/tracao-4x4', '4x4 não engata?', 'Transferência e diferencial')
SL_INJECAO = sl('Injeção Eletrônica', '/injecao-eletronica', 'Bicos injetores diesel', 'Teste e limpeza de bicos')
SITELINKS = {
    '': [sl('Fale Conosco', '/contato', 'Ligue ou chame no WhatsApp', 'Atendimento no Guará II'),
         sl('Sobre a Oficina', '/sobre', 'Conheça nossa estrutura', 'Especialistas em diesel e 4x4')],
    CAMPANHAS[0][0]: [SL_DPF,
                      sl('Sistema Arla 32', '/sistema-arla-32', 'Falha, sensor ou bomba do Arla', 'Diagnóstico com scanner'),
                      SL_INJECAO,
                      sl('Motor Diesel', '/motor-diesel', 'Conserto e retífica', 'Motor fumaçando ou batendo?'),
                      sl('Caminhonete Sem Força', '/caminhonete-perdendo-forca', 'Entrou em modo de emergência?', 'Diagnóstico da perda de força'),
                      SL_DIESEL],
    CAMPANHAS[1][0]: [SL_CAMBIO,
                      sl('Câmbio da Fiat Toro', '/cambio-toro', 'Especialistas em Toro diesel', 'Câmbio trancando ou com tranco'),
                      SL_TRACAO, SL_DIESEL],
    CAMPANHAS[2][0]: [sl('Toyota Hilux', '/toyota-hilux', 'Revisão e manutenção', 'Mecânicos especializados'),
                      sl('Ford Ranger', '/ford-ranger', 'Revisão e manutenção', 'Ranger 3.2 e 2.2 diesel'),
                      sl('S10 e Trailblazer', '/s10-e-trailblazer', 'Revisão e manutenção', 'S10 e Trailblazer diesel'),
                      sl('Amarok', '/amarok', 'Revisão e manutenção', 'Amarok 2.0 e V6'),
                      sl('RAM', '/ram', 'RAM 2500, 3500 e Rampage', 'Especialistas em diesel'),
                      sl('Fiat Toro Diesel', '/fiat-toro-diesel', 'Revisão e manutenção', 'Toro diesel e câmbio')],
    CAMPANHAS[3][0]: [SL_TRACAO, SL_DIESEL, SL_CAMBIO, SL_DPF],
    CAMPANHAS[4][0]: [SL_DIESEL,
                      sl('Caminhonetes e 4x4', '/caminhonete-4x4', 'Oficina especializada em 4x4', 'Hilux, Ranger, S10 e mais'),
                      SL_CAMBIO, SL_INJECAO],
}
CALLOUTS = ['Especialista em Diesel', 'Caminhonetes e 4x4', 'Mecânicos Especializados', 'Orçamento pelo WhatsApp',
            'No Guará II – Brasília', 'Diagnóstico com Scanner', 'Garantia no Serviço', 'Peças de Qualidade']
SNIPPETS = [
    ('Serviços', ['Oficina Diesel', 'Injeção Eletrônica', 'Filtro DPF', 'Sistema Arla 32', 'Câmbio Automático',
                  'Tração 4x4', 'Motor Diesel']),
    ('Modelos', ['Hilux', 'SW4', 'Ranger', 'S10', 'Trailblazer', 'Amarok', 'RAM', 'Toro', 'L200 Triton', 'Frontier']),
    ('Marcas', ['Toyota', 'Ford', 'Chevrolet', 'Volkswagen', 'Fiat', 'Jeep', 'Mitsubishi', 'Nissan', 'RAM']),
]

# Programação: horário da oficina (siteConfig.js HOURS) com 1h de margem antes do fechamento.
DIAS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
HORARIO_ANUNCIOS = ('05:00', '19:00')

# --- Validação -----------------------------------------------------------------
erros = []

def limite(rotulo, texto, maximo):
    if len(texto) > maximo:
        erros.append(f'{rotulo}: "{texto}" tem {len(texto)} caracteres (máx. {maximo})')

paginas = json.loads(subprocess.check_output(
    ['node', '--input-type=module', '-e',
     "import {LANDING_PAGES} from './src/landingPages.js'; import {STATIC_PAGES} from './src/siteConfig.js';"
     "console.log(JSON.stringify([...LANDING_PAGES, ...STATIC_PAGES].map(p => p.path)))"], cwd=RAIZ))

def url_ok(rotulo, caminho):
    if caminho not in paginas:
        erros.append(f'{rotulo}: URL {caminho} não existe no site')

for t in BANCO_TITULOS:
    limite('Título do banco', t, 30)
for d in BANCO_DESCRICOES:
    limite('Descrição do banco', d, 90)
assert len(BANCO_TITULOS) == 12 and len(BANCO_DESCRICOES) == 3
for c in CONJUNTOS:
    g = c['grupo']
    url_ok(g, c['url'])
    titulos = c['titulos'] + BANCO_TITULOS
    if len(titulos) != 15 or len(set(t.lower() for t in titulos)) != 15:
        erros.append(f'{g}: precisa de 15 títulos diferentes')
    for t in titulos:
        limite(f'{g} título', t, 30)
    limite(f'{g} descrição', c['descricao'], 90)
    for p in c['caminho']:
        limite(f'{g} caminho', p, 15)
    for k in c['palavras']:
        if not re.fullmatch(r'"[^"]+"|\[[^\]]+\]', k):
            erros.append(f'{g}: palavra-chave fora de frase/exata: {k}')
for camp, lista in SITELINKS.items():
    if camp and len(lista) < 4:
        erros.append(f'{camp}: menos de 4 sitelinks')
    for s in lista:
        limite('Sitelink', s['texto'], 25)
        limite('Sitelink descrição', s['d1'], 35)
        limite('Sitelink descrição', s['d2'], 35)
        url_ok(f'Sitelink {s["texto"]}', s['url'])
for co in CALLOUTS:
    limite('Frase de destaque', co, 25)
for _, valores in SNIPPETS:
    for v in valores:
        limite('Snippet', v, 25)
assert len(CONJUNTOS) == 25

if erros:
    raise SystemExit('Erros:\n' + '\n'.join(erros))

# --- Escrita dos CSVs ----------------------------------------------------------
os.makedirs(SAIDA, exist_ok=True)

def escrever(nome, cabecalho, linhas):
    with open(os.path.join(SAIDA, nome), 'w', newline='', encoding='utf-8-sig') as f:
        w = csv.writer(f)
        w.writerow(cabecalho)
        w.writerows(linhas)
    print(f'{nome}: {len(linhas)} linhas')

escrever('01-campanhas.csv',
         ['Campaign', 'Campaign Type', 'Networks', 'Budget', 'Budget type', 'Bid Strategy Type', 'Languages', 'Campaign Status'],
         [[n, 'Search', 'Google search', f'{b:.2f}', 'Daily', 'Maximize clicks', 'pt', 'Paused'] for n, b in CAMPANHAS])
escrever('02-grupos-de-anuncios.csv', ['Campaign', 'Ad Group', 'Ad Group Status'],
         [[c['campanha'], c['grupo'], 'Enabled'] for c in CONJUNTOS])

linhas = []
for c in CONJUNTOS:
    for k in c['palavras']:
        tipo = 'Phrase' if k.startswith('"') else 'Exact'
        linhas.append([c['campanha'], c['grupo'], k[1:-1], tipo, SITE + c['url']])
escrever('03-palavras-chave.csv', ['Campaign', 'Ad Group', 'Keyword', 'Criterion Type', 'Final URL'], linhas)

linhas = []
for c in CONJUNTOS:
    for k in dict.fromkeys(c['negativas']):
        linhas.append([c['campanha'], c['grupo'], k, 'Negative Broad'])
escrever('04-negativas-dos-conjuntos.csv', ['Campaign', 'Ad Group', 'Keyword', 'Criterion Type'], linhas)

escrever('05-negativas-da-conta.csv', ['Campaign', 'Keyword', 'Criterion Type'],
         [[n, k, 'Campaign Negative Broad'] for n, _ in CAMPANHAS for k in dict.fromkeys(NEG_CONTA)])

cab = ['Campaign', 'Ad Group', 'Ad type'] + [f'Headline {i}' for i in range(1, 16)] + \
      [f'Headline {i} position' for i in range(1, 4)] + [f'Description {i}' for i in range(1, 5)] + \
      ['Path 1', 'Path 2', 'Final URL', 'Status']
linhas = []
for c in CONJUNTOS:
    linhas.append([c['campanha'], c['grupo'], 'Responsive search ad'] + c['titulos'] + BANCO_TITULOS +
                  ['1', '1', '1', c['descricao']] + BANCO_DESCRICOES +
                  [c['caminho'][0], c['caminho'][1], SITE + c['url'], 'Enabled'])
escrever('06-anuncios-rsa.csv', cab, linhas)

escrever('07-sitelinks.csv', ['Campaign', 'Sitelink text', 'Description line 1', 'Description line 2', 'Final URL'],
         [[camp, s['texto'], s['d1'], s['d2'], SITE + s['url']] for camp, lista in SITELINKS.items() for s in lista])
escrever('08-frases-de-destaque.csv', ['Campaign', 'Callout text'], [['', co] for co in CALLOUTS])
escrever('09-snippets-estruturados.csv', ['Campaign', 'Header', 'Values'],
         [['', h, '; '.join(v)] for h, v in SNIPPETS])
escrever('10-programacao.csv', ['Campaign', 'Ad Schedule'],
         [[n, f'{d}, {HORARIO_ANUNCIOS[0]} - {HORARIO_ANUNCIOS[1]}'] for n, _ in CAMPANHAS for d in DIAS])
print('OK: 25 conjuntos, 5 campanhas, todos os limites e URLs conferidos')
