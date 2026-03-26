import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { t, type Lang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginPageProps {
  lang: Lang;
}

const translations = {
  title: { vi: 'Đăng nhập', en: 'Sign In' },
  subtitle: { vi: 'Dành cho Admin và Giảng viên', en: 'For Admin & Faculty' },
  email: { vi: 'Email', en: 'Email' },
  password: { vi: 'Mật khẩu', en: 'Password' },
  login: { vi: 'Đăng nhập', en: 'Sign In' },
  error: { vi: 'Email hoặc mật khẩu không đúng', en: 'Invalid email or password' },
  loading: { vi: 'Đang xử lý...', en: 'Signing in...' },
};

const LoginPage = ({ lang }: LoginPageProps) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: err } = await signIn(email, password);
    if (err) {
      setError(t(translations.error, lang));
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">{t(translations.title, lang)}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t(translations.subtitle, lang)}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">{t(translations.email, lang)}</label>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">{t(translations.password, lang)}</label>
            <Input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t(translations.loading, lang) : t(translations.login, lang)}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
