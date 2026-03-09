import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';

const links = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/members', label: 'Members' },
  { to: '/admin/tiers', label: 'Tier System' },
  { to: '/admin/points-rules', label: 'Points Rules' },
  { to: '/admin/campaigns', label: 'Campaigns' },
  { to: '/admin/push', label: 'Push Notify' },
  { to: '/admin/referral', label: 'Referral Track' },
  { to: '/admin/stores', label: 'Store Mgmt' },
];

function Sidebar() {
  const { t } = useI18n();

  return (
    <aside className="h-screen w-60 flex-shrink-0 border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <p className="text-xl font-bold text-brand">{t('Suki Admin')}</p>
        <select className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" defaultValue="SuperMart BGC">
          <option>{t('SuperMart BGC')}</option>
          <option>{t('SuperMart MOA')}</option>
          <option>{t('SuperMart QC')}</option>
        </select>
      </div>
      <nav className="p-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `mb-1 block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            {t(link.label)}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto border-t border-slate-200 p-4 text-xs text-slate-500">{t('Admin Profile')}</div>
    </aside>
  );
}

export default Sidebar;
