import { Logo } from '@/components/logo';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-0">
        {children}
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center flex-col p-12 text-center">
        <Logo />
        <p className="mt-4 text-lg text-foreground/80">
          Turn your waste into wealth. Join the green revolution today.
        </p>
      </div>
    </div>
  );
}
