import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)]">
      <Sidebar />
      <div>
        <Header />
        <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
