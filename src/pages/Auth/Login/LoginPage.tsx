import { Action, Logo, User } from '@/components/svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginSchema } from '@/modules/Auth/schemas/LoginSchema';

import { useAuthStore } from '@/modules/Auth/state/auth';
import { loginUser } from '@/modules/Auth/services/session.service';
import { PasswordInput } from '@/components/ui/password-input';
import { useCustomMutation } from '@/hooks/useCustomMutation';
import { useCustomQuery } from '@/hooks/useCustomQuery';

const LoginPage = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
  });
  const { setToken } = useAuthStore();

  const { isPending, mutate } = useCustomMutation(loginUser, {
    onSuccess: ({ data }) => setToken(data.token),
  });

  const pepe = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1'
    );
    const data = await response.json();
    return { data, problem: '' };
  };

  const { data } = useCustomQuery(pepe, {
    queryKey: ['hola'],
    successMessage: 'hola',
  });
  console.log(data);

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="h-full w-full">
      <div className="grid lg:grid-cols-2 h-full">
        <section className="flex justify-center items-center h-full px-4">
          <header className="p-1 sm:p-4 absolute top-0 left-0">
            <Link to="/auth/login">
              <Logo className="h-12 w-28 sm:h-16 sm:w-40" />
            </Link>
          </header>
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

          <footer className="absolute bottom-0 left-0 p-4 flex gap-2">
            <Label className="text-primary">
              <Link to="https://letsping.com/terms-of-service" target="_blank">
                Terms & Conditions
              </Link>
            </Label>
            <Label className="text-primary">•</Label>
            <Label className="text-primary">
              <Link to="https://letsping.com/privacy-policy" target="_blank">
                Privacy
              </Link>
            </Label>
          </footer>
        </section>
        <section className="bg-primary hidden lg:grid h-full">
          <div>
            <div className="flex gap-2 items-center justify-end p-4">
              <Globe className="text-white w-5 h-5" />
              <Select defaultValue="en">
                <SelectTrigger className="w-[70px] bg-transparent text-white focus:ring-offset-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Language</SelectLabel>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="es">ES</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
