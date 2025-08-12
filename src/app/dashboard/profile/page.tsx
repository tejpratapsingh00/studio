'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email(),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
});

export default function ProfilePage() {
  const { toast } = useToast();
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: 'Eco Warrior',
      email: 'user@example.com',
      phone: '123-456-7890',
      address: '123 Green St, Nature City, 11001',
    },
  });

  const handleUseCurrentLocation = () => {
    setIsFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Using a free reverse geocoding API.
            // In a real app, you would use a more robust service like Google Maps Geocoding API.
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            if (!response.ok) {
              throw new Error('Failed to fetch address.');
            }
            const data = await response.json();
            if (data && data.display_name) {
              form.setValue('address', data.display_name, { shouldValidate: true });
              toast({
                title: 'Location Updated',
                description: 'Your pickup address has been set to your current location.',
              });
            } else {
              throw new Error('Could not find address for the location.');
            }
          } catch (error) {
             toast({
              title: 'Error',
              description: 'Could not retrieve your address. Please enter it manually.',
              variant: 'destructive',
            });
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          toast({
            title: 'Location Access Denied',
            description: 'Please enable location services in your browser to use this feature.',
            variant: 'destructive',
          });
          setIsFetchingLocation(false);
        }
      );
    } else {
      toast({
        title: 'Geolocation Not Supported',
        description: 'Your browser does not support geolocation.',
        variant: 'destructive',
      });
      setIsFetchingLocation(false);
    }
  };

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({
      title: 'Profile Updated',
      description: 'Your information has been saved successfully.',
    });
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Manage your account settings and personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://placehold.co/80x80.png" data-ai-hint="user avatar" />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} readOnly />
                  </FormControl>
                   <FormDescription>
                    Email cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Pickup Address</FormLabel>
                    <Button 
                      type="button"
                      variant="link" 
                      className="p-0 h-auto"
                      onClick={handleUseCurrentLocation}
                      disabled={isFetchingLocation}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {isFetchingLocation ? 'Fetching...' : 'Use Current Location'}
                    </Button>
                  </div>
                  <FormControl>
                    <Input placeholder="Your address for pickups" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
