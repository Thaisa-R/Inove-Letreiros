import { useEffect, useRef, useState } from "react";
import { Zap, Box, Palette, Building2, ArrowRight, Globe, CreditCard, Paintbrush, Image, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
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

  const services = [
    {
      icon: Zap,
      title: lang === "pt" ? "Letreiros LED" : "LED Signs",
      description: lang === "pt"
        ? "Iluminação moderna e econômica com alta visibilidade. LEDs de última geração que destacam sua marca 24 horas por dia."
        : "Modern and economical lighting with high visibility. Latest generation LEDs that highlight your brand 24/7.",
      features: lang === "pt" ? ["Baixo consumo", "Alta durabilidade", "Cores vibrantes"] : ["Low consumption", "High durability", "Vibrant colors"],
      gradient: "from-primary to-cyan-400",
    },
    {
      icon: Box,
      title: lang === "pt" ? "Letras Caixa" : "3D Letters",
      description: lang === "pt"
        ? "Letras em alto relevo com acabamento premium. Opções em acrílico, metal, PVC e diversos materiais personalizados."
        : "High-relief letters with premium finish. Options in acrylic, metal, PVC and various custom materials.",
      features: lang === "pt" ? ["3D elegante", "Vários materiais", "Personalização total"] : ["Elegant 3D", "Various materials", "Full customization"],
      gradient: "from-accent to-orange-400",
    },
    {
      icon: Palette,
      title: lang === "pt" ? "ACM & Fachadas" : "ACM & Facades",
      description: lang === "pt"
        ? "Fachadas completas em ACM que transformam seu negócio. Design moderno com durabilidade superior."
        : "Complete ACM facades that transform your business. Modern design with superior durability.",
      features: lang === "pt" ? ["Design exclusivo", "Alta resistência", "Fácil manutenção"] : ["Exclusive design", "High resistance", "Easy maintenance"],
      gradient: "from-violet-500 to-purple-400",
    },
    {
      icon: Building2,
      title: lang === "pt" ? "Comunicação Visual" : "Visual Communication",
      description: lang === "pt"
        ? "Soluções completas: placas, totens, painéis e sinalização. Tudo para destacar sua empresa."
        : "Complete solutions: signs, totems, panels and signage. Everything to highlight your company.",
      features: lang === "pt" ? ["Identidade visual", "Sinalização", "Totens e painéis"] : ["Visual identity", "Signage", "Totems & panels"],
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: Image,
      title: lang === "pt" ? "Banners & Lonas" : "Banners & Tarps",
      description: lang === "pt"
        ? "Impressão digital de alta qualidade em banners, lonas e faixas. Ideal para promoções, eventos e fachadas temporárias."
        : "High quality digital printing on banners and tarps. Ideal for promotions, events and temporary facades.",
      features: lang === "pt" ? ["Impressão HD", "Acabamento reforçado", "Diversos tamanhos"] : ["HD printing", "Reinforced finish", "Various sizes"],
      gradient: "from-rose-500 to-pink-400",
    },
    {
      icon: Wrench,
      title: lang === "pt" ? "Serralheria" : "Metalwork",
      description: lang === "pt"
        ? "Serviços de serralheria para estruturas metálicas, portões, grades, suportes de letreiros e reforços de fachada."
        : "Metalwork services for metal structures, gates, railings, sign supports and facade reinforcements.",
      features: lang === "pt" ? ["Estruturas metálicas", "Portões e grades", "Suportes sob medida"] : ["Metal structures", "Gates & railings", "Custom supports"],
      gradient: "from-slate-500 to-gray-400",
    },
    {
      icon: Globe,
      title: lang === "pt" ? "Criação de Sites" : "Website Design",
      description: lang === "pt"
        ? "Sites profissionais, responsivos e otimizados para SEO. Presença digital completa para seu negócio aparecer no Google."
        : "Professional, responsive and SEO-optimized websites. Complete digital presence for your business.",
      features: lang === "pt" ? ["Design responsivo", "SEO otimizado", "Domínio próprio"] : ["Responsive design", "SEO optimized", "Custom domain"],
      gradient: "from-blue-500 to-indigo-400",
    },
    {
      icon: CreditCard,
      title: lang === "pt" ? "Cartões de Visita" : "Business Cards",
      description: lang === "pt"
        ? "Cartões de visita profissionais com design personalizado. Primeira impressão marcante para seus clientes."
        : "Professional business cards with custom design. A remarkable first impression for your clients.",
      features: lang === "pt" ? ["Design exclusivo", "Impressão premium", "Entrega rápida"] : ["Exclusive design", "Premium printing", "Fast delivery"],
      gradient: "from-amber-500 to-yellow-400",
    },
    {
      icon: Paintbrush,
      title: lang === "pt" ? "Criação de Logomarcas" : "Logo Design",
      description: lang === "pt"
        ? "Desenvolvimento de identidade visual e logomarcas que comunicam a essência da sua marca com profissionalismo."
        : "Development of visual identity and logos that communicate the essence of your brand professionally.",
      features: lang === "pt" ? ["Identidade única", "Arquivo vetorial", "Manual de marca"] : ["Unique identity", "Vector file", "Brand manual"],
      gradient: "from-fuchsia-500 to-purple-400",
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">{t("services.tag")}</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {t("services.title")}{" "}
            <span className="text-gradient">{t("services.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t("services.desc")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative rounded-3xl bg-card border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--primary)/0.15)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`absolute top-0 left-6 right-6 h-1 rounded-full bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-5`}>
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-foreground" />
                </div>
              </div>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground group-hover:text-gradient transition-all duration-300">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {service.features.map((feature, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">{feature}</span>
                ))}
              </div>
              <button onClick={scrollToContact} className="inline-flex items-center gap-2 text-primary font-medium text-sm group/btn">
                {t("services.learnMore")}
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          ))}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <p className="text-muted-foreground mb-6">{t("services.notFound")}</p>
          <Button variant="neon" size="xl" onClick={scrollToContact}>
            {t("services.cta")}
            <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
