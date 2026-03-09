import { useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockPushHistory } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';

function AdminPushPage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t, lang } = useI18n();
  const [history, setHistory] = useState(mockPushHistory);
  const [form, setForm] = useState({
    title: '',
    message: '',
    audience: 'all',
    tier: 'Gold',
    schedule: 'now',
    dateTime: '',
  });

  const sendMessage = () => {
    if (!form.title || !form.message) {
      showToast(t('Please fill title and message'), 'error');
      return;
    }

    withLoading(() => {
      const sent = form.audience === 'all' ? 12847 : form.audience === 'atrisk' ? 23 : 2569;
      setHistory((prev) => [
        {
          id: `PSH${String(prev.length + 1).padStart(3, '0')}`,
          title: form.title,
          sent,
          openRate: `${Math.floor(60 + Math.random() * 15)}%`,
          date: '03/06/2026',
        },
        ...prev,
      ]);
      setForm((prev) => ({ ...prev, title: '', message: '' }));
      showToast(t('Message sent'));
    });
  };

  return (
    <section>
      <LoadingOverlay show={loading} />
      <PageHeader title={t('Push Notifications')} />

      <div className="card p-4">
        <p className="mb-3 text-sm font-bold text-slate-800">{t('Compose Message')}</p>
        <div className="grid gap-3">
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Title')}
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          />
          <textarea
            className="h-24 rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Message')}
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
          />

          <div className="grid gap-2 rounded-xl bg-slate-50 p-3 text-sm">
            <p className="font-semibold text-slate-700">{t('Target Audience')}</p>
            <label className="flex items-center gap-2">
              <input type="radio" checked={form.audience === 'all'} onChange={() => setForm((prev) => ({ ...prev, audience: 'all' }))} />
              {t('All Members')}
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={form.audience === 'tier'} onChange={() => setForm((prev) => ({ ...prev, audience: 'tier' }))} />
              {t('By Tier')}
            </label>
            {form.audience === 'tier' ? (
              <select
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.tier}
                onChange={(e) => setForm((prev) => ({ ...prev, tier: e.target.value }))}
              >
                <option value="Gold">{t('Gold')}</option>
                <option value="Silver">{t('Silver')}</option>
                <option value="Bronze">{t('Bronze')}</option>
                <option value="Platinum">{t('Platinum')}</option>
              </select>
            ) : null}
            <label className="flex items-center gap-2">
              <input type="radio" checked={form.audience === 'atrisk'} onChange={() => setForm((prev) => ({ ...prev, audience: 'atrisk' }))} />
              {t('At-risk users')}
            </label>
          </div>

          <div className="grid gap-2 rounded-xl bg-slate-50 p-3 text-sm">
            <p className="font-semibold text-slate-700">{t('Schedule')}</p>
            <label className="flex items-center gap-2">
              <input type="radio" checked={form.schedule === 'now'} onChange={() => setForm((prev) => ({ ...prev, schedule: 'now' }))} />
              {t('Send Now')}
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={form.schedule === 'later'} onChange={() => setForm((prev) => ({ ...prev, schedule: 'later' }))} />
              {t('Schedule')}
            </label>
            {form.schedule === 'later' ? (
              <input
                type="datetime-local"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                value={form.dateTime}
                onChange={(e) => setForm((prev) => ({ ...prev, dateTime: e.target.value }))}
              />
            ) : null}
          </div>

          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={sendMessage}>
            {t('Send Message')}
          </button>
        </div>
      </div>

      <div className="card mt-4 p-4">
        <p className="mb-3 text-sm font-bold text-slate-800">{t('Recent Sends')}</p>
        <div className="space-y-2">
          {history.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <span className="font-medium text-slate-700">{t(item.title)}</span>
              <span>
                {item.sent.toLocaleString(lang === 'zh' ? 'zh-CN' : 'en-US')} {t('sent')}
              </span>
              <span>
                {item.openRate} {t('open')}
              </span>
              <span>{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminPushPage;

