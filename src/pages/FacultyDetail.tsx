import { useParams, Link } from 'react-router-dom';
import { t, translations, type Lang } from '@/lib/i18n';
import { facultyData, isRecruiting } from '@/lib/faculty-data';

interface FacultyDetailPageProps {
  lang: Lang;
}

const FacultyDetailPage = ({ lang }: FacultyDetailPageProps) => {
  const { id } = useParams();
  const f = translations.faculty;
  const member = facultyData.find(m => m.id === id);

  if (!member) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">{lang === 'vi' ? 'Không tìm thấy giảng viên' : 'Faculty not found'}</h1>
          <Link to="/faculty" className="text-primary hover:underline">{t(f.backToList, lang)}</Link>
        </div>
      </div>
    );
  }

  const recruiting = isRecruiting(member);

  const buildMailto = (topic: string) => {
    const subject = encodeURIComponent(`[FPTU-AI] Ứng tuyển tham gia nghiên cứu đề tài ${topic}`);
    return `mailto:${member.email}?subject=${subject}`;
  };

  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link to="/faculty" className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline">
          {t(f.backToList, lang)}
        </Link>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          <img src={member.image} alt={member.name} className="h-40 w-40 rounded-2xl object-cover shadow-lg" />
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`inline-block h-3 w-3 rounded-full ${recruiting ? 'bg-green-500' : 'bg-gray-400'}`}
                title={recruiting ? t(f.recruiting, lang) : t(f.notRecruiting, lang)}
              />
              <h1 className="text-3xl font-bold">{member.name}</h1>
            </div>
            <p className="mb-1 text-xs text-muted-foreground">
              {recruiting ? `🟢 ${t(f.recruiting, lang)}` : `⚪ ${t(f.notRecruiting, lang)}`}
            </p>
            <p className="mb-2 text-lg font-medium text-primary">{t(member.title, lang)}</p>
            <p className="mb-1 text-sm text-muted-foreground">📧 {member.email}</p>
            <p className="mb-3 text-sm text-muted-foreground">📞 {member.phone}</p>
            <div className="flex flex-wrap gap-1.5">
              {member.researchAreas[lang].map((area, i) => (
                <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{area}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6">
          <p className="leading-relaxed text-muted-foreground">{t(member.bio, lang)}</p>
        </div>

        {/* Courses + Education side by side */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Courses */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">📚 {t(f.courses, lang)}</h2>
            <ul className="space-y-2">
              {member.courses[lang].map((course, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Education History */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">🎓 {t(f.education, lang)}</h2>
            <div className="space-y-3">
              {member.education.map((edu, i) => (
                <div key={i} className="rounded-xl bg-muted p-3">
                  <p className="font-semibold text-primary">{t(edu.degree, lang)}</p>
                  <p className="text-sm text-foreground">{t(edu.school, lang)}</p>
                  <p className="text-xs text-muted-foreground">{t(edu.major, lang)} · {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current Researches (merged projects + students) */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">🔬 {t(f.currentResearches, lang)}</h2>
          <div className="space-y-4">
            {member.currentResearches.map((r, i) => (
              <div key={i} className="rounded-xl bg-muted p-4">
                <h3 className="mb-1 font-semibold text-primary">{t(r.name, lang)}</h3>
                <p className="mb-2 text-sm leading-relaxed text-foreground">{t(r.summary, lang)}</p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-semibold text-muted-foreground">{t(f.researchMembers, lang)}:</span>
                  {r.members.map((m, j) => (
                    <span key={j} className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                      {t(m.name, lang)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Researches */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">📄 {t(f.completedResearches, lang)}</h2>
          <div className="space-y-4">
            {member.completedResearches.map((r, i) => (
              <div key={i} className="rounded-xl bg-muted p-4">
                <h3 className="mb-1 font-semibold text-primary">{t(r.name, lang)}</h3>
                <p className="mb-2 text-sm leading-relaxed text-muted-foreground">{t(r.abstract, lang)}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>📍 {t(r.venue, lang)}</span>
                  <a href={r.doi} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                    🔗 DOI
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices & Application */}
        <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">📢 {t(f.notices, lang)}</h2>
          {member.notices.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              {lang === 'vi' ? 'Hiện không có đề tài tuyển sinh.' : 'No open positions at the moment.'}
            </p>
          ) : (
            <div className="space-y-4">
              {member.notices.map((notice, i) => (
                <div key={i} className="rounded-xl border border-primary/20 bg-card p-4">
                  <h3 className="mb-1 font-semibold text-primary">{t(notice.topic, lang)}</h3>
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-medium">{t(f.noticeSlots, lang)}:</span> {notice.slots}
                  </p>
                  <p className="mb-3 text-sm text-muted-foreground">
                    <span className="font-medium">{t(f.noticeRequirements, lang)}:</span> {t(notice.requirements, lang)}
                  </p>
                  <a
                    href={buildMailto(t(notice.topic, lang))}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                  >
                    ✉️ {t(f.applyBtn, lang)}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacultyDetailPage;
