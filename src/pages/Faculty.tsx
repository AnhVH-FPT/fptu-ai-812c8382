import { Link } from 'react-router-dom';
import { t, translations, type Lang } from '@/lib/i18n';
import { facultyData } from '@/lib/faculty-data';

interface FacultyPageProps {
  lang: Lang;
}

const FacultyPage = ({ lang }: FacultyPageProps) => {
  const f = translations.faculty;

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{t(f.pageTitle, lang)}</h1>
          <p className="text-muted-foreground">{t(f.pageSubtitle, lang)}</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {facultyData.map((member) => (
            <div key={member.id} className="card-hover overflow-hidden rounded-2xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-3 text-sm text-primary font-medium">{t(member.title, lang)}</p>
                <p className="mb-3 text-xs text-muted-foreground">📧 {member.email}</p>
                <div className="mb-4">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t(f.research, lang)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.researchAreas[lang].map((area, i) => (
                      <span key={i} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <Link
                  to={`/faculty/${member.id}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {t(f.viewDetail, lang)}
                  <svg className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultyPage;
