import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { SiteLocale } from "@/content/siteContent";

const Index = () => {
  const { content } = useSiteContent();
  const [locale, setLocale] = useState<SiteLocale>("mk");

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("nimak-locale");
    if (savedLocale === "mk" || savedLocale === "en") {
      setLocale(savedLocale);
    }
  }, []);

  const handleLocaleChange = (nextLocale: SiteLocale) => {
    setLocale(nextLocale);
    window.localStorage.setItem("nimak-locale", nextLocale);
  };

  const activeContent = content[locale];

  return (
    <div className="min-h-screen">
      <Navbar content={activeContent.navigation} locale={locale} onLocaleChange={handleLocaleChange} />
      <HeroSection content={activeContent.hero} />
      <AboutSection content={activeContent.about} />
      <ServicesSection content={activeContent.services} />
      <WhyUsSection content={activeContent.whyUs} />
      <ContactSection content={activeContent.contact} locale={locale} />
      <Footer navigation={activeContent.navigation} footer={activeContent.footer} />
    </div>
  );
};

export default Index;
