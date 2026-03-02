import { useState, useEffect } from 'react';
import { translations } from '@/lib/i18n';
import { getStoredGlobalText, saveStoredGlobalText } from '@/lib/admin-store';
import type { Lang } from '@/lib/i18n';

type BilingualField = Record<Lang, string>;

const BilingualInput = ({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: BilingualField;
  onChange: (v: BilingualField) => void;
  multiline?: boolean;
}) => {
  const InputComp = multiline ? 'textarea' : 'input';
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold">{label}</label>
      <div className="grid gap-2 md:grid-cols-2">
        <div>
          <span className="text-xs text-muted-foreground">🇻🇳 Tiếng Việt</span>
          <InputComp
            value={value.vi}
            onChange={e => onChange({ ...value, vi: e.target.value })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            {...(multiline ? { rows: 3 } : {})}
          />
        </div>
        <div>
          <span className="text-xs text-muted-foreground">🇬🇧 English</span>
          <InputComp
            value={value.en}
            onChange={e => onChange({ ...value, en: e.target.value })}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            {...(multiline ? { rows: 3 } : {})}
          />
        </div>
      </div>
    </div>
  );
};

const AdminGlobalText = () => {
  const defaults = translations;

  const [hero, setHero] = useState<Record<string, BilingualField>>({
    badge: { ...defaults.hero.badge },
    title1: { ...defaults.hero.title1 },
    title2: { ...defaults.hero.title2 },
    subtitle: { ...defaults.hero.subtitle },
  });

  const [about, setAbout] = useState<Record<string, BilingualField>>({
    historyText: { ...defaults.about.historyText },
    visionText: { ...defaults.about.visionText },
    missionText: { ...defaults.about.missionText },
  });

  const [contact, setContact] = useState<Record<string, BilingualField>>({
    addressText: { ...defaults.contact.addressText },
  });

  const [footer, setFooter] = useState<Record<string, BilingualField>>({
    desc: { ...defaults.footer.desc },
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = getStoredGlobalText();
    if (stored.hero) {
      const h = stored.hero as Record<string, BilingualField>;
      setHero(prev => ({
        badge: h.badge || prev.badge,
        title1: h.title1 || prev.title1,
        title2: h.title2 || prev.title2,
        subtitle: h.subtitle || prev.subtitle,
      }));
    }
    if (stored.about) {
      const a = stored.about as Record<string, BilingualField>;
      setAbout(prev => ({
        historyText: a.historyText || prev.historyText,
        visionText: a.visionText || prev.visionText,
        missionText: a.missionText || prev.missionText,
      }));
    }
    if (stored.contact) {
      const c = stored.contact as Record<string, BilingualField>;
      setContact(prev => ({ addressText: c.addressText || prev.addressText }));
    }
    if (stored.footer) {
      const f = stored.footer as Record<string, BilingualField>;
      setFooter(prev => ({ desc: f.desc || prev.desc }));
    }
  }, []);

  const handleSave = () => {
    saveStoredGlobalText({ hero, about, contact, footer });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    localStorage.removeItem('fpt-admin-global-text');
    setHero({
      badge: { ...defaults.hero.badge },
      title1: { ...defaults.hero.title1 },
      title2: { ...defaults.hero.title2 },
      subtitle: { ...defaults.hero.subtitle },
    });
    setAbout({
      historyText: { ...defaults.about.historyText },
      visionText: { ...defaults.about.visionText },
      missionText: { ...defaults.about.missionText },
    });
    setContact({ addressText: { ...defaults.contact.addressText } });
    setFooter({ desc: { ...defaults.footer.desc } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">📝 Quản lý nội dung chung</h1>
        <div className="flex gap-2">
          <button onClick={handleReset} className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted transition-colors">
            Reset mặc định
          </button>
          <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all">
            {saved ? '✅ Đã lưu!' : '💾 Lưu thay đổi'}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hero Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">🏠 Trang chủ - Hero Section</h2>
          <div className="space-y-4">
            <BilingualInput label="Badge text" value={hero.badge} onChange={v => setHero(prev => ({ ...prev, badge: v }))} />
            <BilingualInput label="Title Line 1" value={hero.title1} onChange={v => setHero(prev => ({ ...prev, title1: v }))} />
            <BilingualInput label="Title Line 2" value={hero.title2} onChange={v => setHero(prev => ({ ...prev, title2: v }))} />
            <BilingualInput label="Subtitle" value={hero.subtitle} onChange={v => setHero(prev => ({ ...prev, subtitle: v }))} multiline />
          </div>
        </div>

        {/* About */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">ℹ️ Trang Về bộ môn</h2>
          <div className="space-y-4">
            <BilingualInput label="Lịch sử hình thành" value={about.historyText} onChange={v => setAbout(prev => ({ ...prev, historyText: v }))} multiline />
            <BilingualInput label="Tầm nhìn" value={about.visionText} onChange={v => setAbout(prev => ({ ...prev, visionText: v }))} multiline />
            <BilingualInput label="Sứ mệnh" value={about.missionText} onChange={v => setAbout(prev => ({ ...prev, missionText: v }))} multiline />
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">📍 Liên hệ</h2>
          <div className="space-y-4">
            <BilingualInput label="Địa chỉ" value={contact.addressText} onChange={v => setContact({ addressText: v })} />
          </div>
        </div>

        {/* Footer */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-bold">🦶 Footer</h2>
          <div className="space-y-4">
            <BilingualInput label="Mô tả Footer" value={footer.desc} onChange={v => setFooter({ desc: v })} multiline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGlobalText;
