import AuthLayout from '@/components/Layout/AuthLayout';
import SetPasswordForm from '@/modules/Auth/components/RecoverPassword/SetPasswordForm';

const SetPasswordPage = () => {
  return <AuthLayout authContent={<SetPasswordForm />}></AuthLayout>;
};

export default SetPasswordPage;
