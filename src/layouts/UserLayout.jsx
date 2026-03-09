import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../api/client';
import LanguageSwitcher from '../components/LanguageSwitcher';
import LoadingOverlay from '../components/LoadingOverlay';
import TabBar from '../components/TabBar';

function UserLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setChecking(true);
    getCurrentUser()
      .then(() => {
        if (!cancelled) setChecking(false);
      })
      .catch(() => {
        if (!cancelled) {
          navigate('/login', { replace: true });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-userBg">
      <LoadingOverlay show={checking} />
      <div className="mx-auto min-h-screen w-full max-w-[430px] border-x border-slate-200 bg-userBg">
        <div className="flex justify-end px-4 pt-3">
          <LanguageSwitcher />
        </div>
        <main key={location.pathname} className="min-h-[calc(100vh-68px)] animate-fade-in px-4 pb-4 pt-2">
          <Outlet />
        </main>
        <TabBar />
      </div>
    </div>
  );
}

export default UserLayout;
