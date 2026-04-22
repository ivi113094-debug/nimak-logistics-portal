import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import type { SiteContent, SiteLocale } from "@/content/siteContent";

interface ContactSectionProps {
  content: SiteContent["contact"];
  locale: SiteLocale;
}

const labels = {
  mk: {
    phone: "Телефон",
    email: "Email",
    location: "Локација",
    infoTitle: "Контактирајте нè директно",
    infoText:
      "За информации, понуди и договор за транспорт, слободно јавете ни се или пишете ни на е-пошта. Нашиот тим е подготвен брзо да ви одговори.",
    openMap: "Отвори на мапа",
  },
  en: {
    phone: "Phone",
    email: "Email",
    location: "Location",
    infoTitle: "Contact us directly",
    infoText:
      "For information, quotes, and transport coordination, feel free to call us or send us an email. Our team is ready to respond quickly.",
    openMap: "Open in maps",
  },
};

const ContactSection = ({ content, locale }: ContactSectionProps) => {
  const copy = labels[locale];

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-background">
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

        <div className="grid lg:grid-cols-5 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6 sm:space-y-8"
          >
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                <Phone className="text-navy" size={22} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground mb-1">{copy.phone}</h4>
                <a href={`tel:${content.phone1.replace(/\s+/g, "")}`} className="block text-muted-foreground hover:text-foreground transition-colors">
                  {content.phone1}
                </a>
                <a href={`tel:${content.phone2.replace(/\s+/g, "")}`} className="block text-muted-foreground hover:text-foreground transition-colors">
                  {content.phone2}
                </a>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                <Mail className="text-navy" size={22} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground mb-1">{copy.email}</h4>
                <a href={`mailto:${content.email}`} className="block text-muted-foreground hover:text-foreground transition-colors break-all">
                  {content.email}
                </a>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center shrink-0">
                <MapPin className="text-navy" size={22} />
              </div>
              <div>
                <h4 className="font-heading font-bold text-foreground mb-1">{copy.location}</h4>
                <p className="text-muted-foreground mb-2">{content.address}</p>
                <a
                  href={content.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-navy hover:text-navy-dark transition-colors"
                >
                  {copy.openMap}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border flex items-center"
          >
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground">{copy.infoTitle}</h3>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{copy.infoText}</p>
              <div className="flex flex-col gap-3 sm:max-w-md sm:flex-row">
                <a
                  href={`tel:${content.phone1.replace(/\s+/g, "")}`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-red-brand px-5 py-3 text-base font-heading font-bold text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  {content.phone1}
                </a>
                <a
                  href={`tel:${content.phone2.replace(/\s+/g, "")}`}
                  className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-red-brand px-5 py-3 text-base font-heading font-bold text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  {content.phone2}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
