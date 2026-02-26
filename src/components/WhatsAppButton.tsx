import { useState, useEffect } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useLanguage } from "@/contexts/LanguageContext";

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const message = encodeURIComponent("Olá, vim pelo site, gostaria de um orçamento!");
  const phone = "5524998181034";

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 group ${
        visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
      }`}
      aria-label="WhatsApp"
    >
      <div className="flex items-center gap-2 pl-5 pr-2 py-3">
        <span className="text-sm font-semibold whitespace-nowrap max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500">
          {lang === "pt" ? "Orçamento Grátis!" : "Free Quote!"}
        </span>
        <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
          <WhatsAppIcon className="w-6 h-6" />
        </div>
      </div>
    </a>
  );
};

export default WhatsAppButton;
