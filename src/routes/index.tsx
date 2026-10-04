import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Flower2, Heart, MapPin, Menu, Scissors, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/salon-hero.jpg";
import hair from "@/assets/salon-hair.jpg";
import nails from "@/assets/salon-nails.jpg";
import facial from "@/assets/salon-facial.jpg";
import styling from "@/assets/salon-styling.jpg";
import pedicure from "@/assets/salon-pedicure.jpg";
import interior from "@/assets/salon-interior.jpg";
import products from "@/assets/salon-products.jpg";
import salonMotion from "@/assets/salon-motion.mp4.asset.json";
import salonMotionPoster from "@/assets/salon-motion-poster.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Transformação & Mudança | Cabeleireiro e Estética no Porto" },
      { name: "description", content: "Transformação & Mudança: cabeleireiro, manicure e estética em Ramalde, Porto. Conheça os nossos serviços e peça a sua marcação na Rua Direita das Campinas, 319." },
      { property: "og:title", content: "Transformação & Mudança | Cabeleireiro e Estética no Porto" },
      { property: "og:description", content: "Um espaço de cabeleireiro e estética no Porto dedicado à beleza, ao cuidado e ao bem-estar. Descubra os serviços e peça a sua marcação." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const services = [
  { name: "Cabeleireiro", description: "Corte e cuidados de cabelo pensados para si.", image: hair, icon: Scissors },
  { name: "Manicure", description: "Cuidado e atenção para as suas mãos.", image: nails, icon: Sparkles },
  { name: "Pedicure", description: "Um momento de cuidado para os seus pés.", image: pedicure, icon: Sparkles },
  { name: "Limpeza de pele", description: "Cuidados dedicados à sua pele.", image: facial, icon: Flower2 },
  { name: "Massagem facial", description: "Uma pausa para cuidar do rosto.", image: facial, icon: Heart },
  { name: "Depilação", description: "Cuidados de estética com atenção ao detalhe.", image: styling, icon: Sparkles },
  { name: "Cuidados de beleza", description: "Momentos dedicados ao seu bem-estar.", image: hero, icon: Flower2 },
  { name: "Produtos cosméticos", description: "Produtos para complementar os seus cuidados.", image: products, icon: Sparkles },
];

const gallery = [
  { image: hair, alt: "Corte de cabelo feminino realizado num salão", label: "Corte feminino" },
  { image: nails, alt: "Profissional a realizar uma manicure", label: "Manicure" },
  { image: styling, alt: "Styling de cabelo com secador", label: "Styling" },
  { image: facial, alt: "Tratamento facial num espaço de estética", label: "Tratamento facial" },
  { image: pedicure, alt: "Cuidados de pedicure", label: "Pedicure" },
  { image: interior, alt: "Interior de um salão de cabeleireiro", label: "O espaço" },
  { image: products, alt: "Produtos cosméticos num salão", label: "Produtos cosméticos" },
];

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
];

