import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import type { Lang } from '@/lib/i18n';

interface AdminLayoutProps {
  lang: Lang;
}

const AdminLayout = ({ lang }: AdminLayoutProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (role !== 'admin') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">
          {lang === 'vi' ? 'Bạn không có quyền truy cập trang này.' : 'You do not have access to this page.'}
        </p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        <AdminSidebar lang={lang} />
        <div className="flex-1 flex flex-col">
          <header className="flex h-12 items-center border-b border-border px-4">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
