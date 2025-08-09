import { Recycle } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary p-2 rounded-full">
        <Recycle className="h-8 w-8 text-primary-foreground" />
      </div>
      <span className="text-3xl font-bold text-primary">EcoCollect</span>
    </div>
  );
}
