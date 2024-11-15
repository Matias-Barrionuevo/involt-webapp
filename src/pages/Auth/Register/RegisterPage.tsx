import AuthLayout from '@/components/Layout/AuthLayout';
import RegisterIllustration from '@/modules/Auth/components/Register/RegisterIllustration';
import RegisterManager from '@/modules/Auth/components/Register/RegisterManager';

const RegisterPage = () => {
  return (
    <AuthLayout
      authContent={<RegisterManager />}
      illustration={<RegisterIllustration />}
    />
  );
};

export default RegisterPage;
