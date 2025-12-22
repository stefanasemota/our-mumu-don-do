
// This layout is now simpler, as the header logic is handled conditionally in the root layout.
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen flex-col bg-background">{children}</div>;
}
