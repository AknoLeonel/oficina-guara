import React, { useState, useEffect, memo, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { 
  Menu, X, Wrench, Car, Settings, MapPin, Phone, Clock, CheckCircle, ArrowRight,
  Star, Instagram, Facebook, Linkedin, Mail, ChevronDown, ChevronUp, Truck, Droplets,
  Thermometer, Disc, Zap, Activity, Wind, ShieldCheck, MessageCircle, AlertTriangle,
  Gauge, Volume2, Cpu, PaintBucket
} from 'lucide-react';

// --- DADOS GLOBAIS (Para serem usados no Menu e na Home) ---
// Adicionei descrições completas e imagens para as novas páginas internas
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

// --- OTIMIZAÇÃO DE PERFORMANCE ---
const MechanicAbstract = memo(() => {
  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center opacity-60 scale-75 md:scale-100 transition-transform duration-500 pointer-events-none select-none">
      <div className="absolute inset-0 border border-[#e51f23]/40 rounded-full animate-[spin_12s_linear_infinite] will-change-transform"></div>
      <div className="absolute inset-4 border border-[#e51f23]/60 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse] will-change-transform bg-black/5">
         <svg viewBox="0 0 100 100" className="w-full h-full p-8" aria-hidden="true">
            <path d="M50 2 L93 25 V75 L50 98 L7 75 V25 Z" fill="none" stroke="#e51f23" strokeWidth="0.8" />
            <path d="M50 2 V98 M7 25 L93 75 M93 25 L7 75" fill="none" stroke="#e51f23" strokeWidth="0.4" />
         </svg>
      </div>
      <div className="absolute w-24 h-24 bg-[#e51f23]/10 rounded-full flex items-center justify-center border border-[#e51f23]/30">
        <div className="w-16 h-16 bg-[#e51f23] rounded-full shadow-lg shadow-red-900/50"></div>
      </div>
    </div>
  );
});

MechanicAbstract.displayName = 'MechanicAbstract';

// --- COMPONENTES UI ---
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-transform duration-200 active:scale-95 uppercase tracking-wider flex justify-center items-center";
  
  const variants = {
    primary: "bg-[#e51f23] text-white hover:bg-red-700 border border-[#e51f23]",
    outline: "bg-transparent border border-[#e51f23] text-[#e51f23] hover:bg-[#e51f23] hover:text-white",
    glass: "bg-white/10 border border-white/20 text-white hover:bg-white/20"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-16 scroll-mt-20 px-4 relative z-10">
    <h3 className="text-[#e51f23] font-bold tracking-[0.3em] uppercase mb-3 text-sm md:text-base">
      {subtitle}
    </h3>
    <h2 className="text-3xl md:text-5xl font-bold text-white uppercase font-header">
      {title}
    </h2>
    <div className="w-24 h-1.5 bg-[#e51f23] mx-auto mt-6 rounded-full"></div>
  </div>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-zinc-900/80 border border-white/5 p-6 rounded-2xl hover:border-[#e51f23]/50 transition-colors duration-300 group ${className}`}>
    {children}
  </div>
);

const WhatsAppButton = () => (
  <a
    href="https://wa.me/556135679250"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center justify-center group animate-bounce-slow"
    aria-label="Fale conosco no WhatsApp"
  >
    <MessageCircle size={32} fill="white" className="text-white" />
    <span className="absolute right-full mr-3 bg-white text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md hidden md:block">
      Agende agora!
    </span>
  </a>
);

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
    <div className="bg-zinc-900/90 backdrop-blur-md border-l-4 border-[#e51f23] rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-header font-bold text-white uppercase mb-2">
          O que está acontecendo com seu carro?
        </h3>
        <p className="text-zinc-400 text-sm mb-6">Selecione uma opção para ver como podemos ajudar:</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {issues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
                selectedIssue?.id === issue.id 
                  ? 'bg-[#e51f23] border-[#e51f23] text-white scale-105 shadow-lg' 
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-500'
              }`}
            >
              <issue.icon size={24} className="mb-2" />
              <span className="text-xs font-bold uppercase text-center leading-tight">{issue.label}</span>
            </button>
          ))}
        </div>

        <div className={`bg-black/40 rounded-xl p-4 border border-white/5 transition-all duration-500 ${selectedIssue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e51f23]/20 flex items-center justify-center shrink-0">
              <Wrench size={20} className="text-[#e51f23]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase mb-1">Nossa Análise Rápida:</h4>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {selectedIssue?.message}
              </p>
              <Button className="w-full text-sm py-2">
                Agendar Diagnóstico Gratuito
              </Button>
            </div>
          </div>
        </div>
        
        {!selectedIssue && (
           <div className="text-center py-4 border-t border-white/5 mt-2">
             <p className="text-zinc-500 text-xs italic">
               Não encontrou o problema? Fale direto no WhatsApp.
             </p>
           </div>
        )}
      </div>
    </div>
  );
};

