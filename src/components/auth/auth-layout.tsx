import { Logo } from '@/components/logo';
import Image from 'next/image';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full lg:grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-0">
        {children}
      </div>
      <div className="hidden bg-muted lg:relative lg:flex items-center justify-center flex-col p-12 text-center">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Recycling concept image"
          data-ai-hint="recycling environment"
          fill
          className="object-cover absolute inset-0 z-0"
        />
        <div className="relative z-10 bg-black/50 p-8 rounded-lg">
           <Logo />
          <p className="mt-4 text-lg text-foreground/80">
            Turn your waste into wealth. Join the green revolution today.
          </p>
        </div>
      </div>
    </div>
  );
}
