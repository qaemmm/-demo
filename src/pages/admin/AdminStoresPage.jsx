import { Fragment, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockStores } from '../../data/mockData';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

function AdminStoresPage() {
  const { showToast } = useToast();
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(null);

  return (
    <section>
      <PageHeader
        title={t('Store Management')}
        right={
          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={() => showToast(t('Coming soon'))}>
            {t('+ Add Store')}
          </button>
        }
      />

      <div className="card overflow-hidden">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50">
            <tr className="text-slate-500">
              <th className="px-3 py-2">{t('Store')}</th>
              <th className="px-3 py-2">{t('Location')}</th>
              <th className="px-3 py-2">{t('Members')}</th>
              <th className="px-3 py-2">{t('Cashiers')}</th>
              <th className="px-3 py-2">{t('Status')}</th>
            </tr>
          </thead>
          <tbody>
            {mockStores.map((store) => (
              <Fragment key={store.id}>
                <tr className="cursor-pointer border-t border-slate-100 hover:bg-slate-50" onClick={() => setExpanded((prev) => (prev === store.id ? null : store.id))}>
                  <td className="px-3 py-2 font-medium text-slate-800">{store.name}</td>
                  <td className="px-3 py-2 text-slate-600">{store.location}</td>
                  <td className="px-3 py-2 text-slate-600">{formatNumber(store.members)}</td>
                  <td className="px-3 py-2 text-slate-600">{store.cashiers.length}</td>
                  <td className="px-3 py-2">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">{store.status}</span>
                  </td>
                </tr>

                {expanded === store.id ? (
                  <tr className="border-t border-slate-100 bg-slate-50">
                    <td className="px-3 py-3" colSpan={5}>
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                          <thead>
                            <tr className="text-slate-500">
                              <th className="px-2 py-1">{t('Cashier')}</th>
                              <th className="px-2 py-1">{t('Account')}</th>
                              <th className="px-2 py-1">{t('Last Active')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {store.cashiers.map((cashier) => (
                              <tr key={cashier.account} className="border-t border-slate-100">
                                <td className="px-2 py-1">{cashier.name}</td>
                                <td className="px-2 py-1">{cashier.account}</td>
                                <td className="px-2 py-1">{t(cashier.lastActive)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <button className="mt-3 rounded-lg border border-slate-200 px-3 py-1.5 text-xs" onClick={() => showToast(t('Coming soon'))}>
                        {t('+ Add Cashier')}
                      </button>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminStoresPage;

