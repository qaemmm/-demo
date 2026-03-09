import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';

const tabs = [
  { to: '/user/home', label: 'Home' },
  { to: '/user/points', label: 'Points' },
  { to: '/user/coupons', label: 'Coupons' },
  { to: '/user/store', label: 'Store' },
  { to: '/user/profile', label: 'Profile' },
];

function TabBar() {
  const { t } = useI18n();

  return (
    <nav className="sticky bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur">
      <ul className="grid grid-cols-5">
        {tabs.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition ${
                  isActive ? 'text-brand' : 'text-slate-500'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={`inline-block h-1.5 w-1.5 rounded-full ${isActive ? 'bg-brand' : 'bg-slate-300'}`} />
                  {t(tab.label)}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TabBar;
