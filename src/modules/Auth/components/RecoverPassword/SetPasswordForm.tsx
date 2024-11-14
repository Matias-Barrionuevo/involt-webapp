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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/components/ui/password-input';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { setPasswordSchema } from '@/modules/Auth/schemas/set-password.schema';
import { setPassword } from '@/modules/Auth/services/password.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { z } from 'zod';
const SetPasswordForm = () => {
  const location = useLocation();

  const form = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      email: location.state.email,
      changePasswordMode: 'password-recovery',
      verificationCodeHash: location.state.code,
      password: '',
      newPassword: '',
    },
  });

  const navigate = useNavigate();

  const { isPending, mutate } = useCustomMutation(setPassword, {
    onSuccess: () => navigate('/auth/login'),
    successMessage: 'Password changed successfully',
  });

  useEffect(() => {
    if (!location.state.email) {
      navigate('/auth/login');
    }
  }, [location]);

  const onSubmit = (data: z.infer<typeof setPasswordSchema>) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <input hidden {...form.register('changePasswordMode')} />
      <input hidden {...form.register('verificationCodeHash')} />
      <Card className="space-y-2 sm:space-y-6 max-w-[448px] w-full flex flex-col">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex justify-center py-2">
              <Action>
                <Password className="w-5 h-5 text-primary" />
              </Action>
            </div>
            <CardTitle className="text-center">Reset Password</CardTitle>
            <CardDescription className="text-center py-1">
              Password must have at least 10 characters, lower and upper case
              letters, a special character and a number.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid w-full items-center gap-1 sm:gap-2">
                  <Label htmlFor="email">Your email</Label>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      placeholder="you@example.com"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center  gap-1 sm:gap-2">
                  <Label htmlFor="password">Enter your new password</Label>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Password"
                      autoComplete="off"
                      variant={error?.message ? 'destructive' : 'default'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center  gap-1 sm:gap-2">
                  <Label htmlFor="password">Repeat your password</Label>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder="Password"
                      variant={error?.message ? 'destructive' : 'default'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-center items-end py-2 p-4 sm:py-6">
            <Button className="w-full h-12" isLoading={isPending}>
              Next
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
};

export default SetPasswordForm;
