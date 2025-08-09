
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Upload,
  Bot,
  Loader2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { getWastePrediction } from '@/lib/actions';
import type { IdentifyWasteTypeOutput } from '@/ai/flows/identify-waste-type';

const wasteCategories = ['Plastic', 'E-waste', 'Paper', 'Metal', 'Organic'];

const formSchema = z.object({
  image: z.any().refine(
    (files) => files?.length === 1, 'Image is required.'
  ),
  category: z.string({ required_error: 'Please select a category.' }),
  weight: z.coerce.number().min(0.1, 'Weight must be at least 0.1 kg.'),
  pickupDate: z.date({ required_error: 'A pickup date is required.' }),
  pickupTime: z.string({ required_error: 'A pickup time is required.' }),
});

export function WasteSubmissionForm() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<IdentifyWasteTypeOutput | null>(null);
  const [predictionError, setPredictionError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      category: '',
      weight: 0,
      pickupTime: '',
    },
  });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('image', event.target.files);
      setPredictionResult(null);
      setPredictionError(null);

      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setIsPredicting(true);
        try {
          const result = await getWastePrediction(dataUri);
          setPredictionResult(result);
          form.setValue('category', result.wasteType, { shouldValidate: true });
          toast({
            title: 'AI Identification Successful',
            description: `Waste identified as ${result.wasteType}. Category has been auto-selected.`,
            variant: 'default',
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          setPredictionError(errorMessage);
          toast({
            title: 'AI Identification Failed',
            description: errorMessage,
            variant: 'destructive',
          });
        } finally {
          setIsPredicting(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Submission successful!',
      description: 'Your waste pickup has been scheduled.',
    });
    form.reset();
    setImagePreview(null);
    setPredictionResult(null);
    setPredictionError(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Photo</FormLabel>
              <FormControl>
                <div className="relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Waste preview"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Upload className="h-8 w-8" />
                      <span>Click to upload or drag & drop</span>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {(isPredicting || predictionResult || predictionError) && (
          <Card className="bg-background">
            <CardHeader className="flex flex-row items-center gap-2">
              <Bot className="h-6 w-6" />
              <CardTitle>AI Waste Identifier</CardTitle>
            </CardHeader>
            <CardContent>
              {isPredicting && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Identifying waste type...</span>
                </div>
              )}
              {predictionError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{predictionError}</AlertDescription>
                </Alert>
              )}
              {predictionResult && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Result: {predictionResult.wasteType}</AlertTitle>
                  <AlertDescription>
                    {predictionResult.recyclingRecommendations}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waste Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a waste category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wasteCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category that best fits your waste.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 5.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="pickupDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pickup Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pickupTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="09:00-12:00">Morning (9am - 12pm)</SelectItem>
                    <SelectItem value="12:00-15:00">Afternoon (12pm - 3pm)</SelectItem>
                    <SelectItem value="15:00-18:00">Evening (3pm - 6pm)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
          Schedule Pickup
        </Button>
      </form>
    </Form>
  );
}
