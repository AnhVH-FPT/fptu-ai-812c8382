import { t, translations, type Lang } from '@/lib/i18n';

interface AboutPageProps {
  lang: Lang;
}

const AboutPage = ({ lang }: AboutPageProps) => {
  const a = translations.about;

  const stats = [
    { label: t(a.stats.students, lang), value: '500+' },
    { label: t(a.stats.faculty, lang), value: '15+' },
    { label: t(a.stats.papers, lang), value: '100+' },
    { label: t(a.stats.partners, lang), value: '20+' },
  ];

  const sections = [
    { title: t(a.historyTitle, lang), text: t(a.historyText, lang), icon: '📜' },
    { title: t(a.visionTitle, lang), text: t(a.visionText, lang), icon: '🔭' },
    { title: t(a.missionTitle, lang), text: t(a.missionText, lang), icon: '🎯' },
  ];

  return (
    <>
      {/* Header */}
      <section className="hero-bg px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-3xl font-bold text-section-dark-foreground sm:text-4xl">{t(a.pageTitle, lang)}</h1>
          <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="rounded-xl border border-section-dark-foreground/10 bg-section-dark-foreground/5 p-4 text-center">
                <div className="text-2xl font-black text-primary">{s.value}</div>
                <div className="mt-1 text-xs text-text-dim">{s.label.replace(/\d+\+?\s*/, '')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="card-hover rounded-2xl border border-border bg-card p-8">
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold">
                <span className="text-3xl">{section.icon}</span>
                {section.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">{section.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutPage;
