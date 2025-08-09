import { Leaf } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-primary p-2 rounded-full">
        <Leaf className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-2xl font-bold text-primary">EcoCollect</span>
    </div>
  );
}
