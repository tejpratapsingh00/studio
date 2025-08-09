'use client';

import Link from 'next/link';
import { PanelLeft, Recycle } from 'lucide-react';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { UserNav } from './user-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Logo } from '@/components/logo';

export function Header() {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard': return 'Dashboard';
      case '/dashboard/submit-waste': return 'Submit Waste';
      case '/dashboard/history': return 'History';
      case '/dashboard/rewards': return 'Rewards';
      case '/dashboard/profile': return 'Profile';
      default: return 'EcoCollect';
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {isMobile ? <MobileHeader /> : <h1 className="text-xl font-semibold">{getPageTitle()}</h1>}
      <div className="ml-auto flex items-center gap-2">
        <UserNav />
      </div>
    </header>
  );
}

function MobileHeader() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Recycle className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">EcoCollect</span>
          </Link>
          <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/dashboard/submit-waste" className="flex items-center gap-4 px-2.5 text-foreground">
            Submit Waste
          </Link>
          <Link href="/dashboard/history" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            History
          </Link>
          <Link href="/dashboard/rewards" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            Rewards
          </Link>
          <Link href="/dashboard/profile" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
            Profile
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
