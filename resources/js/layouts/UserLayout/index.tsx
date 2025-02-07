import { ReactNode } from "react";
import { Header } from "./ui/Header";
import { Footer } from "./ui/Footer";
import { Container } from "@/shared/ui/Container";

export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Container className="h-screen px-6 py-8">
        <Header />
        <main className="pt-9">{children}</main>
      </Container>
      <Footer />
    </>
  );
}
