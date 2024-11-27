import { Label } from '@/components/ui/label';
import Lottie from 'lottie-react';

import character from '@/assets/lotties/character.json';

const LoginIllustration = () => {
  return (
    <section className="flex flex-col gap-10">
      <div>
        <Lottie
          animationData={character}
          className="max-w-[418px] max-h-[418px]"
        />
      </div>
      <div className="flex flex-col px-10 gap-2 justify-center items-center text-center">
        <Label className="text-4xl text-white">Welcome to Involt!</Label>
        <Label className="text-2xl text-white font-normal">
          Send & receive invoices worldwide
        </Label>
      </div>
    </section>
  );
};

export default LoginIllustration;
