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
        path: 'projects',
        element: <div className="text-sm font-semibold text-neutral-700">Projects View</div>,
      },
      {
        path: 'insights',
        element: <div className="text-sm font-semibold text-neutral-700">Insights View</div>,
      },
      {
        path: 'messages',
        element: <div className="text-sm font-semibold text-neutral-700">Messages View</div>,
      },
      {
        path: 'calendar',
        element: <div className="text-sm font-semibold text-neutral-700">Calendar View</div>,
      },
      {
        path: 'settings',
        element: <div className="text-sm font-semibold text-neutral-700">Settings View</div>,
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}