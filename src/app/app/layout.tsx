import MainLayout from '@/components/layout/main-layout';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
