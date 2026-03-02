import { useState, useEffect } from 'react';
import { getStoredFaculty, saveStoredFaculty } from '@/lib/admin-store';
import type { Faculty, StudentInfo } from '@/lib/faculty-data';

const emptyBilingual = () => ({ vi: '', en: '' });
const emptyProject = () => ({ name: '', desc: '' });

const emptyFaculty = (): Faculty => ({
  id: '',
  name: '',
  title: emptyBilingual(),
  email: '',
  phone: '',
  image: '',
  researchAreas: { vi: [], en: [] },
  courses: { vi: [], en: [] },
  projects: { vi: [], en: [] },
  completedResearch: { vi: [], en: [] },
  students: [],
  bio: emptyBilingual(),
  announcement: emptyBilingual(),
});

const AdminFaculty = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [editing, setEditing] = useState<Faculty | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setFaculty(getStoredFaculty()); }, []);

  const save = (data: Faculty[]) => {
    setFaculty(data);
    saveStoredFaculty(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Xác nhận xóa giảng viên này?')) {
      save(faculty.filter(f => f.id !== id));
    }
  };

  const handleSaveForm = () => {
    if (!editing) return;
    const item = { ...editing, id: editing.id || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '') };
    const exists = faculty.findIndex(f => f.id === item.id);
    const updated = exists >= 0 ? faculty.map(f => f.id === item.id ? item : f) : [...faculty, item];
    save(updated);
    setEditing(null);
  };

  if (editing) {
    return <FacultyForm faculty={editing} onChange={setEditing} onSave={handleSaveForm} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">👩‍🏫 Quản lý Giảng viên</h1>
        <button
          onClick={() => setEditing(emptyFaculty())}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all"
        >
          + Thêm giảng viên
        </button>
      </div>

      {saved && <div className="mb-4 rounded-lg bg-primary/10 p-3 text-sm text-primary">✅ Đã lưu thành công!</div>}

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left font-semibold">Ảnh</th>
              <th className="p-3 text-left font-semibold">Tên</th>
              <th className="p-3 text-left font-semibold">Email</th>
              <th className="p-3 text-left font-semibold">SĐT</th>
              <th className="p-3 text-left font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {faculty.map(f => (
              <tr key={f.id} className="border-t border-border hover:bg-muted/50 transition-colors">
                <td className="p-3">
                  <img src={f.image} alt={f.name} className="h-10 w-10 rounded-lg object-cover" />
                </td>
                <td className="p-3 font-medium">{f.name}</td>
                <td className="p-3 text-muted-foreground">{f.email}</td>
                <td className="p-3 text-muted-foreground">{f.phone}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditing({ ...f })} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                      ✏️ Sửa
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
                      🗑️ Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ---- Faculty Form ----