function Brand({ light = false }: { light?: boolean }) {
  return <a href="#inicio" className={`brand ${light ? "brand-light" : ""}`} aria-label="Transformação & Mudança — início">
    <span className="brand-monogram">T<span>&</span>M</span>
    <span className="brand-copy"><strong>TRANSFORMAÇÃO & MUDANÇA</strong><small>CABELEIREIRO & ESTÉTICA</small></span>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [request, setRequest] = useState("");
  const [selectedService, setSelectedService] = useState("");

  function chooseService(name: string) {
    setSelectedService(name);
    document.getElementById("marcacao")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = `Pedido de marcação — Transformação & Mudança\nNome: ${data.get("nome")}\nTelefone: ${data.get("telefone")}\nServiço: ${data.get("servico")}\nData preferida: ${data.get("data")}\nMensagem: ${data.get("mensagem") || "—"}`;
    try {
      await navigator.clipboard.writeText(text);
      setRequest("O seu pedido foi copiado. Ainda não foi enviado ao salão; será necessário partilhá-lo diretamente quando estiver disponível um contacto confirmado.");
    } catch {
      setRequest(`O pedido ainda não foi enviado ao salão. Guarde os dados e contacte o espaço diretamente: ${text}`);
    }
  }

  return <div id="inicio" className="site-shell">
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <Button asChild variant="gold" size="editorial" className="header-book"><a href="#marcacao">Marcar atendimento <ArrowUpRight aria-hidden="true" /></a></Button>
        <Button variant="ghost" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Navegação móvel">{navigation.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowUpRight size={17}/></a>)}<a href="#marcacao" onClick={() => setMenuOpen(false)}>Marcar atendimento<ArrowUpRight size={17}/></a></nav>}
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-image" src={hero} alt="" width={1600} height={1056} fetchPriority="high" />
        <video className="hero-video" src={salonMotion.url} poster={salonMotionPoster.url} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-content container">
          <div className="hero-text"><p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> CABELEIREIRO & ESTÉTICA · PORTO</p>
            <p className="hero-brand">TRANSFORMAÇÃO & MUDANÇA</p>
            <h1 id="hero-title">Beleza, cuidado e <em>transformação</em> num só lugar.</h1>
            <p className="hero-description">Serviços de cabeleireiro e estética pensados para cuidar de si com profissionalismo e atenção ao detalhe.</p>
            <div className="hero-actions"><Button asChild variant="gold" size="editorial"><a href="#marcacao">Marcar atendimento <ArrowUpRight /></a></Button><Button asChild variant="heroOutline" size="editorial"><a href="#servicos">Ver serviços <ArrowRight /></a></Button></div>
          </div>
          <a href="#introducao" className="hero-scroll" aria-label="Explorar a página"><ArrowDown size={19} /> <span>DESCUBRA MAIS</span></a>
        </div>
        <div className="hero-side-note">CUIDAR DE SI, TODOS OS DIAS</div>
      </section>

      <section id="introducao" className="intro-section section-pad">
        <div className="container intro-grid">
          <div className="intro-copy"><p className="eyebrow"><span className="eyebrow-line"/> UM ESPAÇO PARA SI</p><h2>O seu momento de <em>se sentir bem.</em></h2><p>Na Transformação & Mudança, cada detalhe conta. Um espaço dedicado a realçar a sua beleza e a tornar cada visita num momento de cuidado.</p><a className="text-link" href="#sobre">Conheça o nosso espaço <ArrowUpRight size={18}/></a></div>
          <div className="intro-collage"><figure className="intro-photo intro-photo-main"><img src={hair} alt="Cabeleireira a cortar o cabelo de uma cliente" loading="lazy" width={1008} height={1264}/><figcaption>01 / CABELEIREIRO</figcaption></figure><figure className="intro-photo intro-photo-top"><img src={nails} alt="Manicure realizada com cuidado" loading="lazy" width={1008} height={1264}/><figcaption>02 / MANICURE</figcaption></figure><figure className="intro-photo intro-photo-bottom"><img src={facial} alt="Cuidados faciais em ambiente acolhedor" loading="lazy" width={1008} height={1264}/><figcaption>03 / ESTÉTICA</figcaption></figure></div>
        </div>
      </section>

      <section id="servicos" className="services-section section-pad">
        <div className="container"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> O QUE FAZEMOS</p><h2>Os nossos <em>serviços</em></h2></div><p>Uma vasta gama de serviços para realçar a sua beleza e bem-estar.</p></div>
          <div className="service-grid">{services.map((service, i) => { const Icon = service.icon; return <article className="service-card" key={service.name}><div className="service-image"><img src={service.image} alt={`${service.name} — cuidados de cabeleireiro e estética`} loading="lazy" width={1008} height={1264}/><span className="service-index">{String(i + 1).padStart(2, "0")}</span></div><div className="service-info"><div className="service-title"><Icon size={19} strokeWidth={1.3} aria-hidden="true"/><h3>{service.name}</h3></div><p>{service.description}</p><Button variant="textArrow" onClick={() => chooseService(service.name)}>Saber mais <ArrowUpRight size={16}/></Button></div></article>})}</div>
        </div>
      </section>

      <section className="statement-section"><div className="container statement-inner"><span className="statement-star">✳</span><p>Um lugar para fazer uma pausa, cuidar de si e sair a sentir-se <em>renovada.</em></p><span className="statement-caption">TRANSFORMAÇÃO & MUDANÇA · PORTO</span></div></section>

      <section id="galeria" className="gallery-section section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> INSPIRAÇÃO & CUIDADO</p><h2>Momentos de <em>beleza</em></h2></div><p>Do cabelo à estética, descubra os cuidados que fazem parte do nosso universo.</p></div>
        <div className={`gallery-grid ${galleryOpen ? "gallery-expanded" : ""}`}>{gallery.map((item, i) => <figure className={`gallery-item gallery-item-${i + 1}`} key={item.label}><img src={item.image} alt={item.alt} loading="lazy" width={1008} height={1264}/><figcaption><span>{item.label}</span><ArrowUpRight size={18}/></figcaption></figure>)}</div>
        <div className="gallery-action"><Button variant="outlineEditorial" size="editorial" onClick={() => setGalleryOpen(!galleryOpen)}>{galleryOpen ? "Ver menos" : "Ver galeria completa"} {galleryOpen ? <ChevronDown className="rotate-180" /> : <ArrowUpRight />}</Button></div>
      </div></section>

      <section id="sobre" className="about-section"><div className="about-photo"><img src={styling} alt="Profissional a trabalhar no cabelo de uma cliente" loading="lazy" width={1008} height={1264}/></div><div className="about-content"><div className="about-content-inner"><p className="eyebrow"><span className="eyebrow-line"/> O NOSSO ESPAÇO</p><h2>Sobre <em>Nós</em></h2><p className="about-lead">Um espaço dedicado à beleza, ao cuidado e ao bem-estar, onde cada atendimento é pensado para proporcionar uma experiência agradável e personalizada.</p><p>Da primeira conversa ao toque final, o nosso foco é simples: que se sinta bem e à vontade.</p><Button asChild variant="outlineEditorial" size="editorial"><a href="#contacto">Conheça-nos <ArrowUpRight /></a></Button></div></div></section>

      <section className="why-section section-pad"><div className="container"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line"/> A NOSSA ESSÊNCIA</p><h2>Porquê <em>escolher-nos</em></h2></div></div><div className="why-grid">{[
        { icon: Heart, title: "Atendimento personalizado" }, { icon: Sparkles, title: "Diversidade de serviços" }, { icon: Flower2, title: "Ambiente acolhedor" }, { icon: Scissors, title: "Cuidado com cada detalhe" }, { icon: MapPin, title: "Localização no Porto" },
      ].map((item, i) => { const Icon = item.icon; return <div className="why-item" key={item.title}><span className="why-number">0{i + 1}</span><Icon size={30} strokeWidth={1.2} aria-hidden="true"/><h3>{item.title}</h3></div>})}</div></div></section>

      <section id="marcacao" className="booking-section section-pad"><div className="container booking-grid"><div className="booking-main"><p className="eyebrow"><span className="eyebrow-line"/> O SEU PRÓXIMO MOMENTO</p><h2>Marcar <em>atendimento</em></h2><p className="booking-intro">Escolha o serviço pretendido e prepare o seu pedido de marcação.</p><form onSubmit={handleBooking} className="booking-form"><div className="form-row"><label>Nome completo <input name="nome" type="text" autoComplete="name" placeholder="O seu nome" required /></label><label>Telefone <input name="telefone" type="tel" autoComplete="tel" placeholder="O seu contacto" required /></label></div><div className="form-row"><label>Serviço pretendido <select name="servico" value={selectedService} onChange={e => setSelectedService(e.target.value)} required><option value="">Selecione um serviço</option>{services.map(service => <option key={service.name} value={service.name}>{service.name}</option>)}</select></label><label>Data preferida <input name="data" type="date" min={new Date().toISOString().slice(0, 10)} required /></label></div><label>Mensagem <textarea name="mensagem" rows={3} placeholder="Conte-nos o que procura (opcional)" /></label><Button type="submit" variant="gold" size="editorial" className="form-submit">Solicitar marcação <ArrowUpRight /></Button><p className="form-note">O pedido não é enviado automaticamente. Sem um contacto confirmado, pode copiar os dados para os partilhar diretamente com o salão.</p>{request && <p className="form-feedback" role="status"><Check size={17}/>{request}</p>}</form></div><aside id="contacto" className="contact-aside"><div className="contact-top"><span className="contact-symbol">T<span>&</span>M</span><p>ESTAMOS À SUA ESPERA</p></div><div><p className="eyebrow eyebrow-light">VISITE-NOS</p><h3>Contacte-nos</h3><address>Rua Direita das Campinas, 319<br/>4100-207 Porto, Portugal</address><div className="contact-divider"/><p className="contact-label">TELEFONE</p><p className="contact-phone">226 101...</p><p className="contact-note">Número incompleto — confirme antes de ligar.</p><a className="maps-link" href="https://www.google.com/maps/search/?api=1&query=Rua+Direita+das+Campinas+319%2C+4100-207+Porto%2C+Portugal" target="_blank" rel="noopener noreferrer">Ver localização no Google Maps <ArrowUpRight size={18}/></a></div></aside></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-main"><div><Brand light/><p className="footer-tagline">Um espaço dedicado à sua beleza e bem-estar no Porto.</p></div><nav aria-label="Navegação de rodapé">{navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav><div className="footer-address"><span>ENCONTRE-NOS</span><p>Rua Direita das Campinas, 319<br/>4100-207 Porto, Portugal</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Transformação & Mudança</span><span>ISABEL QUEIRÓZ DO VALE · PORTO</span><a href="#inicio">Voltar ao topo ↑</a></div></div></footer>
    <a className="mobile-sticky-cta" href="#marcacao">Marcar atendimento <ArrowUpRight size={18}/></a>
  </div>;
}
