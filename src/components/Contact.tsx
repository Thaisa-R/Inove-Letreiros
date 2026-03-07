import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Upload, X, Loader2, AlertCircle } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();
  const { toast } = useToast();

  const serviceOptions = lang === "pt" ? [
    { value: "letreiros-3d", label: "Letreiros 3D" },
    { value: "fachadas", label: "Fachadas" },
    { value: "letra-caixa", label: "Letra Caixa" },
    { value: "banners-lonas", label: "Banners e Lonas" },
    { value: "criacao-sites", label: "Criação de Sites" },
    { value: "cartoes-visita", label: "Cartões de Visita" },
    { value: "logomarcas", label: "Criação de Logomarcas" },
    { value: "grafica-rapida", label: "Gráfica Rápida" },
    { value: "sinalizacao", label: "Sinalização" },
    { value: "outro", label: "Outro" },
  ] : [
    { value: "letreiros-3d", label: "3D Signs" },
    { value: "fachadas", label: "Facades" },
    { value: "letra-caixa", label: "3D Letters" },
    { value: "banners-lonas", label: "Banners & Tarps" },
    { value: "criacao-sites", label: "Website Design" },
    { value: "cartoes-visita", label: "Business Cards" },
    { value: "logomarcas", label: "Logo Design" },
    { value: "grafica-rapida", label: "Quick Printing" },
    { value: "sinalizacao", label: "Signage" },
    { value: "outro", label: "Other" },
  ];

  const contactItems = [
    {
      icon: Phone,
      label: copied ? (lang === "pt" ? "Copiado!" : "Copied!") : t("contact.phone"),
      value: "21 98115-8456",
      isPhone: true,
      action: () => {
        navigator.clipboard.writeText("21981158456");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);

        toast({
          title: lang === "pt" ? "Copiado!" : "Copied!",
          description: lang === "pt" ? "Número salvo na área de transferência." : "Number saved to clipboard.",
        });
      }
    },
    {
      icon: Mail,
      label: t("contact.email"),
      value: "inov.cvisual@gmail.com",
      action: () => {
        const subject = encodeURIComponent("Orçamento - Inov Letreiros");
        window.location.href = `mailto:inov.cvisual@gmail.com?subject=${subject}`;
      }
    },
    {
      icon: MapPin,
      label: t("contact.address"),
      value: "Rio de Janeiro, RJ",
      action: () => {
        window.open("https://maps.google.com/?q=Rio+de+Janeiro,+RJ", "_blank");
      }
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: lang === "pt" ? "Erro no arquivo" : "File error",
        description: lang === "pt" ? "A imagem deve ter menos de 5MB" : "Image must be under 5MB",
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageName(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);
    let uploadedImageUrl = "";

    try {
      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0];
        const formDataImg = new FormData();
        formDataImg.append("image", file);
        const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
          method: "POST",
          body: formDataImg,
        });
        const data = await response.json();
        if (data.success) {
          uploadedImageUrl = data.data.url;
        } else {
          throw new Error("Upload failed");
        }
      }

      const whatsappNumber = "5521981158456";
      const serviceName = serviceOptions.find(s => s.value === formData.service)?.label || formData.service;
      const photoText = uploadedImageUrl ? `\n\n📷 *Foto:* ${uploadedImageUrl}` : "";
      const text = encodeURIComponent(
        `Olá! Meu nome é ${formData.name}.\n\n*Email:* ${formData.email}\n*Serviço:* ${serviceName}\n\n*Mensagem:* ${formData.message}${photoText}`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
    } catch (err) {
      setError(lang === "pt" ? "Erro ao processar imagem. Tente novamente." : "Error processing image. Try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Cabeçalho */}
        <div className={`flex flex-col items-center mb-16 text-center px-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-primary/30" />
            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em]">
              {t("contact.tag")}
            </span>
            <div className="w-10 h-[1px] bg-primary/30" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            <span className="text-foreground">{t("contact.title")} </span>
            <span className="text-gradient glow-text">
              {t("contact.titleHighlight")}
            </span>
            {t("contact.titleEnd") && (
              <span className="text-foreground"> {t("contact.titleEnd")}</span>
            )}
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("contact.desc")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className={`lg:col-span-2 space-y-4 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            {contactItems.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={item.action}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group text-left",
                  item.isPhone && copied ? "bg-primary/20 border-primary" : "bg-card border-border hover:border-primary/50"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 group-hover:bg-primary/20")}>
                  <item.icon className={cn("w-5 h-5 text-primary", item.isPhone && copied && "animate-pulse")} />
                </div>
                <div>
                  <div className={cn("text-sm", item.isPhone && copied ? "text-primary font-bold" : "text-muted-foreground")}>{item.label}</div>
                  <div className="font-medium text-foreground">{item.value}</div>
                </div>
              </button>
            ))}
          </div>

          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <form onSubmit={handleWhatsAppSubmit} className="p-6 lg:p-8 rounded-3xl bg-card border border-border">
              <h3 className="font-display text-2xl font-bold mb-6 text-foreground">{t("contact.formTitle")}</h3>

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive text-sm animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <Input type="text" placeholder={t("contact.name")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-secondary" />
                <Input type="email" placeholder={t("contact.email")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="bg-secondary" />
              </div>

              <div className="mb-4">
                <Select value={formData.service} onValueChange={(v) => setFormData({ ...formData, service: v })} required>
                  <SelectTrigger className="bg-secondary">
                    <SelectValue placeholder={t("contact.servicePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    {serviceOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {!imagePreview ? (
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full p-6 rounded-xl border-2 border-dashed border-border bg-secondary/50 hover:bg-secondary transition-all flex flex-col items-center gap-2 group">
                    <Upload className="text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{t("contact.photoClick")}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-border bg-secondary/50">
                    <img src={imagePreview} className="w-16 h-16 rounded-lg object-cover" />
                    <p className="flex-1 text-sm truncate font-medium">{imageName}</p>
                    <button type="button" onClick={removeImage} className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <Textarea value={formData.message} placeholder={t("contact.message")} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={4} className="bg-secondary mb-6 resize-none" />

              <Button type="submit" variant="neon" size="xl" className="w-full" disabled={isUploading}>
                {isUploading ? <Loader2 className="animate-spin" /> : <><WhatsAppIcon className="mr-2 w-5 h-5" /> {t("contact.send")}</>}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;