import React, { useState, useEffect, memo } from 'react';
import { 
  Menu, 
  X, 
  Wrench, 
  Car, 
  Settings, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronUp,
  Truck,
  Droplets,
  Thermometer,
  Disc,
  Zap,
  Activity,
  Wind,
  ShieldCheck,
  MessageCircle
} from 'lucide-react';

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

const ServiceCard = memo(({ icon: Icon, title, description }) => (
  <GlassCard className="h-full flex flex-col relative overflow-hidden">
    <div className="w-14 h-14 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-center mb-6 group-hover:border-[#e51f23] transition-colors duration-300 relative z-10">
      <Icon size={28} className="text-[#e51f23] group-hover:text-white transition-colors" />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-3 uppercase font-header tracking-wide">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-sm md:text-base flex-grow font-light border-t border-white/5 pt-4 mt-2">
      {description}
    </p>
    <div className="mt-4 flex items-center text-[#e51f23] text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      SAIBA MAIS <ArrowRight size={16} className="ml-2" />
    </div>
  </GlassCard>
));

ServiceCard.displayName = 'ServiceCard';

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

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home', ariaLabel: 'Ir para o início' },
    { name: 'Sobre', href: '#sobre', ariaLabel: 'Saiba mais sobre a oficina' },
    { name: 'Serviços', href: '#servicos', ariaLabel: 'Conheça nossos serviços' },
    { name: 'Contato', href: '#contato', ariaLabel: 'Entre em contato' },
  ];

  const AlertCircle = (props) => <Activity {...props} />;

  const servicesList = [
    { icon: Settings, title: "Diagnóstico Completo", desc: "Checkup completo informando a real situação do veículo e o grau de necessidade de cada serviço." },
    { icon: Thermometer, title: "Arrefecimento", desc: "Limpeza e reparo para manter o motor na temperatura ideal, evitando danos precoces." },
    { icon: Activity, title: "Câmbio Automático", desc: "Troca de fluído e manutenção seguindo recomendações do fabricante." },
    { icon: Disc, title: "Embreagem", desc: "Substituição e manutenção do kit de embreagem para garantir trocas suaves." },
    { icon: ShieldCheck, title: "Preventiva e Corretiva", desc: "Serviços gerais de check-up, freios, óleo, filtro, alinhamento e balanceamento." },
    { icon: Clock, title: "Revisões Periódicas", desc: "Inspeção de motor, transmissão e freios para garantir o melhor desempenho." },
    { icon: Zap, title: "Suspensão Completa", desc: "Checagem para evitar acidentes, desgastes de pneus e garantir estabilidade." },
    { icon: Droplets, title: "Injeção Eletrônica", desc: "Análise de sensores e atuadores para controlar a relação ar/combustível ideal." },
    { icon: Wind, title: "Escapamentos", desc: "Redução de gases e ruídos, evitando aumento de consumo e desgaste do motor." },
    { icon: AlertCircle, title: "Freios (ABS)", desc: "Manutenção do sistema anti-travamento para segurança total na frenagem." },
    { icon: Settings, title: "Correia Dentada", desc: "Troca preventiva para garantir o sincronismo do motor e evitar danos graves." },
    { icon: Droplets, title: "Troca de Óleo", desc: "Lubrificação essencial para prevenir desgaste, oxidação e corrosão do motor." },
    { icon: Wind, title: "Ar-Condicionado", desc: "Higienização regular para eliminar fungos, bactérias e garantir saúde a bordo." },
    { icon: Wrench, title: "Manutenção de Motores", desc: "Cuidados preventivos para prolongar a vida útil e performance do motor." },
    { icon: CheckCircle, title: "Avaliação Pré-compra", desc: "Análise técnica antes de fechar negócio para evitar surpresas desagradáveis." },
    { icon: Truck, title: "Serviço de Guincho", desc: "Parceria segura para transporte do seu veículo até nosso Centro Automotivo." },
  ];

  const displayedServices = showAllServices ? servicesList : servicesList.slice(0, 8);

  return (
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

      {/* --- NAVBAR --- */}
      <nav 
        className={`fixed w-full z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-zinc-950/95 border-b border-white/5 py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 z-50 group" aria-label="Oficina Guará - Início">
            {/* LOGO OFICIAL - Ajuste de tamanho AQUI */}
            <div className="h-16 md:h-21 flex items-center"> {/* Aumentado de h-10/12 para h-16/20 */}
               <img 
                 src="/logo-guara.png" // COLOCAR SUA LOGO AQUI (pasta public)
                 alt="Oficina Guará Logo" 
                 className="h-full w-auto object-contain"
                 onError={(e) => {
                   e.target.onerror = null; 
                   e.target.style.display = 'none'; 
                   e.target.nextSibling.style.display = 'flex'; // Mostra fallback se imagem falhar
                 }}
               />
               {/* FALLBACK: Mostra texto se a imagem não carregar */}
               <div className="hidden flex-col leading-none ml-2" style={{display: 'none'}}>
                  <span className="text-xl md:text-2xl font-bold font-header tracking-tighter text-white">
                    OFICINA <span className="text-[#e51f23]">GUARÁ</span>
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-400">Centro Automotivo</span>
               </div>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                aria-label={link.ariaLabel}
                className="px-6 py-2 text-sm uppercase tracking-widest font-bold text-zinc-300 hover:text-white hover:bg-[#e51f23] rounded-full transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
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

          <div className={`fixed inset-0 bg-zinc-950 z-40 flex items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <ul className="flex flex-col items-center gap-8 w-full px-6">
              {navLinks.map((link) => (
                <li key={link.name} className="w-full">
                  <a 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-4 text-3xl font-header uppercase font-bold text-center text-white border-b border-white/10 hover:text-[#e51f23] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <Button onClick={() => setIsMenuOpen(false)} className="w-full mt-8">Ligar Agora</Button>
            </ul>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-zinc-900">
           <img 
              src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1600&auto=format&fit=crop" // Foto de oficina mecânica moderna
              alt="Oficina mecânica especializada em caminhonetes e carros importados"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
              loading="eager"
           />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e51f23]/10 border border-[#e51f23]/30 rounded-full text-[#e51f23] text-xs font-bold uppercase tracking-[0.2em]">
              <Star size={12} fill="#e51f23" />
              Especialistas em 4x4 e Pick-ups
            </div>
            
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-header leading-[0.9] text-white">
              REVISÃO TOTAL DA SUA <br />
               <span className="text-[#e51f23]">CAMINHONETE</span>
            </h2>
            
            <p className="text-zinc-300 text-lg md:text-xl max-w-xl leading-relaxed border-l-4 border-[#e51f23] pl-6">
              Manutenção especializada em Toyota, Nissan, GM, Ford, VW, Mitsubishi e muito mais. 
              Motor, câmbio, 4x4, diesel e injeção eletrônica.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="!text-lg !px-10 h-14">
                Avaliação Gratuita <ArrowRight className="inline ml-2" size={20} />
              </Button>
              <Button variant="outline" className="!text-lg !px-10 h-14">
                Nossos Serviços
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-8 text-zinc-500 font-header text-sm tracking-widest">
              <span>TOYOTA</span> • <span>FORD</span> • <span>MITSUBISHI</span> • <span>GM</span>
            </div>
          </div>
          
          <div className="hidden lg:flex justify-center items-center relative">
            <GlassCard className="p-10 !bg-black/20 !border-white/10 flex flex-col items-center text-center relative z-10 max-w-sm mx-auto">
                <MechanicAbstract />
                <div className="absolute bottom-10 left-0 right-0 text-center">
                    <p className="text-[#e51f23] font-bold uppercase tracking-widest text-sm mb-2">Tecnologia de Ponta</p>
                    <h3 className="text-2xl font-header font-bold text-white">DIAGNÓSTICO PRECISO</h3>
                </div>
            </GlassCard>
          </div>
        </div>
      </header>

      {/* --- SOBRE NÓS --- */}
      <section id="sobre" className="py-24 relative bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1 group">
            <div className="absolute inset-0 bg-[#e51f23] translate-x-4 translate-y-4 rounded-2xl opacity-20"></div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl aspect-video lg:aspect-square">
              {/* SUBSTITUA AQUI PELA FOTO REAL DA SUA OFICINA (ex: /foto-oficina.jpg) */}
              <img 
                src="https://images.unsplash.com/photo-1632823471565-1ec284d13cf6?q=80&w=1200&auto=format&fit=crop" // Foto placeholder de oficina real
                alt="Equipe Oficina Guará trabalhando" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
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

      {/* --- SERVIÇOS --- */}
      <section id="servicos" className="py-24 relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <SectionHeader title="Nossos Serviços" subtitle="Tudo para seu carro" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedServices.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.desc}
              />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button 
              variant="outline" 
              className="mx-auto !px-12 !py-4"
              onClick={() => setShowAllServices(!showAllServices)}
            >
              {showAllServices ? (
                <span className="flex items-center">Ver Menos <ChevronUp className="ml-2" /></span>
              ) : (
                <span className="flex items-center">Ver Todos os Serviços <ChevronDown className="ml-2" /></span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* --- CTA AVALIAÇÃO --- */}
      <section className="py-24 relative overflow-hidden bg-[#e51f23]">
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
           <div className="max-w-4xl mx-auto bg-black/20 backdrop-blur-sm border border-white/20 rounded-3xl py-16 px-8 md:px-16 shadow-2xl">
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

      {/* --- FOOTER / CONTATO --- */}
      <footer id="contato" className="bg-zinc-950 pt-24 pb-12 border-t border-white/5 relative">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2">
               {/* LOGO FOOTER - Ajuste de tamanho AQUI */}
               <img src="/logo-guara.png" alt="Oficina Guará" className="h-10 w-auto object-contain" // Aumentado de h-8 para h-10
                 onError={(e) => {
                   e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex';
                 }}
               />
               {/* Fallback Footer */}
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
              <li><a href="#home" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Início</a></li>
              <li><a href="#sobre" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Sobre Nós</a></li>
              <li><a href="#servicos" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Serviços</a></li>
              <li><a href="#contato" className="hover:text-[#e51f23] transition-colors flex items-center"><span className="w-1 h-1 bg-[#e51f23] rounded-full mr-2"></span>Fale Conosco</a></li>
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
          <p className="mb-2">Copyright © 2025 Oficina Guará. Todos os Direitos Reservados.</p>
          <p className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
            Desenvolvido por <span className="font-bold text-zinc-400">Agência Empatia</span>
          </p>
          <div className="mt-4 px-4 py-2 bg-white/5 rounded-full backdrop-blur-md text-[10px] text-zinc-500">
             🍪 Nós usamos Cookies para uma melhor experiência.
          </div>
        </div>
      </footer>
    </div>
  );
}