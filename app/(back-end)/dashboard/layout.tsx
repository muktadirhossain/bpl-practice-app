import { auth } from "@/auth";
import AccessDenied from "@/components/AccessDenied";

// Extend the Session type to include role
declare module "next-auth" {
  interface Session {
    role?: string;
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check User Authorization
  const isEmailAllowed =
    session?.user?.email === "muktadirhossainrabbi@gmail.com";
  const isAdmin = session?.role === "admin";

  // Render AccessDenied if access conditions are not met
  if (isEmailAllowed || isAdmin) {
    return <section className="min-h-[calc(100vh-150px)]">{children}</section>;
  }

  return <AccessDenied />;
}
