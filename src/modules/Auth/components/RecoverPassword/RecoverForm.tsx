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
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { ResetPasswordSchema } from '@/modules/Auth/schemas/reset-password.schema';
import { recoverPassword } from '@/modules/Auth/services/password.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const RecoverForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const { isPending, mutate } = useCustomMutation(recoverPassword, {
    onSuccess: () =>
      navigate('/auth/verify-password', { state: { ...form.getValues() } }),
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="space-y-2 sm:space-y-6 max-w-[448px] w-full">
          <CardHeader>
            <div className="flex justify-center py-2">
              <Action>
                <Password className="w-5 h-5 text-primary" />
              </Action>
            </div>
            <CardTitle className="text-center">Reset Password</CardTitle>
            <CardDescription className="text-center py-1">
              <Label>
                Enter the email address you used to create your Settle ID
                Account, so we can send you a code to reset your password.
              </Label>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center gap-1 sm:gap-2">
                  <Label htmlFor="email">Enter your email</Label>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="you@example.com"
                      variant={error?.message ? 'destructive' : 'default'}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-center items-end py-2 p-4 sm:py-6">
            <Button isLoading={isPending} className="w-full h-12">
              Next
            </Button>
            <Button
              variant="outline"
              className="w-full h-12"
              type="button"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default RecoverForm;
