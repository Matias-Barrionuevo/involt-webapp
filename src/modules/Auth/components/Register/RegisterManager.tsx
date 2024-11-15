import SetPasswordForm from '@/modules/Auth/components/RecoverPassword/SetPasswordForm';
import VerifyEmailForm from '@/modules/Auth/components/RecoverPassword/VerifyEmailForm';
import AccountForm from '@/modules/Auth/components/Register/AccountForm';
import CountryForm from '@/modules/Auth/components/Register/CountryForm';
import Feedback from '@/modules/Auth/components/Register/Feedback';
import {
  REGISTER_CURRENT_STEP,
  REGISTER_STEPS,
} from '@/modules/Auth/constants/register.form';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const RegisterManager = () => {
  const [params, setParams] = useSearchParams();
  const step = params.get('step');
  const [state, setState] = useState<{
    countryCode: string;
    currentStep?: string;
    emailDisabled?: boolean;
    lastName?: string;
    firstName?: string;
    kind: 'person' | 'company';
    code: string;
  }>({ kind: 'person', countryCode: '', code: '' });
  const { currentStep, ...formData } = state;
  const nextToStep = step ?? currentStep;

  const resetSteps = () => {
    setState((prevState) => ({
      ...prevState,
      currentStep: REGISTER_CURRENT_STEP.Default,
    }));
  };

  useEffect(() => {
    const initialState: { [key: string]: any } = {
      countryCode: '',
      email: '',
    };
    const paramsEntries = params.entries();
    for (const [key, value] of paramsEntries) {
      initialState[key] = value;
    }

    initialState.emailDisabled = Boolean(initialState.email);

    setState({ ...state, ...initialState });
  }, []);

  useEffect(() => {
    if (step == null) {
      resetSteps();
    } else {
      setState({ ...state, currentStep: step });
    }
  }, [step]);

  useEffect(() => {
    if (!currentStep) {
      resetSteps();
    }
  }, [currentStep]);

  useEffect(() => {
    if (state.emailDisabled) {
      setParams({ step: REGISTER_STEPS.ACCOUNT });
    }
  }, [state.emailDisabled]);

  const handleNext = (formData: { country: string; currentStep: string }) => {
    const nextStep = REGISTER_CURRENT_STEP[currentStep as string];
    if (nextStep) {
      setState({ ...state, ...formData, currentStep: nextStep });
      setParams({ step: nextStep });
    }
  };

  return (
    currentStep && (
      <>
        {nextToStep === REGISTER_STEPS.COUNTRY && (
          <CountryForm formData={formData} onSubmit={handleNext} />
        )}
        {nextToStep === REGISTER_STEPS.ACCOUNT && (
          <AccountForm formData={formData} onSubmit={handleNext} />
        )}
        {nextToStep === REGISTER_STEPS.VERIFY_EMAIL && (
          <VerifyEmailForm formData={formData} onSubmit={handleNext} />
        )}
        {nextToStep === REGISTER_STEPS.SET_PASSWORD && (
          <SetPasswordForm formData={formData} onSubmit={handleNext} />
        )}

        {nextToStep === REGISTER_STEPS.FEEDBACK && <Feedback />}
      </>
    )
  );
};

export default RegisterManager;
