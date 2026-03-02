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
                { icon: '📞', title: t(c.phoneTitle, lang), text: '(028) 7300 5588' },
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
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4854676590956!2d106.80903007480602!3d10.841127589311586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1svi!2s!4v1709000000000!5m2!1svi!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="FPT University HCMC Map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
