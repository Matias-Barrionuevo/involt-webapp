import AuthLayout from '@/components/layout/AuthLayaout';
import { Action, Password } from '@/components/svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { VerifyEmailSchema } from '@/modules/Auth/schemas/verify-email.schema';
import { validateCode } from '@/modules/Auth/services/code.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { z } from 'zod';

const VerifyPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const form = useForm<z.infer<typeof VerifyEmailSchema>>({
    resolver: zodResolver(VerifyEmailSchema),
    defaultValues: {
      code: '',
      checkVerificationCodeMode: 'password-recovery',
      email,
    },
  });

  useEffect(() => {
    if (!email) {
      navigate('/auth/login');
    }
  }, [email]);

  const { mutate, isPending } = useCustomMutation(validateCode, {
    onSuccess: () =>
      navigate('/auth/set-password', { state: { ...form.getValues() } }),
  });

  const onSubmit = (data: z.infer<typeof VerifyEmailSchema>) => {
    mutate({
      ...data,
      email,
    });
  };

  const authContent = (
    <Form {...form}>
      <input hidden {...form.register('checkVerificationCodeMode')} />
      <input hidden {...form.register('email')} />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="space-y-2 sm:space-y-6 max-w-[448px] w-full">
          <CardHeader>
            <div className="flex justify-center py-2">
              <Action>
                <Password className="w-5 h-5 text-primary" />
              </Action>
            </div>
            <CardTitle className="text-center">Verify your email</CardTitle>
            <CardDescription className="text-center py-1">
              <Label>
                '{email}' we have received your request. Please check your email
                and enter the 4-digit code that we’ve sent to you
              </Label>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="grid w-full place-content-center gap-1 sm:gap-2">
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      {...field}
                      onComplete={form.handleSubmit(onSubmit)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                  <Button type="button" variant="ghost">
                    Resend code
                  </Button>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-center items-end py-2 p-4 sm:py-6">
            <Button isLoading={isPending} className="w-full h-12">
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );

  return <AuthLayout authContent={authContent} />;
};

export default VerifyPasswordPage;
