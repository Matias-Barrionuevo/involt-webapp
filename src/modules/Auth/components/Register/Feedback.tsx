import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useCountDown } from '@/hooks/useCountdown';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router';

const Feedback = () => {
  const navigate = useNavigate();
  const [countdown] = useCountDown({
    callbackOnFinish: () => navigate('/auth/login'),
  });

  return (
    <Card className="space-y-2 sm:space-y-6 sm:w-[448px] w-full flex flex-col">
      <CardContent className="space-y-2 sm:space-y-4 flex flex-col items-center gap-2">
        <DotLottieReact
          renderConfig={{ freezeOnOffscreen: true }}
          src="/lotties/test2.json"
          loop
          autoplay
        />
        <Label className="text-2xl font-bold text-center">
          Your account was created successfully
        </Label>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-center items-center py-2 p-4 sm:py-6">
        <Button className="w-full h-12">Log in</Button>
        <Label className="text-muted-foreground">
          Redirecting to log in {countdown as number}...
        </Label>
      </CardFooter>
    </Card>
  );
};

export default Feedback;
