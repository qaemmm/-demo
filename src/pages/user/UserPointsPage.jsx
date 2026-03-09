import { useEffect, useMemo, useState } from 'react';
import { getMemberSummary } from '../../api/client';
import CountUpNumber from '../../components/CountUpNumber';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useToast } from '../../components/Toast';
import { mockPointsHistory, mockTasks, mockUser } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';
import { formatPoints } from '../../utils/format';

function UserPointsPage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [points, setPoints] = useState(mockUser.points);
  const [tasks, setTasks] = useState(mockTasks);
  const [historyTab, setHistoryTab] = useState('earned');
  const [checkInDone, setCheckInDone] = useState([true, true, true, true, false, false, false]);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    getMemberSummary()
      .then((data) => setPoints(Number(data.points || 0)))
      .catch(() => showToast(t('Failed to load member data'), 'error'));
  }, [showToast, t]);

  const list = useMemo(
    () => mockPointsHistory.filter((item) => (historyTab === 'earned' ? item.type === 'earned' : item.type === 'used')),
    [historyTab]
  );

  const handleCheckIn = () => {
    if (checkInDone[4]) return;
    withLoading(() => {
      setCheckInDone((prev) => prev.map((v, idx) => (idx === 4 ? true : v)));
      setPoints((prev) => prev + 10);
      setBurst(true);
      setTimeout(() => setBurst(false), 800);
      showToast(t('{points} pts', { points: '+10' }));
    });
  };

  const completeTask = (id) => {
    withLoading(() => {
      setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: true } : task)));
      showToast(t('Task completed'));
    });
  };

  return (
    <section className="relative space-y-4">
      <LoadingOverlay show={loading} />

      <div className="card p-4">
        <p className="text-sm text-slate-500">{t('My Points')}</p>
        <p className="mt-1 text-3xl font-black text-slate-900">
          <CountUpNumber value={points} /> {t('pts')}
        </p>
        <p className="mt-1 text-sm text-slate-500">{t('≈ ₱{value} value', { value: Math.floor(points / 10) })}</p>
        <p className="mt-1 text-[13px] text-brand">{t('💰 2% cashback · Gold members earn 2x')}</p>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800">{t('Daily Check-in')}</p>
          {burst ? <span className="animate-rise text-sm font-bold text-emerald-600">{t('{points} pts', { points: '+10' })}</span> : null}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-1">
          {checkInDone.map((done, idx) => (
            <div
              key={idx}
              className={`flex h-9 items-center justify-center rounded-lg text-xs font-bold ${
                done ? 'bg-emerald-500 text-white' : idx === 4 ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              D{idx + 1}
            </div>
          ))}
        </div>
        <button className="mt-3 w-full rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white" onClick={handleCheckIn}>
          {t('Check In Today')}
        </button>
      </div>

      <div className="card p-4">
        <p className="text-sm font-bold text-slate-800">{t('Tasks')}</p>
        <div className="mt-2 space-y-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => (!task.done ? completeTask(task.id) : null)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm ${
                task.done ? 'bg-slate-100 text-slate-500' : 'bg-violet-50 text-slate-800'
              }`}
            >
              <span>{t(task.name)}</span>
              <span>{task.done ? t('Done') : `+${task.pts}`}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => setHistoryTab('earned')}
            className={`rounded-xl px-3 py-2 text-sm font-semibold ${
              historyTab === 'earned' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {t('Earned')}
          </button>
          <button
            onClick={() => setHistoryTab('used')}
            className={`rounded-xl px-3 py-2 text-sm font-semibold ${
              historyTab === 'used' ? 'bg-brand text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {t('Used')}
          </button>
        </div>
        <div className="space-y-2">
          {list.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm text-slate-700">{t(item.desc)}</p>
                <p className="text-xs text-slate-400">{item.date}</p>
              </div>
              <div className="text-right">
                <span className={`font-semibold ${item.pts > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatPoints(item.pts)}</span>
                {item.type === 'earned' && item.desc.includes('Purchase at') ? (
                  <span className="ml-1 text-xs text-slate-400">{t('(2% cashback)')}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserPointsPage;
