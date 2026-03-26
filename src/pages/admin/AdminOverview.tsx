import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Lang } from '@/lib/i18n';
import { Users, FileText, UserCog } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OverviewProps {
  lang: Lang;
}

const AdminOverview = ({ lang }: OverviewProps) => {
  const [facultyCount, setFacultyCount] = useState(0);
  const [accountCount, setAccountCount] = useState(0);

  useEffect(() => {
    supabase.from('faculty_profiles').select('id', { count: 'exact', head: true }).then(({ count }) => {
      setFacultyCount(count ?? 0);
    });
    supabase.from('user_roles').select('id', { count: 'exact', head: true }).then(({ count }) => {
      setAccountCount(count ?? 0);
    });
  }, []);

  const cards = [
    { to: '/dashboard/faculty', icon: Users, label: lang === 'vi' ? 'Giảng viên' : 'Faculty', count: facultyCount, color: 'text-primary' },
    { to: '/dashboard/accounts', icon: UserCog, label: lang === 'vi' ? 'Tài khoản' : 'Accounts', count: accountCount, color: 'text-accent' },
    { to: '/dashboard/content', icon: FileText, label: lang === 'vi' ? 'Nội dung Website' : 'Website Content', count: null, color: 'text-muted-foreground' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{lang === 'vi' ? 'Tổng quan' : 'Overview'}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(card => (
          <Link
            key={card.to}
            to={card.to}
            className="rounded-2xl border border-border bg-card p-6 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <card.icon className={`h-8 w-8 ${card.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                {card.count !== null && (
                  <p className="text-2xl font-bold">{card.count}</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
