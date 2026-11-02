// --- EDER BATERIA: landing page própria em /eder-bateria (sem o menu do site principal) ---
import { Link } from 'react-router-dom';
import {
  MessageCircle, Phone, Car, CarFront, Truck, Motorbike, Zap, ShieldCheck, Receipt, Wrench,
  MapPin, Clock, Recycle, ChevronDown, CheckCircle, BatteryCharging,
} from 'lucide-react';
import {
  EDER_BATERIA, ederWhatsappLink, BATERIA_SELOS, BATERIA_MARCAS, BATERIA_TIPOS, BATERIA_PASSOS,
  BATERIA_VEICULOS, BATERIA_REGIOES, BATERIA_FAQ,
} from './ederBateria';
import { HOURS, EMAIL, MAPS_LINK } from './siteConfig';

const VEICULO_ICON = { car: Car, suv: CarFront, truck: Truck, moto: Motorbike };

// Botões: texto escuro sobre verde/laranja (contraste acima de 4,5:1)
const CtaWhatsapp = ({ posicao, marca, children, className = '' }) => (
  <a
    href={ederWhatsappLink(marca)}
    target="_blank"
    rel="noopener noreferrer"
    data-cta="whatsapp"
    data-posicao={posicao}
    className={`inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl bg-[#25D366] text-[#111] font-bold uppercase tracking-wide text-sm md:text-base hover:brightness-95 transition ${className}`}
  >
    <MessageCircle size={20} aria-hidden="true" /> {children}
  </a>
);

const CtaLigar = ({ posicao, children, className = '' }) => (
  <a
    href={EDER_BATERIA.phoneLink}
    data-cta="telefone"
    data-posicao={posicao}
    className={`inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl bg-[#F26A1B] text-[#111] font-bold uppercase tracking-wide text-sm md:text-base hover:brightness-95 transition ${className}`}
  >
    <Phone size={18} aria-hidden="true" /> {children}
  </a>
);

const SectionTitle = ({ eyebrow, children }) => (
  <div className="mb-8 md:mb-12">
    {eyebrow && <p className="text-[#F26A1B] font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-2">{eyebrow}</p>}
    <h2 className="font-header font-bold uppercase text-3xl md:text-5xl leading-none text-white">{children}</h2>
  </div>
);

