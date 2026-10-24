import React, { useState, useEffect, memo, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { 
  Menu, X, Wrench, Car, Settings, MapPin, Phone, Clock, CheckCircle, ArrowRight,
  Star, Instagram, Facebook, Linkedin, Mail, ChevronDown, ChevronUp, Truck, Droplets,
  Thermometer, Disc, Zap, Activity, Wind, ShieldCheck, MessageCircle, AlertTriangle,
  Gauge, Volume2, Cpu, PaintBucket
} from 'lucide-react';
import { LANDING_PAGES, findLandingPage } from './landingPages';
import { SITE_URL, HOME_META, whatsappLink, SOCIAL_LINKS, EMAIL, MAPS_LINK } from './siteConfig';

// --- DADOS GLOBAIS ---
const DATA_CATEGORIES = [
  {
    id: 'mecanica-motor',
    title: "Mecânica & Motor",
    icon: Wrench,
    description: "O coração do seu carro em perfeitas condições.",
    fullDescription: "Nossa equipe especializada cuida de todo o conjunto mecânico do seu veículo, garantindo potência e longevidade. Utilizamos peças originais e equipamentos de precisão para diagnósticos exatos. Do cabeçote ao cárter, seu motor é tratado com a máxima seriedade.",
    services: ["Diagnóstico Completo", "Correia Dentada", "Manutenção de Motores", "Troca de Óleo e Filtros", "Cabeçote", "Sistema de Arrefecimento"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 'eletrica-tecnologia',
    title: "Elétrica & Tecnologia",
    icon: Cpu,
    description: "Soluções avançadas para sistemas modernos.",
    fullDescription: "Veículos modernos dependem de sistemas elétricos complexos. Nossa oficina conta com scanners de última geração para identificar falhas em sensores, módulos e chicotes elétricos. Resolvemos desde panes simples até reprogramação de módulos.",
    services: ["Injeção Eletrônica", "Baterias e Alternadores", "Sensores e Atuadores", "Diagnóstico via Scanner", "Reparo de Centrais", "Iluminação"],
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 'suspensao-freios',
    title: "Suspensão & Freios",
    icon: Disc,
    description: "Segurança e estabilidade para sua família.",
    fullDescription: "A estabilidade do seu carro é crucial para sua segurança. Revisamos todo o sistema de suspensão e freios para garantir que você tenha controle total, seja no asfalto ou na terra. Trabalhamos com amortecedores, molas e pastilhas de alta performance.",
    services: ["Sistema de Freios ABS", "Amortecedores e Molas", "Alinhamento e Balanceamento", "Pneus e Rodas", "Troca de Pastilhas", "Buchas e Pivôs"],
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1600&auto=format&fit=crop"
  },
  {
    id: 'conforto-clima',
    title: "Conforto & Clima",
    icon: Wind,
    description: "Bem-estar total dentro do seu veículo.",
    fullDescription: "Não passe calor! Mantemos o sistema de climatização do seu veículo limpo e eficiente, garantindo a saúde respiratória da sua família e o conforto térmico. Realizamos higienização com ozônio e manutenção completa do sistema.",
    services: ["Higienização de Ar-Condicionado", "Filtro de Cabine", "Reparo de Compressores", "Carga de Gás", "Detecção de Vazamentos", "Limpeza de Dutos"],
    image: "https://images.unsplash.com/photo-1589139250009-44445853b006?q=80&w=1600&auto=format&fit=crop"
  }
];

// --- COMPONENTES OTIMIZADOS ---
const MechanicAbstract = memo(() => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center opacity-60 scale-75 md:scale-100 transition-transform duration-500 pointer-events-none select-none">
      <div className="absolute inset-0 border border-[#ec7337]/40 rounded-full animate-[spin_12s_linear_infinite] will-change-transform"></div>
      <div className="absolute inset-4 border border-[#ec7337]/60 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse] will-change-transform bg-black/5">
         <svg viewBox="0 0 100 100" className="w-full h-full p-8" aria-hidden="true">
            <path d="M50 2 L93 25 V75 L50 98 L7 75 V25 Z" fill="none" stroke="#ec7337" strokeWidth="0.8" />
            <path d="M50 2 V98 M7 25 L93 75 M93 25 L7 75" fill="none" stroke="#ec7337" strokeWidth="0.4" />
         </svg>
      </div>
      <div className="absolute w-24 h-24 bg-[#ec7337]/10 rounded-full flex items-center justify-center border border-[#ec7337]/30">
        <div className="w-16 h-16 bg-[#ec7337] rounded-full shadow-lg shadow-orange-900/50"></div>
      </div>
    </div>
  );
});

MechanicAbstract.displayName = 'MechanicAbstract';

// --- COMPONENTES UI ---
const Button = ({ children, variant = 'primary', className = '', href, to, ...props }) => {
  const baseStyle = "w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-transform duration-200 active:scale-95 uppercase tracking-wider flex justify-center items-center text-sm md:text-base";
  
  const variants = {
    primary: "bg-[#ec7337] text-zinc-950 hover:bg-[#f08a55] border border-[#ec7337]",
    outline: "bg-transparent border border-[#ec7337] text-[#ec7337] hover:bg-[#ec7337] hover:text-zinc-950",
    glass: "bg-white/10 border border-white/20 text-white hover:bg-white/20"
  };

  const classes = `${baseStyle} ${variants[variant]} ${className}`;

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) {
    const external = href.startsWith('http');
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-10 md:mb-16 scroll-mt-20 px-4 relative z-10">
    <p className="text-[#ec7337] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase mb-2 md:mb-3 text-xs md:text-sm lg:text-base">
      {subtitle}
    </p>
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase font-header">
      {title}
    </h2>
    <div className="w-16 md:w-24 h-1 md:h-1.5 bg-[#ec7337] mx-auto mt-4 md:mt-6 rounded-full"></div>
  </div>
);

