import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toaster } from "@/shared/ui/Toaster";

export function AdminLayout({
  headerSlot,
  children,
}: {
  headerSlot: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />
      <div>
        <Header>
          {headerSlot}
        </Header>
        <main className="flex flex-col px-4 py-4 gap-4 lg:px-6">{children}</main>
        <Toaster />
      </div>
    </div>
  );
}
