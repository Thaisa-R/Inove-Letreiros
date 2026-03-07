import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Header nav
  "nav.home": { pt: "Início", en: "Home" },
  "nav.about": { pt: "Sobre", en: "About" },
  "nav.services": { pt: "Serviços", en: "Services" },
  "nav.portfolio": { pt: "Portfólio", en: "Portfolio" },
  "nav.partners": { pt: "Parceiros", en: "Partners" },
  "nav.contact": { pt: "Contato", en: "Contact" },
  "nav.faq": { pt: "Dúvidas", en: "FAQ" },

  // Hero
  "hero.badge": { pt: "Desde 2016 iluminando ideias", en: "Illuminating ideas since 2016" },
  "hero.title1": { pt: "Transformamos", en: "We transform" },
  "hero.title2": { pt: "sua marca em luz", en: "your brand into light" },
  "hero.desc": {
    pt: "Criamos letreiros personalizados que destacam seu negócio. LED, neon, ACM, serralheria e mais — tudo com qualidade premium e design inovador.",
    en: "We create custom signs that highlight your business. LED, neon, ACM, metalwork and more — all with premium quality and innovative design.",
  },

  // About
  "about.tag": { pt: "Sobre Nós", en: "About Us" },
  "about.title": { pt: "Iluminando histórias", en: "Illuminating stories" },
  "about.titleHighlight": { pt: "desde 2016", en: "since 2016" },
  "about.p1": {
    pt: "A Inov nasceu em 2016 da paixão por transformar espaços através da comunicação visual. Começamos com um sonho e hoje somos referência em letreiros personalizados, fachadas e serralheria.",
    en: "Inov was born in 2016 from the passion for transforming spaces through visual communication. We started with a dream and today we are a reference in custom signs, facades and metalwork.",
  },
  "about.p2": {
    pt: "Nossa missão é dar vida às suas ideias, criando peças únicas que capturam a essência da sua marca e atraem olhares. Cada projeto é uma nova oportunidade de inovar.",
    en: "Our mission is to bring your ideas to life, creating unique pieces that capture the essence of your brand. Every project is a new opportunity to innovate.",
  },
  "about.innovation": { pt: "Inovação", en: "Innovation" },
  "about.innovationDesc": { pt: "Sempre buscando as últimas tendências e tecnologias em comunicação visual.", en: "Always seeking the latest trends and technologies in visual communication." },
  "about.precision": { pt: "Precisão", en: "Precision" },
  "about.precisionDesc": { pt: "Atenção aos detalhes em cada projeto, do design à instalação final.", en: "Attention to detail in every project, from design to final installation." },
  "about.quality": { pt: "Qualidade", en: "Quality" },
  "about.qualityDesc": { pt: "Materiais premium e acabamento impecável em todos os nossos letreiros.", en: "Premium materials and impeccable finish in all our signs." },
  "about.partnership": { pt: "Parceria", en: "Partnership" },
  "about.partnershipDesc": { pt: "Trabalhamos lado a lado com você para entender e realizar sua visão.", en: "We work side by side with you to understand and realize your vision." },

  // Services
  "services.tag": { pt: "Nossos Serviços", en: "Our Services" },
  "services.title": { pt: "Soluções que", en: "Solutions that" },
  "services.titleHighlight": { pt: "brilham", en: "shine" },
  "services.desc": {
    pt: "Do conceito à instalação, oferecemos um serviço completo para transformar sua visão em realidade luminosa.",
    en: "From concept to installation, we offer a complete service to transform your vision into luminous reality.",
  },
  "services.learnMore": { pt: "Saiba mais", en: "Learn more" },
  "services.notFound": { pt: "Não encontrou o que procura? Temos soluções personalizadas para você.", en: "Didn't find what you're looking for? We have custom solutions for you." },
  "services.cta": { pt: "Fale Conosco", en: "Contact Us" },

  // Portfolio
  "portfolio.tag": { pt: "Portfólio", en: "Portfolio" },
  "portfolio.title": { pt: "Projetos", en: "Projects" },
  "portfolio.titleHighlight": { pt: "Realizados", en: "Completed" },
  "portfolio.desc": { pt: "Cada projeto é único. Veja como transformamos ideias em realidade.", en: "Every project is unique. See how we turn ideas into reality." },
  "portfolio.all": { pt: "Todos", en: "All" },
  "portfolio.amarelinho.desc": { pt: "Letreiro 3D com letras caixa em PVC expandido e laterais adesivadas.", en: "3D signage with expanded PVC channel letters and adhesive sides." },
  "portfolio.dila.desc": { pt: "Fachada em ACM dourado com letras caixa alta também em ACM.", en: "Golden ACM facade with matching ACM channel letters." },
  "portfolio.petrobras.desc": { pt: "Letreiro 3D 360°, visível de todos os ângulos e fixado ao solo.", en: "360° 3D signage, visible from all angles and ground-mounted." },
  "portfolio.aconchego.desc": { pt: "Fachada em ACM preto com letras em ACM branco de alto contraste.", en: "Black ACM facade with high-contrast white ACM lettering." },
  "portfolio.gugas.desc": { pt: "Fachada com base em ACM e letras 3D em caixa alta.", en: "ACM base facade with 3D channel letters." },
  "portfolio.maria.desc": { pt: "Fachada em ACM com letra caixa 3D e iluminação frontal por refletores.", en: "ACM facade with 3D channel letters and front spotlighting." },
  "portfolio.microlins.desc": { pt: "Letreiro 3D em ACM branco sobreposto a fundo em ACM azul.", en: "White ACM 3D signage overlaid on a blue ACM background." },
  "portfolio.camila.desc": { pt: "Fachada em ACM com letras caixa 3D de alta durabilidade.", en: "High-durability ACM facade with 3D channel letters." },
  "portfolio.mellos.desc": { pt: "Letreiro circular 3D com sistema de iluminação interna (Backlight).", en: "Circular 3D sign with internal lighting system (Backlight)." },
  "portfolio.multicargo.desc": { pt: "Letras em PVC expandido aplicadas diretamente na parede da recepção.", en: "Expanded PVC letters applied directly to the reception wall." },
  "portfolio.pontomix.desc": { pt: "Fachada em ACM com letras 3D e iluminação interna embutida.", en: "ACM facade with 3D letters and built-in internal lighting." },
  "portfolio.peevida.desc": { pt: "Letreiro 3D com iluminação indireta (Halo Light) por trás das letras.", en: "3D signage with indirect lighting (Halo Light) behind the letters." },
  "portfolio.salada.desc": { pt: "Letreiro 3D com iluminação interna retroiluminada.", en: "3D signage with backlit internal lighting." },
  "portfolio.modal.close": { pt: "Fechar", en: "Close" },

  // Partners
  "partners.tag": { pt: "Parceiros", en: "Partners" },
  "partners.title": { pt: "Empresas que", en: "Companies that" },
  "partners.titleHighlight": { pt: "confiam", en: "trust" },
  "partners.titleEnd": { pt: "em nós", en: "us" },

  // FAQ
  "faq.tag": { pt: "Tire suas dúvidas", en: "Got questions?" },
  "faq.title": { pt: "Perguntas", en: "Frequently Asked" },
  "faq.titleHighlight": { pt: "Frequentes", en: "Questions" },
  "faq.desc": {
    pt: "Confira as respostas para as dúvidas mais comuns sobre nossos serviços de comunicação visual, fabricação de letreiros e serralheria.",
    en: "Check the answers to the most common questions about our visual communication, sign manufacturing and metalwork services.",
  },
  "faq.notFound": { pt: "Não encontrou sua dúvida?", en: "Didn't find your question?" },
  "faq.contactUs": { pt: "Entre em contato conosco", en: "Contact us" },

  // Contact
  "contact.tag": { pt: "Contato", en: "Contact" },
  "contact.title": { pt: "Vamos criar algo", en: "Let's create something" },
  "contact.titleHighlight": { pt: "incrível", en: "amazing" },
  "contact.titleEnd": { pt: "juntos?", en: "together" },
  "contact.desc": {
    pt: "Entre em contato para um orçamento gratuito. Estamos prontos para transformar sua visão em realidade luminosa.",
    en: "Get in touch for a free quote. We're ready to turn your vision into luminous reality.",
  },
  "contact.phone": { pt: "Telefone", en: "Phone" },
  "contact.email": { pt: "Email", en: "Email" },
  "contact.address": { pt: "Endereço", en: "Address" },
  "contact.formTitle": { pt: "Solicite seu orçamento", en: "Request a quote" },
  "contact.name": { pt: "Nome", en: "Name" },
  "contact.namePlaceholder": { pt: "Seu nome completo", en: "Your full name" },
  "contact.emailPlaceholder": { pt: "seu@email.com", en: "your@email.com" },
  "contact.serviceType": { pt: "Tipo de Serviço", en: "Service Type" },
  "contact.servicePlaceholder": { pt: "Selecione o serviço desejado", en: "Select desired service" },
  "contact.photo": { pt: "Foto do espaço", en: "Photo of the space" },
  "contact.photoHint": { pt: "(opcional, máx. 5MB)", en: "(optional, max. 5MB)" },
  "contact.photoClick": { pt: "Clique para enviar uma foto", en: "Click to upload a photo" },
  "contact.photoSuccess": { pt: "Imagem anexada com sucesso", en: "Image attached successfully" },
  "contact.message": { pt: "Mensagem", en: "Message" },
  "contact.messagePlaceholder": { pt: "Descreva seu projeto, medidas aproximadas, cores desejadas...", en: "Describe your project, approximate dimensions, desired colors..." },
  "contact.send": { pt: "Enviar via WhatsApp", en: "Send via WhatsApp" },
  "contact.imageLimit": { pt: "A imagem deve ter no máximo 5MB.", en: "Image must be max 5MB." },

  // Footer
  "footer.rights": { pt: "Todos os direitos reservados.", en: "All rights reserved." },

};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("pt");

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
