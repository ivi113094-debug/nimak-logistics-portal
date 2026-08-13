import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Newspaper } from "lucide-react";
import type { SiteContent } from "@/content/siteContent";
import { getBlogTopicPath } from "@/lib/blog";

interface BlogSectionProps {
  content: SiteContent["blog"];
}

const BlogSection = ({ content }: BlogSectionProps) => {
  if (!content.topics.length) return null;

  return (
    <section id="blog" className="bg-background py-16 sm:py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span className="font-heading text-sm font-semibold uppercase tracking-widest text-red-brand">{content.eyebrow}</span>
          <h2 className="mb-5 mt-3 font-heading text-2xl font-extrabold text-foreground sm:text-3xl md:text-4xl">{content.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{content.description}</p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.topics.map((topic, index) => (
            <motion.div
              key={`${topic.title}-${index}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <Link
                to={getBlogTopicPath(index)}
                className="group flex h-full min-h-64 flex-col rounded-lg border border-border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-red-brand/40 hover:shadow-md"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-red-brand/10 transition-colors group-hover:bg-red-brand/15">
                  <Newspaper className="text-red-brand" size={24} />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="block font-heading text-xl font-bold leading-snug text-foreground">{topic.title}</span>
                  <span className="mt-3 block text-sm leading-relaxed text-muted-foreground">{topic.desc}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-red-brand">
                    {content.readLabel}
                    <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
