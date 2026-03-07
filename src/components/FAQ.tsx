import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FAQ = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const faqs = lang === "pt" ? [
    { question: "Quais regiões vocês atendem?", answer: "Atendemos Rio e Grande Rio" },
    { question: "Vocês fazem instalação?", answer: "Sim. Nossa equipe especializada faz a instalação no local com total segurança e acabamento profissional." },
    { question: "Vocês entregam para outras cidades ou estados?", answer: "Sim, trabalhamos dessa forma para letras menores. Além do envio, também realizamos a instalação presencial, que geralmente ocorre no estacionamento do cliente. Dependendo do projeto, a produção e a montagem são feitas inteiramente no local; em outros casos, já levamos as letras prontas apenas para a fixação final." },
    { question: "Vocês oferecem garantia?", answer: "Sim, todos os nossos serviços possuem garantia. O prazo padrão varia de 3 a 6 meses, dependendo da complexidade e do material utilizado. Para projetos que contam com a nossa fabricação e instalação completa, oferecemos prazos estendidos que podem chegar a 1 ano." },
    { question: "Qual é o prazo de entrega?", answer: "O prazo varia de acordo com o tipo de projeto. Letras caixa alta: geralmente entre 7 e 15 dias úteis. Fachadas e letreiros instalados: o prazo depende do tamanho e complexidade, mas em média de 15 a 30 dias corridos. Priorizamos rapidez sem perder a qualidade!" },
    { question: "Vocês fazem projetos personalizados?", answer: "Sim. Desenvolvemos letreiros, fachadas e estruturas de serralheria sob medida de acordo com a identidade visual e a necessidade do cliente. Cada projeto é único!" },
    { question: "Quais materiais vocês utilizam?", answer: "Trabalhamos com materiais de alta qualidade, como ACM, acrílico, PVC, aço inox, galvanizado, ferro e pintura eletrostática, garantindo durabilidade e acabamento premium." },
    { question: "Vocês fazem letreiros para igrejas?", answer: "Sim. Temos ampla experiência no segmento religioso, com projetos que valorizam a fachada e destacam a identidade da igreja." },
    { question: "Vocês trabalham com serralheria?", answer: "Sim! Oferecemos serviços de serralheria como fabricação de portões, grades, estruturas metálicas, suportes para letreiros e reforços de fachada. Tudo integrado aos nossos serviços de comunicação visual." },
    { question: "Vocês criam sites e logomarcas?", answer: "Sim! Desenvolvemos sites profissionais, responsivos e otimizados para SEO, além de logomarcas e identidade visual completa, incluindo cartões de visita e papelaria." },
    { question: "Vocês fazem banners e lonas?", answer: "Sim. Trabalhamos com impressão digital de alta qualidade em banners, lonas e faixas para promoções, eventos e fachadas temporárias." },
    { question: "Como solicito um orçamento?", answer: "Você pode solicitar um orçamento rápido através do nosso WhatsApp! Basta enviar as medidas aproximadas e, se possível, uma foto da fachada para agilizar o atendimento." },
    { question: "Quais formas de pagamento vocês aceitam?", answer: "Aceitamos transferência bancária, PIX e cartões de crédito." },
    { question: "Posso comprar apenas as letras e instalar por conta própria?", answer: "Sim. Você pode adquirir somente as letras caixa alta e instalá-las no seu estabelecimento. Enviamos bem embaladas com instruções básicas de fixação." },
    { question: "Vocês ajudam no design do letreiro?", answer: "Sim. Nossa equipe pode desenvolver a arte e layout do seu letreiro ou fachada para garantir a melhor visibilidade e impacto visual." },
  ] : [
    { question: "What regions do you serve?", answer: "We serve Rio de Janeiro and the Greater Rio area." },
    { question: "Do you provide installation?", answer: "Yes. Our specialized team performs on-site installation with full safety and professional finishing." },
    { question: "Do you deliver to other cities or states?", answer: "Yes, we offer shipping for smaller channel letters. In addition to shipping, we also provide on-site installation, typically performed at the customer's parking area or facility. Depending on the project, production and assembly are done entirely on-site; in other cases, we bring the finished letters ready for final mounting." },
    { question: "Do you offer a warranty?", answer: "Yes, all our services come with a warranty. The standard period varies from 3 to 6 months, depending on complexity and materials. For projects involving both our in-house manufacturing and full installation, we offer extended warranties of up to 1 year." },
    { question: "What is the turnaround time?", answer: "Turnaround varies by project. Channel letters: usually 7 to 15 business days. Facades and installed signs: depends on size and complexity, averaging 15 to 30 calendar days. We prioritize speed without compromising quality!" },
    { question: "Do you work on custom projects?", answer: "Yes. We develop custom signs, facades, and metalwork structures tailored to the client's visual identity and specific needs. Every project is unique!" },
    { question: "What materials do you use?", answer: "We work with high-quality materials such as ACM, acrylic, PVC, stainless steel, galvanized steel, iron, and electrostatic coating, ensuring durability and a premium finish." },
    { question: "Do you make signs for churches?", answer: "Yes. We have extensive experience in the religious sector, creating projects that enhance the facade and highlight the church's identity." },
    { question: "Do you offer metalwork services?", answer: "Yes! We provide metalwork services including gates, railings, metal structures, sign supports, and facade reinforcements—all integrated with our visual communication services." },
    { question: "Do you create websites and logos?", answer: "Yes! We develop professional, responsive, and SEO-optimized websites, as well as logos and complete visual identities, including business cards and stationery." },
    { question: "Do you make banners and tarps?", answer: "Yes. We provide high-quality digital printing for banners, tarps, and signs for promotions, events, and temporary displays." },
    { question: "How do I request a quote?", answer: "You can request a quick quote via WhatsApp! Just send approximate measurements and, if possible, a photo of the facade to speed up the process." },
    { question: "What payment methods do you accept?", answer: "We accept bank transfers, PIX (instant payments), and credit cards." },
    { question: "Can I buy just the letters and install them myself?", answer: "Yes. You can purchase the channel letters only and install them at your establishment. We ship them securely packaged with basic mounting instructions." },
    { question: "Do you help with the sign design?", answer: "Yes. Our team can develop the artwork and layout for your sign or facade to ensure maximum visibility and visual impact." },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`flex flex-col items-center mb-16 text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-primary/30" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
              {t("faq.tag")}
            </span>
            <div className="w-10 h-[1px] bg-primary/30" />
          </div>

          {/* TÍTULO */}
          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-foreground">{t("faq.title")} </span>
            <span className="text-gradient glow-text">
              {t("faq.titleHighlight")}
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("faq.desc")}
          </p>
        </div>

        <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-card rounded-3xl border border-border p-6 lg:p-8 shadow-xl">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-4 lg:px-6 bg-secondary/30 hover:bg-secondary/50 transition-colors data-[state=open]:bg-primary/5 data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline group">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <HelpCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground text-base lg:text-lg pr-4">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-12 pr-4 pb-5 text-base leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className={`text-center mt-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground mb-4">{t("faq.notFound")}</p>
          <a href="#contact" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
            {t("faq.contactUs")}
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
