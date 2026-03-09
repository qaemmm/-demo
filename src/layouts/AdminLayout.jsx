import { Outlet, useLocation } from 'react-router-dom';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Sidebar from '../components/Sidebar';

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="min-w-0 flex-1 p-6">
        <div className="mb-4 flex justify-end">
          <LanguageSwitcher />
        </div>
        <div key={location.pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
