import { motion } from "framer-motion";
import { Truck, Globe, FileCheck, MapPin } from "lucide-react";
import type { SiteContent } from "@/content/siteContent";

const icons = [Truck, Globe, FileCheck, MapPin];

interface ServicesSectionProps {
  content: SiteContent["services"];
}

const ServicesSection = ({ content }: ServicesSectionProps) => (
  <section id="services" className="py-16 sm:py-20 lg:py-28 bg-muted">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
      >
        <span className="text-red-brand font-heading font-semibold text-sm tracking-widest uppercase">{content.eyebrow}</span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground mt-3 mb-5">{content.title}</h2>
        <p className="text-muted-foreground text-base sm:text-lg">{content.description}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
        {content.items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={`${item.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-5 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-5 shadow-sm border border-border hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 shrink-0 rounded-lg bg-red-brand/10 flex items-center justify-center group-hover:bg-red-brand/20 transition-colors">
                <Icon className="text-red-brand" size={28} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesSection;
