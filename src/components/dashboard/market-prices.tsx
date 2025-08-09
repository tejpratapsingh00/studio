import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { type MarketPrice } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const marketPrices: MarketPrice[] = [
  { type: 'Plastic', price: 15.50, trend: 'up' },
  { type: 'Metal', price: 55.20, trend: 'down' },
  { type: 'E-waste', price: 80.00, trend: 'up' },
  { type: 'Paper', price: 5.75, trend: 'down' },
  { type: 'Organic', price: 2.50, trend: 'up' },
];

export function MarketPrices() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <CardTitle>Waste Market Prices</CardTitle>
        </div>
        <CardDescription>
          Current market rates for recyclable materials (per kg).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead className="text-right">Price (INR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {marketPrices.map((item) => (
              <TableRow key={item.type}>
                <TableCell>
                  <Badge variant="secondary">{item.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className={cn('flex items-center gap-1', {
                    'text-green-500': item.trend === 'up',
                    'text-red-500': item.trend === 'down',
                  })}>
                    {item.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="capitalize">{item.trend}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">₹{item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
