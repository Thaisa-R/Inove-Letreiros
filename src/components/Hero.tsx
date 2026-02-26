import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl floating" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl floating-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/5 rounded-full blur-3xl" />
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">{t("hero.badge")}</span>
          </div>

          <div className="relative">
            {/* Cinema lights behind the title */}
            <div className="absolute inset-0 -inset-x-20 -inset-y-10 pointer-events-none">
              <div className="cinema-light cinema-light-1 w-24 h-24 bg-primary/40 top-0 left-[10%]" />
              <div className="cinema-light cinema-light-2 w-20 h-20 bg-accent/40 top-[20%] right-[15%]" />
              <div className="cinema-light cinema-light-3 w-28 h-28 bg-neon-secondary/30 bottom-0 left-[30%]" />
              <div className="cinema-light cinema-light-4 w-16 h-16 bg-primary/50 top-[10%] left-[55%]" />
              <div className="cinema-light cinema-light-5 w-22 h-22 bg-accent/30 bottom-[10%] right-[25%]" />
              <div className="cinema-light cinema-light-6 w-20 h-20 bg-primary/35 top-[40%] left-[5%]" />
            </div>

            <h1
              className={`relative z-10 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <span className="block text-foreground">{t("hero.title1")}</span>
              <span className="block text-gradient glow-text">{t("hero.title2")}</span>
            </h1>
          </div>

          <p
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {t("hero.desc")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
