import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login/LoginPage';

import PublicRoute from '@/routers/PublicRoute';
import ProtectedRoute from '@/routers/ProtectedRoute';
import HomePage from '@/pages/Home/HomePage';

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
