import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import IntroAnimation from "@/components/IntroAnimation";

const Index = () => {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {!introDone && <IntroAnimation onComplete={handleIntroComplete} />}
      <div className={introDone ? "animate-fade-in" : "opacity-0"}>
        <Header />
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Partners />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
};

export default Index;
