import { useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import { useToast } from '../../components/Toast';
import { mockReferral } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';

function UserReferPage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [friends] = useState(mockReferral.friends);

  const fakeShare = (channel) => {
    withLoading(() => showToast(t('Shared via {channel}', { channel: t(channel) })));
  };

  const copyCode = async () => {
    await withLoading(async () => {
      try {
        await navigator.clipboard.writeText(mockReferral.code);
      } catch {
        // ignore clipboard error in restricted browser contexts
      }
      showToast(t('Copied!'));
    });
  };

  return (
    <section className="space-y-4">
      <LoadingOverlay show={loading} />

      <div className="card bg-gradient-to-br from-brand to-indigo-500 p-4 text-white">
        <p className="text-sm font-medium text-indigo-100">{t('Refer & Earn')}</p>
        <p className="mt-2 text-xl font-black">{t('You get +100 pts')}</p>
        <p className="text-sm">{t('Friend gets +50 pts')}</p>
      </div>

      <div className="card p-4">
        <p className="text-sm text-slate-500">{t('Your Invite Code')}</p>
        <div className="mt-2 flex items-center justify-between rounded-xl border border-dashed border-brand/50 bg-violet-50 px-3 py-3">
          <p className="text-lg font-black tracking-wide text-brand">{mockReferral.code}</p>
          <button className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white" onClick={copyCode}>
            {t('Copy')}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-2">
          <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm" onClick={() => fakeShare('Facebook')}>
            {t('Share via Facebook')}
          </button>
          <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm" onClick={() => fakeShare('WhatsApp')}>
            {t('Share via WhatsApp')}
          </button>
          <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm" onClick={() => fakeShare('Poster')}>
            {t('Generate Share Poster')}
          </button>
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-bold text-slate-800">{t('Your Referrals')}</p>
          <p className="text-xs text-slate-400">
            {t('Total')}: {mockReferral.totalReferred}
          </p>
        </div>
        <div className="space-y-2">
          {friends.map((friend) => (
            <div key={`${friend.name}-${friend.date}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
              <div>
                <p className="text-sm text-slate-700">{friend.name}</p>
                <p className="text-xs text-slate-400">{friend.date}</p>
              </div>
              <span className={`text-xs font-semibold ${friend.status === 'joined' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {t(friend.status)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserReferPage;
