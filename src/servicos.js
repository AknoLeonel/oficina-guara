// --- PÁGINAS DE SERVIÇO (/servicos/<id>) ---
// Usado pelo App e pelo build (entry-server -> scripts/prerender.mjs gera o HTML de cada uma).
import { Cpu, Disc, Wind, Wrench } from 'lucide-react';

export const DATA_CATEGORIES = [
  {
    id: 'mecanica-motor',
    metaDescription: "Mecânica e motor no Guará II: diagnóstico completo, correia dentada, cabeçote, arrefecimento e troca de óleo. Oficina Guará, Brasília.",
    title: "Mecânica & Motor",
    icon: Wrench,
    description: "O coração do seu carro em perfeitas condições.",
    fullDescription: "Nossa equipe especializada cuida de todo o conjunto mecânico do seu veículo, garantindo potência e longevidade. Utilizamos peças originais e equipamentos de precisão para diagnósticos exatos. Do cabeçote ao cárter, seu motor é tratado com a máxima seriedade.",
    services: ["Diagnóstico Completo", "Correia Dentada", "Manutenção de Motores", "Troca de Óleo e Filtros", "Cabeçote", "Sistema de Arrefecimento"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 'eletrica-tecnologia',
    metaDescription: "Elétrica automotiva no Guará II: injeção eletrônica, scanner, baterias, alternadores, sensores e reparo de centrais. Oficina Guará, Brasília.",
    title: "Elétrica & Tecnologia",
    icon: Cpu,
    description: "Soluções avançadas para sistemas modernos.",
    fullDescription: "Veículos modernos dependem de sistemas elétricos complexos. Nossa oficina conta com scanners de última geração para identificar falhas em sensores, módulos e chicotes elétricos. Resolvemos desde panes simples até reprogramação de módulos.",
    services: ["Injeção Eletrônica", "Baterias e Alternadores", "Sensores e Atuadores", "Diagnóstico via Scanner", "Reparo de Centrais", "Iluminação"],
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 'suspensao-freios',
    metaDescription: "Suspensão e freios no Guará II: ABS, amortecedores, alinhamento, balanceamento, pastilhas, buchas e pivôs. Oficina Guará, Brasília.",
    title: "Suspensão & Freios",
    icon: Disc,
    description: "Segurança e estabilidade para sua família.",
    fullDescription: "A estabilidade do seu carro é crucial para sua segurança. Revisamos todo o sistema de suspensão e freios para garantir que você tenha controle total, seja no asfalto ou na terra. Trabalhamos com amortecedores, molas e pastilhas de alta performance.",
    services: ["Sistema de Freios ABS", "Amortecedores e Molas", "Alinhamento e Balanceamento", "Pneus e Rodas", "Troca de Pastilhas", "Buchas e Pivôs"],
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 'conforto-clima',
    metaDescription: "Ar-condicionado automotivo no Guará II: higienização, filtro de cabine, compressor, carga de gás e vazamentos. Oficina Guará, Brasília.",
    title: "Conforto & Clima",
    icon: Wind,
    description: "Bem-estar total dentro do seu veículo.",
    fullDescription: "Não passe calor! Mantemos o sistema de climatização do seu veículo limpo e eficiente, garantindo a saúde respiratória da sua família e o conforto térmico. Realizamos higienização com ozônio e manutenção completa do sistema.",
    services: ["Higienização de Ar-Condicionado", "Filtro de Cabine", "Reparo de Compressores", "Carga de Gás", "Detecção de Vazamentos", "Limpeza de Dutos"],
    image: "https://images.unsplash.com/photo-1589139250009-44445853b006?q=80&w=1600&auto=format&fit=crop"
  }
];

export const serviceMeta = (category) => ({
  title: `${category.title} no Guará II | Oficina Guará`,
  description: category.metaDescription,
  path: `/servicos/${category.id}`,
});