// --- SEO POR PÁGINA (title, description, canonical e Open Graph) ---
const upsertHeadTag = (tag, attrs, valueAttr, value) => {
  const selector = Object.entries(attrs).map(([k, v]) => `[${k}="${v}"]`).join('');
  let el = document.head.querySelector(`${tag}${selector}`);
  if (!el) {
    el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
};

const usePageMeta = ({ title, description, path, image, noindex = false }) => {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    upsertHeadTag('meta', { name: 'description' }, 'content', description);
    upsertHeadTag('link', { rel: 'canonical' }, 'href', url);
    upsertHeadTag('meta', { property: 'og:title' }, 'content', title);
    upsertHeadTag('meta', { property: 'og:description' }, 'content', description);
    upsertHeadTag('meta', { property: 'og:url' }, 'content', url);
    if (image) upsertHeadTag('meta', { property: 'og:image' }, 'content', SITE_URL + image);
    upsertHeadTag('meta', { name: 'robots' }, 'content', noindex ? 'noindex' : 'index, follow');
  }, [title, description, path, image, noindex]);
};

// BOTÃO FLUTUANTE DO WHATSAPP (abre com a mensagem da landing page atual)
const WhatsAppButton = () => {
  const { pathname } = useLocation();
  const page = findLandingPage(pathname);

  return (
    <a
      href={whatsappLink(page?.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-bounce-slow"
      aria-label="Fale conosco no WhatsApp"
    >
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-7 h-7 md:w-8 md:h-8" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
      <span className="absolute right-full mr-3 bg-white text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md hidden md:block">
        Agende agora!
      </span>
    </a>
  );
};

const DiagnosticPanel = () => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  const issues = [
    { id: 'noise', icon: Volume2, label: 'Barulho Estranho', message: 'Barulhos podem indicar problemas na suspensão, motor ou correias. Traz pra gente ouvir!' },
    { id: 'light', icon: AlertTriangle, label: 'Luz no Painel', message: 'Luzes de alerta não devem ser ignoradas. Passamos o scanner para identificar o erro exato.' },
    { id: 'power', icon: Gauge, label: 'Carro Falhando', message: 'Pode ser injeção eletrônica, velas ou combustível. Vamos fazer um check-up completo.' },
    { id: 'brake', icon: Disc, label: 'Freio Ruim', message: 'Segurança em primeiro lugar! Revisamos pastilhas, discos e fluido de freio.' },
    { id: 'checkup', icon: ShieldCheck, label: 'Apenas Revisão', message: 'Ótima escolha! Prevenir é sempre mais barato que remediar. Agende sua revisão.' },
  ];

  return (
    <div className="bg-zinc-900/90 backdrop-blur-md border-l-4 border-[#ec7337] rounded-2xl shadow-2xl overflow-hidden w-full max-w-md mx-auto">
      <div className="p-5 md:p-8">
        <h2 className="text-lg md:text-2xl font-header font-bold text-white uppercase mb-2">
          O que está acontecendo com seu carro?
        </h2>
        <p className="text-zinc-400 text-xs md:text-sm mb-6">Selecione uma opção para ver como podemos ajudar:</p>
        
        {/* Grid responsivo: 2 colunas no mobile, 3 no sm/tablet */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mb-6">
          {issues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className={`flex flex-col items-center justify-center p-2 md:p-3 rounded-xl border transition-all duration-300 ${
                selectedIssue?.id === issue.id 
                  ? 'bg-[#ec7337] border-[#ec7337] text-zinc-950 scale-105 shadow-lg' 
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-500'
              }`}
            >
              <issue.icon size={20} className="mb-1 md:mb-2 md:w-6 md:h-6" />
              <span className="text-[10px] md:text-xs font-bold uppercase text-center leading-tight">{issue.label}</span>
            </button>
          ))}
        </div>

        <div className={`bg-black/40 rounded-xl p-4 border border-white/5 transition-all duration-500 ${selectedIssue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ec7337]/20 flex items-center justify-center shrink-0">
              <Wrench size={16} className="text-[#ec7337] md:w-5 md:h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-xs md:text-sm uppercase mb-1">Nossa Análise Rápida:</h3>
              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed mb-4">
                {selectedIssue?.message}
              </p>
              {/* BOTÃO DIAGNÓSTICO ATUALIZADO COM O LINK */}
              <Button href={whatsappLink()} className="w-full sm:w-full text-xs md:text-sm py-2">Agendar Diagnóstico</Button>
            </div>
          </div>
        </div>
        
        {!selectedIssue && (
           <div className="text-center py-4 border-t border-white/5 mt-2">
             <p className="text-zinc-400 text-[10px] md:text-xs italic">
               Não encontrou o problema? Fale direto no WhatsApp.
             </p>
           </div>
        )}
      </div>
    </div>
  );
};

// --- SERVIÇOS INTERATIVOS ---
const InteractiveServices = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 md:gap-8 h-auto lg:h-[500px]">
      {/* Menu Lateral de Categorias */}
      <div className="w-full lg:col-span-4 flex flex-col gap-3 md:gap-4 order-1">
        {DATA_CATEGORIES.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(index)}
            className={`text-left p-4 md:p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
              activeCategory === index 
                ? 'bg-[#ec7337] border-[#ec7337] text-zinc-950 shadow-[0_0_30px_rgba(236,115,55,0.3)] scale-105 z-10' 
                : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3 md:gap-4">
                <cat.icon size={20} className={`md:w-6 md:h-6 ${activeCategory === index ? 'text-zinc-950' : 'text-[#ec7337]'}`} />
                <span className="font-header text-base md:text-lg uppercase font-bold">{cat.title}</span>
              </div>
              {activeCategory === index && <ArrowRight size={18} className="animate-pulse md:w-5 md:h-5" />}
            </div>
          </button>
        ))}
      </div>

      {/* Painel de Detalhes */}
      <div className="w-full lg:col-span-8 bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-12 relative overflow-hidden flex flex-col justify-center order-2">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#ec7337]/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>

        {/* Conteúdo Dinâmico */}
        <div className="relative z-10 animate-in fade-in slide-in-from-right duration-500" key={activeCategory}>
          <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-4 sm:gap-0">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-5xl font-header font-bold text-white uppercase mb-2">
                {DATA_CATEGORIES[activeCategory].title}
              </h3>
              <p className="text-zinc-400 text-sm md:text-lg lg:text-xl font-light">
                {DATA_CATEGORIES[activeCategory].description}
              </p>
            </div>
            <div className="hidden sm:flex w-16 h-16 md:w-20 md:h-20 bg-[#ec7337]/20 rounded-2xl items-center justify-center border border-[#ec7337]/30 shrink-0">
               {React.createElement(DATA_CATEGORIES[activeCategory].icon, { size: 32, className: "text-[#ec7337] md:w-10 md:h-10" })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-8">
            {DATA_CATEGORIES[activeCategory].services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 md:p-4 bg-black/20 rounded-xl border border-white/5 hover:border-[#ec7337]/50 transition-colors group">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#ec7337] group-hover:scale-150 transition-transform"></div>
                <span className="text-zinc-200 text-sm md:text-base font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            <Button to={`/servicos/${DATA_CATEGORIES[activeCategory].id}`} className="w-full">Ver Detalhes</Button>
            {/* BOTÃO FALAR COM ESPECIALISTA ATUALIZADO */}
            <Button href={whatsappLink()} variant="glass" className="w-full">Falar com Especialista</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CARROSSEL INFINITO (IMAGENS LOCAIS) ---
const InfiniteCarousel = () => {
    const images = [
      "/foto (1).webp",
      "/foto (2).webp",
      "/foto (3).webp",
      "/foto (4).webp",
      "/foto (5).webp",
      "/foto (6).webp",
      "/foto (7).webp"
    ];
  
    return (
      <section className="py-8 bg-zinc-950 border-t border-b border-white/5 overflow-hidden relative group">
         <div className="container mx-auto px-4 mb-6">
            <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest text-center">Resultados Reais</p>
         </div>

        <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-max animate-scroll gap-4 md:gap-6 px-4 hover:[animation-play-state:paused]">
          {[...images, ...images].map((img, i) => (
            <div key={i} className="w-64 h-40 md:w-96 md:h-64 rounded-xl overflow-hidden border border-white/10 relative group/item shrink-0 bg-zinc-900">
               <img src={img} alt="Trabalho Realizado" className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110 md:grayscale md:group-hover/item:grayscale-0" />
               <div className="absolute inset-0 bg-[#ec7337]/20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </section>
    );
};

// --- NOVA PÁGINA: DETALHES DO SERVIÇO ---
const ServicePage = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const category = DATA_CATEGORIES.find(cat => cat.id === id);

    usePageMeta({
        title: category ? `${category.title} no Guará II | Oficina Guará` : HOME_META.title,
        description: category ? category.fullDescription : HOME_META.description,
        path: `/servicos/${id}`,
        noindex: !category,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!category) return <div className="min-h-screen pt-32 text-center text-white">Serviço não encontrado. <Link to="/" className="text-[#ec7337]">Voltar</Link></div>;

    return (
        <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24 pb-12">
            {/* HERO DA PÁGINA INTERNA */}
            <div className="relative h-[35vh] md:h-[50vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-900">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-[#ec7337] rounded-full bg-[#ec7337]/10 backdrop-blur-md">
                        <category.icon size={14} className="text-[#ec7337] md:w-4 md:h-4" />
                        <span className="text-[#ec7337] text-[10px] md:text-xs font-bold uppercase tracking-widest">Especialidade Guará</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold font-header text-white uppercase mb-2 md:mb-4">{category.title}</h1>
                    <p className="text-zinc-300 text-sm md:text-lg max-w-2xl mx-auto">{category.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 -mt-16 md:-mt-20 relative z-20">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-white font-header uppercase mb-4 md:mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[#ec7337]"></span> Detalhes Técnicos
                            </h2>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
                                {category.fullDescription}
                            </p>
                            {/* BOTÃO ORÇAMENTO ATUALIZADO */}
                            <Button href={whatsappLink()} className="w-full sm:w-auto"><Phone size={18} className="mr-2" /> Solicitar Orçamento</Button>
                        </div>
                        
                        <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                            <h3 className="text-white font-bold uppercase mb-4 border-b border-white/10 pb-4">O que incluímos</h3>
                            <ul className="space-y-4">
                                {category.services.map((service, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-zinc-300 text-sm md:text-base">
                                        <CheckCircle size={18} className="text-[#ec7337] shrink-0 md:w-5 md:h-5" />
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 md:mt-16 text-center">
                <Link to="/" className="inline-flex items-center py-3 text-zinc-400 hover:text-white transition-colors text-sm">
                    <ArrowRight className="rotate-180 mr-2" /> Voltar para o Início
                </Link>
            </div>
        </div>
    );
};

// --- LANDING PAGES (GUIA DAS 12 NOVAS PÁGINAS) ---
const LANDING_GROUPS = [
    { id: 'caminhonete', title: 'Caminhonetes', icon: Truck },
    { id: 'servico', title: 'Serviços Diesel', icon: Wrench },
];

// Corpo provisório: será ajustado ao modelo das páginas do guia de setembro.
const LANDING_STEPS = [
    { icon: ShieldCheck, title: 'Avaliação gratuita', text: 'Você traz a caminhonete e avaliamos sem compromisso.' },
    { icon: Cpu, title: 'Diagnóstico com scanner', text: 'Leitura eletrônica e testes para achar a causa real do problema.' },
    { icon: CheckCircle, title: 'Orçamento transparente', text: 'Você aprova o serviço antes de qualquer peça ser trocada.' },
];

const LandingPage = ({ page }) => {
    const { pathname } = useLocation();
    const waLink = whatsappLink(page.whatsapp);

    usePageMeta({ title: page.title, description: page.description, path: page.path, image: page.bannerDesktop });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-zinc-950 pt-20 md:pt-24">
            {/* BANNER: foto própria da página, H1 em HTML no espaço livre da foto */}
            <section className="relative">
                <picture>
                    <source media="(min-width: 768px)" srcSet={page.bannerDesktop} type="image/webp" width="1920" height="700" />
                    <img
                        src={page.bannerMobile}
                        alt={page.bannerAlt}
                        width="1080"
                        height="1350"
                        loading="eager"
                        fetchPriority="high"
                        className="block w-full h-auto"
                    />
                </picture>
                <div className="absolute inset-0 flex items-end md:items-center">
                    <div className="container mx-auto px-4 md:px-8 pb-8 md:pb-0">
                        <div className="max-w-xl md:max-w-[42%]">
                            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 md:mb-4 border border-[#ec7337] rounded-full bg-[#ec7337]/10 backdrop-blur-md">
                                <MapPin size={14} className="text-[#ec7337]" />
                                <span className="text-[#ec7337] text-[10px] md:text-xs font-bold uppercase tracking-widest">Oficina do Éder · Guará II</span>
                            </div>
                            <h1 className="text-[26px] leading-tight sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-header text-white uppercase">
                                {page.h1}
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHAMADA */}
            <section className="border-b border-white/5">
                <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 grid lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-center">
                    <p className="text-zinc-300 text-base md:text-xl leading-relaxed border-l-4 border-[#ec7337] pl-4 md:pl-6">
                        {page.intro}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:justify-end">
                        <Button href={waLink} className="w-full h-12 md:h-14 !px-8"><MessageCircle size={20} className="mr-2" /> Avaliação Gratuita</Button>
                        <Button href="tel:+5561982079250" variant="glass" className="w-full h-12 md:h-14 !px-8"><Phone size={18} className="mr-2" /> (61) 98207-9250</Button>
                    </div>
                </div>
            </section>

            {/* O QUE RESOLVEMOS */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <SectionHeader title="O que resolvemos" subtitle={page.name} />
                    <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                        {page.servicos.map((servico) => (
                            <div key={servico.title} className="p-6 md:p-8 bg-zinc-900/60 rounded-2xl border border-white/5 hover:border-[#ec7337]/40 transition-colors">
                                <h3 className="text-lg md:text-xl font-header font-bold text-white uppercase mb-2 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#ec7337] shrink-0"></span>
                                    {servico.title}
                                </h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{servico.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMO FUNCIONA */}
            <section className="py-16 md:py-24 bg-zinc-900">
                <div className="container mx-auto px-4 md:px-8">
                    <SectionHeader title="Como funciona" subtitle="Sem surpresa no orçamento" />
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        {LANDING_STEPS.map((step, idx) => (
                            <div key={step.title} className="p-6 md:p-8 bg-black/30 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#ec7337]/20 border border-[#ec7337]/30 flex items-center justify-center">
                                        <step.icon size={20} className="text-[#ec7337]" />
                                    </div>
                                    <span className="text-zinc-400 font-header text-sm tracking-widest">PASSO {idx + 1}</span>
                                </div>
                                <h3 className="text-lg md:text-xl font-header font-bold text-white uppercase mb-2">{step.title}</h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto bg-zinc-900 border border-white/10 border-l-4 border-l-[#ec7337] rounded-3xl p-6 md:p-12 grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-2xl md:text-4xl font-bold font-header text-white uppercase mb-4">
                                Agende sua <span className="text-[#ec7337]">avaliação gratuita</span>
                            </h2>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                Mais de 15 anos cuidando de caminhonetes, 4x4 e diesel no Guará II, com transparência do diagnóstico à entrega.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-zinc-300 text-sm">
                                <MapPin size={20} className="text-[#ec7337] shrink-0" />
                                <span>Área Especial 2A, Conjunto A, Lote 6, Guará II · Brasília/DF</span>
                            </div>
                            <div className="flex items-start gap-3 text-zinc-300 text-sm">
                                <Clock size={20} className="text-[#ec7337] shrink-0" />
                                <span>Seg - Sex: 08h às 18h</span>
                            </div>
                            <Button href={waLink} className="w-full sm:w-full"><MessageCircle size={20} className="mr-2" /> Chamar no WhatsApp</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const NotFoundPage = () => {
    usePageMeta({ title: 'Página não encontrada | Oficina Guará', description: HOME_META.description, path: '/', noindex: true });

    return (
        <div className="min-h-screen pt-32 pb-16 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-header font-bold uppercase mb-4">Página não encontrada</h1>
            <Link to="/" className="text-[#ec7337]">Voltar para o início</Link>
        </div>
    );
};

// --- HOME PAGE ---
const HomePage = ({ offsetY }) => {
    usePageMeta({ title: HOME_META.title, description: HOME_META.description, path: '/' });

    return (
        <>
            {/* --- HERO SECTION --- */}
            <header id="home" className="relative min-h-screen flex items-center pt-20 md:pt-24 pb-12 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-zinc-900 will-change-transform"
                  style={{ transform: `translateY(${offsetY * 0.5}px)` }}
                >
                   <img 
                      src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1600&auto=format&fit=crop"
                      alt="Oficina mecânica especializada em caminhonetes e carros importados"
                      className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                      loading="eager"
                   />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                  <div className="space-y-6 md:space-y-8" style={{ transform: `translateY(${offsetY * -0.1}px)` }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-[#ec7337]/10 border border-[#ec7337]/30 rounded-full text-[#ec7337] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                      <Star size={10} className="md:w-3 md:h-3" fill="#ec7337" />
                      Especialistas em 4x4 e Pick-ups
                    </div>
                    
                    {/* Texto Hero Responsivo */}
                    <h1 className="text-[40px] sm:text-5xl md:text-7xl lg:text-8xl font-bold font-header leading-[1.02] text-white">
                      REVISÃO TOTAL DO SEU<br />
                        <span className="text-[#ec7337]">VEÍCULO</span>
                    </h1>
                    
                    <p className="text-zinc-300 text-base md:text-lg lg:text-xl max-w-xl leading-relaxed border-l-4 border-[#ec7337] pl-4 md:pl-6">
                      Manutenção especializada em Toyota, Nissan, GM, Ford, VW, Mitsubishi e muito mais. 
                      Motor, câmbio, 4x4, diesel e injeção eletrônica.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                      {/* BOTÃO HERO ATUALIZADO */}
                      <Button href={whatsappLink()} className="!text-base md:!text-lg !px-8 md:!px-10 h-12 md:h-14 w-full">Fazer Avaliação <ArrowRight className="inline ml-2" size={20} /></Button>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 md:pt-8 text-zinc-400 font-header text-xs md:text-sm tracking-widest">
                      <span>TOYOTA</span> • <span>FORD</span> • <span>MITSUBISHI</span> • <span>GM</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center relative mt-8 lg:mt-0" style={{ transform: `translateY(${offsetY * 0.1}px)` }}>
                      <DiagnosticPanel />
                  </div>
                </div>
            </header>

            {/* --- SOBRE NÓS --- */}
            <section id="sobre" className="py-16 md:py-24 relative bg-zinc-900">
                <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className="relative order-2 lg:order-1 group">
                    <div className="absolute inset-0 bg-[#ec7337] translate-x-4 translate-y-4 rounded-2xl opacity-20"></div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video lg:aspect-square">
                      <div className="absolute inset-0 w-full h-[120%]" style={{ transform: `translateY(${(offsetY - 800) * 0.1}px)` }}>
                        <img 
                          src="/4.webp"
                          alt="Equipe Oficina Guará trabalhando" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/90 to-transparent z-10">
                        <p className="text-xl md:text-2xl font-header font-bold text-white">GUARÁ II - BRASÍLIA/DF</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <div className="inline-block px-3 py-1 mb-4 md:mb-6 border border-[#ec7337] rounded text-[#ec7337] text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      Nossa História
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-header text-white mb-6 md:mb-8 uppercase">
                      DA PAIXÃO POR CARROS <br />
                      <span className="text-zinc-400">À EXCELÊNCIA TÉCNICA</span>
                    </h2>
                    
                    <div className="p-6 md:p-8 bg-zinc-800/50 rounded-2xl border border-white/5">
                      <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                        A <strong className="text-white">Oficina do Eder</strong> surgiu na garagem de casa, a partir de muita paixão por carros. 
                        Essa paixão trouxe motivação para realizar um trabalho honesto, de qualidade e transparência.
                      </p>
                      <p className="text-zinc-400 leading-relaxed mb-6 text-sm md:text-base">
                        Hoje somos um centro automotivo especializado, com equipamentos de ponta e profissionais qualificados 
                        com treinamentos constantes. Atendemos nacionais e importados com a confiança que você merece.
                      </p>
                      
                      <div className="flex flex-col md:flex-row gap-6 mt-8 border-t border-white/10 pt-6">
                          <div>
                             <span className="block text-2xl md:text-3xl font-bold text-[#ec7337] font-header">100%</span>
                             <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Transparência</span>
                          </div>
                          <div>
                             <span className="block text-2xl md:text-3xl font-bold text-[#ec7337] font-header">+15</span>
                             <span className="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400">Anos de XP</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>

            {/* --- SERVIÇOS INTERATIVOS --- */}
            <section id="servicos" className="py-16 md:py-24 relative">
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                  <SectionHeader title="Nossos Serviços" subtitle="Excelência em Cada Detalhe" />
                  <InteractiveServices />
                </div>
            </section>

            {/* --- ESPECIALIDADES (links para as landing pages) --- */}
            <section id="especialidades" className="py-16 md:py-24 bg-zinc-900 border-t border-white/5">
                <div className="container mx-auto px-4 md:px-8">
                  <SectionHeader title="Especialidades" subtitle="Caminhonetes e Diesel" />
                  <div className="space-y-10">
                    {LANDING_GROUPS.map((group) => (
                      <div key={group.id}>
                        <h3 className="text-zinc-400 font-bold uppercase text-xs tracking-widest mb-4">{group.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                          {LANDING_PAGES.filter((page) => page.group === group.id).map((page) => (
                            <Link
                              key={page.slug}
                              to={page.path}
                              className="flex items-center justify-between gap-3 p-4 md:p-5 bg-black/30 rounded-xl border border-white/5 hover:border-[#ec7337]/60 hover:bg-[#ec7337]/10 transition-colors group"
                            >
                              <span className="flex items-center gap-3">
                                <group.icon size={18} className="text-[#ec7337] shrink-0" />
                                <span className="text-white font-header font-bold uppercase text-sm md:text-base">{page.name}</span>
                              </span>
                              <ArrowRight size={16} className="text-zinc-400 group-hover:text-[#ec7337] transition-colors shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </section>

            {/* --- CARROSSEL INFINITO --- */}
            <InfiniteCarousel />

            {/* --- CTA AVALIAÇÃO --- */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000&auto=format&fit=crop" 
                    alt="Oficina Background" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#ec7337]/90 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                   <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border border-white/20 rounded-3xl py-12 px-6 md:py-16 md:px-16 shadow-2xl">
                      <h2 className="text-2xl md:text-5xl font-bold font-header text-white uppercase mb-4 md:mb-6 drop-shadow-md">
                        Não caia em uma furada!
                      </h2>
                      <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto font-light">
                        Antes de fechar negócio ou viajar, traga seu veículo para uma <strong className="text-white font-bold border-b-2 border-white">Avaliação Gratuita</strong> e evite surpresas desagradáveis.
                      </p>
                      <div className="flex flex-col md:flex-row justify-center gap-4">
                        {/* BOTÃO AGENDAR AGORA ATUALIZADO */}
                         <Button href={whatsappLink()} variant="primary" className="!bg-white !text-zinc-950 hover:!bg-zinc-100 border-none shadow-xl font-bold w-full"><Phone size={20} className="mr-2" /> Agendar Agora</Button>
                         <Button href={MAPS_LINK} variant="glass" className="font-bold">
                            <MapPin size={20} className="mr-2" /> Como Chegar
                         </Button>
                      </div>
                   </div>
                </div>
            </section>
        </>
    );
}

// --- NAVBAR PRINCIPAL ---
const Navbar = ({ isScrolled, setIsMenuOpen, isMenuOpen }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    }, [location, setIsMenuOpen]);

    const toggleDropdown = (name) => setOpenDropdown(openDropdown === name ? null : name);

    return (
        <nav 
        className={`fixed w-full z-50 transition-colors duration-300 ${
          isScrolled || location.pathname !== '/'
            ? 'bg-zinc-950/95 border-b border-white/5 py-3 shadow-lg' 
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50 group" aria-label="Oficina Guará - Início">
            <div className="h-14 md:h-20 flex items-center">
               <img 
                 src="/logo-oficina-guara.png" 
                 alt="Oficina Guará Logo" 
                 className="h-7 md:h-9 w-auto object-contain"
                 onError={(e) => {
                   e.target.onerror = null; 
                   e.target.style.display = 'none'; 
                   e.target.nextSibling.style.display = 'flex';
                 }}
               />
               <div className="hidden flex-col leading-none ml-2" style={{display: 'none'}}>
                  <span className="text-xl md:text-2xl font-bold font-header tracking-tighter text-white">
                    OFICINA <span className="text-[#ec7337]">GUARÁ</span>
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">Centro Automotivo</span>
               </div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-full border border-white/10">
            <Link 
                to="/"
                className="px-3 xl:px-6 py-2 text-sm uppercase tracking-wide xl:tracking-widest font-bold text-zinc-300 hover:text-zinc-950 hover:bg-[#ec7337] rounded-full transition-colors duration-300"
            >
                Início
            </Link>

            <a 
                href="/#sobre"
                className="px-3 xl:px-6 py-2 text-sm uppercase tracking-wide xl:tracking-widest font-bold text-zinc-300 hover:text-zinc-950 hover:bg-[#ec7337] rounded-full transition-colors duration-300"
            >
                Sobre
            </a>
            
            <div className="relative group" onMouseEnter={() => setOpenDropdown('servicos')} onMouseLeave={() => setOpenDropdown(null)}>
                <button 
                    className={`flex items-center gap-1 px-3 xl:px-6 py-2 text-sm uppercase tracking-wide xl:tracking-widest font-bold text-zinc-300 hover:text-white rounded-full transition-colors ${openDropdown === 'servicos' ? 'text-white' : ''}`}
                    onClick={() => toggleDropdown('servicos')}
                >
                    Serviços <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'servicos' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${openDropdown === 'servicos' ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                    <div className="p-2 flex flex-col gap-1">
                        {DATA_CATEGORIES.map((cat) => (
                            <Link 
                                key={cat.id} 
                                to={`/servicos/${cat.id}`}
                                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-xs font-bold uppercase"
                            >
                                <cat.icon size={16} className="text-[#ec7337]" />
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ESPECIALIDADES (landing pages do guia) */}
            <div className="relative group" onMouseEnter={() => setOpenDropdown('especialidades')} onMouseLeave={() => setOpenDropdown(null)}>
                <button 
                    className={`flex items-center gap-1 px-3 xl:px-6 py-2 text-sm uppercase tracking-wide xl:tracking-widest font-bold text-zinc-300 hover:text-white rounded-full transition-colors ${openDropdown === 'especialidades' ? 'text-white' : ''}`}
                    onClick={() => toggleDropdown('especialidades')}
                >
                    Especialidades <ChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === 'especialidades' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full right-0 mt-2 w-[540px] bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${openDropdown === 'especialidades' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="p-4 grid grid-cols-2 gap-4">
                        {LANDING_GROUPS.map((group) => (
                            <div key={group.id}>
                                <p className="px-4 pb-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{group.title}</p>
                                <div className="flex flex-col gap-1">
                                    {LANDING_PAGES.filter((page) => page.group === group.id).map((page) => (
                                        <Link 
                                            key={page.slug} 
                                            to={page.path}
                                            className="flex items-center gap-3 px-4 py-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-xs font-bold uppercase"
                                        >
                                            <group.icon size={14} className="text-[#ec7337] shrink-0" />
                                            {page.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <a 
                href="/#contato"
                className="px-3 xl:px-6 py-2 text-sm uppercase tracking-wide xl:tracking-widest font-bold text-zinc-300 hover:text-zinc-950 hover:bg-[#ec7337] rounded-full transition-colors duration-300"
            >
                Contato
            </a>
          </div>

          {/* BOTÃO LIGAR NAVBAR ATUALIZADO */}
          <div className="hidden xl:flex">
            <Button href="tel:+5561982079250" variant="primary" className="!py-2 !px-6 text-sm" aria-label="Ligar para oficina"><Phone size={16} className="mr-2" /> (61) 98207-9250</Button>
          </div>

          <button 
            className="lg:hidden text-zinc-950 z-50 p-2.5 bg-[#ec7337] rounded-lg shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* MOBILE MENU */}
          <div className={`fixed inset-0 bg-zinc-950 z-40 flex items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className="flex flex-col items-center gap-6 md:gap-8 w-full px-6 h-full overflow-y-auto py-24">
               <li className="w-full">
                  <Link to="/" className="block w-full py-3 text-2xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#ec7337]">Início</Link>
               </li>
               <li className="w-full">
                   <a href="/#sobre" onClick={() => setIsMenuOpen(false)} className="block w-full py-3 text-2xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#ec7337]">Sobre</a>
               </li>
               
               <li className="w-full">
                   <p className="text-center text-zinc-400 uppercase tracking-widest text-xs mb-4 mt-2">Serviços</p>
                   <div className="grid grid-cols-1 gap-3">
                      {DATA_CATEGORIES.map(cat => (
                          <Link key={cat.id} to={`/servicos/${cat.id}`} className="block w-full py-3 text-lg font-header uppercase font-bold text-center text-zinc-300 border border-white/5 rounded-xl hover:border-[#ec7337] hover:bg-[#ec7337]/10">
                             {cat.title}
                          </Link>
                      ))}
                   </div>
               </li>

               <li className="w-full">
                   <p className="text-center text-zinc-400 uppercase tracking-widest text-xs mb-4 mt-2">Especialidades</p>
                   <div className="grid grid-cols-2 gap-2">
                      {LANDING_GROUPS.flatMap((group) => LANDING_PAGES.filter((page) => page.group === group.id)).map(page => (
                          <Link key={page.slug} to={page.path} className="flex items-center justify-center min-h-12 px-2 py-2 text-sm font-header uppercase font-bold text-center text-zinc-300 border border-white/5 rounded-xl hover:border-[#ec7337] hover:bg-[#ec7337]/10">
                             {page.name}
                          </Link>
                      ))}
                   </div>
               </li>

               <li className="w-full mt-2">
                  <a href="/#contato" onClick={() => setIsMenuOpen(false)} className="block w-full py-3 text-2xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#ec7337]">Contato</a>
               </li>
                {/* BOTÃO LIGAR MENU MOBILE ATUALIZADO */}
               <li className="w-full mt-8">
                 <Button href="tel:+5561982079250" onClick={() => setIsMenuOpen(false)} className="w-full sm:w-full">Ligar Agora</Button>
               </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};

// --- APP PRINCIPAL ---
// AppShell recebe o roteador de fora: BrowserRouter no navegador, StaticRouter no build (entry-server.jsx).
export function AppShell() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          setOffsetY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#ec7337] selection:text-zinc-950 overflow-x-hidden relative">
        <style>{`
            .font-header { font-family: 'Oswald', sans-serif; }
            body { font-family: 'Inter', sans-serif; }
            .bg-noise {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                opacity: 0.03;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            }
            @keyframes bounce-slow {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }
            .animate-bounce-slow {
                animation: bounce-slow 3s infinite ease-in-out;
            }
            /* ANIMAÇÃO DO CARROSSEL */
            @keyframes scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-scroll {
                animation: scroll 30s linear infinite;
            }
            @media (prefers-reduced-motion: reduce) {
                .animate-scroll, .animate-bounce-slow, .animate-pulse, [class*="animate-[spin"] { animation: none !important; }
            }
        `}</style>

        <div className="bg-noise"></div>
        <WhatsAppButton />

        <Navbar isScrolled={isScrolled} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

        <Routes>
            <Route path="/" element={<HomePage offsetY={offsetY} />} />
            <Route path="/servicos/:id" element={<ServicePage />} />
            {LANDING_PAGES.map((page) => (
                <Route key={page.slug} path={page.path} element={<LandingPage page={page} />} />
            ))}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <footer id="contato" className="bg-zinc-950 pt-16 md:pt-24 pb-24 md:pb-12 border-t border-white/5 relative">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                <img src="/logo-oficina-guara.png" alt="Oficina Guará" className="h-8 md:h-9 w-auto object-contain" 
                    onError={(e) => {
                    e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden items-center gap-2" style={{display: 'none'}}>
                    <div className="w-8 h-8 bg-[#ec7337] skew-x-[-10deg] flex items-center justify-center rounded-sm">
                        <Wrench className="text-white" size={16} />
                    </div>
                    <span className="text-2xl font-bold font-header text-white">
                        OFICINA <span className="text-[#ec7337]">GUARÁ</span>
                    </span>
                </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                Mecânica de confiança no Guará II. Especializada em 4x4, Pick-ups e veículos nacionais e importados. Qualidade e transparência desde a garagem de casa.
                </p>
                <div className="flex gap-4">
                {[
                    { href: SOCIAL_LINKS.instagram, label: 'Instagram', icon: Instagram },
                    { href: SOCIAL_LINKS.facebook, label: 'Facebook', icon: Facebook },
                    { href: `mailto:${EMAIL}`, label: 'Email', icon: Mail },
                ].filter((item) => item.href).map((item) => (
                    <a key={item.label} href={item.href} {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="w-11 h-11 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#ec7337] hover:text-zinc-950 hover:border-[#ec7337] transition-colors duration-300" aria-label={item.label}>
                        <item.icon size={18} />
                    </a>
                ))}
                </div>
            </div>

            <div>
                <h2 className="text-white font-bold uppercase mb-6 md:mb-8 font-header tracking-wider border-l-2 border-[#ec7337] pl-3">Navegação</h2>
                <ul className="space-y-1 text-zinc-400 text-sm">
                <li><Link to="/" className="hover:text-[#ec7337] transition-colors flex items-center py-3"><span className="w-1 h-1 bg-[#ec7337] rounded-full mr-2"></span>Início</Link></li>
                <li><a href="/#sobre" className="hover:text-[#ec7337] transition-colors flex items-center py-3"><span className="w-1 h-1 bg-[#ec7337] rounded-full mr-2"></span>Sobre Nós</a></li>
                <li><a href="/#servicos" className="hover:text-[#ec7337] transition-colors flex items-center py-3"><span className="w-1 h-1 bg-[#ec7337] rounded-full mr-2"></span>Serviços</a></li>
                <li><a href="/#contato" className="hover:text-[#ec7337] transition-colors flex items-center py-3"><span className="w-1 h-1 bg-[#ec7337] rounded-full mr-2"></span>Fale Conosco</a></li>
                </ul>
            </div>

            <div className="lg:col-span-2">
                <h2 className="text-white font-bold uppercase mb-6 md:mb-8 font-header tracking-wider border-l-2 border-[#ec7337] pl-3">Informações de Contato</h2>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="p-4 flex items-start gap-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#ec7337]/30 transition-colors group">
                    <MapPin size={24} className="text-[#ec7337] shrink-0 mt-1" />
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase mb-1">Endereço</h3>
                        <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="block py-1 text-zinc-400 text-sm hover:text-[#ec7337] transition-colors">Área Especial 2A, Conjunto A, Lote 6, Guará II</a>
                        <p className="text-zinc-400 text-xs mt-1">CEP: 71070-625 - Brasília/DF</p>
                    </div>
                </div>

                {/* TELEFONE RODAPÉ ATUALIZADO */}
                <div className="p-4 flex items-start gap-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#ec7337]/30 transition-colors group">
                    <Phone size={24} className="text-[#ec7337] shrink-0 mt-1" />
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase mb-1">Telefone</h3>
                        <a href="tel:+5561982079250" className="block py-2 text-zinc-300 text-lg font-bold hover:text-[#ec7337] transition-colors">(61) 98207-9250</a>
                        <p className="text-zinc-400 text-xs mt-1">Seg - Sex: 08h às 18h</p>
                    </div>
                </div>

                <div className="p-4 flex items-start gap-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#ec7337]/30 transition-colors group md:col-span-2">
                    <Mail size={24} className="text-[#ec7337] shrink-0 mt-1" />
                    <div>
                        <h3 className="text-white font-bold text-sm uppercase mb-1">Email</h3>
                        <a href={`mailto:${EMAIL}`} className="block py-3 text-zinc-400 text-sm hover:text-[#ec7337] transition-colors break-all">{EMAIL}</a>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* MAPA DO SITE */}
            <div className="container mx-auto px-4 md:px-8 mb-12 md:mb-16 grid md:grid-cols-3 gap-8 md:gap-12">
                {[
                    { title: 'Caminhonetes', group: 'caminhonete', span: 'md:col-span-2', cols: 'sm:grid-cols-2' },
                    { title: 'Serviços Diesel', group: 'servico', span: '', cols: '' },
                ].map((col) => (
                    <div key={col.group} className={col.span}>
                        <h2 className="text-white font-bold uppercase mb-6 font-header tracking-wider border-l-2 border-[#ec7337] pl-3">{col.title}</h2>
                        <ul className={`grid grid-cols-1 ${col.cols} gap-x-8 gap-y-1 text-zinc-400 text-sm`}>
                            {LANDING_PAGES.filter((page) => page.group === col.group).map((page) => (
                                <li key={page.slug}>
                                    <Link to={page.path} className="hover:text-[#ec7337] transition-colors flex items-center py-3"><span className="w-1 h-1 bg-[#ec7337] rounded-full mr-2 shrink-0"></span>{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-8 pt-8 border-t border-white/5 text-center flex flex-col items-center text-zinc-400 text-xs">
            <p className="mb-2">Copyright © 2026 Oficina Guará. Todos os Direitos Reservados.</p>
            <p className="flex items-center gap-1">
                Desenvolvido por <span className="font-bold text-zinc-400">Agência Empatia</span>
            </p>
            <div className="mt-4 px-4 py-2 bg-white/5 rounded-full backdrop-blur-md text-[10px] text-zinc-400">
                🍪 Nós usamos Cookies para uma melhor experiência.
            </div>
            </div>
        </footer>
        </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}