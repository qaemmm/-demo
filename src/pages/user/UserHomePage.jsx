import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { claimBirthdayReward, getCoupons, getMemberSummary } from '../../api/client';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useToast } from '../../components/Toast';
import { mockNotifications, mockPointsHistory, mockTasks, mockUser } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';
import { formatNumber, formatPoints } from '../../utils/format';

const shortcutRoutes = [
  { label: 'Points', to: '/user/points' },
  { label: 'Coupons', to: '/user/coupons' },
  { label: 'Store', to: '/user/store' },
  { label: 'Invite', to: '/user/refer' },
];

function UserHomePage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loading, withLoading } = useLoading();
  const { t } = useI18n();
  const [summary, setSummary] = useState({
    name: mockUser.name,
    tier: mockUser.level,
    points: mockUser.points,
    birthday: mockUser.birthday,
    birthdayRewardClaimed: mockUser.birthdayRewardClaimed,
  });
  const [tasks, setTasks] = useState(mockTasks.slice(0, 3));
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const offers = useMemo(() => coupons.filter((coupon) => !coupon.used).slice(0, 3), [coupons]);
  const isBirthdayMonth = useMemo(() => {
    const birthdayMonth = Number(String(summary.birthday).split('/')[0]);
    const nowMonth = new Date().getMonth() + 1;
    return birthdayMonth === nowMonth;
  }, [summary.birthday]);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getMemberSummary(), getCoupons()])
      .then(([member, wallet]) => {
        if (cancelled) return;
        setSummary((prev) => ({ ...prev, ...member }));
        setCoupons(wallet);
      })
      .catch(() => {
        if (!cancelled) showToast(t('Failed to load member data'), 'error');
      });
    return () => {
      cancelled = true;
    };
  }, [showToast, t]);

  const completeTask = (taskId) => {
    withLoading(() => {
      setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, done: true } : task)));
      showToast(t('Task completed + points added'));
    });
  };

  const claimBirthday = () => {
    if (summary.birthdayRewardClaimed) return;
    withLoading(
      async () => {
        try {
          const result = await claimBirthdayReward();
          setSummary((prev) => ({
            ...prev,
            points: result.points,
            birthdayRewardClaimed: true,
          }));
          const wallet = await getCoupons();
          setCoupons(wallet);
          showToast(result.added ? t('✅ 200 pts added + Birthday coupon unlocked!') : t('Birthday reward already claimed'));
        } catch (error) {
          showToast(t(error.message || 'Failed to claim birthday reward'), 'error');
        }
      },
      { min: 1500, max: 1500 }
    );
  };

  return (
    <section className="space-y-4 pb-2">
      <LoadingOverlay show={loading} />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{t('Welcome back')}</p>
          <h1 className="text-xl font-bold text-slate-900">{t('Hi, {name}!', { name: summary.name || mockUser.name })}</h1>
        </div>
        <button
          className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          onClick={() => setNotificationOpen((prev) => !prev)}
        >
          {t('Bell')}
          <span className="absolute -right-2 -top-2 rounded-full bg-rose-500 px-1.5 text-[10px] text-white">3</span>
        </button>

        {notificationOpen ? (
          <div className="absolute right-0 top-12 z-40 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
            <p className="mb-2 text-xs font-semibold uppercase text-slate-400">{t('Notifications')}</p>
            <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
              {mockNotifications.map((item) => (
                <div key={item.id} className="rounded-lg bg-slate-50 p-2">
                  <p className="text-sm font-medium text-slate-800">{t(item.title)}</p>
                  <p className="text-xs text-slate-500">{t(item.message || item.body)}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{t(item.time)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand via-indigo-500 to-amber-400 p-5 text-white shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-100">{t(summary.tier === 'Gold' ? 'Gold Member' : summary.tier)}</p>
        <p className="mt-2 text-lg font-bold">{summary.name || mockUser.name}</p>
        <p className="text-sm text-indigo-100">{t('Card: **** {cardNo}', { cardNo: mockUser.cardNo })}</p>
        <p className="mt-4 text-3xl font-black number-tabular">{t('{points} pts', { points: formatNumber(summary.points) })}</p>
        <p className="mt-1 text-xs text-white/70">{t('Earn 2% cashback on every purchase')}</p>
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-white/30">
            <div className="h-full w-3/4 rounded-full bg-white" />
          </div>
          <p className="mt-1 text-xs text-indigo-100">{t('{points} pts to Platinum', { points: mockUser.pointsToNext })}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {shortcutRoutes.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.to)}
            className="rounded-xl bg-white p-3 text-center text-xs font-semibold text-slate-700 shadow-sm"
          >
            {item.label === 'Points' ? t('Points & Cashback') : t(item.label)}
          </button>
        ))}
      </div>

      {isBirthdayMonth ? (
        <div className="rounded-2xl bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] p-5 shadow-sm">
          <p className="text-lg font-bold text-amber-900">{t('🎂 Happy Birthday, Maria!')}</p>
          {!summary.birthdayRewardClaimed ? (
            <>
              <p className="mt-1 text-sm text-amber-900">{t('Claim your 200 pts bonus')}</p>
              <p className="text-sm text-amber-900">{t('+ a FREE Birthday Treat coupon')}</p>
              <button className="mt-4 rounded-xl bg-[#F5A623] px-4 py-2 text-sm font-semibold text-white" onClick={claimBirthday}>
                {t('Claim Now 🎁')}
              </button>
            </>
          ) : (
            <p className="mt-2 text-sm font-semibold text-emerald-700">{t('🎉 Birthday bonus claimed! +200 pts')}</p>
          )}
        </div>
      ) : null}

      <div className="card p-4">
        <h2 className="text-sm font-bold text-slate-800">{t('Today Tasks')}</h2>
        <div className="mt-3 space-y-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => (!task.done ? completeTask(task.id) : null)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                task.done ? 'bg-slate-100 text-slate-500' : 'bg-violet-50 text-slate-800'
              }`}
            >
              <span>{t(task.name)}</span>
              <span className="font-semibold">{task.done ? t('Done') : t('Go')}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">{t('Exclusive Offers')}</h2>
        </div>
        <div className="user-scroll flex gap-3 overflow-x-auto pb-1">
          {offers.map((coupon) => (
            <div key={coupon.id} className="min-w-[220px] rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-brand">{t(coupon.title)}</p>
              <p className="mt-1 text-xs text-slate-500">{t(coupon.desc)}</p>
              <p className="mt-2 text-xs text-slate-400">
                {t('Expires')} {coupon.expire}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <h2 className="text-sm font-bold text-slate-800">{t('Recent Activity')}</h2>
        <div className="mt-2 space-y-2">
          {mockPointsHistory.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm text-slate-700">{t(item.desc)}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
              <span className={`text-sm font-semibold ${item.pts > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {formatPoints(item.pts)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserHomePage;

