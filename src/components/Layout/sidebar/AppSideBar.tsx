'use client';

import * as React from 'react';
import { BookOpen, Bot, Plus, Settings, SquareTerminal } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NavBar } from '@/components/Layout/sidebar/NavBar';
import { PRIVATE_PATH } from '@/utils/constants/routePath';

const data = {
  navMain: [
    {
      title: 'Home',
      url: PRIVATE_PATH.HOME,
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: 'Invoices',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Generated',
          url: PRIVATE_PATH.INVOICES_GENERATED,
        },
        {
          title: 'Received',
          url: PRIVATE_PATH.INVOICES_RECEIVED,
        },
        {
          title: 'Contacts',
          url: PRIVATE_PATH.INVOICES_CONTACTS,
        },
      ],
    },
    {
      title: 'Accounts',
      url: PRIVATE_PATH.ACCOUNTS,
      icon: BookOpen,
    },
  ],
  shortcuts: [
    {
      title: 'New Invoice',
      url: '#',
      icon: Plus,
    },
  ],
  navSecondary: [
    { title: 'Settings', url: PRIVATE_PATH.SETTINGS, icon: Settings },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} title="">
      <div className="bg-involt-sidebar h-full">
        <SidebarHeader className="pt-4">
          <img
            src="/iso-logo-type-white.png"
            className="object-cover w-32 h-12"
          />
        </SidebarHeader>
        <SidebarContent className="px-4 pt-6">
          <NavBar items={data.navMain} shortcuts={data.shortcuts} />
        </SidebarContent>
        <SidebarFooter className="px-4 py-6">
          <NavBar items={data.navSecondary} />
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}
