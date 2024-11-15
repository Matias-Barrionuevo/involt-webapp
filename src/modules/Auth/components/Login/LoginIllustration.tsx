import { Label } from '@/components/ui/label';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoginIllustration = () => {
  return (
    <section className="flex flex-col gap-10">
      <div>
        <DotLottieReact
          renderConfig={{ freezeOnOffscreen: true }}
          src="/lotties/test.json"
          loop
          autoplay
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
