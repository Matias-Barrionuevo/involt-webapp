import AuthLayout from '@/components/Layout/AuthLayout';
import RecoverForm from '@/modules/Auth/components/RecoverPassword/RecoverForm';

const RecoverPage = () => {
  return <AuthLayout authContent={<RecoverForm />}></AuthLayout>;
};

export default RecoverPage;
