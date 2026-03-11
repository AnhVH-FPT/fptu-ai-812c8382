import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { t, translations, type Lang } from '@/lib/i18n';
import { facultyData, isRecruiting, type Faculty } from '@/lib/faculty-data';
import { normalizeSearch } from '@/lib/search-utils';
import { Search } from 'lucide-react';

interface FacultyPageProps {
  lang: Lang;
}

const VISIBLE_AREAS = 3;

/** Build a single searchable string from all faculty fields */
function buildSearchText(member: Faculty): string {
  const parts: string[] = [
    member.name,
    member.email,
    ...member.researchAreas.vi,
    ...member.researchAreas.en,
    member.title.vi,
    member.title.en,
    ...member.courses.vi,
    ...member.courses.en,
    member.bio.vi,
    member.bio.en,
    ...member.currentResearches.flatMap(r => [
      r.name.vi, r.name.en, r.summary.vi, r.summary.en,
      ...r.members.map(m => m.name.vi + ' ' + m.name.en),
    ]),
    ...member.completedResearches.flatMap(r => [
      r.name, r.authors, r.abstract.vi, r.abstract.en, r.venue.vi, r.venue.en,
    ]),
    ...member.notices.flatMap(n => [
      n.topic.vi, n.topic.en, n.requirements.vi, n.requirements.en,
    ]),
    ...member.education.flatMap(e => [
      e.degree.vi, e.degree.en, e.school.vi, e.school.en, e.major.vi, e.major.en,
    ]),
  ];
  return normalizeSearch(parts.join(' '));
}

const FacultyCard = ({ member, lang }: { member: Faculty; lang: Lang }) => {
  const f = translations.faculty;
  const [expanded, setExpanded] = useState(false);
  const areas = member.researchAreas[lang];
  const needsTruncate = areas.length > VISIBLE_AREAS;
  const visibleAreas = expanded ? areas : areas.slice(0, VISIBLE_AREAS);
  const recruiting = isRecruiting(member);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300">
      <Link to={`/faculty/${member.id}`} className="aspect-[4/3] overflow-hidden block">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <Link to={`/faculty/${member.id}`} className="group mb-1 flex items-center gap-2">
          <span
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${recruiting ? 'bg-green-500' : 'bg-gray-400'}`}
            title={recruiting ? t(f.recruiting, lang) : t(f.notRecruiting, lang)}
          />
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{member.name}</h3>
        </Link>
        <p className="mb-3 text-sm text-primary font-medium">{t(member.title, lang)}</p>
        <p className="mb-1 text-xs text-muted-foreground">📧 {member.email}</p>
        <p className="mb-3 text-xs text-muted-foreground">📞 {member.phone}</p>
        <div className="mb-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t(f.research, lang)}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {visibleAreas.map((area, i) => (
              <span key={i} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {area}
              </span>
            ))}
          </div>
          {needsTruncate && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary text-xs">
                {expanded ? '−' : '+'}
              </span>
              {expanded ? t(f.showLess, lang) : t(f.showMore, lang)}
            </button>
          )}
        </div>
        <div className="mt-auto">
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
    </div>
  );
};

const FacultyPage = ({ lang }: FacultyPageProps) => {
  const f = translations.faculty;
  const [query, setQuery] = useState('');

  const searchIndex = useMemo(
    () => facultyData.map(m => ({ member: m, text: buildSearchText(m) })),
    []
  );

  const filtered = useMemo(() => {
    const q = normalizeSearch(query.trim());
    if (!q) return facultyData;
    return searchIndex.filter(item => item.text.includes(q)).map(item => item.member);
  }, [query, searchIndex]);

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{t(f.pageTitle, lang)}</h1>
          <p className="text-muted-foreground">{t(f.pageSubtitle, lang)}</p>
        </div>

        {/* Search bar */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t(f.searchPlaceholder, lang)}
              className="w-full rounded-xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">{t(f.noResults, lang)}</p>
        ) : (
          <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((member) => (
              <FacultyCard key={member.id} member={member} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultyPage;
