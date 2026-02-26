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
    { question: "Quais regiões vocês atendem?", answer: "Atendemos todo o Brasil! Nossa fabricação é própria e enviamos pelos Correios ou transportadora para qualquer lugar do país. Para a região metropolitana, realizamos também a instalação completa de fachadas e letreiros comerciais." },
    { question: "Vocês fazem instalação?", answer: "Sim. Nossa equipe especializada faz a instalação no local com total segurança e acabamento profissional." },
    { question: "Vocês entregam para outras cidades ou estados?", answer: "Sim. As letras caixa alta são fabricadas em nossa empresa e enviadas pelos Correios ou transportadora para qualquer lugar do Brasil, bem embaladas e com instruções de fixação." },
    { question: "Vocês oferecem garantia?", answer: "Sim. Nossos produtos têm garantia contra defeitos de fabricação e instalação. O prazo varia conforme o tipo de material e serviço contratado." },
    { question: "Qual é o prazo de entrega?", answer: "O prazo varia de acordo com o tipo de projeto. Letras caixa alta: geralmente entre 7 e 15 dias úteis. Fachadas e letreiros instalados: o prazo depende do tamanho e complexidade, mas em média de 15 a 30 dias corridos. Priorizamos rapidez sem perder a qualidade!" },
    { question: "Vocês fazem projetos personalizados?", answer: "Sim. Desenvolvemos letreiros, fachadas e estruturas de serralheria sob medida de acordo com a identidade visual e a necessidade do cliente. Cada projeto é único!" },
    { question: "Quais materiais vocês utilizam?", answer: "Trabalhamos com materiais de alta qualidade, como ACM, acrílico, PVC, aço inox, galvanizado, ferro e pintura eletrostática, garantindo durabilidade e acabamento premium." },
    { question: "Vocês fazem letreiros para igrejas?", answer: "Sim. Temos ampla experiência no segmento religioso, com projetos que valorizam a fachada e destacam a identidade da igreja." },
    { question: "Vocês trabalham com serralheria?", answer: "Sim! Oferecemos serviços de serralheria como fabricação de portões, grades, estruturas metálicas, suportes para letreiros e reforços de fachada. Tudo integrado aos nossos serviços de comunicação visual." },
    { question: "Vocês criam sites e logomarcas?", answer: "Sim! Desenvolvemos sites profissionais, responsivos e otimizados para SEO, além de logomarcas e identidade visual completa, incluindo cartões de visita e papelaria." },
    { question: "Vocês fazem banners e lonas?", answer: "Sim. Trabalhamos com impressão digital de alta qualidade em banners, lonas e faixas para promoções, eventos e fachadas temporárias." },
    { question: "Como solicito um orçamento?", answer: "Você pode solicitar um orçamento rápido através do nosso WhatsApp! Basta enviar as medidas aproximadas e, se possível, uma foto da fachada para agilizar o atendimento." },
    { question: "Quais formas de pagamento vocês aceitam?", answer: "Aceitamos transferência bancária, PIX, cartões de crédito e condições facilitadas conforme o projeto." },
    { question: "Posso comprar apenas as letras e instalar por conta própria?", answer: "Sim. Você pode adquirir somente as letras caixa alta e instalá-las no seu estabelecimento. Enviamos bem embaladas com instruções básicas de fixação." },
    { question: "Vocês ajudam no design do letreiro?", answer: "Sim. Nossa equipe pode desenvolver a arte e layout do seu letreiro ou fachada para garantir a melhor visibilidade e impacto visual." },
  ] : [
    { question: "What regions do you serve?", answer: "We serve all of Brazil! We manufacture in-house and ship via mail or freight to anywhere in the country. For the metropolitan area, we also offer complete installation of facades and commercial signs." },
    { question: "Do you do installation?", answer: "Yes. Our specialized team performs on-site installation with full safety and professional finishing." },
    { question: "Do you deliver to other cities or states?", answer: "Yes. The 3D letters are manufactured in our facility and shipped via mail or freight to anywhere in Brazil, well-packaged with installation instructions." },
    { question: "Do you offer warranty?", answer: "Yes. Our products are guaranteed against manufacturing and installation defects. The warranty period varies according to the type of material and service." },
    { question: "What is the delivery time?", answer: "Delivery varies by project type. 3D letters: usually 7-15 business days. Facades and installed signs: depends on size and complexity, averaging 15-30 calendar days. We prioritize speed without compromising quality!" },
    { question: "Do you do custom projects?", answer: "Yes. We develop custom signs, facades and metalwork structures according to your brand identity and needs. Every project is unique!" },
    { question: "What materials do you use?", answer: "We work with high-quality materials such as ACM, acrylic, PVC, stainless steel, galvanized steel, iron and electrostatic painting, ensuring durability and premium finishing." },
    { question: "Do you make signs for churches?", answer: "Yes. We have extensive experience in the religious segment, with projects that enhance the facade and highlight the church's identity." },
    { question: "Do you offer metalwork services?", answer: "Yes! We offer metalwork services such as gates, railings, metal structures, sign supports and facade reinforcements. Everything integrated with our visual communication services." },
    { question: "Do you create websites and logos?", answer: "Yes! We develop professional, responsive and SEO-optimized websites, as well as logos and complete visual identity including business cards and stationery." },
    { question: "Do you make banners and tarps?", answer: "Yes. We work with high-quality digital printing on banners, tarps and flags for promotions, events and temporary facades." },
    { question: "How do I request a quote?", answer: "You can request a quick quote through our WhatsApp! Just send the approximate measurements and, if possible, a photo of the facade to speed up the service." },
    { question: "What payment methods do you accept?", answer: "We accept bank transfer, PIX, credit cards and flexible payment conditions depending on the project." },
    { question: "Can I buy just the letters and install them myself?", answer: "Yes. You can purchase just the 3D letters and install them at your establishment. We ship them well-packaged with basic installation instructions." },
    { question: "Do you help with sign design?", answer: "Yes. Our team can develop the art and layout of your sign or facade to ensure the best visibility and visual impact." },
  ];

  return (
    <section id="faq" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">{t("faq.tag")}</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t("faq.title")}{" "}
            <span className="text-gradient">{t("faq.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("faq.desc")}</p>
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
