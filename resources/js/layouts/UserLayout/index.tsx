import { ReactNode } from "react";
import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
import { Container } from "@/shared/ui/Container";

export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen">
        <Container className="pt-8">
          <Header />
        </Container>
        <main className="h-full">{children}</main>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </>
  );
}
