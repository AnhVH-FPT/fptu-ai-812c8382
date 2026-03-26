import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Lang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FacultyRow {
  id: string;
  name: string;
  slug: string;
  title_vi: string;
  title_en: string;
  email: string;
  phone: string;
  image_url: string;
  bio_vi: string;
  bio_en: string;
  research_areas_vi: string[];
  research_areas_en: string[];
  courses_vi: string[];
  courses_en: string[];
  education: any[];
  current_researches: any[];
  completed_researches: any[];
  notices: any[];
  display_order: number;
  user_id: string;
}

const emptyFaculty: Omit<FacultyRow, 'id' | 'user_id'> = {
  name: '', slug: '', title_vi: '', title_en: '', email: '', phone: '',
  image_url: '', bio_vi: '', bio_en: '',
  research_areas_vi: [], research_areas_en: [],
  courses_vi: [], courses_en: [],
  education: [], current_researches: [], completed_researches: [], notices: [],
  display_order: 0,
};

interface AdminFacultyProps {
  lang: Lang;
}

const AdminFaculty = ({ lang }: AdminFacultyProps) => {
  const [faculty, setFaculty] = useState<FacultyRow[]>([]);
  const [editing, setEditing] = useState<FacultyRow | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFaculty = useCallback(async () => {
    const { data } = await supabase
      .from('faculty_profiles')
      .select('*')
      .order('display_order');
    setFaculty((data as any[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchFaculty(); }, [fetchFaculty]);

  const handleAdd = () => {
    setEditing({ ...emptyFaculty, id: '', user_id: '' } as FacultyRow);
    setIsNew(true);
  };

  const handleEdit = (f: FacultyRow) => {
    setEditing({ ...f });
    setIsNew(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(lang === 'vi' ? 'Xác nhận xóa?' : 'Confirm delete?')) return;
    await supabase.from('faculty_profiles').delete().eq('id', id);
    toast({ title: lang === 'vi' ? 'Đã xóa' : 'Deleted' });
    fetchFaculty();
  };

  const handleSave = async () => {
    if (!editing) return;
    const { id, user_id, ...data } = editing;

    if (isNew) {
      // Need a user_id — for now use admin's or create placeholder
      const { data: { user } } = await supabase.auth.getUser();
      const insertData = { ...data, user_id: user!.id };
      const { error } = await supabase.from('faculty_profiles').insert(insertData as any);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
    } else {
      const { error } = await supabase.from('faculty_profiles').update(data as any).eq('id', id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        return;
      }
    }
    toast({ title: lang === 'vi' ? 'Đã lưu' : 'Saved' });
    setEditing(null);
    setIsNew(false);
    fetchFaculty();
  };

  const updateField = <K extends keyof FacultyRow>(key: K, value: FacultyRow[K]) => {
    if (!editing) return;
    setEditing({ ...editing, [key]: value });
  };

  const updateArrayField = (key: 'research_areas_vi' | 'research_areas_en' | 'courses_vi' | 'courses_en', value: string) => {
    updateField(key, value.split(',').map(s => s.trim()).filter(Boolean));
  };

  // JSON editors for complex fields
  const updateJsonField = (key: 'education' | 'current_researches' | 'completed_researches' | 'notices', value: string) => {
    try {
      updateField(key, JSON.parse(value));
    } catch {
      // invalid JSON, don't update
    }
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>;
  }

  if (editing) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            {isNew ? (lang === 'vi' ? 'Thêm giảng viên' : 'Add Faculty') : (lang === 'vi' ? 'Sửa giảng viên' : 'Edit Faculty')}
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

        <div className="space-y-6 rounded-2xl border border-border bg-card p-6">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Tên' : 'Name'}</label>
              <Input value={editing.name} onChange={e => updateField('name', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Slug (URL)</label>
              <Input value={editing.slug} onChange={e => updateField('slug', e.target.value)} placeholder="nguyen-van-a" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Chức danh (VI)' : 'Title (VI)'}</label>
              <Input value={editing.title_vi} onChange={e => updateField('title_vi', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Chức danh (EN)' : 'Title (EN)'}</label>
              <Input value={editing.title_en} onChange={e => updateField('title_en', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <Input value={editing.email} onChange={e => updateField('email', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Số điện thoại' : 'Phone'}</label>
              <Input value={editing.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'URL Ảnh đại diện' : 'Image URL'}</label>
              <Input value={editing.image_url} onChange={e => updateField('image_url', e.target.value)} />
              {editing.image_url && <img src={editing.image_url} alt="" className="mt-2 h-20 w-20 rounded-xl object-cover" />}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Thứ tự hiển thị' : 'Display Order'}</label>
              <Input type="number" value={editing.display_order} onChange={e => updateField('display_order', parseInt(e.target.value) || 0)} />
            </div>
          </div>

          {/* Bio */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Bio (VI)</label>
              <Textarea rows={4} value={editing.bio_vi} onChange={e => updateField('bio_vi', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Bio (EN)</label>
              <Textarea rows={4} value={editing.bio_en} onChange={e => updateField('bio_en', e.target.value)} />
            </div>
          </div>

          {/* Arrays */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Hướng nghiên cứu (VI)' : 'Research Areas (VI)'}</label>
              <Input value={editing.research_areas_vi.join(', ')} onChange={e => updateArrayField('research_areas_vi', e.target.value)} placeholder="Phân tách bằng dấu phẩy" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Hướng nghiên cứu (EN)' : 'Research Areas (EN)'}</label>
              <Input value={editing.research_areas_en.join(', ')} onChange={e => updateArrayField('research_areas_en', e.target.value)} placeholder="Comma-separated" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Môn giảng dạy (VI)' : 'Courses (VI)'}</label>
              <Input value={editing.courses_vi.join(', ')} onChange={e => updateArrayField('courses_vi', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Môn giảng dạy (EN)' : 'Courses (EN)'}</label>
              <Input value={editing.courses_en.join(', ')} onChange={e => updateArrayField('courses_en', e.target.value)} />
            </div>
          </div>

          {/* JSON fields */}
          <div>
            <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Lịch sử giáo dục (JSON)' : 'Education (JSON)'}</label>
            <Textarea rows={6} value={JSON.stringify(editing.education, null, 2)} onChange={e => updateJsonField('education', e.target.value)} className="font-mono text-xs" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Nghiên cứu đang thực hiện (JSON)' : 'Current Researches (JSON)'}</label>
            <Textarea rows={8} value={JSON.stringify(editing.current_researches, null, 2)} onChange={e => updateJsonField('current_researches', e.target.value)} className="font-mono text-xs" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Nghiên cứu đã thực hiện (JSON)' : 'Completed Researches (JSON)'}</label>
            <Textarea rows={8} value={JSON.stringify(editing.completed_researches, null, 2)} onChange={e => updateJsonField('completed_researches', e.target.value)} className="font-mono text-xs" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{lang === 'vi' ? 'Thông báo tuyển sinh (JSON)' : 'Recruitment Notices (JSON)'}</label>
            <Textarea rows={6} value={JSON.stringify(editing.notices, null, 2)} onChange={e => updateJsonField('notices', e.target.value)} className="font-mono text-xs" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{lang === 'vi' ? 'Quản lý Giảng viên' : 'Faculty Management'}</h1>
        <Button onClick={handleAdd}>
          <Plus className="mr-1 h-4 w-4" /> {lang === 'vi' ? 'Thêm mới' : 'Add New'}
        </Button>
      </div>

      {faculty.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-8 text-center text-muted-foreground">
          {lang === 'vi' ? 'Chưa có giảng viên nào. Bấm "Thêm mới" để bắt đầu.' : 'No faculty yet. Click "Add New" to start.'}
        </div>
      ) : (
        <div className="space-y-3">
          {faculty.map(f => (
            <div key={f.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              {f.image_url && (
                <img src={f.image_url} alt={f.name} className="h-12 w-12 rounded-lg object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{f.name}</p>
                <p className="text-sm text-muted-foreground truncate">{lang === 'vi' ? f.title_vi : f.title_en}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(f)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(f.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFaculty;
