import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminLoggedIn, adminLogout } from '@/lib/admin-auth';
import AdminGlobalText from '@/components/admin/AdminGlobalText';
import AdminFaculty from '@/components/admin/AdminFaculty';

const tabs = [
  { id: 'global', label: 'Quản lý nội dung chung', icon: '📝' },
  { id: 'faculty', label: 'Quản lý Giảng viên', icon: '👩‍🏫' },
] as const;

type TabId = typeof tabs[number]['id'];

const Admin = () => {
  const [activeTab, setActiveTab] = useState<TabId>('global');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate('/', { replace: true });
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  if (!isAdminLoggedIn()) return null;

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-card">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-primary">Admin Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">FPT AI Department</p>
        </div>
        <nav className="p-2 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4 border-t border-border absolute bottom-0 w-64">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            🚪 Đăng xuất / Logout
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {activeTab === 'global' && <AdminGlobalText />}
        {activeTab === 'faculty' && <AdminFaculty />}
      </main>
    </div>
  );
};

export default Admin;
