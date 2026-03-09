import { useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockPointsRules } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';

function AdminPointsRulesPage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [rules, setRules] = useState(mockPointsRules);

  const save = () => withLoading(() => showToast(t('Saved successfully')));

  return (
    <section>
      <LoadingOverlay show={loading} />
      <PageHeader
        title={t('Points Rules')}
        right={
          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={save}>
            {t('Save Changes')}
          </button>
        }
      />

      <div className="space-y-4">
        <div className="card p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Purchase Rules')}</h3>
          <div className="grid gap-2 md:grid-cols-3">
            <label className="text-sm text-slate-600">
              {t('Every ₱ spent')}
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={rules.purchase.spend}
                onChange={(e) => setRules((prev) => ({ ...prev, purchase: { ...prev.purchase, spend: Number(e.target.value) } }))}
              />
            </label>
            <label className="text-sm text-slate-600">
              {t('Points earned')}
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={rules.purchase.point}
                onChange={(e) => setRules((prev) => ({ ...prev, purchase: { ...prev.purchase, point: Number(e.target.value) } }))}
              />
            </label>
            <label className="text-sm text-slate-600">
              {t('Min purchase')}
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={rules.purchase.minPurchase}
                onChange={(e) => setRules((prev) => ({ ...prev, purchase: { ...prev.purchase, minPurchase: Number(e.target.value) } }))}
              />
            </label>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Check-in Rules')}</h3>
          <div className="grid gap-2 md:grid-cols-4">
            {[
              ['daily', 'Daily'],
              ['streak3', '3-day'],
              ['streak7', '7-day'],
              ['streak30', '30-day'],
            ].map(([key, label]) => (
              <label key={key} className="text-sm text-slate-600">
                {t(label)}
                <input
                  type="number"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                  value={rules.checkIn[key]}
                  onChange={(e) => setRules((prev) => ({ ...prev, checkIn: { ...prev.checkIn, [key]: Number(e.target.value) } }))}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Task Rules')}</h3>
          <div className="space-y-2">
            {rules.tasks.map((task) => (
              <div key={task.id} className="grid gap-2 rounded-xl bg-slate-50 p-3 md:grid-cols-[1fr_120px_120px]">
                <input
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={task.name}
                  onChange={(e) =>
                    setRules((prev) => ({
                      ...prev,
                      tasks: prev.tasks.map((item) => (item.id === task.id ? { ...item, name: e.target.value } : item)),
                    }))
                  }
                />
                <input
                  type="number"
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  value={task.points}
                  onChange={(e) =>
                    setRules((prev) => ({
                      ...prev,
                      tasks: prev.tasks.map((item) => (item.id === task.id ? { ...item, points: Number(e.target.value) } : item)),
                    }))
                  }
                />
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={task.active}
                    onChange={(e) =>
                      setRules((prev) => ({
                        ...prev,
                        tasks: prev.tasks.map((item) => (item.id === task.id ? { ...item, active: e.target.checked } : item)),
                      }))
                    }
                  />
                  {t('Active')}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Special Events')}</h3>
          <div className="grid gap-2 md:grid-cols-2">
            <label className="text-sm text-slate-600">
              {t('Birthday bonus')}
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={rules.events.birthday}
                onChange={(e) => setRules((prev) => ({ ...prev, events: { ...prev.events, birthday: Number(e.target.value) } }))}
              />
            </label>
            <label className="text-sm text-slate-600">
              {t('Anniversary bonus')}
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
                value={rules.events.anniversary}
                onChange={(e) => setRules((prev) => ({ ...prev, events: { ...prev.events, anniversary: Number(e.target.value) } }))}
              />
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPointsRulesPage;

