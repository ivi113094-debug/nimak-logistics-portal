import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/nimak_logo.png";
import type { SiteContent, SiteLocale } from "@/content/siteContent";

interface NavbarProps {
  content: SiteContent["navigation"];
  locale: SiteLocale;
  onLocaleChange: (locale: SiteLocale) => void;
}

const localeOptions: SiteLocale[] = ["mk", "en"];

const Navbar = ({ content, locale, onLocaleChange }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark backdrop-blur-md border-b border-navy-light/20">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:h-20 lg:px-8">
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo} alt="NIMAK Logo" className="h-11 w-auto sm:h-14" />
        </a>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {content.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors font-heading tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
            {localeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onLocaleChange(option)}
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                  locale === option ? "bg-white text-slate-950" : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center px-5 py-2 rounded-md bg-red-brand text-accent-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            {content.ctaLabel}
          </a>
        </div>

        <button
          className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-primary-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-dark/98 backdrop-blur-md px-4 pb-6">
          <div className="flex justify-center pb-4 pt-3">
            <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
              {localeOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onLocaleChange(option)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                    locale === option ? "bg-white text-slate-950" : "text-primary-foreground/70 hover:text-primary-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <ul className="flex flex-col items-stretch gap-3 pt-2">
            {content.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-primary-foreground/85 hover:text-primary-foreground font-heading text-base"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center px-5 py-3 rounded-2xl bg-red-brand text-accent-foreground font-heading font-semibold text-sm"
              >
                {content.ctaLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
