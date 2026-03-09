import { Link } from 'react-router-dom';
import { t, translations } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

interface FooterProps {
  lang: Lang;
}

const Footer = ({ lang }: FooterProps) => {
  const f = translations.footer;
  const nav = translations.nav;

  return (
    <footer className="section-dark border-t border-border/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/11/FPT_logo_2010.svg"
                alt="FPT Logo"
                className="h-8"
              />
              <span className="font-bold text-section-dark-foreground">
                <span className="text-primary">Dept. of</span> Artificial Intelligence
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-dim">{t(f.desc, lang)}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-section-dark-foreground">{t(f.quickLinks, lang)}</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/', label: t(nav.home, lang) },
                { to: '/faculty', label: t(nav.faculty, lang) },
                { to: '/about', label: t(nav.about, lang) },
                { to: '/contact', label: t(nav.contact, lang) },
              ].map(link => (
                <Link key={link.to} to={link.to} className="text-sm text-text-dim transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-section-dark-foreground">{t(f.contactInfo, lang)}</h4>
            <div className="flex flex-col gap-2 text-sm text-text-dim">
              <p>📧 ai.department@fpt.edu.vn</p>
              <p>📞 (028) 7300 5588</p>
              <p>📍 {t(translations.contact.addressText, lang)}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border/10 pt-6 text-center text-xs text-text-dim">
          <span>{t(f.copyright, lang)}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
