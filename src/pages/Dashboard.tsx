import { useAuth } from '@/lib/auth';
import { Navigate } from 'react-router-dom';
import type { Lang } from '@/lib/i18n';

interface DashboardPageProps {
  lang: Lang;
}

const DashboardPage = ({ lang }: DashboardPageProps) => {
  const { user, role, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {role === 'admin' ? 'Admin Dashboard' : 'Faculty Dashboard'}
            </h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <button
            onClick={signOut}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {lang === 'vi' ? 'Đăng xuất' : 'Sign Out'}
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            {lang === 'vi'
              ? 'Dashboard sẽ được phát triển ở giai đoạn tiếp theo.'
              : 'Dashboard will be developed in the next phase.'}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === 'vi'
              ? `Vai trò hiện tại: ${role === 'admin' ? 'Quản trị viên' : 'Giảng viên'}`
              : `Current role: ${role === 'admin' ? 'Admin' : 'Faculty'}`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