export default function EderBateriaPage() {
  return (
    <div className="min-h-screen bg-[#111] text-zinc-100 font-sans overflow-x-hidden pb-20 md:pb-0">
      {/* TOPO: só o logo (sem menu que tire o visitante da página) */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <img src={EDER_BATERIA.logo} alt="Eder Bateria, por Oficina do Eder" width="254" height="56" className="h-10 md:h-12 w-auto" fetchPriority="high" />
          <CtaLigar posicao="topo" className="hidden md:inline-flex !min-h-11 !px-5">{EDER_BATERIA.phoneDisplay}</CtaLigar>
        </div>
      </header>

      <main>
        {/* 1. HERO */}
        <section className="relative">
          <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-[#F26A1B]/50 text-[#F26A1B] text-xs font-bold uppercase tracking-widest">
                <Zap size={14} aria-hidden="true" /> Resgate de bateria por motoboy
              </p>
              <h1 className="font-header font-bold uppercase text-[40px] leading-[1.02] sm:text-5xl lg:text-7xl text-white">
                {EDER_BATERIA.h1}
              </h1>
              <p className="mt-5 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-xl">
                Seu carro não pegou? Nosso motoboy leva a bateria nova até você, instala no local e testa o alternador.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <CtaWhatsapp posicao="hero">Chamar no WhatsApp</CtaWhatsapp>
                <CtaLigar posicao="hero">Ligar agora</CtaLigar>
              </div>
              <ul className="mt-8 grid grid-cols-2 gap-3 max-w-xl">
                {BATERIA_SELOS.map((selo) => (
                  <li key={selo} className="flex items-start gap-2 text-sm text-zinc-200">
                    <CheckCircle size={18} className="text-[#F26A1B] shrink-0 mt-0.5" aria-hidden="true" /> {selo}
                  </li>
                ))}
              </ul>
            </div>
            {/* Ilustração só no desktop: no celular o <picture> entrega um pixel vazio, sem baixar os 74 KB */}
            <picture className="hidden lg:flex justify-center" aria-hidden="true">
              <source media="(min-width: 1024px)" srcSet="/eder-bateria/icone-motoboy.webp" type="image/webp" />
              <img src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="" width="934" height="560" className="w-full max-w-lg h-auto" />
            </picture>
          </div>
        </section>

        {/* 2. MARCAS */}
        <section className="py-14 md:py-20 bg-zinc-900/60 border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <SectionTitle eyebrow="Duas marcas, um clique para cotar">Baterias Heliar e Moura</SectionTitle>
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {BATERIA_MARCAS.map((marca) => (
                <article key={marca.nome} className="p-6 md:p-8 rounded-2xl bg-[#111] border border-white/10 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <BatteryCharging size={32} className="text-[#F26A1B]" aria-hidden="true" />
                    <h3 className="font-header font-bold uppercase text-4xl md:text-5xl text-white">{marca.nome}</h3>
                  </div>
                  <p className="text-zinc-300">{marca.texto}</p>
                  <CtaWhatsapp posicao={`card-${marca.nome.toLowerCase()}`} marca={marca.nome} className="mt-auto">Cotar bateria {marca.nome}</CtaWhatsapp>
                </article>
              ))}
            </div>
            <dl className="mt-8 grid sm:grid-cols-3 gap-4">
              {BATERIA_TIPOS.map((tipo) => (
                <div key={tipo.nome} className="p-4 rounded-xl border border-white/10">
                  <dt className="font-header font-bold uppercase text-[#F26A1B] text-lg">{tipo.nome}</dt>
                  <dd className="text-zinc-300 text-sm mt-1">{tipo.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 3. COMO FUNCIONA */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <SectionTitle eyebrow="Do chamado à troca no local">Como funciona</SectionTitle>
            <ol className="grid md:grid-cols-3 gap-4 md:gap-6">
              {BATERIA_PASSOS.map((passo, i) => (
                <li key={passo.titulo} className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
                  <span className="font-header font-bold text-5xl text-[#F26A1B]">{i + 1}</span>
                  <h3 className="mt-2 font-header font-bold uppercase text-xl text-white">{passo.titulo}</h3>
                  <p className="mt-2 text-zinc-300">{passo.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. RESGATE POR MOTOBOY */}
        <section className="py-14 md:py-20 bg-[#F26A1B] text-[#111]">
          <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <h2 className="font-header font-bold uppercase text-3xl md:text-5xl leading-none">Resgate por motoboy</h2>
              <p className="mt-4 text-lg md:text-xl max-w-2xl">
                O motoboy sai do Guará II com a bateria certa na garupa, troca onde o carro parou e testa o alternador antes de ir embora.
                A previsão de chegada é informada no WhatsApp antes de sair.
              </p>
            </div>
            <CtaWhatsapp posicao="resgate" className="!bg-[#111] !text-white">Pedir resgate</CtaWhatsapp>
          </div>
        </section>

        {/* 5. PARA QUAL VEÍCULO */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <SectionTitle eyebrow="Bateria certa para cada veículo">Para qual veículo</SectionTitle>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {BATERIA_VEICULOS.map((v) => {
                const Icon = VEICULO_ICON[v.icon];
                return (
                  <li key={v.nome} className={`p-5 rounded-2xl border text-center ${v.destaque ? 'border-[#F26A1B] bg-[#F26A1B]/10' : 'border-white/10 bg-zinc-900/60'}`}>
                    <Icon size={40} className="mx-auto text-[#F26A1B]" aria-hidden="true" />
                    <p className="mt-3 font-bold text-white">{v.nome}</p>
                    {v.destaque && <p className="mt-1 text-xs text-[#F26A1B] font-bold uppercase">{v.destaque}</p>}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 6. REGIÕES ATENDIDAS */}
        <section className="py-14 md:py-20 bg-zinc-900/60 border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8">
            <SectionTitle eyebrow="Saindo do Guará II">Regiões atendidas</SectionTitle>
            <ul className="flex flex-wrap gap-2 md:gap-3">
              {BATERIA_REGIOES.map((regiao) => (
                <li key={regiao} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-zinc-200 text-sm">
                  <MapPin size={14} className="text-[#F26A1B]" aria-hidden="true" /> {regiao}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. CONFIANÇA */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-8">
            <SectionTitle eyebrow="Selo Qualidade Eder">Uma oficina de verdade por trás</SectionTitle>
            <ul className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: Wrench, titulo: 'Oficina completa no Guará II', texto: 'Se não for a bateria, a Oficina Guará resolve. Especialistas em caminhonetes.' },
                { icon: ShieldCheck, titulo: 'Selo Qualidade Eder', texto: 'O mesmo padrão de atendimento da Oficina do Eder, agora no resgate de bateria.' },
                { icon: Receipt, titulo: 'Nota fiscal e garantia', texto: 'Heliar e Moura originais com garantia de fábrica.' },
              ].map((item) => (
                <li key={item.titulo} className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
                  <item.icon size={28} className="text-[#F26A1B]" aria-hidden="true" />
                  <h3 className="mt-3 font-bold text-white text-lg">{item.titulo}</h3>
                  <p className="mt-1 text-zinc-300">{item.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 8. PERGUNTAS FREQUENTES */}
        <section className="py-14 md:py-20 bg-zinc-900/60 border-y border-white/5">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <SectionTitle>Perguntas frequentes</SectionTitle>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {BATERIA_FAQ.map((item) => (
                <details key={item.pergunta} className="group">
                  <summary className="flex items-center justify-between gap-4 min-h-14 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-bold text-white">
                    {item.pergunta}
                    <ChevronDown size={20} className="text-[#F26A1B] shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="pb-5 text-zinc-300 leading-relaxed">{item.resposta}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9. CHAMADA FINAL */}
        <section className="py-16 md:py-24 text-center">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="font-header font-bold uppercase text-3xl md:text-5xl text-white max-w-3xl mx-auto leading-tight">
              Carro parado? A bateria certa já pode estar a caminho.
            </h2>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <CtaWhatsapp posicao="chamada-final">Chamar no WhatsApp</CtaWhatsapp>
              <CtaLigar posicao="chamada-final">Ligar agora</CtaLigar>
            </div>
          </div>
        </section>
      </main>

      {/* 10. RODAPÉ */}
      <footer className="border-t border-white/10 py-10 text-sm text-zinc-400">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-bold text-white">{EDER_BATERIA.fullName}</p>
            <p className="mt-1">Sub marca da Oficina Guará.</p>
          </div>
          <ul className="space-y-1">
            <li><a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 py-3 hover:text-white"><MapPin size={16} className="text-[#F26A1B] shrink-0 mt-0.5" aria-hidden="true" />Área Especial 2A, Conjunto A, Lote 6, Guará II · Brasília/DF · CEP 71070-625</a></li>
            <li className="inline-flex items-center gap-2 py-1"><Clock size={16} className="text-[#F26A1B]" aria-hidden="true" />{HOURS.display}</li>
            <li><a href={EDER_BATERIA.phoneLink} data-cta="telefone" data-posicao="rodape" className="inline-flex items-center gap-2 py-3 hover:text-white"><Phone size={16} className="text-[#F26A1B]" aria-hidden="true" />{EDER_BATERIA.phoneDisplay}</a></li>
            <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 py-3 hover:text-white break-all">{EMAIL}</a></li>
          </ul>
          <ul className="space-y-1">
            <li><Link to="/" className="inline-flex items-center gap-2 py-3 hover:text-white"><Wrench size={16} className="text-[#F26A1B]" aria-hidden="true" />Oficina mecânica no Guará</Link></li>
            <li className="inline-flex items-center gap-2 py-1"><Recycle size={16} className="text-[#F26A1B]" aria-hidden="true" />Descarte correto da bateria usada</li>
          </ul>
        </div>
      </footer>

      {/* BARRA FIXA NO CELULAR */}
      <nav aria-label="Contato rápido" className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 gap-2 p-2 bg-[#111]/95 border-t border-white/10 backdrop-blur">
        <CtaWhatsapp posicao="rodape-fixo" className="!px-2 !text-xs">WhatsApp</CtaWhatsapp>
        <CtaLigar posicao="rodape-fixo" className="!px-2 !text-xs">Ligar agora</CtaLigar>
      </nav>
    </div>
  );
}
