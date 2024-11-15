import AuthLayout from '@/components/Layout/AuthLayout';
import VerifyEmailForm from '@/modules/Auth/components/RecoverPassword/VerifyEmailForm';
import RegisterIllustration from '@/modules/Auth/components/Register/RegisterIllustration';

const VerifyEmailPage = () => {
  return (
    <AuthLayout
      authContent={<VerifyEmailForm />}
      illustration={<RegisterIllustration />}
    />
  );
};

export default VerifyEmailPage;
