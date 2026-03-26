import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Lang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccountRow {
  id: string;
  user_id: string;
  role: string;
  email?: string;
}

interface AdminAccountsProps {
  lang: Lang;
}

const AdminAccounts = ({ lang }: AdminAccountsProps) => {
  const [accounts, setAccounts] = useState<AccountRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'faculty'>('faculty');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchAccounts = useCallback(async () => {
    const { data } = await supabase.from('user_roles').select('*');
    setAccounts((data as AccountRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchAccounts(); }, [fetchAccounts]);

  const handleCreate = async () => {
    if (!newEmail || !newPassword) return;
    setSaving(true);

    try {
      // Call edge function to create user
      const { data, error } = await supabase.functions.invoke('manage-user', {
        body: { action: 'create', email: newEmail, password: newPassword, role: newRole },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: lang === 'vi' ? 'Đã tạo tài khoản' : 'Account created' });
      setShowForm(false);
      setNewEmail('');
      setNewPassword('');
      fetchAccounts();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
    setSaving(false);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm(lang === 'vi' ? 'Xác nhận xóa tài khoản này?' : 'Confirm delete this account?')) return;

    try {
      const { data, error } = await supabase.functions.invoke('manage-user', {
        body: { action: 'delete', userId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: lang === 'vi' ? 'Đã xóa' : 'Deleted' });
      fetchAccounts();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lang === 'vi' ? 'Quản lý Tài khoản' : 'Account Management'}</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-1 h-4 w-4" /> {lang === 'vi' ? 'Tạo tài khoản' : 'Create Account'}
        </Button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">{lang === 'vi' ? 'Tạo tài khoản mới' : 'Create New Account'}</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowForm(false)}><X className="h-4 w-4" /></Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} type="email" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Mật khẩu' : 'Password'}</label>
              <Input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Vai trò' : 'Role'}</label>
              <select
                value={newRole}
                onChange={e => setNewRole(e.target.value as 'admin' | 'faculty')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="faculty">{lang === 'vi' ? 'Giảng viên' : 'Faculty'}</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <Button className="mt-4" onClick={handleCreate} disabled={saving}>
            <Save className="mr-1 h-4 w-4" /> {saving ? '...' : (lang === 'vi' ? 'Tạo' : 'Create')}
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {accounts.map(acc => (
          <div key={acc.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
            <div className="flex-1">
              <p className="font-semibold">{acc.user_id.slice(0, 8)}...</p>
              <p className="text-sm text-muted-foreground">
                {lang === 'vi' ? 'Vai trò' : 'Role'}: <span className="font-medium text-primary">{acc.role}</span>
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleDelete(acc.user_id)}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAccounts;
