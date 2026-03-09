import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import PageHeader from '../../components/PageHeader';
import { mockReferralStats, mockReferralTrend30d } from '../../data/mockData';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

function StatCard({ label, value }) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function AdminReferralPage() {
  const { t } = useI18n();

  return (
    <section>
      <PageHeader title={t('Referral Tracking')} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t('Total Referrals')} value={formatNumber(mockReferralStats.totalReferrals)} />
        <StatCard label={t('This Month')} value={formatNumber(mockReferralStats.thisMonth)} />
        <StatCard label={t('Conv. Rate')} value={`${mockReferralStats.conversionRate}%`} />
        <StatCard label={t('Pts Rewarded')} value={formatNumber(mockReferralStats.pointsRewarded)} />
      </div>

      <div className="card mt-4 p-4">
        <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Daily Referrals (30d)')}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockReferralTrend30d}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line dataKey="referrals" stroke="#6C3CE1" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card mt-4 p-4">
        <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Top Referrers')}</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-2">{t('Rank')}</th>
                <th className="px-3 py-2">{t('Name')}</th>
                <th className="px-3 py-2">{t('Referred')}</th>
                <th className="px-3 py-2">{t('Pts Earned')}</th>
              </tr>
            </thead>
            <tbody>
              {mockReferralStats.topReferrers.map((item) => (
                <tr key={item.rank} className="border-b border-slate-100">
                  <td className="px-3 py-2 font-semibold">#{item.rank}</td>
                  <td className="px-3 py-2">{item.name}</td>
                  <td className="px-3 py-2">{formatNumber(item.referred)}</td>
                  <td className="px-3 py-2">{formatNumber(item.pointsEarned)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminReferralPage;

