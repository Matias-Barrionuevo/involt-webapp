import AuthLayout from '@/components/Layout/AuthLayout';
import LoginForm from '@/modules/Auth/components/Login/LoginForm';

const LoginPage = () => {
  return <AuthLayout authContent={<LoginForm />} />;
};

export default LoginPage;
