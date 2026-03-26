import { useLocation, Link } from 'react-router-dom';
import { Users, FileText, UserCog, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import type { Lang } from '@/lib/i18n';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface AdminSidebarProps {
  lang: Lang;
}

const menuItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: { vi: 'Tổng quan', en: 'Overview' } },
  { to: '/dashboard/faculty', icon: Users, label: { vi: 'Giảng viên', en: 'Faculty' } },
  { to: '/dashboard/accounts', icon: UserCog, label: { vi: 'Tài khoản', en: 'Accounts' } },
  { to: '/dashboard/content', icon: FileText, label: { vi: 'Nội dung', en: 'Content' } },
];

export function AdminSidebar({ lang }: AdminSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && (lang === 'vi' ? 'Quản trị' : 'Admin Panel')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.to}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted ${
                        location.pathname === item.to
                          ? 'bg-muted text-primary font-medium'
                          : 'text-muted-foreground'
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.label[lang]}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {!collapsed && user && (
                <SidebarMenuItem>
                  <div className="px-3 py-2 text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={signOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{lang === 'vi' ? 'Đăng xuất' : 'Sign Out'}</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
