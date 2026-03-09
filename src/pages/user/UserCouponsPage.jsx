import { useEffect, useMemo, useState } from 'react';
import { getCoupons, useCoupon } from '../../api/client';
import LoadingOverlay from '../../components/LoadingOverlay';
import Modal from '../../components/Modal';
import MockQr from '../../components/MockQr';
import { useToast } from '../../components/Toast';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';

function UserCouponsPage() {
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const [countdown, setCountdown] = useState(300);
  const [couponList, setCouponList] = useState([]);
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();

  useEffect(() => {
    let cancelled = false;
    getCoupons()
      .then((coupons) => {
        if (!cancelled) setCouponList(coupons);
      })
      .catch(() => {
        if (!cancelled) showToast(t('Failed to load coupons'), 'error');
      });
    return () => {
      cancelled = true;
    };
  }, [showToast, t]);

  useEffect(() => {
    if (!selected) return undefined;
    setCountdown(300);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [selected]);

  const filtered = useMemo(() => {
    return couponList.filter((coupon) => {
      if (tab === 'active') return !coupon.used;
      if (tab === 'used') return coupon.used;
      return true;
    });
  }, [couponList, tab]);

  const markUsed = () => {
    if (!selected) return;
    withLoading(async () => {
      try {
        await useCoupon(selected.id);
        setCouponList((prev) => prev.map((coupon) => (coupon.id === selected.id ? { ...coupon, used: true } : coupon)));
        setSelected(null);
        showToast(t('Coupon marked as used'));
      } catch (error) {
        showToast(t(error.message || 'Failed to update coupon'), 'error');
      }
    });
  };

  return (
    <section className="space-y-4">
      <LoadingOverlay show={loading} />
      <div className="grid grid-cols-3 gap-2">
        {['all', 'active', 'used'].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize ${
              tab === item ? 'bg-brand text-white' : 'bg-white text-slate-600'
            }`}
          >
            {t(item)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((coupon) => {
          const daysLeft = Math.ceil((new Date(coupon.expire) - new Date()) / 86400000);
          return (
            <div key={coupon.id} className={`card relative p-4 ${coupon.used ? 'opacity-60' : ''}`}>
              {coupon.tag === 'BIRTHDAY' ? (
                <span className="absolute left-3 top-3 rounded-full bg-[#F5A623] px-2 py-1 text-[10px] font-bold text-white">
                  {t('🎂 BIRTHDAY')}
                </span>
              ) : null}
              <div className="flex items-start justify-between">
                <div className={coupon.tag === 'BIRTHDAY' ? 'pt-6' : ''}>
                  <p className="text-base font-bold text-brand">{t(coupon.title)}</p>
                  <p className="mt-1 text-sm text-slate-500">{t(coupon.desc)}</p>
                  <p className={`mt-2 text-xs ${daysLeft <= 3 && !coupon.used ? 'text-rose-600' : 'text-slate-400'}`}>
                    {t('Expires')} {coupon.expire} {daysLeft <= 3 && !coupon.used ? `(${t('Expiring soon')})` : ''}
                  </p>
                </div>
                {coupon.used ? (
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-500">{t('Used')}</span>
                ) : (
                  <button className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white" onClick={() => setSelected(coupon)}>
                    {t('Use Now')}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        open={Boolean(selected)}
        title={t('Show this to cashier')}
        onClose={() => setSelected(null)}
        footer={
          <div className="flex gap-2">
            <button className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" onClick={() => setSelected(null)}>
              {t('Close')}
            </button>
            <button className="flex-1 rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white" onClick={markUsed}>
              {t('Mark Used')}
            </button>
          </div>
        }
      >
        {selected ? (
          <div className="text-center">
            <MockQr />
            <p className="mt-3 text-sm font-semibold text-slate-800">Code: SR-2026-{selected.id.slice(-3)}{selected.id.slice(0, 1)}</p>
            <p className="mt-1 text-xs text-slate-500">
              {t('Valid')} {Math.floor(countdown / 60)}:{String(countdown % 60).padStart(2, '0')}
            </p>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}

export default UserCouponsPage;

