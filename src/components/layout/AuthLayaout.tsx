import { Logo } from '@/components/svg';
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
import { Globe } from 'lucide-react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({
  authContent,
  illustration,
}: {
  authContent: ReactNode;
  illustration?: ReactNode;
}) => {
  return (
    <div className="h-full w-full">
      <header className="p-1 sm:p-4 absolute top-0 left-0">
        <Link to="/auth/login">
          <Logo className="h-12 w-28 sm:h-16 sm:w-40" />
        </Link>
      </header>
      <main className="grid lg:grid-cols-2 h-full">
        <section className="flex justify-center items-center h-full px-4">
          {authContent}
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
          {illustration}
        </section>
      </main>
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
    </div>
  );
};

export default AuthLayout;
