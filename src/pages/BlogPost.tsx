import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { SiteLocale } from "@/content/siteContent";
import { getBlogTopicIndexFromSlug } from "@/lib/blog";

const BlogPost = () => {
  const { slug } = useParams();
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
  const topicIndex = getBlogTopicIndexFromSlug(slug);
  const topic = activeContent.blog.topics[topicIndex];

  if (!topic) {
    return <Navigate to="/#blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar content={activeContent.navigation} locale={locale} onLocaleChange={handleLocaleChange} />

      <main className="pt-24 sm:pt-28">
        <article className="container mx-auto max-w-4xl px-4 py-14 lg:px-8 lg:py-20">
          <Link
            to="/#blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-red-brand transition-colors hover:text-red-700"
          >
            <ArrowLeft size={18} />
            {locale === "mk" ? "Назад кон блог темите" : "Back to blog topics"}
          </Link>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-navy/10">
              <BookOpen className="text-navy" size={28} />
            </div>
            <p className="mb-3 font-heading text-sm font-semibold uppercase tracking-widest text-red-brand">{activeContent.blog.eyebrow}</p>
            <h1 className="mb-5 font-heading text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">{topic.title}</h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{topic.desc}</p>
            <div className="border-t border-border pt-8">
              <p className="text-base leading-8 text-muted-foreground sm:text-lg">{topic.body}</p>
            </div>
          </div>
        </article>
      </main>

      <Footer navigation={activeContent.navigation} footer={activeContent.footer} />
    </div>
  );
};

export default BlogPost;
