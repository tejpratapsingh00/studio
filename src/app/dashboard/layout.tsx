'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Recycle,
  History,
  Trophy,
  User,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { type NavItem } from '@/lib/types';
import { Header } from '@/components/layout/header';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Submit Waste', href: '/dashboard/submit-waste', icon: Recycle },
  { title: 'History', href: '/dashboard/history', icon: History },
  { title: 'Rewards', href: '/dashboard/rewards', icon: Trophy },
  { title: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }

  return <DesktopLayout>{children}</DesktopLayout>;
}

function DesktopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-card sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Recycle className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">EcoCollect</span>
          </Link>
          <TooltipProvider>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8',
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16 flex-1">
        <Header />
        <main className="p-4 sm:px-6 sm:py-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-1 p-4">{children}</main>
      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t bg-card">
        <nav className="grid grid-cols-5 h-16 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-colors',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </footer>
      <div className="h-16" />
    </div>
  );
}
