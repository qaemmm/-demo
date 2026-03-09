import { useMemo, useState } from 'react';
import LoadingOverlay from '../../components/LoadingOverlay';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../components/Toast';
import { mockMembers } from '../../data/mockData';
import { useLoading } from '../../hooks/useLoading';
import { useI18n } from '../../i18n';
import { formatNumber } from '../../utils/format';

function AdminMembersPage() {
  const { loading, withLoading } = useLoading();
  const { showToast } = useToast();
  const { t } = useI18n();
  const [members, setMembers] = useState(mockMembers);
  const [search, setSearch] = useState('');
  const [tier, setTier] = useState('All');
  const [status, setStatus] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [adjustPoints, setAdjustPoints] = useState(0);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');

  const selectedMember = members.find((member) => member.id === selectedId);

  const filtered = useMemo(() => {
    return members.filter((member) => {
      const text = `${member.name} ${member.phone}`.toLowerCase();
      const matchSearch = text.includes(search.toLowerCase());
      const matchTier = tier === 'All' || member.tier === tier;
      const matchStatus = status === 'All' || member.status === status;
      return matchSearch && matchTier && matchStatus;
    });
  }, [members, search, tier, status]);

  const openDrawer = (member) => {
    setSelectedId(member.id);
    setAdjustPoints(0);
    setNotes(member.notes || '');
    setTagInput('');
  };

  const addTag = () => {
    if (!tagInput.trim() || !selectedMember) return;
    setMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id && !member.tags.includes(tagInput.trim())
          ? { ...member, tags: [...member.tags, tagInput.trim()] }
          : member
      )
    );
    setTagInput('');
  };

  const saveChanges = () => {
    if (!selectedMember) return;
    withLoading(() => {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === selectedMember.id
            ? {
                ...member,
                points: member.points + Number(adjustPoints || 0),
                notes,
              }
            : member
        )
      );
      setAdjustPoints(0);
      showToast(t('Member updated'));
    });
  };

  return (
    <section className="relative">
      <LoadingOverlay show={loading} />
      <PageHeader
        title={`${t('Members')} (${formatNumber(members.length)})`}
        right={
          <button className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={() => showToast(t('Coming soon'))}>
            {t('+ Add Member')}
          </button>
        }
      />

      <div className="card p-4">
        <div className="mb-4 grid gap-2 md:grid-cols-4">
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            placeholder={t('Search name/phone')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="All">{t('All')}</option>
            <option value="Bronze">{t('Bronze')}</option>
            <option value="Silver">{t('Silver')}</option>
            <option value="Gold">{t('Gold')}</option>
            <option value="Platinum">{t('Platinum')}</option>
          </select>
          <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="All">{t('All')}</option>
            <option value="Active">{t('Active')}</option>
            <option value="Paused">{t('Paused')}</option>
          </select>
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold" onClick={() => showToast(t('Exported (mock)'))}>
            {t('Export')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-2">{t('Name')}</th>
                <th className="px-3 py-2">{t('Phone')}</th>
                <th className="px-3 py-2">{t('Tier')}</th>
                <th className="px-3 py-2">{t('Points')}</th>
                <th className="px-3 py-2">{t('Joined')}</th>
                <th className="px-3 py-2">{t('Status')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((member) => (
                <tr key={member.id} className="cursor-pointer border-b border-slate-100 hover:bg-slate-50" onClick={() => openDrawer(member)}>
                  <td className="px-3 py-2 font-medium text-slate-800">{member.name}</td>
                  <td className="px-3 py-2 text-slate-600">{member.phone}</td>
                  <td className="px-3 py-2 text-slate-600">{t(member.tier)}</td>
                  <td className="px-3 py-2 text-slate-600">{formatNumber(member.points)}</td>
                  <td className="px-3 py-2 text-slate-600">{member.joined}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        member.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {t(member.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedMember ? (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md animate-slide-up border-l border-slate-200 bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{selectedMember.name}</h3>
              <p className="text-sm text-slate-500">{selectedMember.phone}</p>
              <p className="mt-1 text-sm text-slate-600">
                {t('{tier} - {points} pts', {
                  tier: t(selectedMember.tier),
                  points: formatNumber(selectedMember.points),
                })}
              </p>
            </div>
            <button className="rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100" onClick={() => setSelectedId(null)}>
              x
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-sm font-semibold text-slate-700">{t('Adjust Points')}</p>
              <input
                className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                type="number"
                value={adjustPoints}
                onChange={(e) => setAdjustPoints(Number(e.target.value))}
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">{t('Tags')}</p>
              <div className="mb-2 flex flex-wrap gap-2">
                {selectedMember.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-violet-100 px-2 py-1 text-xs font-semibold text-violet-700">
                    {t(tag)}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  placeholder={t('Add tag')}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                />
                <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm" onClick={addTag}>
                  {t('Add')}
                </button>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">{t('Notes')}</p>
              <textarea className="h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">{t('Activity History')}</p>
              <ul className="space-y-2">
                {selectedMember.activity.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    {t(item)}
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white" onClick={saveChanges}>
              {t('Save')}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default AdminMembersPage;

