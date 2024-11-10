import "@/styles/globals.css";
import { DashboardNav } from "./_components/DashboardNav";
import SideBar from "./_components/SideBar";

import Footer from "@/components/footer";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <DashboardNav />
      <div className="px-2 flex-grow flex justify-start">
        <SideBar />
        <main className="w-10/12 min-h-[calc(100vh-150px)] p-4 border-2 border-slate-600/80 border-dashed m-3 rounded-lg overflow-y-auto">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
