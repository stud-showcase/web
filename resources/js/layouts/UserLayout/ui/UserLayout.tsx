import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "@/shared/ui/Toaster";

export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <main className="h-full">{children}</main>
        <Toaster />
      </div>
      <Footer />
    </>
  );
}
