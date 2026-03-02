import { useParams, Link } from 'react-router-dom';
import { t, translations, type Lang } from '@/lib/i18n';
import { facultyData } from '@/lib/faculty-data';

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

  return (
    <section className="px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link to="/faculty" className="mb-8 inline-flex items-center text-sm font-medium text-primary hover:underline">
          {t(f.backToList, lang)}
        </Link>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
          <img
            src={member.image}
            alt={member.name}
            className="h-40 w-40 rounded-2xl object-cover shadow-lg"
          />
          <div>
            <h1 className="mb-1 text-3xl font-bold">{member.name}</h1>
            <p className="mb-2 text-lg font-medium text-primary">{t(member.title, lang)}</p>
            <p className="mb-3 text-sm text-muted-foreground">📧 {member.email}</p>
            <div className="flex flex-wrap gap-1.5">
              {member.researchAreas[lang].map((area, i) => (
                <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8 rounded-2xl border border-border bg-card p-6">
          <p className="leading-relaxed text-muted-foreground">{t(member.bio, lang)}</p>
        </div>

        {/* Grid sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Courses */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              📚 {t(f.courses, lang)}
            </h2>
            <ul className="space-y-2">
              {member.courses[lang].map((course, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Students */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              🎓 {t(f.students, lang)}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-primary">{member.studentsCount}</span>
              <span className="text-sm text-muted-foreground">
                {lang === 'vi' ? 'sinh viên nghiên cứu' : 'research students'}
              </span>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
            🔬 {t(f.projects, lang)}
          </h2>
          <div className="space-y-4">
            {member.projects[lang].map((project, i) => (
              <div key={i} className="rounded-xl bg-muted p-4">
                <h3 className="mb-1 font-semibold text-primary">{project.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement */}
        <div className="mt-6 rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
            📢 {t(f.announcement, lang)}
          </h2>
          <p className="text-sm leading-relaxed">{t(member.announcement, lang)}</p>
        </div>
      </div>
    </section>
  );
};

export default FacultyDetailPage;
