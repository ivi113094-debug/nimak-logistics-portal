import logo from "@/assets/nimak_logo.png";
import type { SiteContent } from "@/content/siteContent";

interface FooterProps {
  navigation: SiteContent["navigation"];
  footer: SiteContent["footer"];
}

const Footer = ({ navigation, footer }: FooterProps) => (
  <footer className="bg-navy-dark py-12 border-t border-navy-light/20">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="NIMAK" className="h-12 w-auto" />
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {navigation.links.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors font-heading"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-primary-foreground/40 text-xs font-body">
          © {new Date().getFullYear()} NIMAK. {footer.copyright}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
