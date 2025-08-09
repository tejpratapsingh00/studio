import { Award, Leaf, Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const badges = [
  { icon: Star, title: 'First Recyle', description: 'Submitted your first batch of waste.' },
  { icon: Award, title: 'Plastic Pro', description: 'Recycled 50kg of plastic.' },
  { icon: Leaf, title: 'Eco-Warrior', description: 'Saved 100kg of CO₂.' },
];

export function Badges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Badges</CardTitle>
        <CardDescription>Achievements from your recycling journey.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-4 p-2 rounded-lg bg-background/50">
            <div className="p-3 bg-primary/20 rounded-full">
              <badge.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">{badge.title}</p>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
