import { useMemo, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import Modal from '../../components/Modal';
import { useToast } from '../../components/Toast';
import { mockStoreItems, mockUser } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

const categories = ['All', 'Vouchers', 'Gifts', 'Experience'];

function UserStorePage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [category, setCategory] = useState('All');
  const [points, setPoints] = useState(mockUser.points);
  const [selected, setSelected] = useState(null);

  const list = useMemo(
    () => (category === 'All' ? mockStoreItems : mockStoreItems.filter((item) => item.category === category)),
    [category]
  );

  const confirmRedeem = () => {
    withLoading(() => {
      setPoints((prev) => Math.max(prev - selected.pts, 0));
      setSelected(null);
      showToast(t('Redeemed successfully'));
    });
  };

  return (
    <section className="space-y-4">
      <LoadingOverlay show={loading} />
      <div className="card p-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">{t('Your Points')}</p>
        <p className="mt-1 text-2xl font-black text-slate-900">{formatNumber(points)}</p>
      </div>

      <div className="user-scroll flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              category === item ? 'bg-brand text-white' : 'bg-white text-slate-600'
            }`}
          >
            {t(item)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {list.map((item) => (
          <div key={item.id} className="card overflow-hidden p-3">
            <div className="mb-2 flex h-20 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-amber-100 text-2xl">
              {item.emoji}
            </div>
            <p className="text-sm font-semibold text-slate-800">{t(item.name)}</p>
            <p className="mt-1 text-xs text-slate-500">
              {formatNumber(item.pts)} {t('pts')}
            </p>
            <p className="text-xs text-slate-400">
              {t('Stock')}: {item.stock}
            </p>
            <button
              className="mt-2 w-full rounded-lg bg-brand px-2 py-2 text-xs font-semibold text-white disabled:opacity-50"
              disabled={item.pts > points}
              onClick={() => setSelected(item)}
            >
              {t('Redeem')}
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={Boolean(selected)}
        title={t('Confirm Redeem')}
        onClose={() => setSelected(null)}
        footer={
          <div className="flex gap-2">
            <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" onClick={() => setSelected(null)}>
              {t('Cancel')}
            </button>
            <button className="flex-1 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white" onClick={confirmRedeem}>
              {t('Confirm Redeem')}
            </button>
          </div>
        }
      >
        {selected ? (
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-800">{t(selected.name)}</p>
            <p>{t('Deduct points: {points}', { points: formatNumber(selected.pts) })}</p>
            <p>{t('Remaining: {points}', { points: formatNumber(Math.max(points - selected.pts, 0)) })}</p>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}

export default UserStorePage;
