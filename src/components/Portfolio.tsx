import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import amarelinho1 from "@/assets/portfolio/amarelinho1.png";
import dilamodas from "@/assets/portfolio/dila-modas.png";
import petrobras from "@/assets/portfolio/recap70anospetrob.png";
import espacoaconchego from "@/assets/portfolio/espaco-aconchego.png";
import gugas from "@/assets/portfolio/gugas.png";
import mariatocaia from "@/assets/portfolio/maria-tocaia.png";
import microlins from "@/assets/portfolio/microlins.png";
import padariacamila from "@/assets/portfolio/padaria-camila.png";
import mellos from "@/assets/portfolio/mellos.png";
import multicargo from "@/assets/portfolio/multicargo.jpeg";
import pontomix from "@/assets/portfolio/pontomix.png";
import peevida from "@/assets/portfolio/peevida.jpeg";
import saladaeetc from "@/assets/portfolio/saladaeetc.png";

const Portfolio = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<null | { name: string; img: string; descKey: string }>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const projects = [
    { name: "Amarelinho de Manguariba", img: amarelinho1, descKey: "portfolio.amarelinho.desc" },
    { name: "Dila Modas", img: dilamodas, descKey: "portfolio.dila.desc" },
    { name: "Petrobras", img: petrobras, descKey: "portfolio.petrobras.desc" },
    { name: "Espaço Aconchego", img: espacoaconchego, descKey: "portfolio.aconchego.desc" },
    { name: "Gugas | Casa do Confeiteiro", img: gugas, descKey: "portfolio.gugas.desc" },
    { name: "Maria Tocaia", img: mariatocaia, descKey: "portfolio.maria.desc" },
    { name: "Microlins", img: microlins, descKey: "portfolio.microlins.desc" },
    { name: "Padaria Camila", img: padariacamila, descKey: "portfolio.camila.desc" },
    { name: "Mellos", img: mellos, descKey: "portfolio.mellos.desc" },
    { name: "MultiCargo", img: multicargo, descKey: "portfolio.multicargo.desc" },
    { name: "PontoMix", img: pontomix, descKey: "portfolio.pontomix.desc" },
    { name: "Pe&Vida", img: peevida, descKey: "portfolio.peevida.desc" },
    { name: "SaladaeEtc", img: saladaeetc, descKey: "portfolio.salada.desc" }
  ];

  const scrollImages = [...projects, ...projects];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const moveDistance = clientWidth * 0.8;
      const scrollTo = direction === "left" ? scrollLeft - moveDistance : scrollLeft + moveDistance;

      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full py-10 flex flex-col items-center">

      {/* Título */}
      <div className="flex flex-col items-center mb-10 text-center px-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-[1px] bg-primary/30" />
          <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
            {t("portfolio.tag")}
          </span>
          <div className="w-10 h-[1px] bg-primary/30" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          <span className="text-foreground">{t("portfolio.title")} </span>
          <span className="text-gradient glow-text">
            {t("portfolio.titleHighlight")}
          </span>
        </h2>
      </div>

      {/* Carrossel */}
      <div className="w-full flex items-center justify-center gap-2 md:gap-4 px-2">
        {/* Botão Voltar */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex flex-shrink-0 z-20 w-11 h-11 items-center justify-center bg-card hover:bg-primary hover:text-white text-primary border border-primary/20 rounded-full transition-all shadow-md active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Container Principal */}
        <div className="relative flex-1 overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
          >
            <div className="flex animate-scroll-infinite w-max gap-5 py-4 px-4 hover:[animation-play-state:paused]">
              {scrollImages.map((project, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedProject(project)}
                  className="w-72 h-48 md:w-96 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden border border-primary/10 shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.03] bg-card"
                >
                  <img
                    src={project.img}
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    alt={project.name}
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botão Avançar */}
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex flex-shrink-0 z-20 w-11 h-11 items-center justify-center bg-card hover:bg-primary hover:text-white text-primary border border-primary/20 rounded-full transition-all shadow-md active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 cursor-zoom-out"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-card border border-primary/30 p-6 rounded-3xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-48 rounded-xl overflow-hidden mb-5 border border-border">
              <img src={selectedProject.img} className="w-full h-full object-cover" alt={selectedProject.name} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{selectedProject.name}</h3>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed border-l-2 border-primary/50 pl-3">
              {t(selectedProject.descKey)}
            </p>
            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all active:scale-95"
            >
              {t("portfolio.modal.close")}
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scroll-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 50s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default Portfolio;