
import { Wrench } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
import { Github, Gitlab, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const metadata: Metadata = {
  title: 'Repositories | CodeReview',
};

const repositories = [
    { name: 'acme-corp/frontend-app', provider: 'github', status: 'active' },
    { name: 'my-project/api-service', provider: 'gitlab', status: 'active' },
    { name: 'personal/dotfiles', provider: 'github', status: 'inactive' },
];

export default function RepositoriesPage() {
  return (
     <div className="relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 rounded-lg z-10">
          <div className="p-4 bg-primary/10 rounded-full mb-4">
            <Wrench className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-headline font-semibold mb-2">
            Repository Integration Coming Soon
          </h2>
          <p className="text-muted-foreground max-w-md">
            This feature is under active development. Soon, you'll be able to connect your GitHub, GitLab, and Bitbucket repositories for automated code reviews on every pull request.
          </p>
        </div>
        
        <div className="space-y-6 blur-md pointer-events-none select-none">
          <Card>
              <CardHeader>
                  <CardTitle className="font-headline">Connect a Repository</CardTitle>
                  <CardDescription>
                      Connect your Git repositories to enable automatic code reviews on your pull requests.
                  </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                  <Button>
                      <Github className="mr-2 h-4 w-4" /> Connect with GitHub
                  </Button>
                  <Button variant="secondary">
                      <Gitlab className="mr-2 h-4 w-4" /> Connect with GitLab
                  </Button>
                  <Button variant="secondary">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 fill-current"><title>Bitbucket</title><path d="M2.632 2.697a2.533 2.533 0 0 0-.067 3.542l7.835 7.943a.317.317 0 0 1 0 .445l-7.835 7.942a2.533 2.533 0 0 0 3.61 3.542l7.835-7.943a.317.317 0 0 1 .448 0l7.834 7.943a2.533 2.533 0 0 0 3.61-3.542L14.23 14.63a.317.317 0 0 1 0-.445l7.834-7.943a2.533 2.533 0 0 0-3.543-3.542L10.69 8.633a.317.317 0 0 1-.448 0L2.41 2.764a2.533 2.533 0 0 0-.12-.067.072.072 0 0 0-.05-.015.06.06 0 0 0-.05.015Z"/></svg>
                      Connect with Bitbucket
                  </Button>
              </CardContent>
          </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Your Repositories</CardTitle>
            <CardDescription>
              Manage your connected repositories and their analysis settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Repository</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repositories.map((repo) => (
                  <TableRow key={repo.name}>
                    <TableCell className="font-medium">{repo.name}</TableCell>
                    <TableCell className="capitalize">{repo.provider}</TableCell>
                    <TableCell>
                      <Badge variant={repo.status === 'active' ? 'default' : 'outline'} className={repo.status === 'active' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20' : ''}>
                        {repo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Settings</DropdownMenuItem>
                          <DropdownMenuItem>Pause Analysis</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Disconnect
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
