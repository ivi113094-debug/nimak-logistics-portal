import { motion } from "framer-motion";
import { Zap, HeartHandshake, Settings, Headphones } from "lucide-react";
import type { SiteContent } from "@/content/siteContent";

const icons = [Zap, HeartHandshake, Settings, Headphones];

interface WhyUsSectionProps {
  content: SiteContent["whyUs"];
}

const WhyUsSection = ({ content }: WhyUsSectionProps) => (
  <section id="why-us" className="py-16 sm:py-20 lg:py-28 bg-navy-dark relative overflow-hidden">
    <div className="absolute inset-0 opacity-5">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(0 0% 100%) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    <div className="container mx-auto px-4 lg:px-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <span className="text-red-brand font-heading font-semibold text-sm tracking-widest uppercase">{content.eyebrow}</span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary-foreground mt-3 mb-5">{content.title}</h2>
        <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed">{content.description}</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {content.items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-5 sm:p-6 text-center border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-red-brand/20 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-red-brand" size={26} />
              </div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-primary-foreground mb-2">{item.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
