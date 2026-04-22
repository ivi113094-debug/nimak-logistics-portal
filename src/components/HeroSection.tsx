import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-trucks.jpg";
import type { SiteContent } from "@/content/siteContent";

interface HeroSectionProps {
  content: SiteContent["hero"];
}

const HeroSection = ({ content }: HeroSectionProps) => (
  <section id="hero" className="relative min-h-screen flex items-center pt-16 sm:pt-20 overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Transport trucks" className="w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-navy-dark/70" />
    </div>

    <div className="container mx-auto relative z-10 px-4 lg:px-8 py-16 sm:py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl"
      >
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-brand/20 text-red-brand font-heading text-xs sm:text-sm font-semibold mb-5 sm:mb-6 border border-red-brand/30">
          {content.badge}
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-primary-foreground mb-5 sm:mb-6">
          {content.title} <span className="text-red-brand">{content.highlight}</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 font-body mb-7 sm:mb-8 max-w-xl leading-relaxed">
          {content.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-md bg-red-brand text-accent-foreground font-heading font-bold text-sm sm:text-base hover:opacity-90 transition-opacity"
          >
            {content.primaryCtaLabel}
            <ArrowRight size={18} />
          </a>
          <a
            href="#services"
            className="inline-flex min-h-12 items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-md border-2 border-primary-foreground/30 text-primary-foreground font-heading font-semibold text-sm sm:text-base hover:bg-primary-foreground/10 transition-colors"
          >
            {content.secondaryCtaLabel}
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
