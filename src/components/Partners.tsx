import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import cafeSoberano from "@/assets/partners/cafe-soberano.png";
import dilaModas from "@/assets/partners/dila-modas.png";
import gugas from "@/assets/partners/gugas.jpeg";
import mellos from "@/assets/partners/mellos.png";
import microlins from "@/assets/partners/microlins.png";
import padariaCamila from "@/assets/partners/padaria-camila.png";
import petrobras from "@/assets/partners/petrobras.png";
import pontoMix from "@/assets/partners/ponto-mix.png";
import saladaEtc from "@/assets/partners/salada-etc.png";
import espacoAconchegante from "@/assets/partners/espaco-aconchegante.png";
import mariaTocaia from "@/assets/partners/maria-tocaia.png";
import multicargo from "@/assets/partners/multicargo.png";
import peVida from "@/assets/partners/pe-vida.png";

const Partners = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

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

  const partners = [
    { name: "Café Soberano", logo: cafeSoberano },
    { name: "Dila Modas", logo: dilaModas },
    { name: "Gugas", logo: gugas },
    { name: "Mello's House", logo: mellos },
    { name: "Microlins", logo: microlins },
    { name: "Padaria Camila", logo: padariaCamila },
    { name: "Petrobras", logo: petrobras },
    { name: "Ponto Mix", logo: pontoMix },
    { name: "Salada & Etc", logo: saladaEtc },
    { name: "Espaço Aconchegante", logo: espacoAconchegante },
    { name: "Maria Tocaia", logo: mariaTocaia },
    { name: "Multicargo", logo: multicargo },
    { name: "Pé & Vida", logo: peVida },
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <section id="partners" ref={sectionRef} className="py-16 lg:py-24 relative overflow-hidden bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Cabeçalho */}
        <div className={`flex flex-col items-center mb-12 text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-primary/30" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
              {t("partners.tag")}
            </span>
            <div className="w-10 h-[1px] bg-primary/30" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-foreground">{t("partners.title")} </span>
            <span className="text-gradient glow-text">
              {t("partners.titleHighlight")}
            </span>
            {t("partners.titleEnd") && (
              <span className="text-foreground"> {t("partners.titleEnd")}</span>
            )}
          </h2>
        </div>

        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            {/* Animação */}
            <div className="flex animate-scroll-partners gap-6 lg:gap-8 w-max">
              {duplicatedPartners.map((partner, index) => (
                <div key={index} className="flex-shrink-0 w-40 h-28 lg:w-52 lg:h-32 rounded-2xl bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-all duration-300 group p-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-partners {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-partners {
          animation: scroll-partners 40s linear infinite;
        }
        .animate-scroll-partners:hover {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

export default Partners;