const FacultyForm = ({
  faculty,
  onChange,
  onSave,
  onCancel,
}: {
  faculty: Faculty;
  onChange: (f: Faculty) => void;
  onSave: () => void;
  onCancel: () => void;
}) => {
  const updateField = <K extends keyof Faculty>(key: K, val: Faculty[K]) => onChange({ ...faculty, [key]: val });

  // Research areas as comma-separated
  const [researchVi, setResearchVi] = useState(faculty.researchAreas.vi.join(', '));
  const [researchEn, setResearchEn] = useState(faculty.researchAreas.en.join(', '));

  const [coursesVi, setCoursesVi] = useState(faculty.courses.vi.join(', '));
  const [coursesEn, setCoursesEn] = useState(faculty.courses.en.join(', '));

  const syncBeforeSave = () => {
    faculty.researchAreas = {
      vi: researchVi.split(',').map(s => s.trim()).filter(Boolean),
      en: researchEn.split(',').map(s => s.trim()).filter(Boolean),
    };
    faculty.courses = {
      vi: coursesVi.split(',').map(s => s.trim()).filter(Boolean),
      en: coursesEn.split(',').map(s => s.trim()).filter(Boolean),
    };
    onSave();
  };

  const addProject = (key: 'projects' | 'completedResearch') => {
    updateField(key, {
      vi: [...faculty[key].vi, { name: '', desc: '' }],
      en: [...faculty[key].en, { name: '', desc: '' }],
    });
  };

  const updateProject = (key: 'projects' | 'completedResearch', idx: number, lang: 'vi' | 'en', field: 'name' | 'desc', val: string) => {
    const updated = { ...faculty[key] };
    updated[lang] = updated[lang].map((p, i) => i === idx ? { ...p, [field]: val } : p);
    updateField(key, updated);
  };

  const removeProject = (key: 'projects' | 'completedResearch', idx: number) => {
    updateField(key, {
      vi: faculty[key].vi.filter((_, i) => i !== idx),
      en: faculty[key].en.filter((_, i) => i !== idx),
    });
  };

  const addStudent = () => {
    updateField('students', [...faculty.students, { name: { vi: '', en: '' }, topic: { vi: '', en: '' } }]);
  };

  const updateStudent = (idx: number, field: keyof StudentInfo, lang: 'vi' | 'en', val: string) => {
    const updated = faculty.students.map((s, i) =>
      i === idx ? { ...s, [field]: { ...s[field], [lang]: val } } : s
    );
    updateField('students', updated);
  };

  const removeStudent = (idx: number) => {
    updateField('students', faculty.students.filter((_, i) => i !== idx));
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{faculty.id ? '✏️ Chỉnh sửa giảng viên' : '➕ Thêm giảng viên mới'}</h1>
        <div className="flex gap-2">
          <button onClick={onCancel} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Hủy
          </button>
          <button onClick={syncBeforeSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all">
            💾 Lưu
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic info */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Thông tin cơ bản</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Tên giảng viên</label>
              <input className={inputClass} value={faculty.name} onChange={e => updateField('name', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">URL Ảnh đại diện</label>
              <input className={inputClass} value={faculty.image} onChange={e => updateField('image', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input className={inputClass} value={faculty.email} onChange={e => updateField('email', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Số điện thoại</label>
              <input className={inputClass} value={faculty.phone} onChange={e => updateField('phone', e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Chức danh (VI)</label>
              <input className={inputClass} value={faculty.title.vi} onChange={e => updateField('title', { ...faculty.title, vi: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Chức danh (EN)</label>
              <input className={inputClass} value={faculty.title.en} onChange={e => updateField('title', { ...faculty.title, en: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Tiểu sử</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">🇻🇳 Tiểu sử (VI)</label>
              <textarea className={inputClass + " resize-none"} rows={4} value={faculty.bio.vi} onChange={e => updateField('bio', { ...faculty.bio, vi: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">🇬🇧 Bio (EN)</label>
              <textarea className={inputClass + " resize-none"} rows={4} value={faculty.bio.en} onChange={e => updateField('bio', { ...faculty.bio, en: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Research Areas */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Hướng nghiên cứu (phân cách bằng dấu phẩy)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">🇻🇳 Tiếng Việt</label>
              <textarea className={inputClass + " resize-none"} rows={3} value={researchVi} onChange={e => setResearchVi(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">🇬🇧 English</label>
              <textarea className={inputClass + " resize-none"} rows={3} value={researchEn} onChange={e => setResearchEn(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">Môn giảng dạy (phân cách bằng dấu phẩy)</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">🇻🇳 Tiếng Việt</label>
              <textarea className={inputClass + " resize-none"} rows={2} value={coursesVi} onChange={e => setCoursesVi(e.target.value)} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">🇬🇧 English</label>
              <textarea className={inputClass + " resize-none"} rows={2} value={coursesEn} onChange={e => setCoursesEn(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Projects */}
        {(['projects', 'completedResearch'] as const).map(key => (
          <div key={key} className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">{key === 'projects' ? '🔬 Dự án đang nghiên cứu' : '📄 Nghiên cứu đã thực hiện'}</h2>
              <button onClick={() => addProject(key)} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
                + Thêm
              </button>
            </div>
            <div className="space-y-4">
              {faculty[key].vi.map((_, idx) => (
                <div key={idx} className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold">#{idx + 1}</span>
                    <button onClick={() => removeProject(key, idx)} className="text-xs text-destructive hover:underline">Xóa</button>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium">Tên (VI)</label>
                      <input className={inputClass} value={faculty[key].vi[idx]?.name || ''} onChange={e => updateProject(key, idx, 'vi', 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium">Name (EN)</label>
                      <input className={inputClass} value={faculty[key].en[idx]?.name || ''} onChange={e => updateProject(key, idx, 'en', 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium">Mô tả (VI)</label>
                      <textarea className={inputClass + " resize-none"} rows={2} value={faculty[key].vi[idx]?.desc || ''} onChange={e => updateProject(key, idx, 'vi', 'desc', e.target.value)} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium">Description (EN)</label>
                      <textarea className={inputClass + " resize-none"} rows={2} value={faculty[key].en[idx]?.desc || ''} onChange={e => updateProject(key, idx, 'en', 'desc', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Students */}
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">🎓 Sinh viên đang hướng dẫn</h2>
            <button onClick={addStudent} className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
              + Thêm sinh viên
            </button>
          </div>
          <div className="space-y-4">
            {faculty.students.map((student, idx) => (
              <div key={idx} className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">Sinh viên #{idx + 1}</span>
                  <button onClick={() => removeStudent(idx)} className="text-xs text-destructive hover:underline">Xóa</button>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium">Tên (VI)</label>
                    <input className={inputClass} value={student.name.vi} onChange={e => updateStudent(idx, 'name', 'vi', e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Name (EN)</label>
                    <input className={inputClass} value={student.name.en} onChange={e => updateStudent(idx, 'name', 'en', e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Đề tài (VI)</label>
                    <input className={inputClass} value={student.topic.vi} onChange={e => updateStudent(idx, 'topic', 'vi', e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium">Topic (EN)</label>
                    <input className={inputClass} value={student.topic.en} onChange={e => updateStudent(idx, 'topic', 'en', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcement */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">📢 Thông báo tuyển sinh</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">🇻🇳 Tiếng Việt</label>
              <textarea className={inputClass + " resize-none"} rows={3} value={faculty.announcement.vi} onChange={e => updateField('announcement', { ...faculty.announcement, vi: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">🇬🇧 English</label>
              <textarea className={inputClass + " resize-none"} rows={3} value={faculty.announcement.en} onChange={e => updateField('announcement', { ...faculty.announcement, en: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFaculty;
