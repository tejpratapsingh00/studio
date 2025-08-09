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
import { cn } from '@/lib/utils';

const allSubmissions: WasteSubmission[] = [
  { id: '1', date: '2024-07-20', type: 'Plastic', weight: 5.2, points: 52, status: 'Processed' },
  { id: '5', date: '2024-07-22', type: 'Organic', weight: 7.0, points: 35, status: 'Pending' },
  { id: '2', date: '2024-07-18', type: 'E-waste', weight: 2.1, points: 42, status: 'Processed' },
  { id: '6', date: '2024-07-19', type: 'Plastic', weight: 8.5, points: 85, status: 'On the way' },
  { id: '3', date: '2024-07-15', type: 'Paper', weight: 10.0, points: 50, status: 'Processed' },
  { id: '4', date: '2024-07-12', type: 'Metal', weight: 3.5, points: 70, status: 'Processed' },
];

export default function HistoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission History</CardTitle>
        <CardDescription>
          Here's a complete list of your recycling activities.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Weight (kg)</TableHead>
              <TableHead className="text-right">Points Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allSubmissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>{submission.date}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{submission.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn({
                      'bg-green-100 text-green-800 border-green-200': submission.status === 'Processed',
                      'bg-yellow-100 text-yellow-800 border-yellow-200': submission.status === 'Pending',
                      'bg-blue-100 text-blue-800 border-blue-200': submission.status === 'On the way',
                    })}
                  >
                    {submission.status}
                  </Badge>
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
