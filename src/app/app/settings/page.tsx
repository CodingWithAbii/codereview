'use client';

import { useState, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/components/auth-provider';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { session } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleUpdateProfile = () => {
    setIsSaving(true);
    localStorage.setItem('userName', name);
    // Dispatch a storage event to notify other components (like the layout)
    window.dispatchEvent(new Event('storage'));
    toast({
      title: 'Profile Updated',
      description: 'Your name has been saved successfully.',
    });
    setIsSaving(false);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">API Configuration</CardTitle>
          <CardDescription>
            The application is configured to use a centrally-managed API key.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Custom Coding Rules</CardTitle>
          <CardDescription>
            Define your team's coding standards. The AI will use these rules
            during code reviews, in addition to its standard analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Label htmlFor="custom-rules">Your Rules</Label>
            <Textarea
              id="custom-rules"
              placeholder="e.g., 'Functions should not exceed 50 lines.' or 'Avoid using default exports.'"
              rows={10}
              className="font-code text-sm"
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button disabled>Save Changes</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Profile</CardTitle>
          <CardDescription>
            Update your account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" readOnly value={session?.user?.email || ''} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button onClick={handleUpdateProfile} disabled={isSaving || !name}>
            {isSaving ? 'Saving...' : 'Update Profile'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
