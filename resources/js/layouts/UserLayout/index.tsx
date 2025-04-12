import { ReactNode } from "react";
import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
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
