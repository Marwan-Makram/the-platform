import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUpPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
