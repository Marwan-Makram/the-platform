import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUpPage from '@/pages/SignUpPage';

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
    element: (
      <div className="flex min-h-screen items-center justify-center bg-[#EAEBED]">
        <h2 className="text-xl font-bold">Login View (Next step)</h2>
      </div>
    ),
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
