import { Action } from '@/components/svg';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Combobox } from '@/components/ui/combo-box';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { CountrySchema } from '@/modules/Auth/schemas/register.schema';
import { getCountries } from '@/modules/Auth/services/country.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

interface CountryFormProps {
  formData: {
    countryCode?: string;
  };
  onSubmit?: (data: any) => void;
}

const CountryForm: React.FC<CountryFormProps> = ({
  formData,
  onSubmit = () => {},
}) => {
  const { countryCode } = formData;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    shouldFocusError: true,
    defaultValues: { countryCode },
  });

  const { data, isLoading } = useCustomQuery(getCountries, {
    queryKey: ['countries'],
    params: { enabled: true },
    select: ({ countries }) =>
      countries.map(
        (country: { isoCode: string; name: string; flag: string }) => ({
          ...country,
          icon: country.flag,
          label: country.name,
          value: country.isoCode,
        })
      ),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="space-y-2 sm:space-y-6 sm:w-[448px] w-full flex flex-col">
          <CardHeader>
            <div className="flex justify-center py-2">
              <Action>
                <Globe className="w-5 h-5 text-primary" />
              </Action>
            </div>
            <CardTitle className="text-center">Choose your country</CardTitle>
            <CardDescription className="text-center py-1">
              <Label>
                Select your country of residence that matches your
                identification document.
              </Label>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-4">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="grid w-full items-center gap-1 sm:gap-2">
                  <FormControl>
                    <Combobox
                      {...field}
                      items={data || []}
                      searchPlaceholder="Please, type or choose one"
                      placeholder="Select your country"
                      emptyMessage="Nothing found."
                      hasError={Boolean(error?.message)}
                      disabled={isLoading}
                      isLoading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 justify-center items-end py-2 p-4 sm:py-6">
            <Button disabled={isLoading} className="w-full h-12">
              Continue with Email ID
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

export default CountryForm;
