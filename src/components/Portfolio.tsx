import { useEffect, useRef, useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import amarelinho1 from "@/assets/portfolio/amarelinho-1.png";
import amarelinho2 from "@/assets/portfolio/amarelinho-2.png";
import dilaModas from "@/assets/portfolio/dila-modas.png";
import espacoAconchego from "@/assets/portfolio/espaco-aconchego.png";
import gugas from "@/assets/portfolio/gugas.png";
import mariaTocaia from "@/assets/portfolio/maria-tocaia.png";
import microlins from "@/assets/portfolio/microlins.png";
import padariaCamila from "@/assets/portfolio/padaria-camila.png";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
}

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filters = [
    { id: "todos", label: lang === "pt" ? "Todos" : "All" },
    { id: "fachada", label: lang === "pt" ? "Fachadas" : "Facades" },
    { id: "letreiro", label: lang === "pt" ? "Letreiros" : "Signs" },
    { id: "caixa", label: lang === "pt" ? "Letras Caixa" : "Channel Letters" },
    { id: "acm", label: lang === "pt" ? "ACM & Fachadas" : "ACM & Facades" },
    { id: "banners", label: lang === "pt" ? "Banners & Lonas" : "Banners & Tarps" },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: lang === "pt" ? "Amarelinho de Manguariba" : "Amarelinho de Manguariba",
      category: "fachada",
      description: lang === "pt" ? "Fachada completa com letreiro e lona impressa" : "Complete facade with sign and printed tarp",
      image: amarelinho1,
    },
    {
      id: 2,
      title: lang === "pt" ? "Amarelinho - Fachada Lateral" : "Amarelinho - Side Facade",
      category: "banners",
      description: lang === "pt" ? "Lona e banner de alta definição para fachada" : "HD tarp and banner for facade",
      image: amarelinho2,
    },
    {
      id: 3,
      title: "Dila Modas",
      category: "fachada",
      description: lang === "pt" ? "Fachada elegante com pintura artística e letreiro" : "Elegant facade with artistic painting and sign",
      image: dilaModas,
    },
    {
      id: 4,
      title: lang === "pt" ? "Espaço Aconchego Festivo" : "Espaço Aconchego Festivo",
      category: "letreiro",
      description: lang === "pt" ? "Letreiro luminoso para espaço de eventos" : "Illuminated sign for event venue",
      image: espacoAconchego,
    },
    {
      id: 5,
      title: lang === "pt" ? "Guga's Casa do Confeiteiro" : "Guga's Confectionery Store",
      category: "fachada",
      description: lang === "pt" ? "Fachada completa com letreiro e toldo" : "Complete facade with sign and awning",
      image: gugas,
    },
    {
      id: 6,
      title: "Maria Tocaia",
      category: "letreiro",
      description: lang === "pt" ? "Letreiro em letra caixa com iluminação LED" : "Channel letter sign with LED lighting",
      image: mariaTocaia,
    },
    {
      id: 7,
      title: "Microlins",
      category: "caixa",
      description: lang === "pt" ? "Letras caixa em ACM com iluminação frontal" : "ACM channel letters with front lighting",
      image: microlins,
    },
    {
      id: 8,
      title: "Padaria Camila",
      category: "fachada",
      description: lang === "pt" ? "Fachada completa com letreiro luminoso premium" : "Complete facade with premium illuminated sign",
      image: padariaCamila,
    },
  ];

  const filteredProjects =
    activeFilter === "todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background"
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div
            className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">
              {t("portfolio.tag")}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t("portfolio.title")}{" "}
              <span className="text-gradient">{t("portfolio.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">{t("portfolio.desc")}</p>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100 + 300}ms` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider mb-2">
                    {filters.find((f) => f.id === project.category)?.label}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-primary transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm">{project.description}</p>

                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/30 scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 group"
            aria-label="Fechar"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div
            className="relative max-w-2xl max-h-[70vh] w-full rounded-2xl overflow-hidden border border-border shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-card"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
