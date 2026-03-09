import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockTiers } from '../../data/mockData';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

function AdminTiersPage() {
  const { showToast } = useToast();
  const { t } = useI18n();

  return (
    <section>
      <PageHeader title={t('Tier System')} subtitle={t('Read-only tier overview')} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {mockTiers.map((tier) => (
          <div key={tier.id} className="card p-4">
            <h3 className="text-lg font-bold text-slate-900">{t(tier.level)}</h3>
            <p className="text-sm text-slate-500">
              {tier.range} {t('pts')}
            </p>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {tier.benefits.map((benefit) => (
                <li key={benefit}>- {t(benefit)}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-500">{t('{members} members', { members: formatNumber(tier.members) })}</p>
            <button className="mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={() => showToast(t('Coming soon'))}>
              {t('Edit')}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminTiersPage;

