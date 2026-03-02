import { Link, useLocation } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';
import { t, translations } from '@/lib/i18n';
import { useState } from 'react';

interface NavbarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Navbar = ({ lang, setLang }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = translations.nav;

  const links = [
    { to: '/', label: t(nav.home, lang) },
    { to: '/faculty', label: t(nav.faculty, lang) },
    { to: '/about', label: t(nav.about, lang) },
    { to: '/contact', label: t(nav.contact, lang) },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/11/FPT_logo_2010.svg"
            alt="FPT University Logo"
            className="h-8"
          />
          <span className="hidden text-sm font-bold sm:block">
            <span className="text-primary">Dept. of</span> Artificial Intelligence
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary ${
                location.pathname === link.to ? 'bg-muted text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Lang toggle + Mobile button */}
        <div className="flex items-center gap-2">
          <div className="flex overflow-hidden rounded-lg border border-border text-sm font-medium">
            <button
              onClick={() => setLang('vi')}
              className={`px-3 py-1.5 transition-colors ${lang === 'vi' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
            >
              VI
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 transition-colors ${lang === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
            >
              EN
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to ? 'bg-muted text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
