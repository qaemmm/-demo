import { useNavigate } from 'react-router-dom';
import { mockUser } from '../../data/mockData';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

function UserChinesePage() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section className="space-y-4">
      <div className="card bg-gradient-to-br from-brand to-indigo-500 p-5 text-white">
        <p className="text-sm text-indigo-100">{t('Chinese Screen Preview')}</p>
        <h1 className="mt-1 text-2xl font-black">{t('Member Center')}</h1>
        <p className="mt-3 text-sm">{t('Hi, {name}!', { name: mockUser.name })}</p>
        <p className="mt-1 text-3xl font-black">{t('{points} pts', { points: formatNumber(mockUser.points) })}</p>
        <p className="mt-1 text-sm text-indigo-100">{t('{points} pts to Platinum', { points: mockUser.pointsToNext })}</p>
      </div>

      <div className="card p-4">
        <h2 className="text-sm font-bold text-slate-800">{t('Quick Actions')}</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <button className="rounded-xl bg-violet-50 px-3 py-2 text-slate-700" onClick={() => navigate('/user/points')}>
            {t('Points')}
          </button>
          <button className="rounded-xl bg-violet-50 px-3 py-2 text-slate-700" onClick={() => navigate('/user/coupons')}>
            {t('Coupons')}
          </button>
          <button className="rounded-xl bg-violet-50 px-3 py-2 text-slate-700" onClick={() => navigate('/user/store')}>
            {t('Store')}
          </button>
          <button className="rounded-xl bg-violet-50 px-3 py-2 text-slate-700" onClick={() => navigate('/user/refer')}>
            {t('Invite')}
          </button>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="text-sm font-bold text-slate-800">{t('Language Settings')}</h2>
        <p className="mt-2 text-sm text-slate-600">{t('You are viewing the Chinese screen. You can go back to the main home flow anytime.')}</p>
        <button className="mt-3 w-full rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white" onClick={() => navigate('/user/home')}>
          {t('Back to Home')}
        </button>
      </div>
    </section>
  );
}

export default UserChinesePage;
