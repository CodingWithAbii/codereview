'use client';

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

export default function SettingsPage() {
  const { session } = useAuth();

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
            <Input id="name" defaultValue="Current User" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" readOnly value={session?.user?.email || ''} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button disabled>Update Profile</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
