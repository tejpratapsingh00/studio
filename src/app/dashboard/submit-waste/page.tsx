import { WasteSubmissionForm } from '@/components/waste-submission-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SubmitWastePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Submit Waste for Recycling</CardTitle>
          <CardDescription>
            Fill out the form below to schedule a pickup for your recyclable waste. 
            Upload a photo for automatic category detection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WasteSubmissionForm />
        </CardContent>
      </Card>
    </div>
  );
}
