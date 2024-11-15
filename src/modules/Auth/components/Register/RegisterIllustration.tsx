import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
            <DotLottieReact
              src="/lotties/test.json"
              renderConfig={{ freezeOnOffscreen: true }}
              loop
              autoplay
            />
            <Label className="text-xl text-white">
              Send & receive invoices worldwide
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-10 items-center text-center px-6">
            <DotLottieReact
              renderConfig={{ freezeOnOffscreen: true }}
              src="/lotties/test2.json"
              loop
              autoplay
            />
            <Label className="text-xl text-white">
              Simplify international payments
            </Label>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="flex flex-col gap-10 items-center text-center px-6">
            <DotLottieReact
              renderConfig={{ freezeOnOffscreen: true }}
              src="/lotties/test.json"
              loop
              autoplay
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
