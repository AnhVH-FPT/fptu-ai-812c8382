import { t, translations, type Lang } from '@/lib/i18n';

interface ContactPageProps {
  lang: Lang;
}

const ContactPage = ({ lang }: ContactPageProps) => {
  const c = translations.contact;

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-center text-3xl font-bold sm:text-4xl">{t(c.pageTitle, lang)}</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <form onSubmit={e => e.preventDefault()} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t(c.formName, lang)}</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t(c.formEmail, lang)}</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t(c.formSubject, lang)}</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t(c.formMessage, lang)}</label>
                <textarea
                  rows={5}
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
              >
                {t(c.formSend, lang)}
              </button>
            </form>
          </div>

          {/* Info + Map */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="space-y-4">
              {[
                { icon: '📍', title: t(c.addressTitle, lang), text: t(c.addressText, lang) },
                { icon: '📧', title: t(c.emailTitle, lang), text: 'ai.department@fpt.edu.vn' },
                { icon: '📞', title: t(c.phoneTitle, lang), text: '(024) 7300 1866' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="flex aspect-video items-center justify-center rounded-2xl border border-border bg-muted">
              <div className="text-center text-muted-foreground">
                <svg className="mx-auto mb-2 h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-sm font-medium">FPT University - Hoa Lac Campus</p>
                <p className="text-xs">Km29 Thang Long Boulevard</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
