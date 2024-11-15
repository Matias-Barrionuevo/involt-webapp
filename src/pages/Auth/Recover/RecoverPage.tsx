import AuthLayout from '@/components/Layout/AuthLayout';
import RecoverForm from '@/modules/Auth/components/RecoverPassword/RecoverForm';
import RegisterIllustration from '@/modules/Auth/components/Register/RegisterIllustration';

const RecoverPage = () => {
  return (
    <AuthLayout
      authContent={<RecoverForm />}
      illustration={<RegisterIllustration />}
    />
  );
};

export default RecoverPage;
