import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CountUpNumber from '../../components/CountUpNumber';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockDashboard } from '../../data/mockData';
import { useI18n } from '../../i18n';

const colors = ['#8B5CF6', '#6366F1', '#F59E0B', '#10B981'];

function KpiCard({ label, value, growth }) {
  return (
    <div className="card p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-900">
        <CountUpNumber value={value} />
      </p>
      <p className="mt-1 text-xs font-semibold text-emerald-600">{growth}</p>
    </div>
  );
}

function AdminDashboardPage() {
  const { showToast } = useToast();
  const { t } = useI18n();
  const { kpis, memberGrowth30d, tierDistribution, pointsIssuedVsConsumed, aiInsights } = mockDashboard;
  const tierData = tierDistribution.map((item) => ({ ...item, name: t(item.name) }));

  return (
    <section>
      <PageHeader title={t('Dashboard')} subtitle={t('Today: Mar 06, 2026')} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label={t('Total Members')} value={kpis.totalMembers.value} growth={kpis.totalMembers.growth} />
        <KpiCard label={t('Active Members')} value={kpis.activeMembers.value} growth={kpis.activeMembers.growth} />
        <KpiCard label={t('Pts Issued')} value={kpis.pointsIssued.value} growth={kpis.pointsIssued.growth} />
        <KpiCard label={t('Coupon Redeemed')} value={kpis.couponRedeemed.value} growth={kpis.couponRedeemed.growth} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-12">
        <div className="card col-span-12 p-4">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Member Growth (30d)')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memberGrowth30d}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="members" stroke="#6C3CE1" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card col-span-12 p-4 xl:col-span-4">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Tier Distribution')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={tierData} dataKey="value" nameKey="name" outerRadius={85} label>
                  {tierData.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card col-span-12 p-4 xl:col-span-8">
          <h3 className="mb-3 text-sm font-bold text-slate-800">{t('Points Issued vs Consumed')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pointsIssuedVsConsumed}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="issued" fill="#6C3CE1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="consumed" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt-4 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">{t('AI Insights')}</h3>
          <button
            className="rounded-lg bg-brand px-3 py-1.5 text-xs font-semibold text-white"
            onClick={() => showToast(t('Insights details coming soon'))}
          >
            {t('View Details')}
          </button>
        </div>
        <ul className="space-y-2 text-sm text-slate-600">
          {aiInsights.map((insight) => (
            <li key={insight} className="rounded-lg bg-violet-50 px-3 py-2">
              {t(insight)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default AdminDashboardPage;
