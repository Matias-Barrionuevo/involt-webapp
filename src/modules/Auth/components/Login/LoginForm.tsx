import { Action, User } from '@/components/svg';
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
import { LoginSchema } from '@/modules/Auth/schemas/login.schema';
import { loginUser } from '@/modules/Auth/services/session.service';
import { useAuthStore } from '@/modules/Auth/state/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { setToken } = useAuthStore();

  const { isPending, mutate } = useCustomMutation(loginUser, {
    onSuccess: ({ data }) => setToken(data.token),
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Form {...form}>
      <Card className="space-y-2 sm:space-y-6 max-w-[448px] w-full flex flex-col">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <div className="flex justify-center py-2">
              <Action>
                <User className="w-5 h-5" />
              </Action>
            </div>
            <CardTitle className="text-center">
              Log in to your account
            </CardTitle>
            <CardDescription className="text-center py-1">
              Don't have one?
              <Label>
                <Link to="/auth/register" className="pl-1 text-primary">
                  Register here
                </Link>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center  gap-1 sm:gap-2">
                  <Label htmlFor="password">Enter your password</Label>
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
            <div className="text-center">
              <Label className="text-primary">
                <Link to="/auth/recover">Forgot password?</Link>
              </Label>
            </div>
          </CardContent>
          <CardFooter className="justify-center items-end py-2 p-4 sm:py-6">
            <Button className="w-full h-12" isLoading={isPending}>
              Log in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </Form>
  );
};

export default LoginForm;
