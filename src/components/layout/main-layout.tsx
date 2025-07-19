'use client';

import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Code2, LayoutDashboard, GitMerge, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '../auth-provider';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/app', label: 'Code Review', icon: Code2 },
  { href: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/repositories', label: 'Repositories', icon: GitMerge },
  { href: '/app/settings', label: 'Settings', icon: Settings },
];

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useAuth();
  const { toast } = useToast();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const updateName = () => {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    };

    // Initial load
    updateName();

    // Listen for changes from other tabs/windows or our custom event
    window.addEventListener('storage', updateName);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateName);
    };
  }, []);

  const activePage = navItems.find((item) => item.href === pathname);
  
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
       toast({
        title: 'Error logging out',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-headline font-semibold text-primary-foreground">
              CodeReview
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link href={item.href} key={item.href}>
                <Button
                  variant={pathname === item.href ? 'secondary' : 'ghost'}
                  className="w-full justify-start gap-3 px-3"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </SidebarContent>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-auto p-2"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">{userName || 'Current User'}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session?.user?.email}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
               <Link href="/app/settings">
                 <DropdownMenuItem>Settings</DropdownMenuItem>
               </Link>
              <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-background/50 px-6 backdrop-blur-sm sticky top-0 z-10">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold font-headline">
              {activePage?.label}
            </h2>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
