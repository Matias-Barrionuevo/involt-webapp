import { AppSidebar } from '@/components/Layout/sidebar/AppSideBar';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { PRIVATE_PATH } from '@/utils/constants/routePath';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isHome = pathname === PRIVATE_PATH.HOME;
  const title = isHome ? `Hola, ${'name'}` : pathname.replace('/', '');

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Label className="font-nunito text-2xl">{title}</Label>
          </div>
          <div className="ml-auto px-3">
            <div>hola</div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
