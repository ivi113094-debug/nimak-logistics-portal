import { motion } from "framer-motion";
import { Shield, Users, Clock, Award } from "lucide-react";
import type { SiteContent } from "@/content/siteContent";

const icons = [Shield, Clock, Users, Award];

interface AboutSectionProps {
  content: SiteContent["about"];
}

const AboutSection = ({ content }: AboutSectionProps) => (
  <section id="about" className="py-16 sm:py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <span className="text-red-brand font-heading font-semibold text-sm tracking-widest uppercase">{content.eyebrow}</span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground mt-3 mb-5">{content.title}</h2>
        <div className="text-muted-foreground text-base sm:text-lg leading-relaxed space-y-4 text-left">
          <p>{content.paragraph1}</p>
          <p>{content.paragraph2}</p>
          <p>{content.paragraph3}</p>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {content.values.map((value, index) => {
          const Icon = icons[index % icons.length];
          return (
            <motion.div
              key={`${value.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-xl p-5 sm:p-6 text-center shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-lg bg-navy/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="text-navy" size={28} />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default AboutSection;
