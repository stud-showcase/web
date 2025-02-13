import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { SevSULogo } from "@/shared/ui/SevSULogo";

export function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#1D71B8] to-[#1588E9]">
      <Container className="py-8">
        <SevSULogo width={273} height={78} color="white" />
        <Heading level={6} weight="semibold" theme="light" className="text-center mt-6">
          Все права защищены © «Севастопольский госудаственный университет»,
          2025
        </Heading>
      </Container>
    </div>
  );
}
