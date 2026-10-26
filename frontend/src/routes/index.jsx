import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpPage from '@/pages/SignUpPage';
import LoginPage from '@/pages/LoginPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import TwoFactorPage from '@/pages/TwoFactorPage';
import CompleteProfilePage from '@/pages/CompleteProfilePage';
import InterestsPage from '@/pages/InterestsPage';
import SuccessPage from '@/pages/SuccessPage';
import WelcomeBackPage from '@/pages/WelcomeBackPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import OverviewPage from '@/pages/dashboard/OverviewPage';
import ProfilePage from '@/pages/dashboard/ProfilePage';

const router = createBrowserRouter([
  { path: '/', element: <SignUpPage /> },
  { path: '/signup', element: <SignUpPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/2fa', element: <TwoFactorPage /> },
  { path: '/welcome-back', element: <WelcomeBackPage /> },
  { path: '/complete-profile', element: <CompleteProfilePage /> },
  { path: '/interests', element: <InterestsPage /> },
  { path: '/success', element: <SuccessPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <OverviewPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
