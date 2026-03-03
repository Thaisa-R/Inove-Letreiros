import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import inovLogoLight from "@/assets/img-inov-br.png";
import inovLogoDark from "@/assets/img-inov-br.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t("nav.home"), href: "#hero", path: "/inicio" },
    { label: t("nav.about"), href: "#about", path: "/sobre" },
    { label: t("nav.services"), href: "#services", path: "/servicos" },
    { label: t("nav.partners"), href: "#partners", path: "/parceiros" },
    { label: t("nav.contact"), href: "#contact", path: "/contato" },
  ];

  const scrollToSection = (href: string, path: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#hero", "/inicio")}
            className="flex items-center gap-2 group bg-transparent border-none p-0"
          >
            <img
              src={theme === "dark" ? inovLogoDark : inovLogoLight}
              alt="Inov Letreiros e Fachadas"
              className="h-10 lg:h-12 w-auto rounded-full"
            />
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href, item.path)}
                  className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium group bg-transparent border-none p-0"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              </li>
            ))}
          </ul>

          {/* Botões Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground hover:text-primary transition-all duration-300"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="h-10 px-3 rounded-xl bg-secondary border border-border flex items-center gap-1.5 text-foreground hover:text-primary transition-all duration-300 text-sm font-medium"
            >
              <Globe size={16} />
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>

          {/* Container Mobile unificado */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Botão Tema Mobile */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Botão Idioma Mobile */}
            <button
              onClick={() => setLang(lang === "pt" ? "en" : "pt")}
              className="h-10 px-2 flex items-center gap-1 text-foreground hover:text-primary transition-colors text-sm font-bold"
            >
              <Globe size={16} />
              {lang === "pt" ? "EN" : "PT"}
            </button>

            {/* Botão Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"}`}>
          <ul className="flex flex-col gap-4 pt-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => scrollToSection(item.href, item.path)}
                  className="block py-2 text-lg text-muted-foreground hover:text-primary transition-colors bg-transparent border-none w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;