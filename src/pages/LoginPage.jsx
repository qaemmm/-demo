import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithPassword } from '../api/client';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LoadingOverlay from '../components/LoadingOverlay';
import { useToast } from '../components/Toast';
import { useLoading } from '../hooks/useLoading';
import { useI18n } from '../i18n';

function LoginPage() {
  const [phone, setPhone] = useState('0917-123-4567');
  const [password, setPassword] = useState('123456');
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const navigate = useNavigate();

  const login = () => {
    withLoading(async () => {
      try {
        await loginWithPassword(phone, password);
        navigate('/user/home');
      } catch (error) {
        showToast(t(error.message || 'Login failed'), 'error');
      }
    });
  };

  return (
    <div className="min-h-screen bg-userBg px-4 py-8">
      <LoadingOverlay show={loading} text={t('Signing in...')} />
      <div className="mx-auto w-full max-w-[420px]">
        <div className="mb-3 flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>
      <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-card">
        <div className="bg-gradient-to-br from-brand to-indigo-500 px-6 py-10 text-white">
          <p className="text-3xl font-black">Suki Rewards</p>
          <p className="mt-2 text-sm text-indigo-100">{t('Earn. Save. Enjoy.')}</p>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{t('Phone Number')}</label>
            <div className="flex items-center rounded-xl border border-slate-200 px-3">
              <span className="text-sm text-slate-400">+63</span>
              <input
                className="w-full rounded-xl border-0 px-2 py-3 text-sm outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="917-123-4567"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{t('Password')}</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('Enter password')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') login();
              }}
            />
          </div>

          <button className="w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white hover:brightness-105" onClick={login}>
            {t('Sign In')}
          </button>

          <p className="text-center text-xs text-slate-400">{t('Demo: 0917-123-4567 / 123456')}</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

