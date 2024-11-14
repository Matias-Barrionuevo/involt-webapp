import { useAuthStore } from '@/modules/Auth/state/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLogin } = useAuthStore();

  if (!isLogin()) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
