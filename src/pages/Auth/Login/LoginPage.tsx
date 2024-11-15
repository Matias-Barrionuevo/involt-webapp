import AuthLayout from '@/components/Layout/AuthLayout';
import LoginForm from '@/modules/Auth/components/Login/LoginForm';
import LoginIllustration from '@/modules/Auth/components/Login/LoginIllustration';

const LoginPage = () => {
  return (
    <AuthLayout
      authContent={<LoginForm />}
      illustration={<LoginIllustration />}
    />
  );
};

export default LoginPage;
