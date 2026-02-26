import { useEffect, useRef, useState } from "react";
import { Lightbulb, Target, Award, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: Lightbulb, title: t("about.innovation"), description: t("about.innovationDesc") },
    { icon: Target, title: t("about.precision"), description: t("about.precisionDesc") },
    { icon: Award, title: t("about.quality"), description: t("about.qualityDesc") },
    { icon: Users, title: t("about.partnership"), description: t("about.partnershipDesc") },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <span className="text-primary font-medium text-sm tracking-wider uppercase mb-4 block">{t("about.tag")}</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              {t("about.title")}{" "}
              <span className="text-gradient">{t("about.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t("about.p1")}
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("about.p2")}
            </p>
          </div>

          <div className={`grid sm:grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`card-glass p-6 rounded-2xl transition-all duration-700 group hover:-translate-y-1 ${isVisible ? "glow-box border-primary/50" : "border-transparent"}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-700 ${isVisible ? "bg-primary/20" : "bg-primary/10"}`} style={{ transitionDelay: `${index * 150 + 200}ms` }}>
                  <feature.icon className={`w-6 h-6 transition-all duration-500 ${isVisible ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" : "text-primary/70"}`} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
