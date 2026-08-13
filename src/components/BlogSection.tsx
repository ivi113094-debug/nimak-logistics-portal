import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, Newspaper } from "lucide-react";
import type { SiteContent } from "@/content/siteContent";

interface BlogSectionProps {
  content: SiteContent["blog"];
}

const BlogSection = ({ content }: BlogSectionProps) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const activeTopic = content.topics[activeTopicIndex] ?? content.topics[0];

  if (!activeTopic) return null;

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

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div className="grid gap-4">
            {content.topics.map((topic, index) => {
              const isActive = index === activeTopicIndex;

              return (
                <motion.button
                  key={`${topic.title}-${index}`}
                  type="button"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  onClick={() => setActiveTopicIndex(index)}
                  className={`group flex min-h-32 w-full items-start gap-4 rounded-lg border p-5 text-left shadow-sm transition-all sm:p-6 ${
                    isActive
                      ? "border-red-brand bg-red-brand text-white shadow-md"
                      : "border-border bg-card text-foreground hover:border-red-brand/40 hover:shadow-md"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive ? "bg-white/15" : "bg-red-brand/10 group-hover:bg-red-brand/15"
                    }`}
                  >
                    <Newspaper className={isActive ? "text-white" : "text-red-brand"} size={24} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg font-bold leading-snug">{topic.title}</span>
                    <span className={`mt-2 block text-sm leading-relaxed ${isActive ? "text-white/80" : "text-muted-foreground"}`}>
                      {topic.desc}
                    </span>
                    <span className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold ${isActive ? "text-white" : "text-red-brand"}`}>
                      {content.readLabel}
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.article
            key={activeTopic.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8 lg:sticky lg:top-28"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-navy/10">
              <BookOpen className="text-navy" size={28} />
            </div>
            <h3 className="mb-4 font-heading text-2xl font-extrabold leading-tight text-foreground">{activeTopic.title}</h3>
            <p className="text-base leading-8 text-muted-foreground">{activeTopic.body}</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
