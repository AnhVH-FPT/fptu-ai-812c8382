import { Link } from 'react-router-dom';
import { t, translations, type Lang } from '@/lib/i18n';

const highlights = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: translations.highlights.h1Title,
    desc: translations.highlights.h1Desc,
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: translations.highlights.h2Title,
    desc: translations.highlights.h2Desc,
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: translations.highlights.h3Title,
    desc: translations.highlights.h3Desc,
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
    title: translations.highlights.h4Title,
    desc: translations.highlights.h4Desc,
  },
];

interface IndexPageProps {
  lang: Lang;
}

const IndexPage = ({ lang }: IndexPageProps) => {
  const hero = translations.hero;
  const hl = translations.highlights;

  return (
    <>
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden px-4 py-24 sm:py-32 lg:py-40">
        {/* Decorative */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-fade-up mb-6 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            {t(hero.badge, lang)}
          </div>
          <h1 className="animate-fade-up-delay-1 mb-6 text-4xl font-black leading-tight tracking-tight text-section-dark-foreground sm:text-5xl lg:text-6xl">
            {t(hero.title1, lang)}{' '}
            <span className="text-gradient-orange">{t(hero.title2, lang)}</span>
          </h1>
          <p className="animate-fade-up-delay-2 mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-text-dim">
            {t(hero.subtitle, lang)}
          </p>
          <div className="animate-fade-up-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex items-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110 glow-orange"
            >
              {t(hero.cta1, lang)}
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/faculty"
              className="inline-flex items-center rounded-xl border border-section-dark-foreground/20 px-8 py-3.5 text-sm font-semibold text-section-dark-foreground transition-all hover:border-primary hover:text-primary"
            >
              {t(hero.cta2, lang)}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">{t(hl.title, lang)}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <div
                key={i}
                className="card-hover rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t(item.title, lang)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(item.desc, lang)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-section-dark-foreground">
            {lang === 'vi' ? 'Sẵn sàng bắt đầu hành trình AI?' : 'Ready to start your AI journey?'}
          </h2>
          <p className="mb-8 text-text-dim">
            {lang === 'vi'
              ? 'Liên hệ ngay với chúng tôi để được tư vấn chi tiết về chương trình đào tạo.'
              : 'Contact us today for detailed program consultation.'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
          >
            {t(translations.nav.contact, lang)}
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
