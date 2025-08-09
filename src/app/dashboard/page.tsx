import { ImpactCard } from '@/components/dashboard/impact-card';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { Badges } from '@/components/dashboard/badges';
import { MarketPrices } from '@/components/dashboard/market-prices';
import { Factory, Recycle, Leaf, Award } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground">Here's a summary of your green journey.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ImpactCard
          title="Total Waste Recycled"
          value="125.7 kg"
          icon={Recycle}
          description="+12.5 kg from last month"
        />
        <ImpactCard
          title="CO₂ Saved"
          value="314.2 kg"
          icon={Factory}
          description="Equivalent to planting 3 trees"
        />
        <ImpactCard
          title="Reward Points"
          value="2,514"
          icon={Award}
          description="You're a top recycler!"
        />
        <ImpactCard
          title="Green Streak"
          value="32 days"
          icon={Leaf}
          description="Keep up the great work!"
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div>
          <Badges />
        </div>
      </div>
       <div className="grid gap-8">
        <MarketPrices />
      </div>
    </div>
  );
}
