import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Portfolio from "./Portfolio";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-0">
        <div className="max-w-7xl mx-auto text-center"> 

          {/* Portfolio */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <Portfolio />
          </div>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Sparkles size={16} className="animate-pulse" />
            <span className="text-sm font-medium">{t("hero.badge")}</span>
          </div>

          <div className="relative">
            <h1 className={`font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <span className="block text-foreground">{t("hero.title1")}</span>
              <span className="block text-gradient glow-text">{t("hero.title2")}</span>
            </h1>
            <p className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {t("hero.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;