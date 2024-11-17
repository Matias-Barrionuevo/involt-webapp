import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import { Separator } from '@/components/ui/separator';
import { LucideIcon, Minus, Plus } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Fragment, useState } from 'react';
import {
  Link,
  matchPath,
  NavLink,
  useLocation,
  useMatch,
  useMatches,
} from 'react-router-dom';
import { cn } from '@/lib/utils';

export function NavBar({
  items,
  shortcuts,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  shortcuts?: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <SidebarMenu className="gap-4">
        {items.map((item) => (
          <Fragment key={item.title}>
            {item.items?.length ? (
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className={cn('rounded-xl', isOpen && 'bg-primary-700 pb-4')}
              >
                <SidebarMenuItem className="flex flex-col">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-white hover:bg-white/10">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {isOpen ? (
                        <Minus className="ml-auto h-4 w-4" />
                      ) : (
                        <Plus className="ml-auto h-4 w-4" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.items.map((subItem) => (
                      <SidebarMenuSub className="pl-6" key={subItem.title}>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            asChild
                            isActive={Boolean(matchPath(pathname, subItem.url))}
                          >
                            <NavLink
                              to={subItem.url}
                              className="text-white hover:bg-white/10 hover:text-white"
                            >
                              {subItem.title}
                            </NavLink>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    ))}
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={Boolean(matchPath(pathname, item.url))}
                  className="text-white hover:bg-white/10"
                >
                  <Link to={item.url} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </Fragment>
        ))}
      </SidebarMenu>
      {Boolean(shortcuts?.length) && (
        <>
          <div className="mt-4">
            <h3 className="mb-2 px-4 text-sm font-semibold text-white/70">
              Shortcuts
            </h3>
            {shortcuts?.map((shortcut) => (
              <SidebarMenu key={shortcut.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2 cursor-pointer">
                      {<shortcut.icon className="h-6 w-6" />}
                      <span>{shortcut.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            ))}
            <Separator className="mt-10 bg-muted-foreground" />
          </div>
        </>
      )}
    </>
  );
}
