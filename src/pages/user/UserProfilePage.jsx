import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMemberSummary, logout } from '../../api/client';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useToast } from '../../components/Toast';
import { mockUser } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

const isDemoBypass = String(import.meta.env.VITE_DEMO_AUTH_BYPASS || '')
  .trim()
  .toLowerCase() === 'true';

function UserProfilePage() {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const { showToast } = useToast();
  const { loading, withLoading } = useLoading();
  const [summary, setSummary] = useState({
    name: mockUser.name,
    phone: mockUser.phone,
    tier: mockUser.level,
    points: mockUser.points,
    birthday: mockUser.birthday,
  });

  useEffect(() => {
    getMemberSummary()
      .then((data) => setSummary((prev) => ({ ...prev, ...data })))
      .catch(() => showToast(t('Failed to load member data'), 'error'));
  }, [showToast, t]);

  const [month, day] = String(summary.birthday || '').split('/');
  const birthdayDisplay =
    lang === 'zh'
      ? `${Number(month)}\u6708${Number(day)}\u65e5`
      : `${new Date(2026, Number(month || 1) - 1, 1).toLocaleString('en-US', { month: 'long' })} ${Number(day || 1)}`;

  const signOut = () => {
    if (isDemoBypass) {
      showToast(t('Demo mode: direct access enabled'));
      navigate('/user/home', { replace: true });
      return;
    }
    withLoading(async () => {
      try {
        await logout();
        navigate('/login', { replace: true });
      } catch {
        showToast(t('Logout failed'), 'error');
      }
    });
  };

  return (
    <section className="space-y-4">
      <LoadingOverlay show={loading} />
      <div className="card p-4">
        <h2 className="text-lg font-bold text-slate-900">{t('Profile')}</h2>
        <p className="mt-2 text-sm text-slate-600">{summary.name}</p>
        <p className="text-sm text-slate-500">{summary.phone}</p>
        <p className="mt-1 text-sm text-slate-500">{t('Birthday: {date}', { date: birthdayDisplay })}</p>
      </div>
      <div className="card p-4">
        <p className="text-sm text-slate-500">{t('Tier')}</p>
        <p className="text-xl font-bold text-brand">{t(summary.tier)}</p>
        <p className="mt-2 text-sm text-slate-500">{t('Current Points')}</p>
        <p className="text-xl font-bold text-slate-900">{formatNumber(summary.points)}</p>
      </div>

      <div className="card p-4">
        <p className="text-sm text-slate-500">{t('Language')}</p>
        <p className="text-sm text-slate-700">{t('Need a Chinese UI view for demos?')}</p>
        <button
          className="mt-3 w-full rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white"
          onClick={() => navigate('/user/chinese')}
        >
          {t('Open Chinese Screen')}
        </button>
      </div>

      <button className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700" onClick={signOut}>
        {t(isDemoBypass ? 'Back to Home' : 'Sign Out')}
      </button>
    </section>
  );
}

export default UserProfilePage;
