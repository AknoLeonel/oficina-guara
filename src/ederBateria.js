// --- EDER BATERIA (subpágina /eder-bateria) ---
// Briefing "Prompt para o programador – Subpágina Eder Bateria" (01/11/2026), marca Opção 1.
// Dados ainda não informados pela oficina (tempo médio do motoboy, parcelamento, CNPJ,
// avaliações do Google, logos oficiais Heliar/Moura) ficam de fora até chegarem.
import { WHATSAPP_NUMBER, PHONE_DISPLAY } from './siteConfig.js';

export const EDER_BATERIA = {
  path: '/eder-bateria',
  name: 'Eder Bateria',
  fullName: 'Eder Bateria por Oficina do Eder',
  title: 'Bateria Heliar e Moura no DF com Instalação no Local | Eder Bateria',
  description: 'Carro não pegou? Motoboy leva bateria Heliar ou Moura nova até você, instala grátis e testa o alternador. Guará e todo o DF. Chame no WhatsApp.',
  h1: 'Bateria Heliar e Moura com resgate na hora no DF',
  ogImage: '/eder-bateria/og-eder-bateria.jpg',
  logo: '/eder-bateria/logo-eder-bateria.webp',
  icon: '/eder-bateria/favicon-32.png',
  appleIcon: '/eder-bateria/apple-touch-icon.png',
  phoneDisplay: PHONE_DISPLAY,
  phoneLink: `tel:+${WHATSAPP_NUMBER}`,
  // Coordenadas aproximadas do Guará II; trocar pelas exatas da oficina quando informadas.
  geo: { lat: -15.8306, lng: -47.9822 },
};

// Mensagem pronta do WhatsApp (o cliente completa modelo/ano e bairro). A frase inicial identifica a
// origem "Eder Bateria" no atendimento; o GA4 recebe a página e a posição do botão (conversions.js).
const baseMessage = 'Olá! Vim pela página Eder Bateria.';
export const ederWhatsappLink = (marca) => {
  const text = marca
    ? `${baseMessage} Quero cotar uma bateria ${marca}. Meu carro é [modelo/ano] e estou em [bairro].`
    : `${baseMessage} Meu carro é [modelo/ano] e estou em [bairro].`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const BATERIA_SELOS = [
  'Heliar e Moura originais',
  'Instalação grátis no local',
  'Garantia de fábrica com nota fiscal',
  'Pagamento na hora',
];

export const BATERIA_MARCAS = [
  { nome: 'Heliar', texto: 'Linha completa Heliar: convencional, EFB e AGM para carros com start-stop.' },
  { nome: 'Moura', texto: 'Linha completa Moura: convencional, EFB e AGM para carros com start-stop.' },
];

export const BATERIA_TIPOS = [
  { nome: 'Convencional', texto: 'Carros de passeio, SUVs, caminhonetes e motos.' },
  { nome: 'EFB', texto: 'Carros com sistema start-stop de entrada.' },
  { nome: 'AGM', texto: 'Carros premium e start-stop avançado.' },
];

export const BATERIA_PASSOS = [
  { titulo: 'Chame no WhatsApp', texto: 'Mande o modelo e o ano do carro e a sua localização.' },
  { titulo: 'Preço fechado na hora', texto: 'Passamos o preço e o motoboy sai do Guará com a bateria certa.' },
  { titulo: 'Troca e teste no local', texto: 'Instalação grátis, teste do alternador e pagamento na hora.' },
];

export const BATERIA_VEICULOS = [
  { nome: 'Carro de passeio', icon: 'car' },
  { nome: 'SUV', icon: 'suv' },
  { nome: 'Caminhonete e picape', icon: 'truck', destaque: 'Especialidade da Oficina do Eder' },
  { nome: 'Moto', icon: 'moto' },
];

// Regiões do briefing (raio a confirmar com a oficina).
export const BATERIA_REGIOES = [
  'Guará I', 'Guará II', 'SIA', 'SOF Sul', 'Águas Claras', 'Taguatinga', 'Núcleo Bandeirante', 'Park Way',
  'Sudoeste', 'Cruzeiro', 'Asa Sul', 'Asa Norte', 'Vicente Pires', 'Riacho Fundo', 'Candangolândia', 'Lago Sul',
];

export const BATERIA_FAQ = [
  {
    pergunta: 'Quanto custa a instalação?',
    resposta: 'A instalação é grátis. Você paga só a bateria, com preço fechado antes do motoboy sair.',
  },
  {
    pergunta: 'Quais marcas de bateria vocês têm?',
    resposta: 'Trabalhamos com Heliar e Moura originais, nas linhas convencional, EFB e AGM, com nota fiscal e garantia de fábrica.',
  },
  {
    pergunta: 'Em quanto tempo o motoboy chega?',
    resposta: 'O motoboy sai do Guará II. Ao receber sua localização pelo WhatsApp, informamos a previsão de chegada antes de sair.',
  },
  {
    pergunta: 'Como sei qual é a bateria certa do meu carro?',
    resposta: 'Mande o modelo e o ano do carro pelo WhatsApp. Indicamos a bateria certa e o motoboy já sai com ela.',
  },
  {
    pergunta: 'E se o problema não for a bateria?',
    resposta: 'Testamos o alternador no local. Se o problema for outro, a Oficina Guará, no Guará II, é uma oficina completa e resolve.',
  },
  {
    pergunta: 'Vocês recolhem a bateria velha?',
    resposta: 'Sim. Levamos a bateria usada para descarte correto.',
  },
];
