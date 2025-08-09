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
import { type WasteSubmission } from '@/lib/types';

const recentSubmissions: WasteSubmission[] = [
  { id: '1', date: '2024-07-20', type: 'Plastic', weight: 5.2, points: 52, status: 'Processed' },
  { id: '2', date: '2024-07-18', type: 'E-waste', weight: 2.1, points: 42, status: 'Processed' },
  { id: '3', date: '2024-07-15', type: 'Paper', weight: 10.0, points: 50, status: 'Processed' },
  { id: '4', date: '2024-07-12', type: 'Metal', weight: 3.5, points: 70, status: 'Processed' },
];

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of your recent recycling submissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Weight (kg)</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{submission.type}</Badge>
                </TableCell>
                <TableCell className="text-right">{submission.weight.toFixed(1)}</TableCell>
                <TableCell className="text-right text-primary font-medium">+{submission.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
