// import "@/styles/globals.css";

import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export default function FrontEndLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const frontNav = Navbar();
  return (
    <main className="min-h-screen">
      {frontNav}
      <section>{children}</section>
      <Footer />
    </main>
  );
}
