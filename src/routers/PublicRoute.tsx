import { useAuthStore } from '@/modules/Auth/state/auth';
import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isLogin } = useAuthStore();

  if (isLogin()) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default PublicRoute;
