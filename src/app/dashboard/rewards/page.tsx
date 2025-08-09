import { Award, Gift, Leaf, Trophy } from 'lucide-react';
import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const leaderboard = [
  { name: 'Alice', points: 12500, avatar: 'https://placehold.co/40x40.png?text=A' },
  { name: 'Bob', points: 11200, avatar: 'https://placehold.co/40x40.png?text=B' },
  { name: 'You', points: 2514, avatar: 'https://placehold.co/40x40.png?text=Y' },
  { name: 'Charlie', points: 9800, avatar: 'https://placehold.co/40x40.png?text=C' },
  { name: 'Diana', points: 8500, avatar: 'https://placehold.co/40x40.png?text=D' },
];

const redeemOptions = [
  { title: 'Cash Transfer (UPI)', points: 1000, icon: Gift, value: '₹100' },
  { title: 'Plant a Tree', points: 500, icon: Leaf, value: '1 Tree' },
  { title: 'E-commerce Voucher', points: 2000, icon: Award, value: '₹200 Off' },
];

export default function RewardsPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <CardTitle>Leaderboard</CardTitle>
          </div>
          <CardDescription>See how you rank among top recyclers.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {leaderboard.sort((a,b) => b.points - a.points).map((user, index) => (
              <li key={index} className={`flex items-center gap-4 p-2 rounded-md ${user.name === 'You' ? 'bg-primary/10' : ''}`}>
                <span className="font-bold text-lg w-6">{index + 1}</span>
                <Avatar>
                  <AvatarImage src={user.avatar} data-ai-hint="user avatar" />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="flex-1 font-medium">{user.name}</span>
                <span className="font-bold text-primary">{user.points.toLocaleString()} pts</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Your Points</CardTitle>
                <CardDescription>Your current rewards balance.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-5xl font-bold text-primary">2,514</div>
                <p className="text-muted-foreground">Keep recycling to earn more!</p>
            </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Redeem Your Points</CardTitle>
            <CardDescription>Use your points to claim exciting rewards.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {redeemOptions.map((option, index) => (
              <Card key={index} className="flex items-center p-4">
                  <option.icon className="h-8 w-8 text-primary mr-4" />
                  <div className="flex-1">
                      <p className="font-semibold">{option.title}</p>
                      <p className="text-sm text-muted-foreground">{option.points.toLocaleString()} points</p>
                  </div>
                  <Button>{option.value}</Button>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
