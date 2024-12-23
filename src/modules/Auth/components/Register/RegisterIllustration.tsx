import Lottie from 'lottie-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';

import OnBoarding1 from '@/assets/lotties/onboarding-01.json';
import OnBoarding2 from '@/assets/lotties/onboarding-02.json';
import OnBoarding3 from '@/assets/lotties/onboarding-03.json';

const RegisterIllustration = () => {
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 4000 })]}
      className="flex flex-col gap-10"
    >
      <CarouselContent>
        <CarouselItem>
          <div className="flex flex-col gap-10 items-center text-center px-6">
            <Lottie
              animationData={OnBoarding1}
              className="max-w-[418px] max-h-[418px]"
            />
            <Label className="text-xl text-white">
              Send & receive invoices worldwide
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-10 items-center text-center px-6">
            <Lottie
              animationData={OnBoarding2}
              className="max-w-[418px] max-h-[418px]"
            />
            <Label className="text-xl text-white">
              Simplify international payments
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-10 items-center text-center px-6">
            <Lottie
              animationData={OnBoarding3}
              className="max-w-[418px] max-h-[418px]"
            />
            <Label className="text-xl text-white">
              Receive payments instantly from anywhere in the world
            </Label>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default RegisterIllustration;
