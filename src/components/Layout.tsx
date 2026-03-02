import { Link } from 'react-router-dom';
import { t, translations, type Lang } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Layout = ({ children, lang, setLang }: LayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Navbar lang={lang} setLang={setLang} />
    <main className="flex-1">{children}</main>
    <Footer lang={lang} />
  </div>
);

export default Layout;