// --- SERVIÇOS INTERATIVOS (MODIFICADO PARA USAR LINKS DE NAVEGAÇÃO) ---
const InteractiveServices = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="grid lg:grid-cols-12 gap-8 h-auto lg:h-[500px]">
      {/* Menu Lateral de Categorias */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        {DATA_CATEGORIES.map((cat, index) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(index)}
            className={`text-left p-6 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${
              activeCategory === index 
                ? 'bg-[#e51f23] border-[#e51f23] text-white shadow-[0_0_30px_rgba(229,31,35,0.3)] scale-105 z-10' 
                : 'bg-zinc-900/50 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <cat.icon size={24} className={activeCategory === index ? 'text-white' : 'text-[#e51f23]'} />
                <span className="font-header text-lg uppercase font-bold">{cat.title}</span>
              </div>
              {activeCategory === index && <ArrowRight size={20} className="animate-pulse" />}
            </div>
          </button>
        ))}
      </div>

      {/* Painel de Detalhes (Visualização do Serviço) */}
      <div className="lg:col-span-8 bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#e51f23]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Conteúdo Dinâmico */}
        <div className="relative z-10 animate-in fade-in slide-in-from-right duration-500" key={activeCategory}>
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-3xl md:text-5xl font-header font-bold text-white uppercase mb-2">
                {DATA_CATEGORIES[activeCategory].title}
              </h3>
              <p className="text-zinc-400 text-lg md:text-xl font-light">
                {DATA_CATEGORIES[activeCategory].description}
              </p>
            </div>
            <div className="hidden md:flex w-20 h-20 bg-[#e51f23]/20 rounded-2xl items-center justify-center border border-[#e51f23]/30">
               {React.createElement(DATA_CATEGORIES[activeCategory].icon, { size: 40, className: "text-[#e51f23]" })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {DATA_CATEGORIES[activeCategory].services.map((service, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-black/20 rounded-xl border border-white/5 hover:border-[#e51f23]/50 transition-colors group">
                <div className="w-2 h-2 rounded-full bg-[#e51f23] group-hover:scale-150 transition-transform"></div>
                <span className="text-zinc-200 font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
            {/* O BOTÃO AGORA REDIRECIONA PARA A PÁGINA ESPECÍFICA */}
            <Link to={`/servicos/${DATA_CATEGORIES[activeCategory].id}`} className="w-full sm:w-auto">
               <Button className="w-full">
                 Ver Detalhes de {DATA_CATEGORIES[activeCategory].title}
               </Button>
            </Link>
            <Button variant="glass" className="w-full sm:w-auto">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- NOVA PÁGINA: DETALHES DO SERVIÇO (NOVO COMPONENTE) ---
const ServicePage = () => {
    const { id } = useParams();
    const { pathname } = useLocation();
    const category = DATA_CATEGORIES.find(cat => cat.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!category) return <div className="min-h-screen pt-32 text-center text-white">Serviço não encontrado. <Link to="/" className="text-[#e51f23]">Voltar</Link></div>;

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
            {/* HERO DA PÁGINA INTERNA */}
            <div className="relative h-[40vh] md:h-[50vh] overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-zinc-900">
                    <img src={category.image} alt={category.title} className="w-full h-full object-cover opacity-30" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                <div className="relative z-10 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-[#e51f23] rounded-full bg-[#e51f23]/10 backdrop-blur-md">
                        <category.icon size={16} className="text-[#e51f23]" />
                        <span className="text-[#e51f23] text-xs font-bold uppercase tracking-widest">Especialidade Guará</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-header text-white uppercase mb-4">{category.title}</h1>
                    <p className="text-zinc-300 text-lg max-w-2xl mx-auto">{category.description}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 -mt-20 relative z-20">
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div>
                            <h3 className="text-2xl font-bold text-white font-header uppercase mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-[#e51f23]"></span> Detalhes Técnicos
                            </h3>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                {category.fullDescription}
                            </p>
                            <Button className="w-full sm:w-auto">
                                <Phone size={18} className="mr-2" /> Solicitar Orçamento
                            </Button>
                        </div>
                        
                        <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                            <h4 className="text-white font-bold uppercase mb-4 border-b border-white/10 pb-4">O que incluímos</h4>
                            <ul className="space-y-4">
                                {category.services.map((service, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-zinc-300">
                                        <CheckCircle size={20} className="text-[#e51f23] shrink-0" />
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-16 text-center">
                <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-white transition-colors">
                    <ArrowRight className="rotate-180 mr-2" /> Voltar para o Início
                </Link>
            </div>
        </div>
    );
};

// --- HOME PAGE (SEU CONTEÚDO ORIGINAL REUNIDO AQUI) ---
const HomePage = ({ offsetY }) => {
    return (
        <>
            {/* --- HERO SECTION --- */}
            <header id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
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

                <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8" style={{ transform: `translateY(${offsetY * -0.1}px)` }}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e51f23]/10 border border-[#e51f23]/30 rounded-full text-[#e51f23] text-xs font-bold uppercase tracking-[0.2em]">
                      <Star size={12} fill="#e51f23" />
                      Especialistas em 4x4 e Pick-ups
                    </div>
                    
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-header leading-[0.9] text-white">
                      REVISÃO TOTAL DO SEU<br />
                       <span className="text-[#e51f23]">VEÍCULO</span>
                    </h2>
                    
                    <p className="text-zinc-300 text-lg md:text-xl max-w-xl leading-relaxed border-l-4 border-[#e51f23] pl-6">
                      Manutenção especializada em Toyota, Nissan, GM, Ford, VW, Mitsubishi e muito mais. 
                      Motor, câmbio, 4x4, diesel e injeção eletrônica.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button className="!text-lg !px-10 h-14">
                        Fazer Avaliação <ArrowRight className="inline ml-2" size={20} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-6 pt-8 text-zinc-500 font-header text-sm tracking-widest">
                      <span>TOYOTA</span> • <span>FORD</span> • <span>MITSUBISHI</span> • <span>GM</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center items-center relative" style={{ transform: `translateY(${offsetY * 0.1}px)` }}>
                     <DiagnosticPanel />
                  </div>
                </div>
            </header>

            {/* --- SOBRE NÓS --- */}
            <section id="sobre" className="py-24 relative bg-zinc-900">
                <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
                  <div className="relative order-2 lg:order-1 group">
                    <div className="absolute inset-0 bg-[#e51f23] translate-x-4 translate-y-4 rounded-2xl opacity-20"></div>
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video lg:aspect-square">
                      <div className="absolute inset-0 w-full h-[120%]" style={{ transform: `translateY(${(offsetY - 800) * 0.1}px)` }}>
                        <img 
                          src="trem.jpeg"
                          alt="Equipe Oficina Guará trabalhando" 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent z-10">
                        <p className="text-[#e51f23] font-bold uppercase tracking-widest text-xs mb-1">Localização Privilegiada</p>
                        <h4 className="text-2xl font-header font-bold text-white">GUARÁ II - BRASÍLIA/DF</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <div className="inline-block px-3 py-1 mb-6 border border-[#e51f23] rounded text-[#e51f23] text-xs font-bold uppercase tracking-widest">
                      Nossa História
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-header text-white mb-8 uppercase">
                      DA PAIXÃO POR CARROS <br />
                      <span className="text-zinc-500">À EXCELÊNCIA TÉCNICA</span>
                    </h2>
                    
                    <div className="p-8 bg-zinc-800/50 rounded-2xl border border-white/5">
                      <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                        A <strong className="text-white">Oficina do Eder</strong> surgiu na garagem de casa, a partir de muita paixão por carros. 
                        Essa paixão trouxe motivação para realizar um trabalho honesto, de qualidade e transparência.
                      </p>
                      <p className="text-zinc-400 leading-relaxed mb-6">
                        Hoje somos um centro automotivo especializado, com equipamentos de ponta e profissionais qualificados 
                        com treinamentos constantes. Atendemos nacionais e importados com a confiança que você merece.
                      </p>
                      <div className="flex flex-col md:flex-row gap-6 mt-8 border-t border-white/10 pt-6">
                          <div>
                             <span className="block text-3xl font-bold text-[#e51f23] font-header">100%</span>
                             <span className="text-xs uppercase tracking-widest text-zinc-500">Transparência</span>
                          </div>
                          <div>
                             <span className="block text-3xl font-bold text-[#e51f23] font-header">+15</span>
                             <span className="text-xs uppercase tracking-widest text-zinc-500">Anos de XP</span>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
            </section>

            {/* --- SERVIÇOS INTERATIVOS --- */}
            <section id="servicos" className="py-24 relative">
                <div className="container mx-auto px-4 md:px-8 relative z-10">
                  <SectionHeader title="Nossos Serviços" subtitle="Excelência em Cada Detalhe" />
                  {/* Componente Interativo de Serviços */}
                  <InteractiveServices />
                </div>
            </section>

            {/* --- CTA AVALIAÇÃO --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=2000&auto=format&fit=crop" 
                    alt="Oficina Background" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#e51f23]/90 mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                   <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-sm border border-white/20 rounded-3xl py-16 px-8 md:px-16 shadow-2xl">
                      <h2 className="text-3xl md:text-5xl font-bold font-header text-white uppercase mb-6 drop-shadow-md">
                        Não caia em uma furada!
                      </h2>
                      <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
                        Antes de fechar negócio ou viajar, traga seu veículo para uma <strong className="text-white font-bold border-b-2 border-white">Avaliação Gratuita</strong> e evite surpresas desagradáveis.
                      </p>
                      <div className="flex flex-col md:flex-row justify-center gap-4">
                         <Button variant="primary" className="!bg-white !text-[#e51f23] hover:!bg-zinc-100 border-none shadow-xl font-bold">
                            <Phone size={20} className="mr-2" /> Agendar Agora
                         </Button>
                         <Button variant="glass" className="font-bold">
                            <MapPin size={20} className="mr-2" /> Como Chegar
                         </Button>
                      </div>
                   </div>
                </div>
            </section>
        </>
    );
}

// --- NAVBAR PRINCIPAL (MODIFICADA PARA O DROPDOWN E ROTAS) ---
const Navbar = ({ isScrolled, setIsMenuOpen, isMenuOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();

    // Fechar menu mobile ao trocar rota
    useEffect(() => {
        setIsMenuOpen(false);
        setDropdownOpen(false);
    }, [location, setIsMenuOpen]);

    const navLinks = [
        { name: 'Início', href: '/', ariaLabel: 'Ir para o início', isRouter: true },
        { name: 'Sobre', href: '/#sobre', ariaLabel: 'Saiba mais sobre a oficina', isRouter: false },
        // "Serviços" foi removido daqui pois será tratado separadamente com o Dropdown
        { name: 'Contato', href: '/#contato', ariaLabel: 'Entre em contato', isRouter: false },
    ];

    return (
        <nav 
        className={`fixed w-full z-50 transition-colors duration-300 ${
          isScrolled || location.pathname !== '/'
            ? 'bg-zinc-950/95 border-b border-white/5 py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50 group" aria-label="Oficina Guará - Início">
            <div className="h-16 md:h-20 flex items-center">
               <img 
                 src="/fdsf.png" 
                 alt="Oficina Guará Logo" 
                 className="h-full w-auto object-contain"
                 onError={(e) => {
                   e.target.onerror = null; 
                   e.target.style.display = 'none'; 
                   e.target.nextSibling.style.display = 'flex';
                 }}
               />
               <div className="hidden flex-col leading-none ml-2" style={{display: 'none'}}>
                  <span className="text-xl md:text-2xl font-bold font-header tracking-tighter text-white">
                    OFICINA <span className="text-[#e51f23]">GUARÁ</span>
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">Centro Automotivo</span>
               </div>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-full border border-white/10">
            {/* Link Início */}
            <Link 
                to="/"
                className="px-6 py-2 text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-white hover:bg-[#e51f23] rounded-full transition-colors duration-300"
            >
                Início
            </Link>

            {/* Link Sobre (Híbrido) */}
            <a 
                href="/#sobre"
                className="px-6 py-2 text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-white hover:bg-[#e51f23] rounded-full transition-colors duration-300"
            >
                Sobre
            </a>
            
            {/* DROPDOWN SERVIÇOS */}
            <div className="relative group" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <button 
                    className={`flex items-center gap-1 px-6 py-2 text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-white rounded-full transition-colors ${dropdownOpen ? 'text-white' : ''}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    Serviços <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* MENU SUSPENSO */}
                <div className={`absolute top-full left-0 mt-2 w-64 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${dropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                    <div className="p-2 flex flex-col gap-1">
                        {DATA_CATEGORIES.map((cat) => (
                            <Link 
                                key={cat.id} 
                                to={`/servicos/${cat.id}`}
                                className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-xs font-bold uppercase"
                            >
                                <cat.icon size={16} className="text-[#e51f23]" />
                                {cat.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Link Contato */}
            <a 
                href="/#contato"
                className="px-6 py-2 text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-white hover:bg-[#e51f23] rounded-full transition-colors duration-300"
            >
                Contato
            </a>
          </div>

          <div className="hidden md:flex">
             <Button variant="primary" className="!py-2 !px-6 text-sm" aria-label="Ligar para oficina">
               <Phone size={16} className="mr-2" /> (61) 3567-9250
             </Button>
          </div>

          <button 
            className="md:hidden text-white z-50 p-2 bg-[#e51f23] rounded-lg shadow-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* MOBILE MENU */}
          <div className={`fixed inset-0 bg-zinc-950 z-40 flex items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className="flex flex-col items-center gap-8 w-full px-6 h-full overflow-y-auto py-24">
               <li className="w-full">
                  <Link to="/" className="block w-full py-3 text-2xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#e51f23]">Início</Link>
               </li>
               <li className="w-full">
                   <a href="/#sobre" onClick={() => setIsMenuOpen(false)} className="block w-full py-3 text-2xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#e51f23]">Sobre</a>
               </li>
               
               {/* SERVIÇOS MOBILE */}
               <li className="w-full">
                   <p className="text-center text-zinc-500 uppercase tracking-widest text-xs mb-4 mt-2">Serviços</p>
                   <div className="grid grid-cols-1 gap-3">
                      {DATA_CATEGORIES.map(cat => (
                         <Link key={cat.id} to={`/servicos/${cat.id}`} className="block w-full py-3 text-lg font-header uppercase font-bold text-center text-zinc-300 border border-white/5 rounded-xl hover:border-[#e51f23] hover:bg-[#e51f23]/10">
                            {cat.title}
                         </Link>
                      ))}
                   </div>
               </li>

               <li className="w-full mt-2">
                  <a href="/#contato" onClick={() => setIsMenuOpen(false)} className="block w-full py-3 text-2xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#e51f23]">Contato</a>
               </li>
               <Button onClick={() => setIsMenuOpen(false)} className="w-full mt-8">Ligar Agora</Button>
            </ul>
          </div>
        </div>
      </nav>
    );
};

// --- APP PRINCIPAL (ROTEADOR) ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Parallax Logic (Movido para cá ou mantido na Home, mas o estado de scroll global ajuda a Navbar)
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
    <BrowserRouter>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#e51f23] selection:text-white overflow-x-hidden relative">
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Inter:wght@300;400;600&display=swap');
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
        `}</style>

        <div className="bg-noise"></div>
        <WhatsAppButton />

        {/* NAVBAR - Agora fica fixa e lida com navegação */}
        <Navbar isScrolled={isScrolled} setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />

        {/* ROTAS */}
        <Routes>
            {/* Rota da Página Principal */}
            <Route path="/" element={<HomePage offsetY={offsetY} />} />
            
            {/* Rota das Páginas de Serviços */}
            <Route path="/servicos/:id" element={<ServicePage />} />
        </Routes>

        {/* FOOTER - Mantido fixo no final de todas as rotas */}
        <footer id="contato" className="bg-zinc-950 pt-24 pb-12 border-t border-white/5 relative">
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                <img src="/fdsf.png" alt="Oficina Guará" className="h-15 w-auto object-contain" 
                    onError={(e) => {
                    e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden items-center gap-2" style={{display: 'none'}}>
                    <div className="w-8 h-8 bg-[#e51f23] skew-x-[-10deg] flex items-center justify-center rounded-sm">
                        <Wrench className="text-white" size={16} />
                    </div>
                    <span className="text-2xl font-bold font-header text-white">
                        OFICINA <span className="text-[#e51f23]">GUARÁ</span>
                    </span>
                </div>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed">
                Mecânica de confiança no Guará II. Especializada em 4x4, Pick-ups e veículos nacionais e importados. Qualidade e transparência desde a garagem de casa.
                </p>
                <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#e51f23] hover:text-white hover:border-[#e51f23] transition-colors duration-300" aria-label="Instagram">
                    <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#e51f23] hover:text-white hover:border-[#e51f23] transition-colors duration-300" aria-label="Facebook">
                    <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-[#e51f23] hover:text-white hover:border-[#e51f23] transition-colors duration-300" aria-label="Email">
                    <Mail size={18} />
                </a>
                </div>
            </div>

            <div>
                <h4 className="text-white font-bold uppercase mb-8 font-header tracking-wider border-l-2 border-[#e51f23] pl-3">Navegação</h4>
                <ul className="space-y-3 text-zinc-500 text-sm">
                <li><Link to="/" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Início</Link></li>
                <li><a href="/#sobre" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Sobre Nós</a></li>
                {/* Serviços leva ao topo da seção na home, ou pode ser um link para menu */}
                <li><a href="/#servicos" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Serviços</a></li>
                <li><a href="/#contato" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Fale Conosco</a></li>
                </ul>
            </div>

            <div className="lg:col-span-2">
                <h4 className="text-white font-bold uppercase mb-8 font-header tracking-wider border-l-2 border-[#e51f23] pl-3">Informações de Contato</h4>
                <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 flex items-start gap-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#e51f23]/30 transition-colors group">
                    <MapPin size={24} className="text-[#e51f23] shrink-0 mt-1" />
                    <div>
                        <h5 className="text-white font-bold text-sm uppercase mb-1">Endereço</h5>
                        <p className="text-zinc-400 text-sm">Área Especial 2A, Conjunto A, Lote 6, Guará II</p>
                        <p className="text-zinc-500 text-xs mt-1">CEP: 71070-625 - Brasília/DF</p>
                    </div>
                </div>

                <div className="p-4 flex items-start gap-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#e51f23]/30 transition-colors group">
                    <Phone size={24} className="text-[#e51f23] shrink-0 mt-1" />
                    <div>
                        <h5 className="text-white font-bold text-sm uppercase mb-1">Telefone</h5>
                        <p className="text-zinc-400 text-sm text-lg font-bold">(61) 3567-9250</p>
                        <p className="text-zinc-500 text-xs mt-1">Seg - Sex: 08h às 18h</p>
                    </div>
                </div>

                <div className="p-4 flex items-start gap-4 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-[#e51f23]/30 transition-colors group md:col-span-2">
                    <Mail size={24} className="text-[#e51f23] shrink-0 mt-1" />
                    <div>
                        <h5 className="text-white font-bold text-sm uppercase mb-1">Email</h5>
                        <p className="text-zinc-400 text-sm">oficinadoeder@gmail.com</p>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 pt-8 border-t border-white/5 text-center flex flex-col items-center text-zinc-600 text-xs">
            <p className="mb-2">Copyright © 2026 Oficina Guará. Todos os Direitos Reservados.</p>
            <p className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                Desenvolvido por <span className="font-bold text-zinc-400">Agência Empatia</span>
            </p>
            <div className="mt-4 px-4 py-2 bg-white/5 rounded-full backdrop-blur-md text-[10px] text-zinc-500">
                🍪 Nós usamos Cookies para uma melhor experiência.
            </div>
            </div>
        </footer>
        </div>
    </BrowserRouter>
  );
}