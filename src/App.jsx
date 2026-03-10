import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import UserHomePage from './pages/user/UserHomePage';
import UserPointsPage from './pages/user/UserPointsPage';
import UserCouponsPage from './pages/user/UserCouponsPage';
import UserStorePage from './pages/user/UserStorePage';
import UserReferPage from './pages/user/UserReferPage';
import UserProfilePage from './pages/user/UserProfilePage';
import UserChinesePage from './pages/user/UserChinesePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminMembersPage from './pages/admin/AdminMembersPage';
import AdminCampaignsPage from './pages/admin/AdminCampaignsPage';
import AdminPushPage from './pages/admin/AdminPushPage';
import AdminReferralPage from './pages/admin/AdminReferralPage';
import AdminTiersPage from './pages/admin/AdminTiersPage';
import AdminPointsRulesPage from './pages/admin/AdminPointsRulesPage';
import AdminStoresPage from './pages/admin/AdminStoresPage';

function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/user/home" replace />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<UserHomePage />} />
          <Route path="points" element={<UserPointsPage />} />
          <Route path="coupons" element={<UserCouponsPage />} />
          <Route path="store" element={<UserStorePage />} />
          <Route path="refer" element={<UserReferPage />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="chinese" element={<UserChinesePage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="members" element={<AdminMembersPage />} />
          <Route path="campaigns" element={<AdminCampaignsPage />} />
          <Route path="push" element={<AdminPushPage />} />
          <Route path="referral" element={<AdminReferralPage />} />
          <Route path="tiers" element={<AdminTiersPage />} />
          <Route path="points-rules" element={<AdminPointsRulesPage />} />
          <Route path="stores" element={<AdminStoresPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/user/home" replace />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
