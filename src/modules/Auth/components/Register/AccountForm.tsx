import { Action } from '@/components/svg';
import Document from '@/components/svg/Document';
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
import { AccountSchema } from '@/modules/Auth/schemas/register.schema';
import { registerUser } from '@/modules/Auth/services/register.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { z } from 'zod';

interface AccountFormProps {
  formData: {
    lastName?: string;
    firstName?: string;
    kind: 'person' | 'company';
    countryCode: string;
  };
  onSubmit?: (data: any) => void;
}

const AccountForm = ({ formData, onSubmit }: AccountFormProps) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    shouldFocusError: true,
    defaultValues: { email: '', firstName: '', lastName: '' },
  });

  const { mutate, isPending } = useCustomMutation(registerUser, {
    onSuccess: () => onSubmit?.(form.getValues()),
  });

  useEffect(() => {
    if (!formData?.countryCode) {
      navigate('/auth/register');
    }
  }, [formData.countryCode]);

  const handleOnSubmit = (data: z.infer<typeof AccountSchema>) => {
    mutate({
      ...formData,
      ...data,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleOnSubmit)}>
        <Card className="space-y-2 sm:space-y-6 sm:w-[448px] w-full flex flex-col">
          <CardHeader>
            <div className="flex justify-center py-2">
              <Action>
                <Document className="w-5 h-5 text-primary" />
              </Action>
            </div>
            <CardTitle className="text-center">Register your account</CardTitle>
            <CardDescription className="text-center py-1">
              Already have an account?
              <Label>
                <Link to="/auth/login" className="pl-1 text-primary">
                  Log in here.
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center gap-1 sm:gap-2">
                  <Label htmlFor="name">First Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      variant={error?.message ? 'destructive' : 'default'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center gap-1 sm:gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <FormControl>
                    <Input
                      {...field}
                      variant={error?.message ? 'destructive' : 'default'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-center items-end py-2 p-4 sm:py-6">
            <Button className="w-full h-12" isLoading={isPending}>
              Next
            </Button>
            <Button
              variant="outline"
              className="w-full h-12"
              type="button"
              disabled={isPending}
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

export default AccountForm;
