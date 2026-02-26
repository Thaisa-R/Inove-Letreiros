import { ArrowUp, Instagram, Facebook } from "lucide-react";
import inovLogo from "@/assets/img-inov-br.png";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/contexts/LanguageContext";


const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/inov.letreiros/", label: "Instagram" },
    { icon: Facebook, href: "https://www.facebook.com/inov.letreiros/", label: "Facebook" },
    { icon: WhatsAppIcon, href: `https://wa.me/5521981158456?text=${encodeURIComponent('Olá, vim pelo site, gostaria de um orçamento!')}`, label: "WhatsApp" },
  ];

  return (
    <footer className="py-12 border-t border-border relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2">
              <img src={inovLogo} alt="Inov Letreiros e Fachadas" className="h-10 w-auto rounded-full" />
               <p className="text-muted-foreground text-sm mt-2">
              © {currentYear} Inov Letreiros. {t("footer.rights")}
            </p>
            </div>
           
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">{t("nav.about")}</a>
            <a href="#services" className="hover:text-primary transition-colors">{t("nav.services")}</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">{t("nav.portfolio")}</a>
            <a href="#contact" className="hover:text-primary transition-colors">{t("nav.contact")}</a>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <button onClick={scrollToTop} className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group" aria-label="Voltar ao topo">
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
