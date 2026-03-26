import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Lang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentRow {
  id: string;
  section_key: string;
  content_vi: string;
  content_en: string;
}

interface AdminContentProps {
  lang: Lang;
}

const AdminContent = ({ lang }: AdminContentProps) => {
  const [contents, setContents] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<ContentRow | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const fetchContents = useCallback(async () => {
    const { data } = await supabase.from('website_content').select('*').order('section_key');
    setContents((data as ContentRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchContents(); }, [fetchContents]);

  const handleSave = async () => {
    if (!editing) return;
    const { id, ...data } = editing;

    if (isNew) {
      const { error } = await supabase.from('website_content').insert(data);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
    } else {
      const { error } = await supabase.from('website_content').update(data).eq('id', id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
    }
    toast({ title: lang === 'vi' ? 'Đã lưu' : 'Saved' });
    setEditing(null);
    setIsNew(false);
    fetchContents();
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }

  if (editing) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {isNew ? (lang === 'vi' ? 'Thêm nội dung' : 'Add Content') : (lang === 'vi' ? 'Sửa nội dung' : 'Edit Content')}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>
              <X className="mr-1 h-4 w-4" /> {lang === 'vi' ? 'Hủy' : 'Cancel'}
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-1 h-4 w-4" /> {lang === 'vi' ? 'Lưu' : 'Save'}
            </Button>
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">Section Key</label>
            <Input
              value={editing.section_key}
              onChange={e => setEditing({ ...editing, section_key: e.target.value })}
              disabled={!isNew}
              placeholder="hero.title"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Nội dung (VI)' : 'Content (VI)'}</label>
            <Textarea rows={6} value={editing.content_vi} onChange={e => setEditing({ ...editing, content_vi: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Nội dung (EN)' : 'Content (EN)'}</label>
            <Textarea rows={6} value={editing.content_en} onChange={e => setEditing({ ...editing, content_en: e.target.value })} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lang === 'vi' ? 'Quản lý Nội dung' : 'Content Management'}</h1>
        <Button onClick={() => { setEditing({ id: '', section_key: '', content_vi: '', content_en: '' }); setIsNew(true); }}>
          <Plus className="mr-1 h-4 w-4" /> {lang === 'vi' ? 'Thêm mới' : 'Add New'}
        </Button>
      </div>

      {contents.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          {lang === 'vi' ? 'Chưa có nội dung nào.' : 'No content yet.'}
        </div>
      ) : (
        <div className="space-y-3">
          {contents.map(c => (
            <div
              key={c.id}
              onClick={() => { setEditing(c); setIsNew(false); }}
              className="cursor-pointer rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/50"
            >
              <p className="font-semibold text-primary">{c.section_key}</p>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{lang === 'vi' ? c.content_vi : c.content_en}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContent;
