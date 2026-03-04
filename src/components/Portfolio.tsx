import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import amarelinho1 from "@/assets/portfolio/amarelinho1.png";
import dilaModas from "@/assets/portfolio/dila-modas.png";
import petrobras from "@/assets/portfolio/recap70AnosPetrob.png";
import espacoAconchego from "@/assets/portfolio/espaco-aconchego.png";
import gugas from "@/assets/portfolio/gugas.png";
import mariaTocaia from "@/assets/portfolio/maria-tocaia.png";
import microlins from "@/assets/portfolio/microlins.png";
import padariaCamila from "@/assets/portfolio/padaria-camila.png";
import mellos from "@/assets/portfolio/mellos.png";
import multicargo from "@/assets/portfolio/multiCargo.jpeg";
import pontomix from "@/assets/portfolio/pontoMix.png";
import peevida from "@/assets/portfolio/pe&Vida.jpeg";
import saladaeetc from "@/assets/portfolio/saladaeEtc.png";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<null | { name: string; img: string; desc: string }>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

const projects = [
  { name: "Amarelinho de Manguriba", img: amarelinho1, desc: "Letreiro 3D com letras caixa em PVC expandido e laterais adesivadas." },
  { name: "Dila Modas", img: dilaModas, desc: "Fachada em ACM dourado com letras caixa alta também em ACM." },
  { name: "Petrobras", img: petrobras, desc: "Letreiro 3D 360°, visível de todos os ângulos e fixado ao solo." },
  { name: "Espaço Aconchego", img: espacoAconchego, desc: "Fachada em ACM preto com letras em ACM branco de alto contraste." },
  { name: "Gugas | Casa do Confeiteiro", img: gugas, desc: "Fachada com base em ACM e letras 3D em caixa alta." },
  { name: "Maria Tocaia", img: mariaTocaia, desc: "Fachada em ACM com letra caixa 3D e iluminação frontal por refletores." },
  { name: "Microlins", img: microlins, desc: "Letreiro 3D em ACM branco sobreposto a fundo em ACM azul." },
  { name: "Padaria Camila", img: padariaCamila, desc: "Fachada em ACM com letras caixa 3D de alta durabilidade." },
  { name: "Mellos", img: mellos, desc: "Letreiro circular 3D com sistema de iluminação interna (Backlight)." },
  { name: "MultiCargo", img: multicargo, desc: "Letras em PVC expandido aplicadas diretamente na parede da recepção." },
  { name: "PontoMix", img: pontomix, desc: "Fachada em ACM com letras 3D e iluminação interna embutida." },
  { name: "Pe&Vida", img: peevida, desc: "Letreiro 3D com iluminação indireta (Halo Light) por trás das letras." },
  { name: "SaladaeEtc", img: saladaeetc, desc: "Letreiro 3D com iluminação interna retroiluminada." }
];

  const scrollImages = [...projects, ...projects];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const moveDistance = clientWidth * 0.5; 
      const scrollTo = direction === "left" ? scrollLeft - moveDistance : scrollLeft + moveDistance;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full py-6 flex items-center justify-center gap-2 md:gap-4 px-2">

      {/* Botão Voltar */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex flex-shrink-0 w-11 h-11 items-center justify-center bg-card hover:bg-primary hover:text-white text-primary border border-primary/20 rounded-full transition-all shadow-md active:scale-90"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Container Principal */}
      <div className="relative flex-1 overflow-hidden">
        
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing"
        >
          {/* TAMANHO md:w-96 md:h-64 (384px x 256px) */}
          <div className="flex animate-scroll-infinite w-max gap-5 py-4 px-4 hover:[animation-play-state:paused]">
            {scrollImages.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="w-56 h-36 md:w-96 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden border border-primary/10 shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.03] bg-card"
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
        className="hidden md:flex flex-shrink-0 w-11 h-11 items-center justify-center bg-card hover:bg-primary hover:text-white text-primary border border-primary/20 rounded-full transition-all shadow-md active:scale-90"
      >
        <ChevronRight size={24} />
      </button>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center pt-10 bg-black/70 backdrop-blur-sm cursor-zoom-out"
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
              {selectedProject.desc}
            </p>
            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all active:scale-95"
            >
              Fechar
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