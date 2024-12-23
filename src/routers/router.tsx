import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/Auth/Login/LoginPage';

import PublicRoute from '@/routers/PublicRoute';
import ProtectedRoute from '@/routers/ProtectedRoute';

import RegisterPage from '@/pages/Auth/Register/RegisterPage';
import RecoverPage from '@/pages/Auth/Recover/RecoverPage';
import InvoiceDetailPage from '@/pages/InvoiceDetail/InvoiceDetailPage';

import HomePage from '@/pages/Home/HomePage';
import InvoicesGeneratedPage from '@/pages/Invoices/InvoicesGeneratedPage';
import InvoicesReceivedPage from '@/pages/Invoices/InvoicesReceivedPage';
import ContactPage from '@/pages/Contact/ContactPage';
import AccountPage from '@/pages/Account/AccountPage';
import SettingPage from '@/pages/Setting/SettingPage';
import SetPasswordPage from '@/pages/Auth/SetPassword/SetPasswordPage';
import VerifyEmailPage from '@/pages/Auth/VerifyEmail/VerifyEmailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  // Public routes
  {
    path: '/auth/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/auth/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: '/auth/recover',
    element: (
      <PublicRoute>
        <RecoverPage />
      </PublicRoute>
    ),
  },
  {
    path: '/auth/verify-email',
    element: (
      <PublicRoute>
        <VerifyEmailPage />
      </PublicRoute>
    ),
  },
  {
    path: '/auth/set-password',
    element: (
      <PublicRoute>
        <SetPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: '/invoice-detail/:id',
    element: (
      <PublicRoute>
        <InvoiceDetailPage />
      </PublicRoute>
    ),
  },

  // Protected routes
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/invoices-generated',
    element: (
      <ProtectedRoute>
        <InvoicesGeneratedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/invoices-received',
    element: (
      <ProtectedRoute>
        <InvoicesReceivedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/contacts',
    element: (
      <ProtectedRoute>
        <ContactPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/accounts',
    element: (
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/settings',
    element: (
      <ProtectedRoute>
        <SettingPage />
      </ProtectedRoute>
    ),
  },
  // Catch-all route to redirect to a valid route
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]);

export default router;
