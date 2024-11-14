import AuthLayout from '@/components/Layout/AuthLayout';
import VerifyPasswordForm from '@/modules/Auth/components/RecoverPassword/VerifyPasswordForm';

const VerifyPasswordPage = () => {
  return <AuthLayout authContent={<VerifyPasswordForm />} />;
};

export default VerifyPasswordPage;
