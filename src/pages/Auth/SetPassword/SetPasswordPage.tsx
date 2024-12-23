import AuthLayout from '@/components/Layout/AuthLayout';
import SetPasswordForm from '@/modules/Auth/components/RecoverPassword/SetPasswordForm';
import RegisterIllustration from '@/modules/Auth/components/Register/RegisterIllustration';

const SetPasswordPage = () => {
  return (
    <AuthLayout
      authContent={<SetPasswordForm />}
      illustration={<RegisterIllustration />}
    />
  );
};

export default SetPasswordPage;
