import { useMemo, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import Modal from '../../components/Modal';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockCampaigns } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';
import { formatCurrency } from '../../utils/format';

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  scheduled: 'bg-amber-100 text-amber-700',
  ended: 'bg-slate-200 text-slate-600',
};

function AdminCampaignsPage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [tab, setTab] = useState('all');
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    type: 'Coupon',
    coupon: '20% OFF',
    target: 'Gold+',
    start: '2026-03-15',
    end: '2026-03-31',
    budget: 3000,
  });

  const list = useMemo(() => {
    if (tab === 'all') return campaigns;
    return campaigns.filter((item) => item.status === tab);
  }, [campaigns, tab]);

  const createCampaign = () => {
    withLoading(() => {
      setCampaigns((prev) => [
        {
          id: `CMP${String(prev.length + 1).padStart(3, '0')}`,
          name: form.name || 'Untitled Campaign',
          status: 'scheduled',
          period: `${form.start} - ${form.end}`,
          target: form.target,
          claimed: 0,
          budget: Number(form.budget || 0),
        },
        ...prev,
      ]);
      setCreateOpen(false);
      showToast(t('Campaign created'));
    });
  };

  const action = (label) => withLoading(() => showToast(t('{label} done', { label: t(label) })));

  return (
    <section>
      <LoadingOverlay show={loading} />
      <PageHeader
        title={t('Campaigns')}
        right={
          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={() => setCreateOpen(true)}>
            {t('+ New Campaign')}
          </button>
        }
      />

      <div className="mb-4 flex gap-2">
        {['all', 'active', 'scheduled', 'ended'].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              tab === item ? 'bg-brand text-white' : 'bg-white text-slate-600'
            }`}
          >
            {t(item)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((campaign) => (
          <div key={campaign.id} className="card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[campaign.status]}`}>{t(campaign.status)}</span>
                <p className="mt-2 text-lg font-semibold text-slate-900">{t(campaign.name)}</p>
                <p className="text-sm text-slate-500">
                  {campaign.period} - {t(campaign.target)}
                </p>
                <p className="text-sm text-slate-500">
                  {t('Claimed: {claimed} - Budget: {budget}', {
                    claimed: campaign.claimed,
                    budget: formatCurrency(campaign.budget),
                  })}
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs" onClick={() => action('Edit')}>
                  {t('Edit')}
                </button>
                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs" onClick={() => action('Pause/Cancel')}>
                  {t('Pause/Cancel')}
                </button>
                <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs" onClick={() => action('Stats')}>
                  {t('Stats')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={createOpen}
        title={t('Create Campaign')}
        onClose={() => setCreateOpen(false)}
        footer={
          <div className="flex gap-2">
            <button className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => setCreateOpen(false)}>
              {t('Cancel')}
            </button>
            <button className="flex-1 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white" onClick={createCampaign}>
              {t('Create')}
            </button>
          </div>
        }
      >
        <div className="grid gap-2">
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Campaign name')}
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Type')}
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
          />
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Coupon')}
            value={form.coupon}
            onChange={(e) => setForm((prev) => ({ ...prev, coupon: e.target.value }))}
          />
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Target')}
            value={form.target}
            onChange={(e) => setForm((prev) => ({ ...prev, target: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.start}
              onChange={(e) => setForm((prev) => ({ ...prev, start: e.target.value }))}
            />
            <input
              type="date"
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
              value={form.end}
              onChange={(e) => setForm((prev) => ({ ...prev, end: e.target.value }))}
            />
          </div>
          <input
            type="number"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Budget')}
            value={form.budget}
            onChange={(e) => setForm((prev) => ({ ...prev, budget: e.target.value }))}
          />
        </div>
      </Modal>
    </section>
  );
}

export default AdminCampaignsPage;

